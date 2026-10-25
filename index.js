const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');
    const sock = makeWASocket({ auth: state, printQRInTerminal: true });
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('messages.upsert', async (m) => {
        for (let msg of m.messages) {
            if (msg.key.remoteJid === 'status@broadcast') {
                await sock.sendMessage(msg.key.remoteJid, { react: { text: '❤️', key: msg.key } });
                console.log('Statut liké');
            }
        }
    });
}
startBot();
