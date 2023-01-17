const Discord = require("discord.js")

exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Komutlar")
        .setColor("#0099ff")
        .addField("!cüzdan", "Kullanıcının bakiyesini gösterir.")
        .addField("!transfer @kullanıcı miktar", "Kullanıcının başka bir kullanıcıya para transferi yapmasını sağlar.")
        .addField("!paraekle @kullanıcı miktar", "Yetkili bir kullanıcının diğer bir kullanıcıya bakiye eklemesini sağlar.")
        .addField("!kmarket", "Marketteki ürünlerin listesini gösterir.")
        .addField("!satınal ürünadı", "Marketteki ürünleri satın almanızı sağlar.")
        .addField("!ürünekle ürünadı ürünaçıklaması fiyat", "Kullanıcıların markete ürün eklemesini sağlar.")
        .addField("!top", "En fazla parası olan 10 kişiyi sıralar.")
        .addField("!rulet bet", "Kullanıcının belirttiği bet tutarını kullanarak rulet oyunu oynatır.")
        .addField("!coinflip bet", "Kullanıcının belirttiği bet tutarını kullanarak coinflip oyunu oynatır.")
        .addField("!cüzdanbak @kullanıcı", "Kullanıcının cüzdanına bakmanızı sağlar.")
        .addField("!çek", "Ödüllü çekiliş yapmak için kullanılır.")
        .addField("!co @kullanıcı", "Başka bir kullanıcıya cüzdan oluşturmanızı sağlar.")
        .setFooter("Herhangi bir sorunuz varsa lütfen bize ulaşın!");
        message.channel.send(helpEmbed);
    });
        }