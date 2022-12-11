<template>
  <audio
      ref="audioRef"
      controls="controls"
      :src="store.music.url"
      style="display:none"
      :currentTime="store.music_control.currentTime"
      @ended="methods.ended"
      @canplay="methods.getDuration"
      @timeupdate="methods.onTimeupdate"

  />
</template>

<script>
import {useMusicStore} from "../store/Music.js";
import {ref, watch} from "vue";

export default {
  name: "Audio",
  setup() {
    const store = useMusicStore()
    const audioRef = ref(null)




    watch(() => ({...store}), (val) => {
      if (val.play) {
        audioRef.value.play()
      } else {
        audioRef.value.pause()
      }
    })

    const methods = {
      getDuration() {
        // store.$state = ('duration', Math.round(store.audioRef.duration))
        // console.log(store.duration)
        // console.log('音乐可以播放')
        store.$patch ({
          music_control: {
            duration: Math.round(audioRef?.value.duration)
          }
        })
        console.log(store.is_play)
      },
      ended() {
        console.log("播放结束")
        store.$state = {
          progress: 0,
          music_progress: {
            ended: true
          }
          // ("playEnded", true)
        }
      },
    }
    return {store, audioRef, methods}

  }
}
</script>

<style scoped>

</style>