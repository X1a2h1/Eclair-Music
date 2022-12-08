<template>
  <div>
    <div class="player-info">
      <div>
        <img src="https://raw.githubusercontent.com/X1a2h1/X1a2h1/fea4a15cfc4480be2377af11a42fd9d6cba344d4/assets/music.svg" width="50" alt="">
      </div>
      <div>
        <span>{{"鸡杂"}}</span>
        <p style="color:#999">{{'陈宇晖'}}</p>
      </div>

    </div>
    <div class="progress">
      <el-slider  :show-tooltip="false" size="small"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Music"
}
</script>

<style scoped>
.player-info{
  display: flex;

}
</style>