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

    this.name = "botinfo";
    this.category = "Information";
    this.description = "Comando para olhar as informações do Bot.";
    this.usage = "botinfo";
    this.aliases = ["b-info"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    //===============> Imports <===============//

    const users = this.client.users.cache.size;
    const servers = this.client.guilds.cache.size;
    const commands = this.client.commands.size;
    const uptime = moment
      .duration(process.uptime() * 1000)
      .format("d[d] h[h] m[m] e s[s]");
    const memory =
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB";
    const ping = Math.ceil(this.client.ws.ping) + "ms";
    const version = process.version;
    const owner = await this.client.users.fetch(process.env.OWNER_ID);

    //===============> Start Request DB <===============//

    const startDB = process.hrtime();
    await User.findOne({ idU: message.author.id }, async (err, user) => {
      const coins = user.coins;
    });

    //===============> Finish Request DB <===============//

    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    //===============> Finish <===============//

    const EMBED = new ClientEmbed(author)

      .setAuthor(` ℹ️ Minhas Informações`, this.client.user.displayAvatarURL())
			.setColor('#35FF00')
			.setTitle('em atualização!')
      .addFields(
        {
          name: "<:staff:827404163126263808>Meu Dono",
          value: `**${owner.tag}** || **[${owner.username}](https://youtube.com/c/tdroid20youtuber)**`,
        },
        {
          name: `Informações Principais`,
          value: `<:usurioshf:827587802278920272>Usuários do Bot: **${users.toLocaleString()}**\n<:ServerHF:827577620731920396>Servidores do Bot: **${servers.toLocaleString()}**\n<:comandos:827580381380476929>Tenho **${commands}** Comandos\n:green_circle:Tempo Online: **\`${uptime}\`**\n<:dtc:814899023684042782>minha empresa:**Droid tech company**\n<:botprefix:827607370598580244>Meu prefixo nese servidor é **${prefix}**`,
        },
        {
          name: `Mais Informações`,
          value: `<:ping:827574921844490290>Ping do Bot: **${ping}**\n<:database:821262079578472448>Ping da DataBase: **${pingDB}**\n<:mongdb:827599308118556732>database: **mongdb**\n<:memriahf:827597215915704361>Total de Memória sendo Usado: **${memory}**\n<:node:827595789236437054>Versão do Node: **${version}**\n<:Hfversion:827586421140619276>Versão do bot: 0.0.5\n<:data:827597365984231444>Fui criado em: **17/03/2021**`,
        },
        {
          name: `Meus Links`,
          value: `[Meu Convite](https://discord.com/oauth2/authorize?client_id=821548564421148692&scope=bot&permissions=2147483647)\n[Servidor de Suporte](https://discord.gg/bVuYUBkmpU)\n[servidor parceiro](https://discord.gg/QMFEcFEcn4)`,
        }
      )
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    message.channel.send(EMBED);
	}
};
