const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586", "826287242154606604"]
const discord = require('discord.js')
const client = new discord.Client()

module.exports = class Badges extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "badges";
    this.category = "Owner bot";
    this.description = "Comando para editas as insigneas de um usuario";
    this.usage = "badges <add/remove> <badges> <@user>";
    this.aliases = ["insignea", "bg"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
      if(!owners.some(e => e == message.author.id)) return;
      const usuarioAlvo = this.client.users.cache.get(args[2]) || message.mentions.users.first() || message.author;

      if(args[0] == "add") {
        User.findOne({ idU: usuarioAlvo.id }, async (e, res) => {
          if(!res.badges) res.badges = [];
          res.badges.push(args[1]);
          await res.save()
        })
				if(args[1] == "verify") {
					
//========================// mensagem no canal //========================//
        	const canal = client.channels.cache.get('832439376205971476')
					const chl = await new discord.MessageEmbed()
						
						.setColor('#35FF00')
						.setTitle('temos um novo influencer verificado!')
						.setDescription(`${usuarioAlvo} acaba de se tornar um usuario verificado! seja bem vindo a nossa equipe de frames verificados, espero que goste!`)
						.addFields(
							{
								name: `<:verifyHf:832451009849589800>influencer:`,
								value: `**${usuarioAlvo.tag}**`, inline: true
							},
							)
						.setThumbnail(usuarioAlvo.displayAvatarURL({ dynamic: true }))
						.setFooter(`Tdroid2.0#1542┃Droid tech company oficial`)
						.setTimestamp()
//enviando

					 message.channel.send(chl)
//========================// mensagem na dm //========================//

         
						const dms = await new discord.MessageEmbed()
					  .setAuthor(`aviso para ${usuarioAlvo.tag}`,usuarioAlvo.displayAvatarURL({ format: "jpg", size: 2048 }))	
						.setTitle(`<:infoHf:832115931480195094> aviso!`)
						.setColor('#35FF00')
						.setDescription(`olá **${usuarioAlvo.tag}**! e com enorme prazer que vem dizer que **${message.author.tag}** te deu a insigna de usuario verificado  no bot(eu). agora voce tem em seu perfil e no userinfo do bot a insigna de usuario verificado, parabéns é muito dificio de obter essa insigna e esse titulo!`)
						.addFields(
							{
								name: `<:staff:827404163126263808> enviada por`,
								value: ` ${message.author.tag}`,
								inline: true
							},
							{
								name: `<:verifyHf:832451009849589800> Entregue para`,
								value: `${usuarioAlvo}`, inline: true
							}
						)
						.addFields(
							{
								name: `bem como tudo tem um preço aqui tá`,
								value: 'voce recebeu essa insigna mais precisa mostrar que a merece! voce precisa ajudar divugando o bot em suas redes sociais, com isso estará me ajuda a crescer e com isso dando oportunidade para mais gente adquirí-la'
							}
						)
            .addFields(
            	{
            		name: `quer ver seu perfil?`,
            		value: `[➕┃então me adicione a seu server](https://discord.com/oauth2/authorize?client_id=821548564421148692&scope=bot&permissions=2147483647)\nou pode
[👑┃entrar no meu Servidor](https://discord.gg/NMv9a2dzHb)`
            	}
            	)
            .setThumbnail(this.client.user.displayAvatarURL({ format: "jpg", size: 2048 }))
						.setTimestamp();
						
						usuarioAlvo.send(dms)
				}
				
			const content = `badget \`${args[1]}\` foi adicionada com sucesso para ${usuarioAlvo}`;
				message.channel.send(content)

      } else if (args[0] == "remove") {
        User.findOne({ idU: usuarioAlvo.id }, async (e, res) => {
          if(!res.badges) res.badges = [];
          console.log(args)
          res.badges = res.badges.filter(item => item !== args[1])

          await res.save();
        })
        message.channel.send("user edited")
      }
  }
}  