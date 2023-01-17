const Discord = require("discord.js")
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    db.collection("kmarket").find({}).toArray((err, res) => {
        if (err) throw err;
        if (!res) {
            message.channel.send("Kullanıcılar tarafından eklenmiş ürün bulunamadı.");
            return;
        }
        const kmarketEmbed = new Discord.MessageEmbed()
            .setTitle("Kullanıcıların Eklediği Ürünler")
            .setColor("#0099ff");
        res.forEach(product => {
            kmarketEmbed.addField(product.name, `Teslimat süresi: ${product.description}\nFiyat: ${product.price}\nSatıcı: ${product.seller}`);
        });
        message.channel.send(kmarketEmbed);
    });
});
};
