const cheerio = require('cheerio');
const axios = require('axios');

const base_url = 'http://www.keyakizaka46.com';
const news_list = base_url + '/s/k46o/news/list';

module.exports = {
  name: 'news',
  description: 'Request news from official website',
  usage: '<news> <num>',
  cooldown: 5,
  execute(message, args) {
    if (!args.length) {
      return message.channel.send('You didn\'t provide any arguments');
    }
    if (isNaN(args)) {
      return message.channel.send('That doesn\'t seem to be a valid number.');
    }
    if (args <= 0 || args > 10) {
      return message.channel.send('You need to input number between 1 to 10');
    }
    message.channel.send('Getting news');
    axios.request(news_list).then((response) => {
      const $ = cheerio.load(response.data);
      let news = [];
      $('.date').each((i, elm) => {
        if (i >= args) {
          return(news)
        }
        news.push({
          date: $(elm).text().trim(),
          category: $(elm).next().text().trim(),
          name: $(elm).next().next().text().trim(),
          link: base_url + $(elm).next().next().children().attr('href'),
        });
      });
      return(news);
    })
    .then((news) => {
      news.forEach(function(data, i) {
        message.channel.send(data.date + '\t' + data.category
          + '\n' + data.name + '\n' + data.link);
      });
    });
  },
};
/*
/html/body/div/div/div/div[2]/div[2]
/html/body/div/div/div/div[2]/div[2]/ul/li[1]
*/
