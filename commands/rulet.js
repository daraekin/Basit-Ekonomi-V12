const Discord = require("discord.js");
exports.run = (message, args, db) => {
    db.collection("bannedUsers").findOne({ userId: message.author.id }, (err, res) => {
        if (err) throw err;
        if (res) return message.reply("Bu bot hizmetlerinden banlandınız.");
        // komutun geri kalan kısmı

//Kullanıcının yatırdığı miktarı al
const bet = parseInt(args[0]);
if (!bet) {
message.channel.send("Lütfen yatırmak istediğiniz miktarı girin. Örnek: !rulet 100");
return;
}
//Kullanıcının emojiye tıklamasını bekle
const filter = (reaction, user) => {
return reaction.emoji.name === '🎲' && user.id === message.author.id;
};
message.channel.send("Çarkı döndürmek için 🎲 emojiye tıklayın.").then(sentMessage => {
sentMessage.react('🎲');
sentMessage.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
.then(collected => {
//Kullanıcının tıkladığı emojiye göre oyunu başlat
const reaction = collected.first();
if (reaction.emoji.name === '🎲') {
//Botun kazanma şansını %25 arttır
let winChance = Math.random();
winChance += 0.25;
if (winChance > 1) {
winChance = 1;
}
//Kullanıcının cüzdanından miktarı çek
db.collection("users").findOne({ userId: message.author.id }, (err, res) => {
if (err) throw err;
if (!res) {
    //Kullanıcının cüzdanı yoksa hata mesajı gönder
message.channel.send("Bu kullanıcının cüzdanı bulunamadı. Lütfen !cüzdan komutu ile cüzdanınızı oluşturunuz.");
} else {
//Kullanıcının bakiyesini kontrol et
if (res.balance < bet) {
message.channel.send("Yatırmak istediğiniz miktar cüzdanınızdaki miktardan daha fazla. Lütfen daha az bir miktar yatırın.");
return;
} else {
//Kullanıcının ve botun rastgele sayısını belirle
const userNumber = Math.floor(Math.random() * 37);
const botNumber = Math.floor(Math.random() * 37);

//Kazananı belirle
let winner;
if (userNumber > botNumber) {
winner = message.author.username;
} else if (botNumber > userNumber) {
winner = "Bot";
} else {
winner = "Berabere";
}

//Embed oluştur
const embed = new Discord.MessageEmbed()
.setTitle("Rulet")
.addField(`"Kullanıcı'nın Sayısı: ${userNumber}`, true)
.addField(`Bot'un Sayısı: ${botNumber}`, true)
.addField("Kazanan", winner)
.setColor("#f1c40f")
.setTimestamp()
.setFooter("Rulet oyunu", message.author.displayAvatarURL());

//Kazananı belirle ve miktarı ekle/çek
if (winner === "Berabere") {
//Berabere olduğu için para işlemi yapma
message.channel.send(embed);
} else if (winner === message.author.username) {
//Kullanıcı kazandığı için para ekle
db.collection("users").updateOne({ userId: message.author.id }, { $inc: { balance: bet } }, (err, res) => {
if (err) throw err;
message.channel.send(embed);
});
} else {
//Bot kazandığı için para çek
db.collection("users").updateOne({ userId: message.author.id }, { $inc: { balance: -bet } }, (err, res) => {
if (err) throw err;
message.channel.send(embed);
});
}
}
}
});
}
})
.catch(() => {
message.channel.send("Rulet oyunu iptal edildi çünkü emojiye tıklanmadı.");
});
})
});
}