const Command = require("../../structures/Command");
const User = require("../../database/Schemas/User");
const Discord = require('discord.js')
const prefix = require("../../database/Schemas/Guild")
const a = '`'
const b = '**'
module.exports = class Badgeinfo extends Command {
  constructor(client) {
    super(client)
    this.client = client;

    this.name = "help-badgets";
    this.category = "Information";
    this.description = "comando para informar todas as badgets";
    this.usage = `${prefix}help-badgets`;
    this.aliases = ["hbg", "hbadgets"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
		const EMBED = new Discord.MessageEmbed()

      
			.setTitle('badges oficiais do bot')
			.setColor('#2aff0d')
			.setDescription(`sim! como o discord eu tenho insignas especiais!, bem as insiginas sao um projeto que ainda está em desenvolvimento, se vc entende de canvas e js feito em classe entre no servdor de suporte e fale com meu criador
			
			**bem vamos lá**
			
		<:hf:827404073975414804> highframe event
> essa insigna foi feita para o envento de 100guilds onde o proposito era chegar a 100guild, ela é facil de adiquirir basta apenas ${a}adicionar o bot a seu servidor e entrar no servidor de suporte e falar con o dono,${a} ${b}(o dono do server adiquiri a insigna automaticamente entao importante de que seja dono, caso não seja o dono entre no servidor de suport e solicite sua badget)${b}

     <:dtc:814899023684042782> **Droid tech**
> essa insigna é dada apenas para quem trabalha na droid tech company, então ela acaba se tornando rara pelo fato de que poucos aceitão fazer parte da equipe

			<:staff:827404163126263808> highframe developer
> essa é outra insigna rara que somente quem trabalha ou contribuio no bot consegue ter ela em seu perfil do bot, ela tem atualmente 2 versoẽs, 

> <:staff:827404163126263808> verde: entregue a aqueles que trabalham no bot atualmente
> <:staffHelper:827543068134998017> amarela: entregue a aqueles que deram uma contribuiçao na criação do bot

			<:Rehash:827404256473514035> Rehash
essa insigna e entrgue a aqueles que chegar ao level 18 dentro do server **REHASH**, entre no server da Rehash e alcance level 18 e resgate sua badgat${b}(essa badget tera um prazo para resgatar, aproveite o mais rapido possivel)${b}
			
			<:suportinit:828053281158201384>suporte highframe
essa badget e entregue a aqueles que ajudam o bot com donats e premium, todos que tem essa insigna em seu perfil hf ajudou o bot, ${b}alerta! essa insigna e por tempo de resgate limitado, mais quem adquiriu ela tera para sempre em seu perfil, se o usuario pedir reembolso ou algo do tipo ela sera removida.${b}

digite ${prefix}bgi e veja suas badgets
quer dar sujestoẽs de badgets?, entre no nosso servidor de suporte!
			`)
			 .addFields(
                  {
                    name: "**resgate sua badget do highframe event**",
                    value: `[servidor de suport](https://discord.gg/f9NYEUev7V)`
                  }
                )
       .addFields(
                  {
                    name: "resgate sua badget do Rehash event",
                    value: `[servidor do Rehash](https://discord.gg/fymuBPdGDp)`
                  }
                )
		  .setFooter('Droid tech company oficial code')

    message.channel.send(EMBED);
	}
};
