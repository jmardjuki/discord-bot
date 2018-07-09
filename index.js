const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  console.log(message.content);
  // Return early if no prefix
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  }
  else if (command === 'kick') {
    // Early return if nobody is tagged
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL}`;
    });

      // send the entire array of strings as a message
      // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  }
  else if (command === 'prune') {
    // Bad fix, cause delete also add current
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    }
    else if (amount <= 1 || amount > 100) {
      return message.reply('you need to input a number between 1 and 99.');
    }
    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!');
    });

  }
  /*
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
  */
});

client.login(token);
