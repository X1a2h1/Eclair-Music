<template>
  <div>
    <div class="player-info">
      <div>
        <img :src="store.music.cover || 'https://raw.githubusercontent.com/X1a2h1/X1a2h1/fea4a15cfc4480be2377af11a42fd9d6cba344d4/assets/music.svg'" width="50" style="border-radius: 10px" alt="">
      </div>
      <div class="author-info">
        <span style="font-size: 13px">{{ store.music.name || "鸡杂"}}</span>
        <span style="font-size:12px;color:#999">{{  store.music.author || '陈宇晖'}}</span>
      </div>

    </div>
    <div class="progress">
      <small>{{ store.toTime(store.progress) || "00:00" }}</small>
        <el-slider
            style="padding: 0 5px 0 8px;--el-slider-height:4px;--el-slider-button-size: 10px;--el-slider-button-wrapper-size: 33px;--el-slider-main-bg-color: #000;--el-slider-runway-bg-color: #e5e5e5;--el-slider-border-radius: 0px"
            v-model="store.progress"
            :show-tooltip="false"
            :max="store.music_control.duration"
            @input="store.Seeked"
            size="small"/>
      <small>{{ store.toTime(store.music_control.duration) || "0:00" }}</small>
    </div>
    <div class="player-icon">
      <div>
        <music-previous @click="store.preMusic()"></music-previous>
      </div>
      <div>
        <music-play v-show="!store.play" @click="methods.handlePauseOrPlay()"></music-play>
        <music-pause v-show="store.play" @click="methods.handlePauseOrPlay()"></music-pause>
      </div>
      <div>
        <music-next @click="store.nextMusic()"></music-next>
      </div>
      <div style="position: absolute;right: 0">1</div>
    </div>
    <div  class="infinite-list" style="overflow: auto; height: 240px" >
    <div  v-for="(item, index) in store.musicList.songs" :key="index" style="display: flex">
      <div @click="store.swMusic(item.song_id, store.musicList.info.expand.type, index)">
        <img :src="item.cover" style="width: 45px; border-radius: 10px" alt="">
      </div>
      <div>
        <div style="font-size: 12px">{{item.name}}</div>
        <div style="font-size: 10px">{{ item.author }}</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import musicPause from "./icons/musicPause.vue";
import musicPlay from './icons/musicPlay.vue';
import musicNext from "./icons/musicNext.vue";
import musicPrevious from "./icons/musicPrevious.vue";
import {useMusicStore} from "../store/Music.js";
import {onBeforeUnmount, onMounted, reactive, watch} from "vue";
import {GET} from "../utils/http/request.js";
export default {
  name: "Music",
  components: {
    musicPlay,
    musicNext,
    musicPrevious,
    musicPause,
  },
  setup(){
    const store = useMusicStore()
    const state = reactive({
    })
    let timer = setInterval(() => {
      if(store.play ){
        store.progress += 1; //播放进度+1s
      }
    }, 1000)
    watch(() => ({...store.music_progress}),(val) => {
      if (val.ended) {
        store.$state = {
          // index: Math.floor(Math.random() * store.sheetLength),
          progress: 0,
        }
        store.nextMusic()
      }
    })

    const methods = {
      async initData() {
        await store.getSheetList()
        await store.getMusicList(store.sheetId)
        await store.getMusic( store.musicList.songs[store.index].song_id, store.musicList.info.expand.type)

        //   await methods.getSheetInfo();
      //   await store.getMusicList(store.sheetId);
      },
      // 获取音乐列表
      // async getMusicList(id) {
      //   let params = {
      //     id
      //   }
      //   await GET('music/list', {params}).then(res => {
      //     console.log(res)
      //     store.musicList = res.data.data
      //   })
      // },
      // 获取歌曲信息
      // async getMusic(id, type) {
      //   let params = {
      //     id,
      //     who:type
      //   }
      //   await GET('music/songs', {params}).then(res => {
      //     console.log(res)
      //     store.$state = {
      //       music: res.data
      //     }
      //   })
      //
      // },
      handlePauseOrPlay(){
        store.play = !store.play
      }
    }
    onMounted(()=>{
      methods.initData()
    })
    onBeforeUnmount(()=>{
      clearInterval(timer);
    })
    return {
      store,
      methods,
      state ,
    }
  }

}
</script>

<style scoped>
/*.el-slider {*/
/*  --el-slider-main-bg-color: var(--el-color-primary);*/
/*  --el-slider-runway-bg-color: var(--el-border-color-light);*/
/*  --el-slider-stop-bg-color: var(--el-color-white);*/
/*  --el-slider-disabled-color: var(--el-text-color-placeholder);*/
/*  --el-slider-border-radius: 3px;*/
/*  --el-slider-height: 6px;*/
/*  --el-slider-button-size: 20px;*/
/*  --el-slider-button-wrapper-size: 36px;*/
/*  --el-slider-button-wrapper-offset: -15px;*/
/*}*/
.player-info{
  height: 4rem;
  display: flex;

}
.player-info .author-info {
  display:flex;
  flex-wrap: nowrap;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
  height: 50px;
}
.progress {
  display: flex;
}
.player-icon {
  position: relative;
  /*padding-left: 4.7rem;*/
  display: flex;
  width: 100%;
  /*flex-wrap: nowrap;*/
  align-items: center;
  justify-content: center;
}
.player-icon svg {
  max-width: 3rem;
}
</style>