// estou tentando fazer um sistema onde o usuario resgata a badget que so pode ser pega se ele entrar no server do bot, e se ele sair a badgete automaticamente removida

// Tem outra forma de fazer isso, se quiser logo eu mexo nisso.

const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");

module.exports = class Badges extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "claim-high-kingdom";
    this.category = "Owner bot";
    this.description = "Comando para reivindicar a insigna do server oficial do bot";
    this.aliases = ["resgatar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
      /*
			if (message.guild.id !== process.env.GUILD_ID) return;
         const usuarioAlvo = message.author;
		  else if (message.author.guild) return;
			message.channel.send(' e necessário estar no server da High Kingdom para resgatar essa badget!')
      if(args[0] == "hk") {
        User.findOne({ idU: usuarioAlvo.id }, async (e, res) => {
          if(!res.badges) res.badges = [hkbg];
          res.badges.push('hkbg');
          await res.save()
        })
        message.channel.send("badget resgatada com sucesso")
      } else if (guildMemberRemove  !== process.env.GUILD_ID) {
        User.findOne({ idU: usuarioAlvo.id }, async (e, res) => {
          if(!res.badges) res.badges = [];
          res.badges = res.badges.filter(item => item !== "hkbg")

          await res.save();
        })
        message.channel.send(`${message.author.tag} saiu do servidor e teve sua badget removida`)
        
      }
      */
  }
}  

// estou tentando fazer um sistema onde o usuario resgata a badget que so pode ser pega se ele entrar no server do bot, e se ele sair a badgete automaticamente removida