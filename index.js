const { Client, RichEmbed, voiceChannel, Emoji, TextChannel } = require('discord.js');
const client = new Client();
const governor = "535914685803790357";
const deputy_governor = "535915255625154561";
const speaker = "535914964251050015";
var status = 0;
var embname = '';
var embtext = '';
var embcolor = '';
var embstatus = 0;
var tempid = 0;
var tempid2 = 0;

client.on('ready', () => {
  console.log('Congress Bot by Franklin Mitchell loaded! Type "!cg-help" to start');
});


client.on('message', message => {
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]

  if(message.channel.id == "544306024056881166" && message.author.bot == false){
    let reform_text = message.content
    let reform_author = message.author
    message.reply(`ваша реформа была отправлена на рассмотрение. Ожидайте!`)
     .then(sentMessage =>{
       setTimeout(() => {
         sentMessage.delete()
         message.delete()
       }, 5000);
     })
     message.guild.channels.find(`id`, `544320519500070933`).send(`Предложил: ${reform_author}\nСуть реформы: ${reform_text}`)
     .then(sentMessage =>{
      sentMessage.react('✅')
        setTimeout(() => {
          sentMessage.react('❌')
        }, 500);
    })
  }

  if(message.channel.id == "545707704786878464" && message.author.bot == false){
    message.delete()
    if(cmd == "!embed" && embstatus == 0){
      message.reply("введите заголовок сообщения.")
        .then(sentMessage => {
          tempid = sentMessage.id
          embstatus = 1
        })
    }
    if(embstatus == 1){
      embname = message.content
      message.channel.messages.find(`id`, tempid).delete()
      message.reply("введите содержание сообщения.")
        .then(sentMessage => {
          tempid = sentMessage.id
          embstatus = 2
        })
    }
    if(embstatus == 2){
      embtext = message.content
      message.channel.messages.find(`id`, tempid).delete()
      message.reply("введите цвет боковой полоски.\nДоступные цвета:\nwhite - белый\nblack - черный\ngreen - зеленый\nred - красный\nyellow - желтый\nblue - синий")
        .then(sentMessage => {
          tempid = sentMessage.id
          embstatus = 3
        })
    }
    if(embstatus == 3){
      if(message.content == 'white'){
        embcolor = '0xFFFFFF'
      }else if(message.content == 'black'){
        embcolor = '0x000000'
      }else if(message.content == 'green'){
        embcolor = '0x009F02'
      }else if(message.content == 'red'){
        embcolor = '0xFF0000'
      }else if(message.content == 'yellow'){
        embcolor = '0xFFCB00'
      }else if(message.content == 'blue'){
        embcolor = '0x009FFF'
      }
      message.channel.messages.find(`id`, tempid).delete()
      let embed = new RichEmbed()
        .setAuthor(embname)
        .setDescription(embtext)
        .setColor(embcolor)
        .setFooter(`Congress Bot by Franklin Mitchell`)
      message.guild.channels.find(`id`, `534791311434448901`).send(embed)
      embstatus = 0
    }
  }  
  if (message.content == '!cg-start') {
    message.delete()
    if(status == 0 && message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name))){
      const embed = new RichEmbed()
        .setAuthor('Парламент', message.guild.iconURL)
        .setDescription('Заседание парламента началось!')
        .addField('Инициировал:', `${message.author}`, true)
        .setFooter(`Congress Bot by Franklin Mitchell`)
        .setColor(0x009F02)
        .setTimestamp(new Date())
      message.channel.send(embed);
      let users_to_move = message.guild.roles.find(role => role.name === "Голосующие").members;
      users_to_move = users_to_move.keyArray();
      users_to_move.forEach(function(item, i, users) {
        message.guild.member(item).setVoiceChannel('535914224765894659');
      });
      status = 1;
    }
  }

  if (message.content == '!cg-pause') {
    message.delete()
    if(status == 1 && message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name))){
      const embed = new RichEmbed()
      .setAuthor('Парламент', message.guild.iconURL)
      .setDescription('Заседание парламента остановлено!')
      .addField('Остановил:', `${message.author}`, true)
      .setFooter(`Congress Bot by Franklin Mitchell`)
      .setColor(0xFFCB00)
      .setTimestamp(new Date())
      message.channel.send(embed);
      let users_to_move = message.guild.roles.find(role => role.name === "Голосующие").members;
      users_to_move = users_to_move.keyArray();
      users_to_move.forEach(function(item, i, users) {
        message.guild.member(item).setVoiceChannel('535914254981922828');
      });
      status = 2;
    }
  }

  if (message.content == '!cg-stop') {
    message.delete();
    if(status == 1 && message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name))){
      const embed = new RichEmbed()
        .setAuthor('Парламент', message.guild.iconURL)
        .setDescription('Заседание парламента окончено!')
        .addField('Окончил:', `${message.author}`, true)
        .setFooter(`Congress Bot by Franklin Mitchell`)
        .setColor(0xFF0000)
        .setTimestamp(new Date())
      message.channel.send(embed);
      let users_to_move = message.guild.roles.find(role => role.name === "Голосующие").members;
      users_to_move = users_to_move.keyArray();
      users_to_move.forEach(function(item, i, users) {
        message.guild.member(item).setVoiceChannel('535914108068036618');
      });
      status = 0;
    }
  }

  if (message.content == '!cg-resume') {
    message.delete()
    if(status == 2 && message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name))){
      const embed = new RichEmbed()
        .setAuthor('Парламент', message.guild.iconURL)
        .setDescription('Заседание парламента возобновлено!')
        .addField('Возобновил:', `${message.author}`, true)
        .setFooter(`Congress Bot by Franklin Mitchell`)
        .setColor(0x009FFF)
        .setTimestamp(new Date())
      message.channel.send(embed);
      let users_to_move = message.guild.roles.find(role => role.name === "Голосующие").members;
      users_to_move = users_to_move.keyArray();
      users_to_move.forEach(function(item, i, users) {
        message.guild.member(item).setVoiceChannel('535914224765894659');
      });
      status = 1;
    }
  }
  if (cmd == "!cg-vote"){
    message.delete()
    let name = messageArray.slice(1).join(" ")
    console.log(name)
    if(status == 1 && message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name)) && name){
      const embed = new RichEmbed()
        .setAuthor('Парламент', message.guild.iconURL)
        .setDescription('Голосование началось!')
        .addField('Название:', name)
        .addField('Запустил:', `${message.author}`)
        .setFooter(`Congress Bot by Franklin Mitchell`)
        .setTimestamp(new Date())
      message.channel.send(embed)
        .then(sentMessage => {
          sentMessage.react('✅')
          setTimeout(() => {
            sentMessage.react('❌')
          }, 500);
          setTimeout(() => {
            let positive = sentMessage.reactions.first().count - 1
            let negative = sentMessage.reactions.last().count - 1
            if(positive > negative){
              const embed = new RichEmbed()
                .setAuthor('Парламент', message.guild.iconURL)
                .setDescription('Голосование окончено!')
                .addField('Название:', name)
                .addField('Всего голосов:', `${positive + negative}`, true)
                .addField('Голосов "За":', `${positive}`, true)
                .addField('Голосов "Против":', `${negative}`, true)
                .addField('Результат:', `Принято!`, true)
                .setFooter(`Congress Bot by Franklin Mitchell`)
                .setTimestamp(new Date())
                .setColor(0x009F02)
              message.channel.send(embed)
              const embed2 = new RichEmbed()
                .setAuthor('Парламент', message.guild.iconURL)
                .addField('Название:', name)
                .addField('Запустил:', `${message.author}`)
                .addField('Всего голосов:', `${positive + negative}`, true)
                .addField('Голосов "За":', `${positive}`, true)
                .addField('Голосов "Против":', `${negative}`, true)
                .addField('Результат:', `Принято!`, true)
                .setFooter(`Congress Bot by Franklin Mitchell`)
                .setTimestamp(new Date())
                .setColor(0x009F02)
              message.guild.channels.find(`name`, `голосования`).send(embed2)
            }else{
              const embed = new RichEmbed()
                .setAuthor('Парламент', message.guild.iconURL)
                .setDescription('Голосование окончено!')
                .addField('Название:', name)
                .addField('Всего голосов:', `${positive + negative}`, true)
                .addField('Голосов "За":', `${positive}`, true)
                .addField('Голосов "Против":', `${negative}`, true)
                .addField('Результат:', `Не принято!`, true)
                .setFooter(`Congress Bot by Franklin Mitchell`)
                .setTimestamp(new Date())
                .setColor(0xFF0000)
              message.channel.send(embed)
              const embed2 = new RichEmbed()
                .setAuthor('Парламент', message.guild.iconURL)
                .addField('Название:', name)
                .addField('Запустил:', `${message.author}`)
                .addField('Всего голосов:', `${positive + negative}`,true)
                .addField('Голосов "За":', `${positive}`, true)
                .addField('Голосов "Против":', `${negative}`, true)
                .addField('Результат:', `Не принято!`, true)
                .setFooter(`Congress Bot by Franklin Mitchell`)
                .setTimestamp(new Date())
                .setColor(0xFF0000)
              message.guild.channels.find(`name`, `голосования`).send(embed2)
            }
          }, 20000);
        });
    }    
  }

  if(message.content == "!cg-help"){
    message.delete()
    if(message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор"].includes(r.name))){
      const embed = new RichEmbed()
        .setAuthor('Congress Bot FAQ')
        .addField('Начать заседание:', '!cg-start', true)
        .addField('Закончить заседание:', '!cg-stop', true)
        .addField('Остановить заседание:', '!cg-pause', true)
        .addField('Продолжить заседание:', '!cg-resume', true)
        .addField('Начать голосование:', '!cg-vote [название]', true)
        .addField('Помощь ( это окно ):', '!cg-help', true)
        .setFooter(`Congress Bot by Franklin Mitchell`)
        .setTimestamp(new Date())
        .setColor(0x009FFF)
      message.author.sendMessage(embed)  
    }
  }

  if(cmd == "!cg-flood"){
    message.delete()
    let count = messageArray[1];
    let text = messageArray.slice(2).join(" ");
    console.log(message.author.id)
    if(message.member.roles.some(r=>["Губернатор", "Вице-губернатор", "Сенатор", "Administrator"].includes(r.name))){
      for(let i = 0; i != count; i++){
        if(text == "@Franklin Mitchell"){
          message.author.sendMessage("Лох")
        }else{
          message.channel.send(text);
          setTimeout(() => { }, 1000);
        }
      }
    }
  }
});

client.on('messageReactionAdd', message => {
  if(message.message.channel.id == '544320519500070933'){
    let positive = message.message.reactions.first().count
    let negative = message.message.reactions.last().count
    let author = message.message.content.split(" ").slice(1)
    if(positive > 1){
      message.message.delete()
      message.message.guild.channels.find('id', '544351192550211595').send(`${message.message.content} \n Реформа допущена к голосованию.`)
    }else if(negative > 1){
      message.message.delete()
    }
  }
});
client.login('NTM2MDA1MDYwMDgyMTM5MTM3.D0ORtw.KJZYRt3Y9gVbBbQOlNfrcy590N4');