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
    if (!args.length)
      return message.channel.send('You didn\'t provide any arguments');
    if (isNaN(args)) {
      return message.channel.send('That doesn\'t seem to be a valid number.');
    }
    if (args <= 0 || args > 50) {
      return message.channel.send('You need to input number between 1 to 50');
    }
    message.channel.send('Getting news');
    axios.request(news_list).then((response) => {
      const $ = cheerio.load(response.data);
      let news = [];
      console.log($('.date').length)
      $('.date').each((i, elm) => {
        news.push({
          date: $(elm).text().trim(),
          category: $(elm).next().text().trim(),
          name: $(elm).next().next().text().trim(),
          link: base_url + $(elm).next().next().children().attr('href'),
        });
        console.log("my i is" + i);
      });
      return(news);
    })
    .then((news) => {
      message.channel.send(news[0].date + '\n' + news[0].category
        + '\n' + news[0].name + '\n' + news[0].link);
    });
  },
};
/*
/html/body/div/div/div/div[2]/div[2]
/html/body/div/div/div/div[2]/div[2]/ul/li[1]
*/