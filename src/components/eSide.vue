<template>
  <div class="content">
    <!-- <el-tabs  class="demo-tabs" >
      <el-tab-pane label="推荐" name="first">User</el-tab-pane>
      <el-tab-pane label="排行榜" name="second">Config</el-tab-pane>
      <el-tab-pane label="播放列表" name="third">Role</el-tab-pane>
      <el-tab-pane label="我的" name="fourth">Task</el-tab-pane>
    </el-tabs> -->
    <el-menu
        router
        :default-active="index"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item v-for="(item, index) in menuList" :key="index"  :index="item.path">{{item.title}}</el-menu-item>

    </el-menu>
  </div>
  <Music class="content side-row"/>
</template>

<script>
import Music from './Music.vue'
import {reactive, toRefs} from "vue";

export default {
  name: "eSide",
  components: {
    Music
  },
  setup(){
    const state = reactive({
      menuList:[
        {
          path: '/',
          title: '主页',
          icon: '',
        },
        {
          path: '/bangumi',
          title: '番剧',
          icon: '',
        },
      ]
    })
    return { ...toRefs(state) }
  }
}
</script>

<style scoped>
.side-row {
  margin-top: 20px;

}
</style>