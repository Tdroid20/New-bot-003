const Command = require("../../structures/Command");
const owners = ["205884603246837762", "570700558533656586"]

module.exports = class Eval extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "eval";
    this.category = "Owner bot";
    this.description = "Comando para testar códigos";
    this.usage = "eval <código>";
    this.aliases = ["kickar"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    if(!owners.some(e => e == message.author.id)) return;
    if (!args[0]) return;

    let litchdelicia = args.join(" ");
    let litchtotoso = eval(litchdelicia);
    if (typeof litchtotoso !== "string")
      litchtotoso = require("util").inspect(litchtotoso, { depth: 0 });
    message.channel.send(
      `Entrada: \`\`\`js\n${litchdelicia}\`\`\`\n Saída: \`\`\`js\n${litchtotoso}\`\`\``
    );
  }
};
