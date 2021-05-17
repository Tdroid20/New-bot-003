const Discord = require('discord.js');
const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
module.exports = class Command {
  constructor(client) {
    this.client = client;

    this.name = "Invite";
    this.category = "Miscellaneuos";
    this.description = "adicione o bot em seu servidor com esse comando";
    this.usage = "invite";
    this.aliases = ["convidar", "adicionar", "add"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run(client, message, args) {
      const users = this.client.users.cache.size;
      const servers = this.client.guilds.cache.size;
      const embed1 = new Discord.MessageEmbed()
    .setTitle(`<:meadd:835406871674224660> | me adicione`)
    .setColor('#35ff00')
    .setDescription(`olá me ajude a bater a meta de ${this.client.guilds.cache.size}/100 clicando [aqui](https://discord.com/oauth2/authorize?client_id=821548564421148692&scope=bot&permissions=2147483647) e adicionando em seu server`)
    .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    const msg = await message.channel.send(embed1);
  }
};