const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");

module.exports = class Marry extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "marry";
    this.category = "Fun";
    this.description = "Comando para casar.";
    this.usage = "marry <user>";
    this.aliases = ["casar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.users.first();

    const doc = await this.client.database.users.findOne({
      idU: message.author.id,
    });

    if (user.id === message.author.id)
      return message.channel.send(
        `${message.author}, ue! algo de errado não está certo, voce não pode se casar com si mesmo. por favor mencione ou ensira o id do seu par.`
      );

    if (doc.marry.has)
      return message.channel.send(`Isso é adutério! ${message.author}, você já está casado.`);

    if (!user)
      return message.channel.send(
        `${message.author}, você deve mencionar com quem deseja casar.`
      );

    const target = await this.client.database.users.findOne({ idU: user.id });

    if (target.marry.has)
      return message.channel.send(
        `${
          message.author
        }, o(a) membro(a) já está casado com o(a) **\`${await this.client.users
          .fetch(taraget.marry.user)
          .then((x) => x.tag)}\`**.`
      );

    message.channel
      .send(`${user}, você deseja se casar com o(a) ${message.author}?`)
      .then(async (msg) => {
        for (let emoji of [Emojis.Certo, Emojis.Errado]) await msg.react(emoji);

        msg
          .awaitReactions(
            (reaction, member) =>
              member.id === user.id &&
              [Emojis.Certo, Emojis.Errado].includes(reaction.emoji.name),
            { max: 1 }
          ) 
          .then(async (collected) => {
            if (collected.first().emoji.name === Emojis.Certo) {
              message.channel.send(
                `Temos um casamento! ${message.author}, o(a) aceitou seu pedido de casamento, parabéns.`
              );
							console.log('acabamos de ter um  casamento')

              await this.client.database.users.findOneAndUpdate(
                { idU: message.author.id },
                {
                  $set: {
                    "marry.user": user.id,
                    "marry.has": true,
                    "marry.time": Date.now(),
                  },
                }
              );
              await this.client.database.users.findOneAndUpdate(
                { idU: user.id },
                {
                  $set: {
                    "marry.user": message.author.id,
                    "marry.has": true,
                    "marry.time": Date.now(),
                  },
                }
              );

              return msg.delete();
            }

            if (collected.first().emoji.name === Emojis.Errado) {
              msg.delete();

              return message.channel.send(
                `parece que não haver casamento. ${user} o(a)  recusou seu pedido de casamento.`
              );
							console.log('opa olha a treta! ele(a) recusou o pedido🍿')
            }
          });
      });
  }
};