const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const moment = require("moment");
require("moment-duration-format");

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

      .setAuthor(`Minhas Informações`, this.client.user.displayAvatarURL())
      .addFields(
        {
          name: "Meu Dono",
          value: `**${owner.tag}** || **[${owner.username}](https://youtube.com/c/tdroid20youtuber)**`,
        },
        {
          name: `Informações Principais`,
          value: `Usuários do Bot: **${users.toLocaleString()}**\nServidores do Bot: **${servers.toLocaleString()}**\nTotal de Comandos: **${commands}**\nTempo Online: **\`${uptime}\`**`,
        },
        {
          name: `Mais Informações`,
          value: `Ping do Bot: **${ping}**\nPing da DataBase: **${pingDB}**\nTotal de Memória sendo Usado: **${memory}**\nVersão do Node: **${version}**\nVersão do bot: 0.0.1beta`,
        },
        {
          name: `Meus Links`,
          value: `[Meu Convite](https://discord.com/oauth2/authorize?client_id=821548564421148692&scope=bot&permissions=2147483647)\n[Servidor de Suporte](https://discord.gg/rtUw5sM58J)\n[servidor parceiro](https://discord.gg/QMFEcFEcn4)`,
        }
      )
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    message.channel.send(EMBED);
  }
};
