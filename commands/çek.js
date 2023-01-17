const Discord = require("discord.js");

exports.run = (client, message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı


    // Yetkili kullanıcı kontrolü
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send("Bu komutu kullanmak için yetkiniz yok.");
        return;
    }

    // Ödül ve giriş ücreti al
    const prize = parseInt(args[0]);
    const entryFee = parseInt(args[1]);
    if (!prize || !entryFee) {
        message.channel.send("Lütfen ödül ve giriş ücretini girin. Örnek: !çek 100 20");
        return;
    }

    // Çekiliş embedi oluştur
    const lotteryEmbed = new Discord.MessageEmbed()
        .setTitle("ÖDÜLLÜ ÇEKİLİŞ")
        .setDescription(`Ödül: ${prize}$\nGiriş Ücreti: ${entryFee}$\n\nBilet satın almak için :ticket: emojiye tıkla.`)
        .setColor("#f1c40f");
    message.channel.send(lotteryEmbed).then(sentMessage => {
        sentMessage.react("🎫");

        // Bilet satın alma reaksiyonu dinleyici
        const filter = (reaction, user) => {
            return reaction.emoji.name === "🎫" && user.id !== client.user.id;
        };
        const collector = sentMessage.createReactionCollector(filter);
        collector.on("collect", (reaction, user) => {
            // Kullanıcının bakiyesini kontrol et
            db.collection("users").findOne({ userId: user.id }, (err, res) => {
                if (err) throw err;
                if (!res) {
                    user.send("Cüzdanınız bulunamadı. Lütfen !cüzdan komutu ile cüzdanınızı oluşturunuz.");
                    return;
                }
                //Kullanıcının bakiyesini kontrol et
if (res.balance < entryFee) {
    user.send("Giriş ücreti cüzdanınızdaki miktardan daha fazla. Lütfen daha az bir ücret seçin veya cüzdanınızı doldurun.");
    return;
    }
    //Kullanıcının bakiyesinden giriş ücretini çek
    db.collection("users").updateOne({ userId: user.id }, { $inc: { balance: -entryFee } }, (err, res) => {
    if (err) throw err;
    });
    //Kullanıcının çekilişe katıldığını kaydet
    db.collection("lottery").updateOne({ userId: user.id }, { $push: { entries: prize } }, { upsert: true }, (err, res) => {
    if (err) throw err;
    });
    });
    });
     // Çekilişi sonlandırmak için !çek tekrar yazın komutu
     message.channel.awaitMessages(response => response.content === "!çekk" && response.author.id === message.author.id, {
        max: 1,
        time: 600000,
        errors: ['time']
    }).then((collected) => {
        // Çekilişi sonlandır
        collector.stop();
        // Çekilişe katılan kullanıcıları al
        db.collection("lottery").find({ "entries": { $exists: true, $ne: [] } }).toArray((err, res) => {
            if (err) throw err;
            if (!res.length) {
                message.channel.send("Çekilişe katılan kullanıcı bulunamadı.");
                return;
            }
            // Rastgele bir kazanan seç
            const winner = res[Math.floor(Math.random() * res.length)];
            // Kazanan kullanıcıya ödülü ver
            db.collection("users").updateOne({ userId: winner.userId }, { $inc: { balance: prize } }, (err, res) => {
                if (err) throw err;
                // Kazanan kullanıcıya ödül bildirimi gönder
                client.users.cache.get(winner.userId).send(`Tebrikler! Çekilişte kazandığınız ödül: ${prize}₺`);
                // Çekiliş sonucunu kanala bildir
                message.channel.send(`Çekiliş sonucu: Kazanan kullanıcı - <@${winner.userId}>`);
                // Çekiliş verilerini sıfırla
                db.collection("lottery").updateMany({}, { $unset: { entries: "" } });
                });
                });
                });
            })
        });
        }