const Discord = require("discord.js");
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    
//Kullanıcının cüzdanını kontrol et
db.collection("users").findOne({ userId: message.author.id }, (err, res) => {
if (err) throw err;
if (!res) {
//Cüzdan yoksa oluştur
db.collection("users").insertOne({ userId: message.author.id, balance: 0 }, (err, res) => {
if (err) throw err;
message.channel.send("Cüzdanınız oluşturuldu.");
});
} else {
//Cüzdan varsa miktarı göster
const embed = new Discord.MessageEmbed()
.setTitle("Cüzdan")
.setDescription("Cüzdandaki miktar: " + res.balance + "₺")
.setColor("BLUE")
.setFooter("💰", message.author.avatarURL());
message.channel.send(embed);
}
});
});
};