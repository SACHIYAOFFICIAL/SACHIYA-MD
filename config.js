const { updateEnv, readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const EnvVar = require('../lib/mongodbenv');

cmd({
    pattern: "mysettings",
    alias: ["mylist""],
    desc: "Check bot online or not.",
    category: "main",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return;

        const config = await readEnv();

        let work;
        switch (config.MODE) {
            case 'public':
                work = '𝙿𝚄𝙱𝙻𝙸𝙲🌎';
                break;
            case 'private':
                work = '𝙿𝚁𝙸𝚅𝙰𝚃𝙴👤';
                break;
            case 'groups':
                work = '𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈👥';
                break;
            case 'inbox':
                work = '𝙸𝙽𝙱𝙾𝚇 𝙾𝙽𝙻𝚈🫂';
                break;
            default:
                work = '𝚄𝙽𝙺𝙾𝚆𝙽🛑';
        }

        let autoStatus = config.AUTO_READ_STATUS === 'true' ? '✅ 𝙾𝙽' : '❌ 𝙾𝙵𝙵';
        let autoVoice = config.AUTO_VOICE === 'true' ? '✅ 𝙾𝙽' : '❌ 𝙾𝙵𝙵';
        let autoReadcmd = config.AUTO_STICKER === 'true' ? '✅ 𝙾𝙽' : '❌ 𝙾𝙵𝙵';
        let autoTyping = config.AUTO_REACT === 'true' ? '✅ 𝙾𝙽' : '❌ 𝙾𝙵𝙵';
        let autoBio = config.AUTO_REPLY === 'true' ? '✅ 𝙾𝙽' : '❌ 𝙾𝙵𝙵';

        const vv = await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/JurU8ZF.jpeg' },
            caption: `*«────── « ⋅ʚ♡ɞ⋅ » ──────»*
*║*   🛠 *𝙔𝙊𝙐 𝙎𝙀𝙏𝙏𝙄𝙉𝙂* 🛠 *║*
*«────── « ⋅ʚ♡ɞ⋅ » ──────»*
✂ *Work Mode* || *${work}*
✂ *Auto Voice* || *${autoVoice}*
✂ *Auto Status* || *${autoStatus}*
✂ *Auto Sticker* || *${autoBio}*
✂ *Auto React* || *${autoTyping}*
✂ *Auto Reply* || *${autoReadcmd}*
`
        }, { quoted: mek });


    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
