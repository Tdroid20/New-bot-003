const ClientEmbed = require("../../structures/ClientEmbed");
const Command = require("../../structures/Command");
const Discord = require('discord.js')
const fetch = require('node-fetch');

module.exports = class Command {
  constructor(client) {
    this.client = client;

    this.name = "marry";
    this.category = "Fun";
    this.description = "Comando para casar com alguem";
    this.usage = "user <user>";
    this.aliases = ["casar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() 

	if(!user) return message.channel.send(`${message.author} ué! voce não pode beijar a si mesmo, por favor mencione um usuario para beijarr.`)

const body = await fetch('https://nekos.life/api/v2/img/kiss').then((res) => res.json());
	
	const EMBED = new Discord.MessageEmbed()
	.setTitle('💋kiss💋')
	.setImage(body.url)
	.setDescription(`${message.author} deu um Beijo no(a) ${user}`)
	.setColor('#35ff00')

	message.channel.send(EMBED)
	console.log('alguem usou o comando de kiss')
  }
};
