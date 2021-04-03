
const Command = require("../../structures/Command");
const User = require("../../database/Schemas/User");
const Discord = require('discord.js')
const prefix = require("../../database/Schemas/Guild")

module.exports = class Badgeinfo extends Command {
  constructor(client) {
    super(client)
    this.client = client;

    this.name = "badgetsinfo";
    this.category = "Information";
    this.description = "comando para infor as badges oficial do bot";
    this.usage = `${prefix}badgesinfo`;
    this.aliases = ["bg-info", "bgi", "infobg"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {

    const usuarioAlvo = this.client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

		const EMBED = new Discord.MessageEmbed()

      .setAuthor(`insigneas de ${usuarioAlvo.tag}`)
			.setColor('#35FF00')
			.setTitle('badges oficiais do bot')
			.setDescription(``)
      .setThumbnail(
        usuarioAlvo.displayAvatarURL({ format: "jpg", size: 2048 })
      );

      await User.findOne({ idU: usuarioAlvo.id }, (e, res) => { 
        for(const element of res.badges) {
          console.log(element)
          EMBED.addField('Insignea', element)
        }
      })

    message.channel.send(EMBED);
	}
};
