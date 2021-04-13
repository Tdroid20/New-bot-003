const path = require("path");
require("dotenv").config();
                                  	

const express = require('express');
const app = express();
app.get('/', (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
	);
	response.sendFile(path.join(__dirname, "/src/dashboard/index.html"));
});
app.listen(process.env.PORT); //receber pings que deixa online

const { APIMessage, Message } = require("discord.js");

Message.prototype.quote = async function (content, options) {
  const message_reference = {
    message_id:
      (!!content && !options
        ? typeof content === "object" && content.messageID
        : options && options.messageID) || this.id,
    message_channel: this.channel.id,
  };

  const { data: parsed, files } = await APIMessage.create(
    this,
    content,
    options
  )
    .resolveData()
    .resolveFiles();

  this.client.api.channels[this.channel.id].messages.post({
    data: { ...parsed, message_reference },
    files,
  });
};



var Index = require("./src/index.js");

module.exports = Index;
 