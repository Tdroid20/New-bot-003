const Discord = require("discord.js");
const moment = require("moment");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const a = '`'

module.exports = class ServerInfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "serverinfo";
    this.category = "Information";
    this.description = "Comando para ver informações sobre o servidor";
    this.usage = "serverinfo";
    this.aliases = ["si"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    moment.locale("pt-br");

    try {
      let boost =
        message.guild.premiumSubscriptionCount === 0
          ? `${a}Nenhum Boost${a}`
          : `${a}${message.guild.premiumSubscriptionCount} Boost(s) ( Level Server: ${message.guild.premiumTier} )${a}`;

      let channels = [
        `<:categoriaHf:827997727643664404>Categoria: ${a}${
          message.guild.channels.cache.filter((x) => x.type == "category").size
        }${a}`,
        `<:chatHf:827580474717241345>Texto: ${a}${
          message.guild.channels.cache.filter((x) => x.type == "text").size
        }${a}`,
        `<:vozHf:827995078798213140>Voz: ${a}${
          message.guild.channels.cache.filter((x) => x.type == "voice").size
        }${a}`,
      ].join("\n");

      const SERVERINFO = new ClientEmbed(author)
				.setColor('#35FF00')
        .setTitle(`<:infoHf:832115931480195094> informações de ${message.guild.name}`)
        .addFields(
          { 
						name: "<:Hfid:827974200086102016>ID do Servidor:",     value: `${a}${message.guild.id}${a}`,
					 inline: true,
					},
          {
            name: "<:donoHf:827985730168422440>Propietário:",
            value: `${a}${message.guild.owner.user.tag}${a}`,
            inline: true,
          },
          {
            name: "<:data:827597365984231444>Data de Criação:",
            value: `${a}${moment(message.guild.createdAt).format("L")} ( ${moment(
              message.guild.createdAt
            )
              .startOf("day")
              .fromNow()} )${a}`,
          },
          {
            name: "<:enterHf:827990216597307392>Data da minha Entrada:",
            value: `${a}${moment(
              message.guild.member(this.client.user.id).joinedAt
            ).format("L")} ( ${moment(
              message.guild.member(this.client.user.id).joinedAt
            )
              .startOf("day")
              .fromNow()} )${a}`,
            inline: true,
          },
          { name: "<:booster1:814938154192076850>Boosters", value: boost },
          {
            name: "<:usurioshf:827587802278920272>Total de Usuários:",
            value: `${a}${message.guild.memberCount.toLocaleString()}${a}`,
            inline: true,
          },
          {
            name: "<:botprefix:827607370598580244>Bots:",
            value: `${a}${message.guild.members.cache
              .filter((x) => x.user.bot)
              .size.toLocaleString()}${a}`,
            inline: true,
          },
          {
            name: `Total de Canais: ( **${message.guild.channels.cache.size}** )`,
            value: channels,
          }
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }));

      message.quote(SERVERINFO);
    } catch (err) {
      console.log(`ERRO NO COMANDO SERVERINFO\nERRO: ${err}`);
    }
  }
};
