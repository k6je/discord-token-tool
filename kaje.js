const { Client } = require("discord.js-selfbot-v13");
const client = new Client({ checkUpdate: false });
const config = require("./Settings/config");
client.login(config.tokens[0])
const { loginAllAndClickButton, loginAllAndReactEmoji, loginAllAndSend, loginAllAndAddFriend, loginAllAndJoinServer, distributeTokens } = require("./Settings/functions");
const inquirer = require('inquirer');
const figlet = require('figlet');
figlet('Token Tools', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("Coded by : kaje#1000")
});


const choices = [
    {
        type: 'list',
        name: 'choice',
        message: 'What do you want to do?',
        choices: [
            'Click Button',
            'React to Message',
            'Send Message',
            'Add Friend',
            'Join Server',
            'Mass DM',
        ]
    }
];

const buttonClickerQuestions = [
    {
        type: 'input',
        name: 'channel_id',
        message: 'Channel ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a channel ID.';
            }
        }   
    },
    {
        type: 'input',
        name: 'message_id',
        message: 'Message ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a message ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'button_id',
        message: 'Button ID (Button Position):',
        default: 1,
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a button ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time (seconds):',
        default: 1,
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many users to click the button? (0 for all)',
        default: 0,
    }
];

const emojiClickerQuestions = [
    {
        type: 'input',
        name: 'channel_id',
        message: 'Channel ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a channel ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'message_id',
        message: 'Message ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a message ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'emoji',
        message: 'Emoji:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter an emoji.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time (seconds):',
        default: 1,
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many users to react? (0 for all)',
        default: 0,
    }
];

const sendMessageQuestions = [
    {
        type: 'input',
        name: 'channel_id',
        message: 'User or Channel ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a user or a channel ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'message',
        message: 'Message:',
        validate: function (value) {
            if (String(value) && value.length) {
                return true;
            } else {
                return 'Please enter a message.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time (seconds):',
        default: 0,
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many users to send the message? (0 for all)',
        default: 0,
    },
    {
        type: 'input',
        name: 'repeat',
        message: 'How many times to repeat the message?',
        default: 1,
    }
];

const addFriendQuestions = [
    {
        type: 'input',
        name: 'user_id',
        message: 'User ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a user ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time (seconds):',
        default: 1,
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many users to add the friend? (0 for all)',
        default: 0,
    }
];

const joinServerQuestions = [
    {
        type: 'input',
        name: 'invite',
        message: 'Invite:',
        validate: function (value) {
            if (String(value) && value.length) {
                return true;
            } else {
                return 'Please enter an invite.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time (seconds):',
        default: 1,
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many users to join the server? (0 for all)',
        default: 0,
    }
];

const massDMQuestions = [
    {
        type: 'input',
        name: 'guild_id',
        message: 'Guild ID:',
        validate: function (value) {
            if (Number(value) && value.length) {
                return true;
            } else {
                return 'Please enter a valid Guild ID.';
            }
        }
    },
    {
        type: 'input',
        name: 'time',
        message: 'Time between each message (seconds):',
        default: 1
    },
    {
        type: 'input',
        name: 'many',
        message: 'How many tokens to use (0 for all):',
        default: 0
    },
];

client.on("ready", async() => {

inquirer.prompt(choices).then(async (answers) => {
    
    const choice = answers.choice;

    if (choice === 'Click Button') {

        inquirer.prompt(buttonClickerQuestions).then(async (answers) => {
            
            const { channel_id, message_id, button_id, time, many } = answers;

            await loginAllAndClickButton(channel_id, message_id, button_id, time, many);

        });

    }

    if (choice === 'React to Message') {

        inquirer.prompt(emojiClickerQuestions).then(async (answers) => {
            
            const { channel_id, message_id, emoji, time, many } = answers;

            await loginAllAndReactEmoji(channel_id, message_id, emoji, time, many);

        });

    }

    if (choice === 'Send Message') {
            
        inquirer.prompt(sendMessageQuestions).then(async (answers) => {
                
            const { channel_id, message, time, many, repeat } = answers;
    
            await loginAllAndSend(channel_id, message, time, many, repeat);
    
        });
    
    }

    if (choice === 'Add Friend') {

        inquirer.prompt(addFriendQuestions).then(async (answers) => {
            
            const { user_id, time, many } = answers;

            await loginAllAndAddFriend(user_id, time, many);

        });

    }

    if (choice === 'Join Server') {

        inquirer.prompt(joinServerQuestions).then(async (answers) => {
            
            const { invite, time, many } = answers;

            await loginAllAndJoinServer(invite, time, many);

        });

    }

    if (choice === 'Mass DM') {

        inquirer.prompt(massDMQuestions).then(async(answers) => {

            let guild = await client.guilds.fetch(answers.guild_id);
            if(!guild) return console.log("Guild not found.")
        
            let fetchedMembers = await guild.members.fetch()
            let users = fetchedMembers.map(m => m.user).filter(u => !u.bot && u.id !== client.user.id)
            console.log(users.length + " users found.")
            if(!users.length > 0) return console.log("No users found.")
        
            await distributeTokens(users, answers.time, answers.many);
        
        })

    }

});

});