const ClientEmbed = require("../../structures/ClientEmbed");
const Command = require("../../structures/Command");
const Discord = require('discord.js')
const fetch = require('node-fetch');

module.exports = class Command {
  constructor(client) {
    this.client = client;

    this.name = "hug";
    this.category = "Fun";
    this.description = "Comando para abraçar um usuario";
    this.usage = "hug <user>";
    this.aliases = ["abracar", "abraçar", "abraço"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() 

	if(!user) return message.channel.send(`${message.author} ué! voce não pode abrçar a si mesmo, por favor mencione um usuario para abraçar.`)

const body = await fetch('https://nekos.life/api/v2/img/hug').then((res) => res.json());
	
	const EMBED = new Discord.MessageEmbed()
	.setTitle('❤️Abraço❤️')
	.setImage(body.url)
	.setDescription(`${message.author} deu um abraço no(a) ${user}`)
	.setColor('#35ff00')

	message.channel.send(EMBED)
	console.log('alguem usou o comando de hug')
  }
};
