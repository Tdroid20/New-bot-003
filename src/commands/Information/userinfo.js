const moment = require("moment");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const User = require("../../database/Schemas/User");
const Badges = require("../../utils/Badges");

const badges = [
  {
    id: "hfenvent",
    name: "Highframe Event",
    emote: "<:hf:827404073975414804>"
  },
  {
    id: "droid-tech",
    name: "Droid Tech",
    emote: "<:dtc:814899023684042782>"
  },
  {
    id: "developer",
    name: "Highframe Developer",
    emote: "<:staff:827404163126263808>"
  },
  {
    id: "helperhf",
    name: "Highframe Contributor",
    emote: "<:staffHelper:827543068134998017>"
  },
];

module.exports = class UserInfo extends Command {

  constructor(client) {
    super(client);
    this.client = client;

    this.name = "userinfo";
    this.category = "Information";
    this.description = "Comando para ver informações de algum usuário";
    this.usage = "userinfo <@user>";
    this.aliases = ["ui"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    moment.locale("pt-BR");

    try {
        const usuarioAlvo = this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.author;
        const membroAlvo = message.guild.member(usuarioAlvo.id);
        // const rolesAlvo = membroAlvo.roles.cache.filter()
        const device = this.device(usuarioAlvo);
        let presence = "Não está jogando nada";
        const joined = `${moment(membroAlvo.joinedAt).format("L")} (${moment(membroAlvo.joinedAt).startOf("day").fromNow()})`; 
        const created = `${moment(usuarioAlvo.createdAt).format("L")} (${moment(usuarioAlvo.createdAt).startOf("day").fromNow()})`;
    
        if(usuarioAlvo.presence.activities.length) {
            presence = usuarioAlvo.presence.activities.join(", ");
        }

        const query = await User.findOne({ idU: usuarioAlvo.id }).exec();

        const embed = new ClientEmbed(message.author)
            .setColor('#35FF00')
            .setAuthor(usuarioAlvo.username, usuarioAlvo.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Jogando", value: `\`\`\`diff\n- ${presence}\`\`\`` },
                { name: "Nome do Usuário", value: usuarioAlvo.tag, inline: true },
                {
                    name: "Nickname no Servidor",
                    value: !!membroAlvo.nickname ? membroAlvo.nickname : "Nenhum Nickname",
                    inline: true,
                },
                { name: "ID do Usuário", value: usuarioAlvo.id },
                { name: "Conta Criada", value: created, inline: true },
    
                { name: "Entrada no Servidor", value: joined, inline: true },
                {
                    name: "Dispositivo",
                    value: String(device).replace("null", "Nenhum"),
                },
            )
            .setThumbnail(usuarioAlvo.displayAvatarURL({ dynamic: true }));

            message.quote(embed)
    } catch (e) {
        console.log(e)
        const content = e.message || e || "Un unknown error";
        message.quote("Error: "+content);
    }
  }

  device(user) {
    if (!user.presence.clientStatus) return null;
    const devices = Object.keys(user.presence.clientStatus);

    let deviceList = devices.map((x) => {
        switch(x) {
            case "desktop": 
                return "Computador" 
            case "mobile":
                return "Celular"
            default:
                return "Bot"
        }
    });

    return deviceList.join(" - ");
  }
};
