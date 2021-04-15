const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const moment = require("moment");
require("moment-duration-format");
const prefix = require("../../database/Schemas/Guild")

module.exports = class Botinfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ownerinfo";
    this.category = "Information";
    this.description = "Comando para olhar as informações do dono do bot.";
    this.usage = `${prefix}`;
    this.aliases = ["oinfo","o-info", "owner-info", "io"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
		const owner = await this.client.users.fetch(process.env.OWNER_ID);
		const EMBED = new ClientEmbed(author)

      .setTitle(`<:infoHf:832115931480195094>Informações do meu dono`)
			.setColor('#35FF00')
      .addFields(
        {
          name: "<:staff:827404163126263808>Meu criador é",
          value: `**${owner.tag}** || **[${owner.username}](https://youtube.com/c/tdroid20youtuber)**`,
					inline: true
        },
        {
          name: `informações basicas`,
          value: `hey eu sou o Tdroid!, sou o criador do bot Higframe,\nantes ja fiz outros bots para servidores.\neu fiz tambem 2bots publicos, o Highframe e o Droid bot que esta em atividade ate hoje, eu tenho meu canal de youtube que falo sobre tudo que acho que vale apena trazer.`
				},
        {
          name: `Meus Links`,
          value: `[▶️┃youtube](https://youtube.com/c/tdroid20youtuber)\n[📷┃instagram](https://www.instagram.com/tdroid2.0/?igshid=ijjucmonsf5a)\n[💰┃meu codigo do kwai](https://m.kwai.app/s/IctCE062?share_id=ANDROID_3e2ee1fc435bdfd6_1617394509576)\n[👑┃meu servidor](https://discord.gg/BB98HYPM8G)\n[▶️┃canal do meu amigo mercena](https://www.youtube.com/user/KoringaMultiplayer)`,
        }
      )
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    message.channel.send(EMBED);
	}
};
