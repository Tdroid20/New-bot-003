const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586", "826287242154606604"]
const discord = require('discord.js')
const client = new discord.Client()

module.exports = class Badges extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "verify";
    this.category = "Owner bot";
    this.description = "Comando para enviar status da verificação do usuario";
    this.usage = "badges <deliv/anali/confirm> <@user>";
    this.aliases = ["verify", "vy"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
      if(!owners.some(e => e == message.author.id)) return;
      const usuarioAlvo = this.client.users.cache.get(args[1]) || message.mentions.users.first() || message.author;
			
      if(args[0] == "deliv") {
					const delivms = new discord.MessageEmbed()
					.setAuthor(`atualização do pedido de verificação de ${usuarioAlvo}`, usuarioAlvo.displayAvatarURL({ format: "jpg", size: 2048}))
					.setTitle(`<:infoHf:832115931480195094>status da verificação`)
					.setDescription(`hey framer ${usuarioAlvo.tag}. seu pedido de verificação foi enviado com sucesso!`)
					.addFields({
						name: `<:staff:827404163126263808> recebido por:`,
						value: message.author.tag
					},
					)

					message.channel.send(delivms)
			}	
  }
}