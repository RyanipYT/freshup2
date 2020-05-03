const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'ping',
    category: 'info',
    description: 'Returns latency and API ping',
    timeout: 10000, //IN milliseconds (STOPS USER FROM SENDING COMMAND FOR A PERIOD OF TIME
    run: async(bot,message,args)=>{
        const msg = await message.channel.send('🏓 Testing your connection...')
        const embed = new MessageEmbed()
        .setTitle('🏓Here are your results!🏓')
        .setDescription(`\nServer Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}MS\nDiscord.API Latency is ${Math.round(bot.ws.ping)}MS\n`)
        .setColor('RANDOM')
        msg.edit(embed)
    }
}