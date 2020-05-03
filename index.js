const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const bot = new Client({
    disableEveryone: true
})
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const ms = require('ms')
const colors = require("./colors.json");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands");
const timeout = new Set();
["command"].forEach(handler=>{
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    bot.user.setActivity('the SASCRP Assets', { type: "WATCHING"})
    console.log(`Hello! ${bot.user.username} is now online!`)
})
bot.on('message', async message=>{
    if(message.author.bot) return; // Checks if user that is saying the message is a BOT
    if(!message.content.startsWith(prefix)) return; //Checks if the user running the command has entered the prefix or not
    if(!message.guild) return; // If this is a DM, Stop.
    if(!message.member) message.member = await message.guild.fetchMember(message); //Checks to find the user who initiated the command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 )return;
    const command = bot.commands.get(cmd)
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    if(command){
        if(command.timeout){
            if(timeout.has(`${message.author.id}${command.name}`)){
                return message.reply(`You can only use this command every ${ms(command.timeout)}!`)
            } else {
                timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() =>  {
                    timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        command.run(bot,message,args)
    }
})
bot.login(token)