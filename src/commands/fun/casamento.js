const ClientEmbed = require("../../structures/ClientEmbed");
const Command = require("../../structures/Command");
const Discord = require('discord.js')
const fetch = require('node-fetch');

module.exports = class Command {
  constructor(client) {
    this.client = client;

    this.name = "casamento";
    this.category = "Fun";
    this.description = "Comando exibir informaçoẽs sobre o casamento";
    this.usage = "wedding <user>";
    this.aliases = ["wedding", "marryinfo", "mi"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() 

	if(!user) return message.channel.send(`${message.author} ué! voce não pode beijar a si mesmo, por favor mencione um usuario para beijarr.`)


	console.log('tivemos um novo casamento')
  }
};
