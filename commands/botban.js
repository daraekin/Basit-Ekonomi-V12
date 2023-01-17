const Discord = require("discord.js");

exports.run = (client, message, args, db) => {
    // Sadece bot sahibi komutu kullanabilir
    if (message.author.id !== "970748058482651157") return;

    // Banlamak istediğiniz kullanıcının ID'sini alın
    const userId = args[0];
    if (!userId) return message.reply("Lütfen banlamak istediğiniz kullanıcının ID'sini girin.");

    // Kullanıcıyı ban listesine ekleyin
    db.collection("bannedUsers").insertOne({ userId }, (err, res) => {
        if (err) throw err;
        message.reply(`<@${userId}> kullanıcısı banlandı.`);
    });
}
