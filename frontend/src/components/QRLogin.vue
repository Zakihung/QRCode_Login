<template>
    <div class="body">
        <div class="qr-form">
            <h2>Đăng Nhập với mã QR</h2>
            <div id="not_auth">
                <div v-if="qrData.qrCode && !isExpired" class="qr-code">
                    <img :src="qrData.qrCode" alt="QR Code" />
                    <div class="countdowntime">
                        <p style="">Hết hạn trong: {{ countdownTime }}</p>
                    </div>
                </div>
                <div v-else id="hethan">
                    <p style="">Mã QR đã hết hạn. Vui lòng tải lại!</p>
                    <button @click="generateQRCode">Tải lại mã QR</button>
                </div>
            </div>
            <div id="huyDN" style="display: none;">
                    <h3 style="color: red;">Bạn đã từ chối đăng nhập bằng mã QR</h3>
                    <p style="">Mã QR đã hết hạn. Vui lòng tải lại!</p>
                    <button @click="reset">Tải lại mã QR</button>
            </div>
            <div id="auth_successful" style="display: none;" class="info">
                <div class="circle"></div>
                <br>
                <div>
                    <p id="user"></p>
                
                <p>Quét mã thành công. Vui lòng chọn "Đăng nhập" trên thiết bị di động của bạn.</p>
                </div>
                
            </div>
            
        </div>
        <div class="thongbao">
                <h3>Quét mã QR bằng ứng dụng HungHung</h3>
                <p>hoặc</p>
                <a href="#" style="">Đăng nhập với password</a>
        </div>
    </div>
</template>

<script>

import QRCodeService from '@/services/QRCode.service';
import WebSocketClient from '../WebSocketClient';

window.addEventListener('beforeunload', function (event) { 
    QRCodeService.delete();
});

window.addEventListener('keydown', function (event) { 
    if (event.key === 'F5') { 
        QRCodeService.delete(); 
    } 
});

export default {
    data() {
        return {
            qrData: {
                channel: '',
                qrCode: '',
                token: '',
                code: '',
                expiresAt: ''
            },
            countdownTime: '',
            idUser: '',
            countdownInterval: null,
            isExpired: false
        };
    },
    mounted() {
        this.generateQRCode();
        WebSocketClient.addListener('auth-success', this.handleQRScan);
        WebSocketClient.addListener('confirm-login', this.handleConfirmLogin);
        WebSocketClient.addListener('cancel-login', this.handleCancel);
    },

    methods: {
        async generateQRCode() {
            try {
                const response = await QRCodeService.genCode();
                if (response.success) {
                    this.qrData = response.data;
                    this.isExpired = false;
                    this.startCountdown(new Date(this.qrData.expiresAt).getTime());
                } else {
                    alert('Không thể tạo mã QR');
                }
                
            } catch (error) {
                console.error('Lỗi khi tạo mã QR:', error);
            }
        },
        startCountdown(expirationTime) {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            
            this.countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const timeRemaining = expirationTime - currentTime;

                if (timeRemaining <= 0) {
                    clearInterval(this.countdownInterval);
                    this.countdownTime = 'Expired';
                    this.isExpired = true;
                    QRCodeService.delete();
                    return;
                }

                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                this.countdownTime = `${minutes} phút ${seconds} giây`;
            }, 1000);
        },
        handleQRScan(message) {
            document.getElementById('not_auth').style.display = 'none';
            document.getElementById('auth_successful').style.display = 'block';
            document.getElementById('user').innerText = `${message.name}`; 
            this.idUser = message.idUser;
            QRCodeService.delete();
        },
        handleConfirmLogin() {
            this.$router.push({ name: 'HomePage', params: { id: this.idUser } });
        },
        handleCancel() {
            document.getElementById('auth_successful').style.display = 'none';
            document.getElementById('huyDN').style.display = 'block';
        },
        reset() {
            window.location.reload();
        },
  
        beforeDestroy() {
            if (this.countdownInterval) {
                clearInterval(this.countdownInterval);
            }
            WebSocketClient.removeListener('auth-success', this.handleQRScan);
            WebSocketClient.removeListener('confirm-login', this.handleConfirmLogin);
            WebSocketClient.removeListener('cancel-login', this.handleCancel);
        },
        
    },
   

    
};

</script>

<style scoped>
    @import "@/assets/style.css";
</style>
