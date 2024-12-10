const crypto = require('crypto');
const QRCode = require('qrcode');
const GenCode = require('../models/QRCode.model');
const ApiError = require('../api-error');


exports.generate = async (req, res, next) => {
    try {
        const token = crypto.randomBytes(64).toString('hex');
        const sessionDetails = req.body.sessionDetails || 'default-session';
        let channelData = new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getMinutes();
        let channelDataHash = crypto.createHash('md5').update(channelData + "||" + token).digest("hex");
        
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        
        //Lưu vào CSDL
        const newCode = new GenCode({ 
            code: channelDataHash,
            token,
            sessionDetails,
            expiresAt: expirationTime 
        });
        await newCode.save();

        // Tạo QR code với định dạng base64
        const qrCodeDataURL = await QRCode.toDataURL(token);
        res.status(200).json({
            success: true,
            msg: "QR DATA Created",
            data: {
                channel: channelDataHash,
                qrCode: qrCodeDataURL,
                token,
                code: channelDataHash,
                expiresAt: expirationTime
            }
        });
        
    } catch (error) {
        return next(
            new ApiError(500, "Error generating code and token")
        );
    }
}

exports.deleteQR = async (req, res, next) => {
    try {
        await GenCode.deleteMany({});
        res.send({ message: 'All documents deleted successfully' });
    } catch (error) {
        return next(
            new ApiError(500, "Error deleting documents")
        );
    }
}

exports.verify = async (req, res) => {
    const { token, name, idUser } = req.body;

    if (!token) {
        return res.status(400).send('Token are required');
    }

    try {
        const storedToken = await GenCode.findOne({ token });

        if (!storedToken) {
            return res.status(400).send('Invalid or expired token');
        } 

        const wsServer = req.wsServer; // Lấy WebSocket server từ middleware
        if (wsServer) {
            wsServer.sendMessageToAllClients({ type: 'auth-success', name: name, idUser: idUser });
        } else {
            console.error('WebSocket server is not available');
        }

        res.status(200).json({
            success: true,
            message: 'Token verified successfully',
        });
        
    } catch (error) {
        res.status(500).send('Error verifying token');
    }
}
