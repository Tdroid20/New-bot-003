const { Client, Collection } = require("discord.js");
const klaw = require("klaw");
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Locale = require("../lib");
const Guild = require("./database/Schemas/Guild");
const Files = require("./utils/Files");
const c = require("colors");
const owner = process.env.OWNER_ID
const team = process.env.TEAM_ID
const Canvas = require('canvas');

// fim das constantes
class Main extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.database = new Collection();
  }

  login(token) {
    token = process.env.TOKEN;
    return super.login(token).then(async () => [await this.initLoaders()]);
  }

  load(commandPath, commandName) {
    const props = new (require(`${commandPath}/${commandName}`))(this);
    props.location = commandPath;
    if (props.init) {
      props.init(this);
    }
    this.commands.set(props.name, props);
    props.aliases.forEach((aliases) => {
      this.aliases.set(aliases, props.name);
    });
    return false;
  }

  async initLoaders() {
    return Files.requireDirectory("./src/loaders", (Loader) => {
      Loader.load(this).then(
        console.log(c.green("[Loaders] - Pasta Loaders carregada com sucesso."))
      );
    });
  }

  async getLanguage(firstGuild) {
    if (!firstGuild) return;
    const guild = await Guild.findOne({
      idS: !isNaN(firstGuild) ? firstGuild : firstGuild.id,
    });

    if (guild) {
      let lang = guild.lang;

      if (lang === undefined) {
        guild.lang = "pt-BR";
        guild.save();

        return "pt-BR";
      } else {
        return lang;
      }
    } else {
      await Guild.create({ idS: firstGuild.id });

      return "pt-BR";
    }
  }

  async getActualLocale() {
    return this.t;
  }

  async setActualLocale(locale) {
    this.t = locale;
  }

  async getTranslate(guild) {
    const language = await this.getLanguage(guild);

    const translate = new Locale("src/languages");

    const t = await translate.init({
      returnUndefined: false,
    });

    translate.setLang(language);

    return t;
  }
}

const dbIndex = require("./database/index.js");
const { resolve } = require("path");
dbIndex.start();

const client = new Main();

const onLoad = async () => {
  klaw("src/commands").on("data", (item) => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
    if (response) return;
  });

  const eventFiles = await readdir(`./src/client/listeningIn/`);
  eventFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    const event = new (require(`./client/listeningIn/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./client/listeningIn/${file}`)];
  });

  client.login();
};
client.on('ready', async () => {
	var channel = client.channels.cache.find(ch => ch.id === "825194102698016808");

  const user = await client.users.fetch("570700558533656586");

  console.log(user)
	
	console.log(c.yellow('conectando...'))
	console.log(c.yellow('verificando...'))
	console.log(c.yellow('aplicação da Droid tech company'))
	console.log(c.blue('verificado com sucesso'))
	console.log(c.blue('conectado'))
	console.log(c.blue('id do dono:', process.env.OWNER_ID))
  console.log(c.green(`bot: ${client.user.tag} on-line`));
});
 client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '「🎈」ʙem-ᴠɪɴᴅos');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./src/assents/img/jpeg/Welcome.jpeg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Texto um pouco menor colocado acima do nome de exibição do membro
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Bem vindo ao High Kingdom,', canvas.width / 2.5, canvas.height / 3.5);

	// Adicione um ponto de exclamação aqui e abaixo
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'HighFrame-highKingdomServer.png');

	channel.send(`Seja bem vindo ao High Kingdom, ${member}!`, attachment);
});
onLoad();

module.exports = {
  Util: require("./utils/index.js"),
};
