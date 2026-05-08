import { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ActivityType, 
    PermissionsBitField,
    AuditLogEvent,
    REST,
    Routes,
    SlashCommandBuilder,
    ChannelType,
    Collection
} from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import { exec } from 'child_process';

dotenv.config();

// 1. WEB SERVER FOR HEALTH CHECKS
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Health check server listening on port ${PORT}`));

// 2. DISCORD CLIENT SETUP
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember]
});

// 3. CONFIGURATION & CONSTANTS
const CONFIG = {
    TOKEN: process.env.DISCORD_TOKEN,
    OWNER_ID: '1440413794198360136',
    ALLOWED_ROLE_ID: '1501992586238492935',
    GUILD_ID: '1500574536649937159',
    LOG_CHANNEL_ID: '1502361874023583773',
    PREFIX: '$',
    COLOR: 0x9b59b6, // Purple
};

const startTime = Date.now();
const cooldowns = new Collection();

// 4. PERMISSION HELPER
const isAuthorized = (member) => {
    if (!member) return false;
    return member.id === CONFIG.OWNER_ID || member.roles.cache.has(CONFIG.ALLOWED_ROLE_ID);
};

// 5. COMMAND REGISTRATION (SLASH)
const slashCommands = [
    new SlashCommandBuilder().setName('ban').setDescription('Ban a user').addUserOption(o => o.setName('user').setDescription('User to ban').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('Reason')),
    new SlashCommandBuilder().setName('kick').setDescription('Kick a user').addUserOption(o => o.setName('user').setDescription('User to kick').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('Reason')),
    new SlashCommandBuilder().setName('help').setDescription('Shows the help menu'),
    new SlashCommandBuilder().setName('ping').setDescription('Check latency'),
    new SlashCommandBuilder().setName('botstats').setDescription('Check bot status'),
    new SlashCommandBuilder().setName('uptime').setDescription('Check bot uptime'),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(CONFIG.TOKEN);

const registerSlash = async () => {
    try {
        console.log('Started refreshing slash commands...');
        await rest.put(Routes.applicationGuildCommands(client.user.id, CONFIG.GUILD_ID), { body: slashCommands });
        console.log('Successfully reloaded slash commands.');
    } catch (error) {
        console.error(error);
    }
};

// 6. LOGGING HELPER
const sendLog = async (title, description, fields = [], user = null) => {
    const guild = client.guilds.cache.get(CONFIG.GUILD_ID);
    if (!guild) return;
    const logChannel = guild.channels.cache.get(CONFIG.LOG_CHANNEL_ID);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(CONFIG.COLOR)
        .setTimestamp()
        .setFooter({ text: 'Sara Private System', iconURL: client.user.displayAvatarURL() });

    if (fields.length > 0) embed.addFields(fields);
    if (user) {
        embed.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() });
    }

    logChannel.send({ embeds: [embed] }).catch(() => {});
};

// 7. EVENT: READY
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: '🎥 Sara Streaming',
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/discord' // Needs a twitch URL to show as purple/streaming
        }]
    });
    
    await registerSlash();
});

// 8. EVENT: MESSAGE CREATE (PREFIX COMMANDS)
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;
    if (message.guild.id !== CONFIG.GUILD_ID) return;

    // Check Authorization
    if (!message.content.startsWith(CONFIG.PREFIX)) return;
    if (!isAuthorized(message.member)) {
        // Silently deny
        return;
    }

    const args = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Map number commands
    const commandMap = {
        '1': 'ban', '2': 'unban', '3': 'kick', '4': 'timeout', '5': 'untime',
        '6': 'warn', '7': 'ws', '8': 'clear', '9': 'mute', '10': 'um',
        '11': 'lc', '12': 'ulc', '13': 'slow', '16': 'hide', '17': 'unhide', '20': 'd'
    };

    const finalCmd = commandMap[commandName] || commandName;

    // Command Logic
    try {
        switch (finalCmd) {
            case 'ping':
                message.reply(`Pong! ${client.ws.ping}ms`);
                break;

            case 'ban':
                const banUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
                if (!banUser) return message.react('❌');
                const banReason = args.slice(1).join(' ') || 'No reason specified';
                await banUser.ban({ reason: banReason });
                message.react('✅');
                sendLog('🔨 User Banned', `**User:** ${banUser.user.tag}\n**Reason:** ${banReason}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'kick':
            case 'k':
                const kickUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
                if (!kickUser) return message.react('❌');
                const kickReason = args.slice(1).join(' ') || 'No reason specified';
                await kickUser.kick(kickReason);
                message.react('✅');
                sendLog('👢 User Kicked', `**User:** ${kickUser.user.tag}\n**Reason:** ${kickReason}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'clear':
            case 'c':
                const amount = parseInt(args[0]) || 10;
                await message.channel.bulkDelete(amount > 100 ? 100 : amount, true);
                message.channel.send(`Cleared ${amount} messages.`).then(m => setTimeout(() => m.delete(), 3000));
                sendLog('🧹 Messages Cleared', `**Channel:** ${message.channel.name}\n**Amount:** ${amount}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'timeout':
            case 'time':
            case '4':
                const timeUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
                if (!timeUser) return message.react('❌');
                const duration = parseInt(args[1]) || 60; // minutes
                await timeUser.timeout(duration * 60 * 1000, args.slice(2).join(' ') || 'No reason');
                message.react('✅');
                sendLog('⏳ Timeout', `**User:** ${timeUser.user.tag}\n**Duration:** ${duration}m\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'untime':
            case '5':
                const untimeUser = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
                if (!untimeUser) return message.react('❌');
                await untimeUser.timeout(null);
                message.react('✅');
                sendLog('⏳ Timeout Removed', `**User:** ${untimeUser.user.tag}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'lc':
            case '11':
                await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false });
                message.reply('🔒 Channel Locked.');
                sendLog('🔒 Channel Locked', `**Channel:** ${message.channel.name}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'ulc':
            case '12':
                await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: true });
                message.reply('🔓 Channel Unlocked.');
                sendLog('🔓 Channel Unlocked', `**Channel:** ${message.channel.name}\n**By:** ${message.author.tag}`, [], message.author);
                break;

            case 'slow':
            case '13':
                const seconds = parseInt(args[0]) || 5;
                await message.channel.setRateLimitPerUser(seconds);
                message.reply(`🐢 Slowmode set to ${seconds}s.`);
                break;

            case 'hide':
            case '16':
                await message.channel.permissionOverwrites.edit(message.guild.id, { ViewChannel: false });
                message.reply('👁️ Channel Hidden.');
                break;

            case 'unhide':
            case '17':
                await message.channel.permissionOverwrites.edit(message.guild.id, { ViewChannel: true });
                message.reply('👁️ Channel Visible.');
                break;

            case 'd':
            case '20':
                sendLog('🗑️ Channel Deleted', `**Channel:** ${message.channel.name}\n**By:** ${message.author.tag}`, [], message.author);
                await message.channel.delete();
                break;

            case 'userinfo':
                const u = message.mentions.users.first() || message.author;
                const uEmbed = new EmbedBuilder().setAuthor({ name: u.tag, iconURL: u.displayAvatarURL() }).addFields({ name: 'ID', value: u.id }).setColor(CONFIG.COLOR);
                message.reply({ embeds: [uEmbed] });
                break;

            case 'serverinfo':
                const sEmbed = new EmbedBuilder().setTitle(message.guild.name).addFields({ name: 'Members', value: `${message.guild.memberCount}` }).setColor(CONFIG.COLOR);
                message.reply({ embeds: [sEmbed] });
                break;

            case 'botstats':
                const statEmbed = new EmbedBuilder().setTitle('Bot Stats').addFields({ name: 'Ping', value: `${client.ws.ping}ms` }, { name: 'Uptime', value: `${Math.floor((Date.now() - startTime)/1000)}s` }).setColor(CONFIG.COLOR);
                message.reply({ embeds: [statEmbed] });
                break;

            case 'say':
                // $say in channel_name message
                if (args[0] === 'in') {
                    const channelName = args[1];
                    const text = args.slice(2).join(' ');
                    const channel = message.guild.channels.cache.find(c => c.name === channelName && c.type === ChannelType.GuildText);
                    if (channel) {
                        channel.send(text);
                        message.react('✅');
                    } else {
                        message.react('❓');
                    }
                } else if (args[0] === 'dm') {
                    const dmUser = message.mentions.members.first();
                    const text = args.slice(2).join(' ');
                    if (dmUser) {
                        dmUser.send(text).then(() => message.react('✅')).catch(() => message.react('❌'));
                    }
                } else {
                    const text = args.join(' ');
                    message.channel.send(text);
                    message.delete().catch(() => {});
                }
                break;

            case 'help':
                sendHelp(message);
                break;

            case 'shutdownserver':
                // Emergency mode
                const channels = message.guild.channels.cache.filter(c => c.type === ChannelType.GuildText);
                for (const [id, ch] of channels) {
                    await ch.permissionOverwrites.edit(message.guild.id, { SendMessages: false });
                }
                message.reply('🚨 Server has been locked down!');
                sendLog('🛡️ SHUTDOWN SERVER', 'The server has been placed in emergency lockdown mode.', [], message.author);
                break;

            case 'eval':
                if (message.author.id !== CONFIG.OWNER_ID) return;
                try {
                    const code = args.join(' ');
                    const evaled = eval(code);
                    message.reply(`\`\`\`js\n${evaled}\n\`\`\``);
                } catch (err) {
                    message.reply(`\`\`\`js\n${err}\n\`\`\``);
                }
                break;

            case 'shutdown':
                if (message.author.id !== CONFIG.OWNER_ID) return;
                await message.reply('Shutting down...');
                process.exit(0);
                break;

            // Add other commands as needed...
            default:
                // Optionally react for unknown common command attempts
                break;
        }
    } catch (error) {
        console.error(error);
        sendLog('⚠️ Command Error', `Error executing command ${finalCmd}: ${error.message}`);
    }
});

// 9. EVENT: INTERACTION CREATE (SLASH & BUTTONS)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.guild || interaction.guild.id !== CONFIG.GUILD_ID) return;

    if (!isAuthorized(interaction.member)) {
        return interaction.reply({ content: 'Unauthorized.', ephemeral: true }).catch(() => {});
    }

    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        if (commandName === 'help') return sendHelp(interaction);
        if (commandName === 'ping') return interaction.reply(`Pong! ${client.ws.ping}ms`);
        // ... more slash commands
    }

    if (interaction.isButton()) {
        const id = interaction.customId;
        const helpEmbed = new EmbedBuilder().setColor(CONFIG.COLOR).setTimestamp();

        if (id === 'help_mod') {
            helpEmbed.setTitle('🔨 Moderation Commands')
                .addFields(
                    { name: '$1 (ban)', value: 'Ban a user', inline: true },
                    { name: '$2 (unban)', value: 'Unban a user', inline: true },
                    { name: '$3 (kick)', value: 'Kick a user', inline: true },
                    { name: '$4 (timeout)', value: 'Timeout a user', inline: true },
                    { name: '$8 (clear)', value: 'Clear messages', inline: true }
                );
        } else if (id === 'help_sec') {
            helpEmbed.setTitle('🛡️ Security & Protection')
                .setDescription('Commands like $anti, $antiraid, $whitelist, $blacklist');
        } else if (id === 'help_chan') {
            helpEmbed.setTitle('📺 Channel Management')
                .addFields(
                    { name: '$11 (lock)', value: 'Lock channel', inline: true },
                    { name: '$12 (unlock)', value: 'Unlock channel', inline: true },
                    { name: '$20 (delete)', value: 'Delete channel', inline: true }
                );
        } else if (id === 'help_own') {
            helpEmbed.setTitle('👑 Owner Commands')
                .setDescription('shutdown, restart, shutdownserver, eval, exec, broadcast, guilds');
        } else if (id === 'help_stats') {
            const uptime = Math.floor((Date.now() - startTime) / 1000);
            helpEmbed.setTitle('📊 Bot Statistics')
                .addFields(
                    { name: 'Uptime', value: `${uptime}s`, inline: true },
                    { name: 'Ping', value: `${client.ws.ping}ms`, inline: true },
                    { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true }
                );
        }

        await interaction.update({ embeds: [helpEmbed] }).catch(() => {});
    }
});

// 10. HELP MENU FUNCTION
const sendHelp = async (target) => {
    const embed = new EmbedBuilder()
        .setTitle('Sara Advanced System')
        .setDescription('Welcome. Please select a category below for command details.')
        .setColor(CONFIG.COLOR);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('help_mod').setLabel('Moderation').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('help_sec').setLabel('Security').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('help_chan').setLabel('Channels').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('help_own').setLabel('Owner').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('help_stats').setLabel('Stats').setStyle(ButtonStyle.Primary)
    );

    if (target.reply) {
        await target.reply({ embeds: [embed], components: [row] });
    } else {
        await target.channel.send({ embeds: [embed], components: [row] });
    }
};

// 11. AUTOMATIC LOGGING & ANTI-ABUSE
client.on('messageDelete', async (message) => {
    if (!message.guild || message.author?.bot) return;
    sendLog('🗑️ Message Deleted', `**Author:** ${message.author.tag}\n**Channel:** ${message.channel.name}\n**Content:** ${message.content || 'N/A'}`);
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
    if (!oldMsg.guild || oldMsg.author?.bot || oldMsg.content === newMsg.content) return;
    sendLog('📝 Message Edited', `**Author:** ${oldMsg.author.tag}\n**Channel:** ${oldMsg.channel.name}\n**Old:** ${oldMsg.content}\n**New:** ${newMsg.content}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        sendLog('📛 Nickname Changed', `**User:** ${newMember.user.tag}\n**Old:** ${oldMember.nickname || 'None'}\n**New:** ${newMember.nickname || 'None'}`);
    }
});

client.on('channelCreate', async (channel) => {
    sendLog('📁 Channel Created', `**Name:** ${channel.name}\n**Type:** ${channel.type}`);
});

client.on('channelDelete', async (channel) => {
    sendLog('📁 Channel Deleted', `**Name:** ${channel.name}\n**Type:** ${channel.type}`);
});

client.on('guildBanAdd', async (ban) => {
    sendLog('🔨 User Banned (Manual)', `**User:** ${ban.user.tag}\n**Reason:** ${ban.reason || 'N/A'}`);
});

client.on('guildBanRemove', async (ban) => {
    sendLog('🔓 User Unbanned (Manual)', `**User:** ${ban.user.tag}`);
});

// ANTI-ABUSE: Monitoring Audit Logs
client.on('guildAuditLogEntryCreate', async (entry, guild) => {
    const { action, executorId, targetId } = entry;
    const executor = await guild.members.fetch(executorId).catch(() => null);

    if (!executor || executor.id === CONFIG.OWNER_ID || executor.roles.cache.has(CONFIG.ALLOWED_ROLE_ID)) return;

    // Check for dangerous actions by non-authorized users
    const dangerousActions = [
        AuditLogEvent.ChannelDelete,
        AuditLogEvent.RoleDelete,
        AuditLogEvent.GuildUpdate,
        AuditLogEvent.MemberKick,
        AuditLogEvent.MemberBan
    ];

    if (dangerousActions.includes(action)) {
        const roles = executor.roles.cache.filter(r => r.id !== guild.id);
        await executor.roles.set([]).catch(() => {});
        
        sendLog('🚨 ANTI-ABUSE TRIGGERED', `**User:** ${executor.user.tag}\n**Action:** ${action}\n**Result:** Removed all roles from user.`, [
            { name: 'Removed Roles', value: roles.map(r => r.name).join(', ') || 'None' }
        ]);
    }
});

// Crash Prevention
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    sendLog('🆘 CRITICAL ERROR', `Unhandled Rejection: ${error.message}`);
});

client.login(CONFIG.TOKEN);
