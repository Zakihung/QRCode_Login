const cloudinary = require('cloudinary').v2;

// Cấu hình API
cloudinary.config({
  cloud_name: 'daanyabyt', // Thay bằng tên cloud của bạn
  api_key: '792748249981856',       // Thay bằng API key
  api_secret: 'zcB7Wre_zQwxxk2rm1xNdJhYAA0', // Thay bằng API secret
});

module.exports = cloudinary;
