import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            component: () => import('../views/layout/Base.vue'),
            children: [
                {
                    title: '首页',
                    name: 'Index',
                    path: '/',
                    component: () => import('../views/pages/Index.vue')
                },
                {
                    title: '番剧',
                    name: 'Bangumi',
                    path: '/bangumi',
                    component: () => import('../views/pages/Bangumi.vue')
                }
            ],
            meta: {
                title: "12112"
            }

        }
    ],

})

export default router