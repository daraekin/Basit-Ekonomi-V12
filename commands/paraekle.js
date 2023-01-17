const Discord = require("discord.js");
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

//Komutu kullanan kişinin yetkisi var mı?
if (!message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send("Bu komutu kullanmak için yetkiniz yok.");
return;
}
//Hedef kullanıcıyı ve miktarı al
const target = message.mentions.users.first();
const amount = args[1];
if (!target || !amount) {
message.channel.send("Lütfen geçerli bir kullanıcı ve miktar girin. Örnek: !paraekle @kullanıcı 100");
return;
}
//Hedef kullanıcının cüzdanını bul
db.collection("users").findOne({ userId: target.id }, (err, res) => {
if (err) throw err;
if (!res) {
message.channel.send("Bu kullanıcının cüzdanı bulunamadı.");
return;
}
//Miktarı ekle
const newBalance = res.balance + parseInt(amount);
db.collection("users").updateOne({ userId: target.id }, { $set: { balance: newBalance } }, (err) => {
if (err) throw err;
//Embed oluştur ve gönder
const embed = new Discord.MessageEmbed()
.setTitle("Para Ekleme")
.setDescription(`${target.username} adlı kullanıcının hesabına ${amount} adet para eklendi.`)
.setColor("GREEN");
message.channel.send(embed);
});
});
});
};