const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586"]

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
        message.channel.send("added")
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