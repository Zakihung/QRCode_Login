<template>
    <body>
        <div class="container">
            <!-- Left Content -->
            <div class="left-content">
                <div class="text"><p>Thông tin cá nhân</p></div>
                <div class="avatar"></div>
                <div class="name"><p id="user"></p></div>
                <button class="logout-button" @click="logout">Đăng xuất</button>
            </div>

            <!-- Right Content -->
            <div class="right-content">
                <div class="box right-top">
                    <p>Welcome! Đăng nhập bằng mã QR thành công</p>
                </div>
                <div class="box right-bottom">
                    <p>Lịch sử đăng nhập</p>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import UserService from '@/services/User.service';

export default {
    data() {
        return {
            name: '',
        }
    },
    methods: {
        async getDataUser() {
            const dataUser = await UserService.getUser(this.$route.params.id);
            this.name = dataUser.HoTen;
            console.log(this.name);
        },

        displayName() {
            document.getElementById('user').innerText = `${this.name}`;
        },
        logout() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.getDataUser().then(() => {
            this.displayName();
        });
    }
}
</script>

<style scoped>
    @import "@/assets/style.css";
</style>