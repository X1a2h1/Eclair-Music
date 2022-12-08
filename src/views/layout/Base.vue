<template>
  <e-nav></e-nav>
  <div class="common-layout wrapper">
    <el-container>
      <el-aside width="300px" class="eside">
        <e-side class="content "></e-side>
      </el-aside>
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import eSide from '../../components/eSide.vue'
import eNav from '../../components/eNav.vue'
export default {
  name: "base",
  components: {
    eSide,
    eNav
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 110rem;
  min-width: 100rem;
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  box-sizing: content-box;
  padding: 0px 1rem 1rem 1rem;
}
.eside {
  margin-right: 20px;
}
</style>