const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ban',
    category: 'moderation',
    description: 'ban a specified user',
    usage: "<User name | user id> <reason>",
    run: async(bot,message,args)=>{
        if(!args[0])return message.channel.send(`Please specify who you wish to ban! (Please give the User ID or Username)`)
        let user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user=>user.username==args[0])
        if(!user)return message.channel.send(`${message.member}, That user is not in the server! | Please try again!`)
        let reason = message.content.split(`!ban ${user.id} `)
        if(!args[1])return message.channel.send(`Please specify the reason! You cannot ban a person without a reason, can you?`)
        if(!reason) return message.channel.send(`Please specify the reason! You cannot ban a person without a reason, can you?`)
        //UNNEEDED | if(!user.bannable)return message.channel.send(`You cannot ban this user, since they may have a higher role than you or you and the user have the same roles`)
        if(!message.member.permissions.has("BAN_MEMBERS"))return message.channel.send(`${message.member}, You do not have the BAN_MEMBERS permission on your roles! Please contact a administrator about this!`)
        user.ban(reason)
        const Embed = new MessageEmbed()
        .setTitle(`User has been BANNED!`)
        .setDescription(`You have banned the user ${bot.users.cache.get(user.id).username} from this server`)
        .setColor(`RED`)
        message.channel.send(Embed)
    }
}