const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");

module.exports = class Pay extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "pay";
    this.category = "Economy";
    this.description = "Comando para pegar seus coins diário";
    this.usage = "pay <user> <value>";
    this.aliases = [];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
      User.findOne({ idU: message.author.id }, async (err, sender) => {
        if(err) throw err;

        let receiver = this.client.users.cache.get(args[0]) || message.mentions.users.first();
        if(!receiver || receiver.id == message.author.id) return message.channel.send("Escolha um usuario valido");

        User.findOne({ idU: receiver.id }, async (e, receiver) => {
          if(e) throw e;
          const sendedValue = Number(args[1]);
          
          if(sender.bank >= sendedValue) {
            sender.bank = sender.bank - sendedValue;
            receiver.bank = receiver.bank + sendedValue;
            await receiver.save()
            await sender.save()
            message.channel.send("Troca feita com sucesso");
          } else {
            message.channel.send("Você não possui essa quantia");
          }

        })
      })
      return
    }
}