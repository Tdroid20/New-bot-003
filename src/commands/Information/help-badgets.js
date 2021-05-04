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
> essa insigna foi feita para o evento de 100guilds onde o proposito era chegar a 100guild, ela é facil de adiquirir basta apenas ${a}adicionar o bot a seu servidor e entrar no servidor de suporte e falar com o dono,${a} ${b}(o dono do server adiquiri a insigna automaticamente entao importante de que seja dono, caso não seja o dono entre no servidor de suporte e solicite sua badget)${b}

     <:dtc:814899023684042782> **Droid tech**
> essa insigna é entregue apenas para quem trabalha na droid tech company, então ela acaba se tornando rara pelo fato de que poucos aceitão fazer parte da equipe

			<:staff:827404163126263808> highframe developer
> essa é outra insigna rara que somente quem trabalha ou contribui no bot consegue ter ela em seu perfil do bot, ela tem atualmente 3 versoẽs, 

> <:staff:827404163126263808> verde: entregue a aqueles que trabalham no bot atualmente. 
> <:staffHelper:827543068134998017> amarela: entregue a aqueles que deram uma contribuiçao na criação do bot
> <:sthk:834970274814230539> ciano: entre a aqueles que sao satffs do server oficial do bot(high kingdom)
			<:Rehash:827404256473514035> Rehash
essa insigna e entrgue a aqueles a chegar ao level 18 dentro do server **REHASH**, entre no server da Rehash e alcance level 18 e resgate sua badget${b}(essa badget tera um prazo para resgatar, aproveite o mais rapido possivel)${b}  

digite ${prefix}bgi e veja suas badgets
quer dar sujestoẽs de badgets?, entre no nosso servidor de suporte!
			`)
			 .addFields({
				 name: "<:partnerHf:828114179117285377>partner highframe",
				 value: "essa badget e entregue aos parceiros da droid tech ou do highframe, para adiquirir basta entrar no servidor do bot e falar com o tdroid2.0."
			 })
			 .addFields({
				 name: `<:HighKingdom:828466041628786700> High Kingdom`,
				 value: `essa badget e adquirida a qeum esta no meu server! ela so pode ser pega se o usuario estiver no meu servidor.**Alerta se o usuario sai a badget e removida do perfil!**`
			 })
			 .addFields({
				 name: `<:suportinit:828053281158201384>suporte highframe`,
				 value: `essa badget e entregue a aqueles que ajudam o bot com donation e premium, todos que tem essa insigna em seu perfil hf ajudou o bot, ${b}alerta! essa insigna e por tempo de resgate limitado, mais quem adquiriu ela tera para sempre em seu perfil, se o usuario pedir reembolso ou algo do tipo ela sera removida.${b}`
			 })
			 .addFields({
				 name: "meu servidor:",
				 value: "[High Kingdom](https://discord.gg/ZBV2cEyyAb)",
				 inline: true
			 })
			 .addFields(
                  {
                    name: "**resgate sua badget do highframe event**",
                    value: `[meu servidor](https://discord.gg/s3UqkTqMs3)`
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
