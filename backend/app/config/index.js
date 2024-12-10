const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://phuochung123:PhuocHung123@cluster-qr-code-login.a0ix2.mongodb.net/QRCodeDB?retryWrites=true&w=majority&appName=cluster-qr-code-login',
    }
};

module.exports = config;