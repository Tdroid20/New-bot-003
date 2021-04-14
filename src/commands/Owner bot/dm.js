const moment = require("moment");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const User = require("../../database/Schemas/User");
const Badges = require("../../utils/Badges");

module.exports = class UserInfo extends Command {

  constructor(client) {
    super(client);
    this.client = client;

    this.name = "dm";
    this.category = "Owner bot";
    this.description = "Comando para enviar na dm";
    this.usage = "";
    this.aliases = ["dm"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    moment.locale("pt-BR");

    try {
        const usuarioAlvo = message.guild.member(
					this.client.users.cache.get(args[0]) || message.mentions.user.first() || message.author);

        const membroAlvo = message.guild.member(usuarioAlvo.id);
        //const rolesAlvo = membroAlvo.roles.cache.filter()
        const device = this.device(usuarioAlvo);
        let presence = "Não está jogando nada";
        const joined = `${moment(membroAlvo.joinedAt).format("L")} (${moment(membroAlvo.joinedAt).startOf("day").fromNow()})`; 
        const created = `${moment(usuarioAlvo.createdAt).format("L")} (${moment(usuarioAlvo.createdAt).startOf("day").fromNow()})`;
    
        if(usuarioAlvo.presence.activities.length) {
            presence = usuarioAlvo.presence.activities.join(", ");
        }

        const query = await User.findOne({ idU: usuarioAlvo.id }).exec();
        let badges = ""
        
        for(const badge of query.badges) {
          for(const dbBadges of Badges) {
            if(dbBadges.id == badge) {
              badges = badges+`${dbBadges.emote} `;
            }
          }
        }
				
        const embed = new ClientEmbed(message.author)
            .setColor('#35FF00')
            .setAuthor(usuarioAlvo.username, usuarioAlvo.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Jogando", value: `\`\`\`diff\n- ${presence}\`\`\`` },
                { name: "<:UserHf:830534196904198177>Nome do Usuário", value: usuarioAlvo.tag, inline: true },
                {
                    name: "<:UserHf:830534196904198177>Nickname no Servidor",
                    value: !!membroAlvo.nickname ? membroAlvo.nickname : "Nenhum Nickname",
                    inline: true,
                },
                { name: "<:idHf:828052610208235550>ID do Usuário", value: usuarioAlvo.id },
                { name: "<:data:828052642651177021>Conta Criada", value: created, inline: true },    
                { name: "<:data:828052642651177021>Entrada no Servidor", value: joined, inline: true },
                {
                    name: ":mobile_phone:Dispositivo",
                    value: String(device).replace("null", "Nenhum"),
                },
            )
            badges ? embed.addField("Insigneas", badges, true) : "";

            message.createDM.send(embed)
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
                return "<:pcHf:830534126565064836>Computador" 
            case "mobile":
                return "<:mobHf:830534048271171594>Celular"
        }
    });

    return deviceList.join(" ");
  }
};