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

    this.name = "dm";
    this.category = "Owner bot";
    this.description = "Comando para pedir para add o bot em servers";
    this.usage = "dm <alvo>";
    this.aliases = ["dm"];

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
    const Discord = require('discord.js')
    const client = new Discord.Client()

    //===============> Start Request DB <===============//

    const startDB = process.hrtime();
    await User.findOne({ idU: message.author.id }, async (err, user) => {
      const coins = user.coins;
    });

    //===============> Finish Request DB <===============//

    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    //===============> Finish <===============//
		const usuarioAlvo = this.client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;
    const EMBED = new ClientEmbed(author)

      .setAuthor(`🤝poderia me ajudar?`, this.client.user.displayAvatarURL())
			.setColor('#35FF00')
			.setTitle('Droid tech Company ┃ Highframe')
			.setDescription(`olá ${usuarioAlvo}! meu nome é highframe! sou uma bot oficial da empresa droid tech company, bem estou aqui para pedir seu apoio pois estou precisando ser convidado para 100 servidores para poder ganhar meu verificado assim mais pessoas se sintiram seguras para me adicionar em mais servidore.\n\n **<:donoHf:827985730168422440>oque sou?**\n> simples sou o primeiro bot(robo) influenciador do mundo na plataforma discord! eu tenho como objetivo chegar no top 10 bots mais usados! peço que me ajuda a atingir essa meta!\n\n<:comandos:827580381380476929>oque tenho de interessante?\n> bem da para constar que não e aquela novidade mais, um sistema de badges oficial, ou seja temos nossas proprias badges igual o discord, e como ele tenho insignas que irão se tornar raras como a **highframe event** que sera disponivel resgatar apenas ate o bot bater a meta de 100 guilds. entre outras\n\n<:protectBot:814898175046451200> ele ira derrubar meu server?\n> claro que não! meu objetivo e crescer e ajudar e entreter a todos, nunca faria nada tão baixo assim, e caso ache mais seguro pode entrar no meu servidor para testar meus comandos.\n\n bem era isso que tinha a dizer, muito obrigado por ler e peço que possa me ajudar.
			
			
			<:youtube:821222663670071316>te vejo nos videos e nois<:HighFrame:832094585786204170>`)
			.addFields(
				{
					name: `<:staff:827404163126263808>desenvolvedor`,
					value: `**${owner.tag}** || **[${owner.username}](https://youtube.com/c/tdroid20youtuber)**`, inline: true
				},
				{
					name: `<:ServerHF:827577620731920396>meta`,
					value: `\`${this.client.guilds.cache.size}/100\``, inline: true
				}
			)
			.addFields(
        {
          name: `Meus Links`,
          value: `[➕┃Meu Convite](https://discord.com/oauth2/authorize?client_id=821548564421148692&scope=bot&permissions=2147483647)\n[👑┃meu servidor](https://discord.gg/s3UqkTqMs3)\n[▶️┃meu canal](https://youtube.com/channel/UCcmUFs27t3qkgDIHg2NK6Zg)\n[📷┃meu Instagram](https://instagram.com/highframe_oficial?igshid=19ch0eg895bnh)`,
        }
      )
      .setImage("https://i.imgur.com/H3lhqmc.png")
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    usuarioAlvo.send(EMBED);
	}
};