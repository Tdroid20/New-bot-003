const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586", "826287242154606604"]
const discord = require('discord.js')
const client = new discord.Client()

module.exports = class Badges extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "new verified user";
    this.category = "Owner bot";
    this.description = "Comando para declarar um novo influenciador";
    this.usage = "badges <influencer type> <social network> <@user>";
    this.aliases = ["nvu"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
      if(!owners.some(e => e == message.author.id)) return;
      
      let canal = "832439376205971476"
          
      const infType = args[0]
      const infLink = args[1]
      
      if(infType !== "youtube") return
					const embed = await new discord.MessageEmbed()
						
						.setColor('#35FF00')
						.setTitle('temos um novo influencer verificado!')
						.setDescription(`${usuarioAlvo} acaba de se tornar um usuario verificado! seja bem vindo a nossa equipe de frames verificados, espero que goste!`)
						.addFields(
							{
								name: `<:verifyHf:832451009849589800>influencer:`,
								value: `**${usuarioAlvo.tag}**`, inline: true
							},
							)
						.addFields({
						  name: `influenciador via:`,
						  value: infType
						})
						.setThumbnail(usuarioAlvo.displayAvatarURL({ dynamic: true }))
						.setFooter(`Tdroid2.0#1542┃Droid tech company oficial`)
						.setTimestamp()
//enviando

					 client.channels.cache.get(canal).send(embed);
  }					 
infType(user) {

    let infTypeList = devices.map((x) => {
        switch(x) {
            case "insta": 
                return "teste insta" 
            case "youtube":
                return "teste yt"
        }
    });

    return infTypeList.join(" ");
  }
}