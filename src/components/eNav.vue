<template>
  <el-affix :offset="20">
    <div class="top-nav-wrapper">
      <div class="top-nav">
        <div class="nav-left">
          <div class="logo">
            <router-link to="/">
              <img
                  width="75"
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-90b49633-e3ed-4910-b066-7bcc14cbf4b0/031ac7ad-c779-40a8-9b14-d6e963fcbf85.svg"

               alt=""/>
            </router-link>

          </div>
        </div>
        <div class="right">
          <div v-show="!store.is_login" @click="(store.loginForm = true)">
            <el-avatar :size="35" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          </div>
          <el-dropdown v-show="store.is_login">
    <span  class="el-dropdown-link">
      <el-avatar  :size="35" :src="store.user.head_img"/>
    </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="methods.goSetting()">系统设置</el-dropdown-item>
                <el-dropdown-item disabled>系统设置</el-dropdown-item>
                <el-dropdown-item @click="methods.loginOut()" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

      </div>
      <!-- 模态框登录注册框 -->
      <el-dialog v-model="store.loginForm" title="登录" width="350px">
        <el-form model="loginForm" label-position="top">
          <el-form-item label="用户名" label-width="75px">
            <el-input v-model="store.account"  autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" label-width="75px">
            <el-input
                v-model="store.password"
                type="password"
                placeholder="Please input password"
                show-password
            />
          </el-form-item>
          <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="Please select a zone">
              <el-option label="Zone No.1" value="shanghai" />
              <el-option label="Zone No.2" value="beijing" />
            </el-select>
          </el-form-item> -->
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button> -->
        <el-button type="primary" @click="(methods.login)">
          登录
        </el-button>
      </span>
        </template>
      </el-dialog>
      <!-- 模态框结束 -->
    </div>
  </el-affix>
</template>

<script>
import router from "../router/Index.js";
import {ElLoading, ElMessage} from "element-plus";
import {inisHelper} from "../utils/helper/helper.js";
import {useAuthStore} from "../store/Auth.js";
import {onMounted} from "vue";
import {Post} from "../utils/http/fetch.js";

export default {
  name: "eNav",
  setup(){
    const store = useAuthStore()

    let login_storage = inisHelper.get.storage("auth")
    if (login_storage !== "expire" && login_storage !== false){
      store.user = login_storage.user
      store.is_login = true
    }
    store.$patch({
      account: '',
      password: '',
    })
    const methods = {
      login(){
        let account = store.account
        let password = store.password
        if (inisHelper.is.empty(account)){
          ElMessage({
            message: '用户名不能为空~！',
            type: 'warning',
          })
        }else if (inisHelper.is.empty(password)){
          ElMessage({
            message: '密码不能为空~！',
            type: 'warning',
          })
        } else{
          Post('users/login', {
            account: store.account,
            password: store.password
          }).then((res) => {
            if (res.code === 200){
              // store.user = res.data.user
              // store.is_login = true
              // store.loginForm = false
              store.$patch ({
                user: res.data.user,
                is_login: true,
                loginForm: false
              })
              res.data.time = 7200
              const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.5)',
              })
              setTimeout(() => {
                loading.close()
                ElMessage({
                  message: '登陆成功!',
                  type: 'success',
                })
              }, 2000)
              setTimeout(() =>{
                location.reload()
              },2500)
              inisHelper.set.storage('auth',res.data)


            } else
              ElMessage({
                message: res.msg,
                type: 'success',
              })

          })
        }
      },

      loginOut() {
        store.is_login = false
        window.localStorage.removeItem('auth')
      },
      goSetting() {
        router.push('setting')
      }
    }
    onMounted(() =>{
      // methods.getmusic()
    })
    return { methods, store}

  }
}
</script>

<style scoped>
.top-nav-wrapper {
  width: 100%;
  height: 100%;
}

.top-nav-wrapper .top-nav {
  margin: 0 auto;
  width: 75rem;
  max-width: 75rem;
  padding: 2.5px 1rem 0;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  border-radius: 5rem;
  align-items: center;
  background-color: black;
}
.right {
  margin: 0;
  padding: 0;
}
</style>