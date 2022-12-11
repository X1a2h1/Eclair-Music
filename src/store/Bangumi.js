import {defineStore} from "pinia";
export const useBangumiStore = defineStore('bangumi',{
    state: () => {
        return {
            bangumiList:{
                list:[],
                pn:1,
                ps:12,
                total:30
            },
                    }
                }
})