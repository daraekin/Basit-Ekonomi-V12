/*
const Discord = require("discord.js");

exports.run = (message, args, db) => {
    const user = message.author;

    // Check if user already has an account
    db.collection("users").findOne({ userId: user.id }, (err, res) => {
        if (err) throw err;
        if (res) {
            message.channel.send("Bu kullanıcı zaten bir hesaba sahip.");
        } else {
            // Create new account with a balance of 0
            db.collection("users").insertOne({ userId: user.id, balance: 0 }, (err, res) => {
                if (err) throw err;
                message.channel.send("Hesabınız oluşturuldu. Bakiyeniz: 0");
            });
        }
    });
}
*/