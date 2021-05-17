const Discord = require("discord.js");

module.exports = class ClientEmbed extends (
  Discord.MessageEmbed
) {
  constructor(user, data = {}) {
    super(data);
    this.setTimestamp();
    this.setColor("#35ff00");
    this.setFooter(
      `Droid Tech Company | Tdroid Programmer`,
      user.displayAvatarURL({ dynamic: true })
    );
  }
};
