const Discord = require("discord.js");

exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

//Kullanıcının seçtiği ürünü al
const item = args[0];
if (!item) {
message.channel.send("Lütfen satın almak istediğiniz ürünü girin. Örnek: !satinal book1");
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
//Kullanıcının seçtiği ürünün fiyatını al
db.collection("kmarket").findOne({ name: item }, (err, res) => {
    if (err) throw err;
    if (!res) {
      //Ürün bulunamadıysa hata mesajı gönder
      message.channel.send("Bu ürün bulunamadı. Lütfen geçerli bir ürün adı girin.");
      return;
    }
    //Kullanıcının bakiyesini kontrol et
if (res.price > res.balance) {
    message.channel.send("Satın almak istediğiniz ürünün fiyatı cüzdanınızdaki miktardan daha fazla. Lütfen daha az bir ürün seçin veya cüzdanınızı doldurun.");
    return;
    }
    
    //Kullanıcıya gönderim adresi sor
    message.channel.send("Lütfen gönderim adresinizi girin.").then(() => {
    message.channel.awaitMessages(response => response.author.id === message.author.id, {
    max: 1,
    time: 60000,
    errors: ['time']
    }).then((collected) => {
    //Kullanıcının gönderim adresini al
    const address = collected.first().content;
    //Ürün satın alındıktan sonra kullanıcıya bilgi mesajı gönder
    message.author.send(`Satın aldığınız ürün: ${item}\nGönderim adresi: ${address}`);
        //Kullanıcının bakiyesini güncelle
        db.collection("users").updateOne({ userId: message.author.id }, { $inc: { balance: -res.price } }, (err, res) => {
            if (err) throw err;
        });
    
        //Log kanalına satın alım bilgilerini kaydet
        const logChannel = message.guild.channels.cache.find(channel => channel.name === "logs");
        if (!logChannel) {
            message.channel.send("Log kanalı bulunamadı.");
            return;
            }
            const purchaseEmbed = new Discord.MessageEmbed()
            .setTitle("Satın Alma")
            .addField("Kullanıcı", message.author.username)
            .addField("Ürün", item)
            .addField("Fiyat", res.price + "₺")
            .addField("Gönderim Adresi", address)
            .setColor("#f1c40f")
            .setTimestamp();
            logChannel.send(purchaseEmbed);
            
            // Log kanalındaki yetkililere teslimat yapılıp yapılmadığını sor
            logChannel.send("Teslimat yapıldı mı? (Evet için :white_check_mark: , Hayır için :x:)").then(sentMessage => {
            sentMessage.react("✅");
            sentMessage.react("❌");
            
            // Filtre oluştur
            const filter = (reaction, user) => {
            return (reaction.emoji.name === "✅" || reaction.emoji.name === "❌") && user.id === message.author.id;
            };
            
            // Kullanıcının tepkisini bekle
            sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "✅") {
            // Teslimat yapıldıysa, alıcıya bilgi mesajı gönder
            message.author.send(`Teslimat yapıldı. Ürün: ${item}`);
} else if (reaction.emoji.name === "❌") {
// Teslimat yapılmadıysa, alıcıya bilgi mesajı gönder
message.author.send(`Teslimat yapılmadı. Lütfen daha sonra tekrar deneyin. Ürün: ${item}`);
}
});
});
});
});
})
})
});
}