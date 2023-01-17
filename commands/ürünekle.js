const Discord = require("discord.js");

exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    if (args.length < 3) {
        message.channel.send("Lütfen ürün adı, açıklama ve fiyatı belirtin.");
        return;
    }

    let name = args[0];
    let description = args.slice(1, args.length - 1).join(" ");
    let price = parseInt(args[args.length - 1]);
    if (isNaN(price)) {
        message.channel.send("Lütfen geçerli bir fiyat belirtin.");
        return;
    }

    db.collection("kmarket").insertOne({ name: name, description: description, price: price, seller: message.author.username }, (err, res) => {
        if (err) throw err;
        message.channel.send(`${name} adlı ürün, ${description} açıklaması ve ${price} fiyatı ile kullanıcıların eklediği ürünler arasına eklendi.`);
    });
});
}
