const User = require("../../database/Schemas/User");
const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586"]

module.exports = class Test extends Command {

  constructor(client) {
    super(client);
    this.client = client;

    this.name = "test";
    this.category = "Owner bot";
    this.description = "";
    this.usage = "test";
    this.aliases = ["teste"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {

    if(!owners.some(e => e == message.author.id)) return;

    const usuarioAlvo = this.client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

    User.findOne({ idU: usuarioAlvo.id }, (error, user) => {
      const content = JSON.stringify(user, null, "\t");
      message.channel.send("```json\n"+content+"\n```") 
    })
  }

}