const config = require("./config");
const { Client } = require("discord.js-selfbot-v13");
let tokens = config.tokens.filter(x => x.length > 0);

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(token, client) {

try {

    await client.login(token)
    return true;

} catch (error) {

    console.log("Invalid token: " + token)
    return false;

}

}

async function loginAllAndClickButton(channel_id, message_id, button_id, time, many) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!channel_id || !message_id || !button_id) return console.log("Missing arguments. (channel_id, message_id, button_id)");

    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(time)) time = 1;

    let result = 0;

await Promise.all(tokens.map(async(token, i) => {

    const client = new Client({ checkUpdate: false });
    if(await login(token, client) === false) return;

    client.on("ready", async() => {

        let channel = client.channels.resolve(channel_id);
        if(!channel) return console.log(`Channel not found. (${client.user.tag})`)

        let message = await channel.messages.fetch(message_id);
        if(!message) return console.log(`Message not found. (${client.user.tag})`)

        let row = message.components.find(x => x.type === "ACTION_ROW" && x.components[0].type === "BUTTON");
        if(!row) return console.log(`Row not found. (${client.user.tag})`)

        try {

        await wait(i * time * 1000);
        await message.clickButton({ row: message.components.indexOf(row), col: button_id })
        console.log(`${client.user.tag} clicked button.`)

        client.destroy();
        return result++;

        } catch (error) {
            return console.log(`Button not found. (${client.user.tag})`)
        }

    })

}))

await wait((tokens.length + 1) * time * 2000);
return console.log(`Total ${result} users clicked button.`)

}

async function loginAllAndReactEmoji(channel_id, message_id, emoji, time, many) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!channel_id || !message_id || !emoji) return console.log("Missing arguments. (channel_id, message_id, emoji)");

    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(time)) time = 1;

    let result = 0;

await Promise.all(tokens.map(async(token, i) => {

    const client = new Client({ checkUpdate: false });
    if(await login(token, client) === false) return;

    client.on("ready", async() => {

        let channel = client.channels.resolve(channel_id);
        if(!channel) return console.log(`Channel not found. (${client.user.tag})`)

        let message = await channel.messages.fetch(message_id);
        if(!message) return console.log(`Message not found. (${client.user.tag})`)

        try {

        await wait(i * time * 1000);
        await message.react(emoji)
        console.log(`${client.user.tag} reacted emoji.`)

        client.destroy();
        return result++;

        } catch (error) {
            return console.log(`Emoji not found. (${client.user.tag})`)
        }

    })

}))

await wait((tokens.length + 1) * time * 2000);
return console.log(`Total ${result} users reacted emoji.`)

}

async function loginAllAndSend(channel_id, message, time, many, many2) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!channel_id || !message) return console.log("Missing arguments. (channel_id, message)");

    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(many2)) many2 = 1;
    if(!Number(time)) time = 0;

    let result = 0;

await Promise.all(tokens.map(async(token, i) => {

    const client = new Client({ checkUpdate: false });
    if(await login(token, client) === false) return;

    client.on("ready", async() => {

        let channel = client.channels.resolve(channel_id) || await client.users.fetch(channel_id);
        if(!channel) return console.log(`Channel not found. (${client.user.tag})`)

        try {

        for (let i = 0; i < many2; i++) {
        await wait(i * time * 1000);
        await channel.send({ content: message });
        console.log(`${client.user.tag} sent message.`)
        }

        return result++;

        } catch (error) {
            return console.log(`Message not sent. (${client.user.tag})`)
        }

    })

}))

}

async function loginAllAndAddFriend(user_id, time, many) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!user_id) return console.log("Missing arguments. (user_id)");

    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(time)) time = 1;

    let result = 0;

await Promise.all(tokens.map(async(token, i) => {

    const client = new Client({ checkUpdate: false });
    if(await login(token, client) === false) return;

    client.on("ready", async() => {

        let user;
        try { user = await client.users.fetch(user_id) } catch { return console.log(`User not found. (${client.user.tag})`) }
        if(!user) return console.log(`User not found. (${client.user.tag})`)

        if(client.relationships.cache.get(user.id) === 1) return console.log(`User already added. (${client.user.tag})`)

        try {

        await wait(i * time * 1000);
        await user.sendFriendRequest()
        console.log(`${client.user.tag} added friend ${user.tag}.`)

        client.destroy();
        return result++;

        } catch { 
            return console.log(`User not added. (${client.user.tag})`)
        }

    })


}))

await wait((tokens.length + 1) * time * 2000);
return console.log(`Total ${result} users added friend.`)

}

async function loginAllAndJoinServer(invite, time, many) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!invite) return console.log("Missing arguments. (invite)");

    invite = invite.toLowerCase()
    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(time)) time = 1;

    let result = 0;

await Promise.all(tokens.map(async(token, i) => {

    const client = new Client({ checkUpdate: false, captchaService: "2captcha", captchaKey: "2captcha_api_key", captchaSolver: "2captcha" });
    if(await login(token, client) === false) return;

    client.on("ready", async() => {

        let inviteLink
        try { inviteLink = await client.fetchInvite(invite) } catch { return console.log(`Invite not found. (${client.user.tag})`) }
        if(!inviteLink || !inviteLink?.guild) return console.log(`Invite not found. (${client.user.tag})`)

        if(client.guilds.cache.get(inviteLink.guild.id)) return console.log(`User already joined the server. (${client.user.tag})`)

        try {

        await wait(i * time * 1000);
        await inviteLink.acceptInvite(true)
        console.log(`${client.user.tag} joined the server.`)
        
        client.destroy();
        return result++;

        } catch (error) {
            console.log(error) 
            return console.log(`User not joined the server. (${client.user.tag})`)
        }

    })

}))

await wait((tokens.length + 1) * time * 2000);
return console.log(`Total ${result} users joined the server.`)

}

async function sendDM(token, users, time) {

    if(!users) return console.log("Missing arguments. (users)");

    if(!Number(time)) time = 1;

    const client = new Client({ checkUpdate: false });
    if(await login(token, client) === false) return;

client.on("ready", async() => {

await Promise.all(users.map(async(user, i) => {

    try {
            
        await wait(i * time * 1000);
        await user.send(config.message)
        console.log(`${client.user.tag} sent message to ${user.tag}.`)
        return result++

    } catch {
        return console.log(`Failed to send message to ${user.tag}. (${client.user.tag})`)
    }

}))

})

}

async function distributeTokens(users, time, many) {

    if(!tokens.length > 0) return console.log("No tokens found.")

    if(!users) return console.log("Missing arguments. (users)");

    if(Number(many) && many !== 0) tokens = tokens.slice(0, many)
    if(!Number(time)) time = 1;

await Promise.all(tokens.map(async(token, i) => {

    i = i * config.maxUsers;

    let users_id = users.slice(i, i + config.maxUsers);
    await sendDM(token, users_id, time)

}))

}

module.exports = {
    loginAllAndClickButton,
    loginAllAndReactEmoji,
    loginAllAndSend,
    loginAllAndAddFriend,
    loginAllAndJoinServer,
    distributeTokens,
}