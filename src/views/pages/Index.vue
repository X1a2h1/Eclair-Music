<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in store.musicSheetList" :key="index" :span="5">
      <div class="playlist" :style="{ background: 'url(' + item.head_img + ')',backgroundRepeat:'no-repeat',backgroundSize:'cover' }">
<div class="list-info">
  <div class="info-title">{{item.title}}</div>
  <div class="info-d">{{ item.description || "暂无介绍" }}</div>
  <div class="play-icon">
    <playmin @click="store.getMusicList(item.id)"></playmin>
  </div>
</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {onMounted, reactive} from "vue";
import playmin from '../../components/icons/Playmin.vue'
import {useMusicStore} from "../../store/Music.js";

export default {
  name: "Index",
  components: {
    playmin
  },
  setup() {
    const store = useMusicStore()
    // const state = reactive({
    //   sheetId: 0,
    //
    // })
    const methods = {
      async initData(){
        // await store.getSheetList()
        // await store.getMusicList(store.sheetId)
        // await store.getMusic( store.musicList.songs[store.index].song_id, store.musicList.info.expand.type)

      },
      //获取所有歌单
      //   async getSheetList(){
      //   await GET('music/all').then(res => {
      //     store.music_play_list = res.data.data.data
      //     store.sheetId = res.data.data.data[0].id
      //     store.getMusicList(store.sheetId) //获取单个歌单信息
      //   })
      //
      //
      // },
      // swSheetId(id){
      //   store.sheetId = id
      // }
    }
    onMounted(()=>{
      methods.initData()
    })
    return { methods, store }
  }
}
</script>

<style scoped>
.playlist {
  border-radius: 10px;
  width: 14rem;
  height: 14rem;
  /*background: url("");*/
  background-size: cover;
  background-clip: content-box;
}
.list-info {
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(167, 167, 245,0.5);
  color: #000;
}
.list-info .info-title {
  font-size: 1rem;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  padding: 6px;
}
.list-info .info-d {
  font-size: 12px;
  padding: 6px;
}

.play-icon {
  position: absolute;
  /*background-color: rgba(0,0,0,0.2);*/
  bottom: 10px;
  right: 10px;
}
.play-icon svg {
  width: 35px;
  height: 35px;
  transition-duration: .3s;
}
.play-icon svg:hover{
width: 40px;
  height: 40px;
}
</style>