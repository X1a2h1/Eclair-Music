import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            loginForm:false,
            account:'',
            password:'',
            user: {
                head_img: ''
            },
            is_login: false
        }
    },
    getters: {

    },
    actions:{

    }
})