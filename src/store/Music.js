import {defineStore} from "pinia";
import {GET} from "../utils/http/request.js";
import {ElMessage} from "element-plus";

export const useMusicStore = defineStore('music', {
    state: () => {
        return {
            play: false, /*播放状态判断*/
            is_play:false,
            musicSheetList:[],
            sheetLength: 0,
            music:{},
            sheetId: 0,
            musicList: {
                info: {},
                songs:[]
            },
            music_control: {
                duration: 0.00,
                currentTime: 0.00,
            },
            progress:0,
            // currentTime: 0,
            music_progress: {
                ended: false,
            },
            index:0
        }

    },
    getters:{
        currentTime: (state) => state.music_control.currentTime,
    },
    actions: {
        // Collapse() {
        //     this.showSheet = !this.showSheet
        // },
        toTime(sec) {
            let s = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60
            let min = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
            return min + ':' + s
        },
        // swSheetId(id){
        //     this.sheetId =  id
        //
        // },
        async getSheetList() {
            await GET('music/all').then(res => {
                this.musicSheetList = res.data.data.data
                this.sheetId = res.data.data.data[0].id
                // this.getMusicList(this.sheetId) //获取单个歌单信息
            })


        },
        async getMusicList(id) {
            let params = {
                id
            }
            await GET('music/list', {params}).then(res => {
                this.musicList = res.data.data
            })
            if ( this.play === true ){
                console.log('正在播放')
                this.index = 0
                await this.swMusic(this.musicList.songs[this.index].song_id, this.musicList.info.expand.type, this.index)
                ElMessage.success(`歌单加载成功`)
            }
            if (this.play === false ) {

                // await this.swMusic(this.musicList.songs[this.index].song_id, this.musicList.info.expand.type, this.index)
                ElMessage.success(`歌单加载成功！`)
            }
        },
        async getMusic(id, type) {
            let params = {
                id,
                who: type
            }
            await GET('music/song', {params}).then(res => {
                console.log(res)
                // store.$state = {
                //     music: res.data
                // }
                this.music = res.data.data
            })

        },
        // 歌曲切换
        async swMusic(id, type, index) {
            // store.index = index
                this.index = index
                this.play = true
                this.is_play = this.play
                this.progress = 0

            // store.handlePauseOrPlay()
            await this.getMusic(id, type)
        },
        // 切换上一首音乐
        preMusic() {
            if (this.index === 0) {
                // store.index = store.sheetLength -1
                this.index = this.sheetLength - 1
            } else {
                // store.$state = {
                //   index:  0
                // }
                this.index -= 1
            }
            this.swMusic(this.musicList.songs[this.index].song_id, this.musicList.info.expand.type, this.index)
        },
        // 切换下一首音乐
        nextMusic() {
            if (this.index === this.sheetLength - 1) {
                this.index = 0
            } else {
                this.index += 1
            }
            this.swMusic(this.musicList.songs[this.index].song_id, this.musicList.info.expand.type, this.index)
        },
        Seeked(val){
            // this.currentTime(val)
            this.music_control.currentTime = val
            this.play = true
            this.is_play = this.play
            this.music_progress.ended = false
        }
    }
})