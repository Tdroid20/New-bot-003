const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class SayEmbed extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "sayembed";
    this.category = "Moderation";
    this.description = "Comando para mandar uma mensagem pelo bot em embed";
    this.usage = "sayembed <contéudo>";
    this.aliases = ["say-embed", "s-embed", "say-e", "s-e"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `${message.author}, você precisa da permissão de gerenciar mensagens para executar este comando.`
      );

			const msg = args.join(" ")
			
const empyt = new ClientEmbed(author)
    .setTitle(`<:infoHf:832115931480195094> erro!`)
    .setDescription(`você não inseriu nenhuma mensagem, porfavor digite a mensagem que deseja que seja enviada em embed`)
    .setColor('#35ff00')
    if (!msg) 
      return message.channel.send(empyt);

    const EMBED = new ClientEmbed(author)
      .setDescription(msg)
			.setColor('#35ff00')
      .setFooter(
        `Mensagem Enviada por ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    message.channel.send(EMBED);
  }
};