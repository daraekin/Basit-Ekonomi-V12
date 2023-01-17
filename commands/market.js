/*
const Discord = require("discord.js")
exports.run = (message, args, db) => {
    const user = message.author;

    if(args[0] === "list"){
        db.collection("kmarket").find({}).toArray((err, res) => {
        if (err) throw err;
        if (res.length === 0) {
            message.channel.send("Markette hiç ürün yok.");
        } else {
            let marketEmbed = new Discord.MessageEmbed()
            .setTitle("Market")
            .setColor("#0099ff");
            res.forEach(function(item) {
                marketEmbed.addField(`Ürün Adı: ${item.name}`, `Açıklama: ${item.description}\n Fiyat: ${item.price}`)
            });
            message.channel.send(marketEmbed);
        }
    });
    }else if(args[0] === "ekle"){
        let name = args[1];
        let description = args[2];
        let price = args[3];
        let user = message.author;

        if (!name) {
            message.channel.send("Lütfen bir ürün adı belirtin.");
            return;
        }

        if (!description) {
            message.channel.send("Lütfen bir ürün açıklaması belirtin.");
            return;
        }

        if (!price) {
            message.channel.send("Lütfen bir fiyat belirtin.");
            return;
        }
        db.collection("kmarket").insertOne({ name: name, description: description, price: price, seller: user.username}, function(err, res) {
            if (err) throw err;
            message.channel.send(`${name} ürünü eklendi.`);
        });
    }
    else if(args[0] === "sil"){
        let name = args[1];
        db.collection("kmarket").deleteOne({name : name}, function(err, obj) {
            if (err) throw err;
            message.channel.send(`${name} ürünü sildi.`);
        });
    }
};
*/