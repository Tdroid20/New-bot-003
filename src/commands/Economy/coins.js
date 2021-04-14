 const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const Utils = require("../../utils/Util");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Coins extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "coins";
    this.category = "Economy";
    this.description = "Comando para olhar seus coins/do usuário";
    this.usage = "coins <@user>";
    this.aliases = ["money"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const USER =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    User.findOne({ idU: USER.id }, async (err, user) => {
  
      if (message.author.id == process.env.OWNER_ID) {

        if(Number(args[1])) {
                if (args[0] == "add") {
          user.bank = user.bank + Number(args[1])
        } else if (args[0] == "remove") {
          user.bank = user.bank - Number(args[1])
        } else if (args[0] == "set") {
          user.bank = Number(args[1])
        }
        await user.save()
        } else {
          args[1] && message.channel.send("Valor invalido");
        }
        

      }

      let coins = user.coins;
      let bank = user.bank;

      const EMBED = new ClientEmbed(message.author)
        .setAuthor(
          `${USER.username} - Frames`,
          USER.displayAvatarURL({ dynamic: true })
        )
				.setColor('#35FF00')
        .addFields(
          {
            name: `${Emojis.Bank} Frames fora do Banco`,
            value: Utils.toAbbrev(coins),
          },

          {
            name: `${Emojis.Coins} Frames no Banco`,
            value: Utils.toAbbrev(bank),
          },
          {
            name: `${Emojis.Economy} Total`,
            value: Utils.toAbbrev(coins + bank),
          }
        )
        .setThumbnail(
          USER.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" })
        );

      message.quote(EMBED);
    });
  }
};
