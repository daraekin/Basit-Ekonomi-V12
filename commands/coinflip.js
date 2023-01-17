const Discord = require("discord.js");
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    
const tail = ':tail:'
//Kullanıcının yatırdığı miktarı al
const bet = parseInt(args[0]);
if (!bet) {
message.channel.send("Lütfen yatırmak istediğiniz miktarı girin. Örnek: !cf 100");
return;
}
//Kullanıcının cüzdanındaki miktarı kontrol et
db.collection("users").findOne({ userId: message.author.id }, (err, res) => {
    if (err) throw err;
    if (!res) {
        //Kullanıcının cüzdanı yoksa hata mesajı gönder
        message.channel.send("Bu kullanıcının cüzdanı bulunamadı. Lütfen !cüzdan komutu ile cüzdanınızı oluşturunuz.");
        return;
    }
    //Kullanıcının bakiyesini kontrol et
    if (res.balance < bet) {
        message.channel.send("Yatırmak istediğiniz miktar cüzdanınızdaki miktardan daha fazla. Lütfen daha az bir miktar yatırın.");
        return;
    }
    //Kullanıcının emojiye tıklamasını bekle
    const filter = (reaction, user) => {
        return reaction.emoji.name === '🪙' && user.id === message.author.id;
    };
    message.channel.send(`Coin atmak için 🪙 emojiye tıklayın.`).then(sentMessage => {
        sentMessage.react('🪙');
        sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                //Kullanıcının tıkladığı emojiye göre oyunu başlat
const reaction = collected.first();
if (reaction.emoji.name === '🪙') {
//Kullanıcının ve botun rastgele sayısını belirle
const userNumber = Math.random() >= 0.5;
const botNumber = Math.random() >= 0.5;
                //Kazananı belirle
                let winner;
                if (userNumber > botNumber) {
                    winner = message.author.username;
                } else if (botNumber > userNumber) {
                    winner = "Bot";
                }

                //Embed oluştur
                const embed = new Discord.MessageEmbed()
                    .setTitle("Coin Flip")
                    .addField(`Kullanıcı`, message.author.username)
                    .addField(`Bot`, "Bot")
                    .setColor("#f1c40f")
                    .setTimestamp();

                //Kazananı belirle ve miktarı ekle/çek
                if (winner === message.author.username) {
                    //Kullanıcı kazandığı için para ekle
                    db.collection("users").updateOne({ userId: message.author.id }, { $inc: { balance: bet } }, (err, res) => {
                        if (err) throw err;
                        embed.addField("Kazanan", winner)
                        embed.addField("Kazandığınız Miktar", bet + "$")
                        message.channel.send(embed);
                    });
                } else {
                    //Kaybettiği miktarı ekle
                    db.collection("users").updateOne({ userId: message.author.id }, { $inc: { balance: -bet } }, (err, res) => {
                        if (err) throw err;
                        embed.addField("Kazanan", "Bot")
                        embed.addField("Kaybettiğiniz Miktar", bet + "$")
                        message.channel.send(embed);
                    });
                }
            }
        });
});
});
});
}