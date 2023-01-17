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
// Taglenen kullanıcının bilgilerini al
const taggedUser = message.mentions.users.first();
if (!taggedUser) {
    message.channel.send("Lütfen bakmak istediğiniz kullanıcının etiketini girin. Örnek: !cüzdanbak @kullanıcı");
    return;
}

// Kullanıcının cüzdan bilgilerini al
db.collection("users").findOne({ userId: taggedUser.id }, (err, res) => {
    if (err) throw err;
    if (!res) {
        message.channel.send("Bu kullanıcının cüzdanı bulunamadı.");
        return;
    }

    // Embed ile cüzdan bilgilerini göster
    const walletEmbed = new Discord.MessageEmbed()
        .setTitle("Cüzdan Bilgileri")
        .addField("Kullanıcı", taggedUser.username)
        .addField("Bakiye", res.balance + "₺")
        .setColor("#f1c40f");
    message.channel.send(walletEmbed);
});
});
};