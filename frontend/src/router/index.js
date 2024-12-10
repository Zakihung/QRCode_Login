import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "qrlogin",
        component: () => import("@/components/QRLogin.vue"),
    },
    {
        path: "/homepage/:id",
        name: "HomePage",
        component: () => import("@/views/HomePage.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
