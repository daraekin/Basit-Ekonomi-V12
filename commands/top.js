const Discord = require("discord.js");

exports.run = (client, message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

db.collection("users").find().sort({ balance: -1 }).limit(10).toArray((err, res) => {
if (err) throw err;
if (!res.length) {
message.channel.send("Kullanıcı bulunamadı.");
return;
}
const topEmbed = new Discord.MessageEmbed()
.setTitle("En Fazla Para Sahibi Kullanıcılar")
.setColor("#0099ff");
for (let i = 0; i < res.length; i++) {
const user = client.users.cache.get(res[i].userId);
if(!user){
topEmbed.addField(`#${i + 1}, Kullanıcı ID: <@${res[i].userId}> - Bakiyesi: ${res[i].balance}`);
}
else {
topEmbed.addField(`#${i + 1}, ${user.username} - Bakiyesi: ${res[i].balance}`);
}
}
message.channel.send(topEmbed);
});
});
};