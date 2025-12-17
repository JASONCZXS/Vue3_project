import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            loginForm:{
                username:'',
                password:'',
            },
            token:'',
        }
    },
    actions: {
        clean(){
            this.token = ''
            this.loginForm={
                username:'',
                password:'',
            }
            localStorage.clear()
        }
    },
    persist: true,
})