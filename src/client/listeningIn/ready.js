const Guild = require("../../database/Schemas/Guild"),
  User = require("../../database/Schemas/User"),
  Commands = require("../../database/Schemas/Command");
module.exports = class {
  constructor(client) {
    this.client = client;
  
}
  async run() {
    this.client.database.users = User;
    this.client.database.guilds = Guild;
    this.client.database.commands = Commands;
    
const status = [
      {
        name: "h! | Droid tech Company",
      },
      {
        name: "h! | help para obter ajuda",
      },
      {
      	name: "digite h!perfil para criar seu perfil!"
			},
			{
      	name: "h! | me adicione e ajude bater 100 servidores"
			},
			{
				name: "h! | novo sistema de badgets!"
			},
			{
				name: "h! | lançamento atrasado por falhas"
			},
			{
				name: "h! | Meu site está sendo criado!"
			}
    ];
    setInterval(() => {
      var randomStatus = status[Math.floor(Math.random() * status.length)];
      this.client.user.setActivity(randomStatus.name);
    }, 10 * 1000);

    this.client.user.setStatus("idle");
  }
};
