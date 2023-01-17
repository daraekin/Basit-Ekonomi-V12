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
// Oluşturulacak cüzdan kullanıcısını al
const user = message.mentions.users.first();
if (!user) {
    message.channel.send("Lütfen cüzdan oluşturulacak kullanıcıyı etiketleyin. Örnek: !co @kullanıcı");
    return;
}

// Kullanıcının cüzdanı var mı kontrol et
db.collection("users").findOne({ userId: user.id }, (err, res) => {
    if (err) throw err;
    if (res) {
        const walletExistEmbed = new Discord.MessageEmbed()
        .setTitle("HATA: CÜZDAN ZATEN VAR")
        .setDescription(`${user.username} kullanıcısının cüzdanı zaten mevcut.`)
        .setColor("#e74c3c");
        message.channel.send(walletExistEmbed);
        return;
    }
    // Cüzdan oluştur
    db.collection("users").insertOne({ userId: user.id, balance: 0 }, (err, res) => {
        if (err) throw err;
        const walletCreateEmbed = new Discord.MessageEmbed()
        .setTitle("CÜZDAN OLUŞTURULDU")
        .setDescription(`${user.username} kullanıcısına cüzdan oluşturuldu.`)
        .setColor("#2ecc71");
        message.channel.send(walletCreateEmbed);
    });
});
});
}