const Discord = require("discord.js");
const client = new Discord.Client();
const MongoClient = require("mongodb").MongoClient;
const uri = "BURAYA SİZİN MONGODBNİZ";
const transferCommand = require("./commands/transfer.js");
//const marketCommand = require("./commands/market.js");
const paraekleCommand = require("./commands/paraekle.js");
const kmarketCommand = require("./commands/kmarket.js");
const satinalCommand = require("./commands/satinal.js");
const ürünekleCommand = require("./commands/ürünekle.js");
const topCommand = require("./commands/top.js");
const ruletCommand = require("./commands/rulet.js");
const coinflipCommand = require("./commands/coinflip.js");
const helpCommand = require("./commands/help.js");
const cüzdanCommand = require("./commands/cüzdan.js");
const cekCommand = require("./commands/çek.js");
const cüzdanbakCommand = require("./commands/cüzdanbak.js");
const coCommand = require("./commands/cüzdanoluştur.js");
const bbanCommand = require("./commands/botban.js");
//const hesapoluşturCommand = require("./commands/hesapoluştur.js");
var db;
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        db = client.db("database");
        console.log("Bağlantı başarılı!");
    })
    .catch(err => {
        console.log("Bağlantı hatası: " + err);
    });

client.on("ready", () => {
    console.log("Bot is ready!");
});

client.on("message", async message => {
    if (!message.content.startsWith("!") || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === "transfer") {
        transferCommand.run(message, args, db);
    }/* else if (command === "market") {
        marketCommand.run(message, args, db);
    }*/ else if (command === "paraekle") {
        paraekleCommand.run(message, args, db);
    } else if (command === "kmarket") {
        kmarketCommand.run(message, args, db);
    } else if (command === "satinal") {
        satinalCommand.run(message, args, db);
    } else if (command === "ürünekle") {
        ürünekleCommand.run(message, args, db);
    } else if (command === "top") {
        topCommand.run(client, message, args, db);
    } else if (command === "rulet") {
        ruletCommand.run(message, args, db);
    } else if (command === "coinflip") {
        coinflipCommand.run(message, args, db);
    } else if (command === "cüzdan") {
        cüzdanCommand.run(message, args, db);
    } else if (command === "help") {
        helpCommand.run(message, args, db);
    } else if (command === "çek") {
        cekCommand.run(client, message, args, db);
    } else if (command === "cüzdanbak") {
        cüzdanbakCommand.run(client, message, args, db);
    } else if (command === "co") {
        coCommand.run(client, message, args, db);
    } else if (command === "bban") {
        bbanCommand.run(client, message, args, db);
    }
    /*
    else if (command === "hesapoluştur") {
        hesapoluşturCommand.run(message, args, db);
    }*/
});
//Yorum satırına aldığım yerler eklediğim ama yerini farklı komutlarla doldurduğum komutlardır açmanız botta problemler oluşturabilir.
client.login("TOKEN");

