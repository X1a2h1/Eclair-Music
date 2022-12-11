<template>
  <el-row :gutter="20">
    <el-col
        :span="6"
        v-for="data in store.bangumiList.list" :key="data"
        style="margin-bottom: 20px;"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
            :src="data.cover"
            class="image"
            referrerPolicy="no-referrer"
         alt="无法显示请尝试刷新"/>
        <div style="padding: 12px">
          <el-link :underline="false" :href="data.short_url"><span>{{ data.title }}</span></el-link>

<!--          <span style="font-size: 10px">{{ data.evaluate }}</span>-->
          <div class="bottom">
            <el-popover
                placement="top-start"
                title="简介"
                :width="200"
                trigger="hover"
                :content="data.evaluate"
            >
              <template #reference>
                <el-tag class="m-2">简介</el-tag>
              </template>
            </el-popover>
<!--            <time class="time">{{ data.evaluate }}</time>-->
          </div>
          <div>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="追番进度"
                placement="bottom"
            >
            <el-progress :text-inside="true" :stroke-width="16" :percentage="Math.floor( parseInt(data.progress.match(/\d+/)) / data.formal_ep_count  * 100)" />
            </el-tooltip>
          </div>

        </div>
      </el-card>
    </el-col>
  </el-row>
  <div style="margin-top: 10px; width: 100%;display: flex; justify-items: center;align-items: center;flex-direction: column">
    <el-pagination background layout="prev, pager, next" v-model:current-page="store.bangumiList.pn" @current-change="changePage"  :total="store.bangumiList.total" />
  </div>
</template>

<script>

import {onMounted, reactive} from "vue";
import {GET} from "../../utils/http/axios.js";
import {useBangumiStore} from "../../store/Bangumi.js";
import {ElMessage} from "element-plus";

export default {
  name: "Bangumi",
  components: {

  },
  setup(){
    const store = useBangumiStore()
    const state = reactive({
      self_page: 1,
    })
    const changePage = (val) => {
      methods.getBangumi(state.self_page = val)
      console.log(val)
    }
    const methods = {
      getBangumi(page){
        let params = {
          vmid: 86529541,
          pn: page,
          ps: 12,
          cookies:"buvid3=AD1A4FB5-A136-0090-5D85-5420948090EB84830infoc; b_nut=1656823784; _uuid=F8410C655-CA6A-F3C1-DC6E-3EDE4D9C7D6287420infoc; blackside_state=0; buvid_fp_plain=undefined; nostalgia_conf=-1; i-wanna-go-back=-1; b_ut=5; LIVE_BUVID=AUTO9116573054441048; go_old_video=-1; fingerprint3=80fc9c1f2fe80605d3b4d27b359f23ec; buvid4=85009944-516C-F9B5-206E-D46DFD62C4C769667-022061518-JK2pj%2FxKqTOW%2BK8GMRlpSA%3D%3D; hit-dyn-v2=1; is-2022-channel=1; DedeUserID=86529541; DedeUserID__ckMd5=88c61bdf82838c09; hit-new-style-dyn=0; rpdid=|(JlYJ~)mYlR0J'uYY)lmm|JR; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1669987755; CURRENT_BLACKGAP=0; PVID=2; CURRENT_FNVAL=4048; CURRENT_QUALITY=116; b_lsid=D103EA36C_184F58E8A22; innersign=0; SESSDATA=44228610%2C1686120725%2Cb1ff9%2Ac1; bili_jct=e98cece4de32cb77d4c752e880a7aaad; fingerprint=e2c32218ed2142da66b8ffd2cfb87306; sid=55iq6nci; bp_video_offset_86529541=737581592995692700; bsource=search_baidu; buvid_fp=e2c32218ed2142da66b8ffd2cfb87306"
        }

        if (page <= store.bangumiList.pn) {

        }
        GET('https://biliapi.crunl.cn/list',{
          params
        }).then(res => {
          if (res.status === 200){
            store.bangumiList = res.data.data

          } else if (res.status === 53013){
            ElMessage.error( '用户隐私设置未公开' )
          } else {
            ElMessage.error( '未知错误',res.statusText )
          }
          console.log(res)
        }).catch((err)=>{
          ElMessage.error(err)
        })
      },
    }
    onMounted(()=>{
      methods.getBangumi()
    })
return { store, state,changePage}
  }

}
</script>

<style scoped>
/*.time {*/
/*  font-size: 12px;*/
/*  color: #999;*/
/*}*/

.bottom {
  margin-top: 9px;
  margin-bottom: 4px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
  display: block;
}
</style>