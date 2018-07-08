var fs = require("fs");
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  console.log(message.content);
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pong.');
  }
  else if (message.content === `${prefix}beep`) {
    message.channel.send('Boop.');
  }
  // Fix this fotmating later
  else if (message.content === `${prefix}serverinfo`) {
    message.channel.send(`Server name: ${message.guild.name}
      \nTotal members: ${message.guild.memberCount}
      \nCreated At: ${message.guild.createdAt}
      \nRegion: ${message.guild.region}`
    );
  }
  else if (message.content === `${prefix}user-info`) {
      message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
});

client.login(token);
