const Discord = require("discord.js")
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    const user = message.author;
    const amount = parseInt(args[0]);
    const target = message.mentions.users.first();

    if (!target) {
        message.channel.send("Lütfen geçerli bir kullanıcı belirtin.");
        return;
    }

    if (!amount || isNaN(amount)) {
        message.channel.send("Lütfen geçerli bir miktar belirtin.");
        return;
    }

    db.collection("users").findOne({ userId: user.id }, (err, res) => {
        if (err) throw err;
        if (!res) {
            message.channel.send("Bu kullanıcının cüzdanı bulunamadı.");
            return;
        }

        if (amount > res.balance) {
            message.channel.send("Yetersiz bakiye.");
            return;
        }

        db.collection("users").updateOne({ userId: user.id }, { $inc: { balance: -amount } }, (err) => {
            if (err) throw err;
            message.channel.send(`${amount} para ${target.username}'a transfer edildi.`);
        });

        db.collection("users").updateOne({ userId: target.id }, { $inc: { balance: amount } }, (err) => {
            if (err) throw err;
        });
    });
});
}
