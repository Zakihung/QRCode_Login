QR Code Login

Ứng dụng đăng nhập website bằng cách quét QR Code từ điện thoại di động.

🔧 Chuẩn bị

Ứng dụng Expo Go được tải từ Google Play trên thiết bị di động.

Source code ứng dụng di động (React Native - Snack): https://snack.expo.dev/@zaki12803/hung-qr-scanner

Source code Project (Web + Backend): https://github.com/Zakihung/QRCode_Login

⚙️ Cài đặt & Thiết lập

👉 Yêu cầu: Máy tính (chạy backend + frontend) và điện thoại (chạy Expo Go) phải kết nối cùng một mạng LAN / Wi-Fi.

# 1. Cài đặt thư viện

Backend
_cd backend
npm install_

Frontend
_cd ../frontend
npm install_

# 2. Lấy địa chỉ IP

Trên máy tính, mở Command Prompt → chạy lệnh: _ipconfig_
Ghi lại địa chỉ IPv4 của Wi-Fi.

# 3. Cấu hình địa chỉ IP

Thay [IPv4] bằng địa chỉ vừa lấy được trong các file sau:

**Source code GitHub:**

backend/server.js: _const host = "[IPv4]";_

frontend/src/WebSocketClient.js: _const wsClient = new WebSocketClient("ws://[IPv4]:3000");_

frontend/vite.config.js: _host: "[IPv4]", target: "http://[IPv4]:3000/"_

**Source code ứng dụng di động (Expo):**

Components/AxiosClient.js: _const host = "[IPv4]";_

Components/WebSocketClient.js: _const host = "[IPv4]";_

# 🚀 Chạy chương trình

**Backend (server)**

_cd backend
npm run start_

**Frontend (web)**

_cd frontend
npm run dev_

→ Truy cập: http://[IPv4]:3001/

**Ứng dụng di động (Expo Go)**

Mở Expo Go trên điện thoại.
Chọn Scan QR Code → quét mã QR hiển thị từ Snack.

# ✅ Hoàn tất

Bây giờ bạn có thể sử dụng chức năng quét QR Code trên điện thoại để đăng nhập website.
