const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready",() => {
   console.log("Practice");
});
var prefix = config.prefix;

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
 }

 if (message.content.startsWith("hola")) {
   message.channel.send("Hola Mayra");
 }

 if (message.content.startsWith(prefix + "a")) {
 let img = message.mentions.users.first()
 console.log(img);
 if (!img) {
     const embed = new Discord.RichEmbed()
     .setImage(`${message.author.AvatarURL}`)
     .setColor(0x66b3ff)
     .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
     message.channel.send({ embed });
  } else if (img.avatarURL === null) {
     const embed = new Discord.RichEmbed
     .setImage(`${message.author.defaultAvatarURL}`)
     .setColor(0x66b3ff)
     .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
     message.channel.send({ embed });
  } else {
     const embed = new Discord.RichEmbed()
     .setImage(`${img.avatarURL}`)
     .setColor(0x66b3ff)
     .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
     message.channel.send({ embed });
 };



const moment = require("moment");
require(`moment-duration-format`);

const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");


const embed = new Discord.RichEmbed()
  .setColor(0x66ff66)

  .setAuthor(`Bot info`, client.user.avatarURL)
  .addField(`Dueño`, `user#0000`, true)
  .addField(`Version`, `1.0.0`, true)
  .addField(`Libreria`, `Discord ^11.2.1 (js)`, true)

  .addField(`Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
  .addField(`Uptime`, `$(actividad)`, true)
  .addField(`Servidores`, `${client.guilds.size.toLocaleString()}`, true)

  .addField(`Usuarios`, `${client.users.size.toLocaleString()}`, true)
  .addField(`Canales`, `${client.channel.size.toLocaleString()}`, true)
  .addField(`Conexiones a voz`, `${client.voiceConnections.size}`, true)

  message.channel.send({ embed });

}});
client.login(config.token);
