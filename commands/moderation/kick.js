const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'kick',
    category: 'moderation',
    description: 'Kick a specified user',
    usage: "<User name | user id> <reason>",
    run: async(bot,message,args)=>{
        if(!args[0])return message.channel.send(`Please specify who you wish to kick! (Please give the User ID or Username)`)
        let user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user=>user.username==args[0])
        if(!user)return message.channel.send(`${message.member}, That user is not in the server! | Please try again!`)
        let reason = message.content.split(`!kick ${user.id} `)
        if(!args[1])return message.channel.send(`Please specify the reason! You cannot kick a person without a reason, can you?`)
        if(!reason) return message.channel.send(`Please specify the reason! You cannot kick a person without a reason, can you?`)
        if(!user.kickable)return message.channel.send(`You cannot kick this user, since they may have a higher role than you or you and the user have the same roles`)
        if(!message.member.permissions.has("KICK_MEMBERS"))return message.channel.send(`${message.member}, You do not have the KICK_MEMBERS permission on your roles! Please contact a administrator about this!`)
        user.kick(reason)
        const Embed = new MessageEmbed()
        .setTitle(`User has been KICKED!`)
        .setDescription(`You have kicked the user ${bot.users.cache.get(user.id).username} from this server`)
        .setColor(`YELLOW`)
        message.channel.send(Embed)
    }
}