<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="titile">系统登录</h3>
      </div>
      <!-- <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon className="user" />
        </span>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item> -->

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-button type="parim" @click="submit()">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from '@vue/composition-api';
import { login } from '@/api';
export default {
  setup(props, context) {
    // 声明单一对象时使用
    const loginForm = reactive({ username: '', password: '' });
    const loginRules = reactive({});
    // 声明基础数据类型
    const model = ref('login');
    console.log(loginForm, '------------');
    console.log(model.value, '------------', props, context);
    const submit = () => {
      login.user({ user: 'admin', pwd: 'e99a18c428cb38d5f260853678922e03' }).then(res => {
        console.log(res, '===');
      });
    };
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {

    });

    return {
      loginForm,
      loginRules,
      model,
      submit
    };
  }
  // components: {},
  // props: {},
  // data() {
  //   return {};
  // },
  // computed: {},
  // watch: {},
  // created() {},
  // mounted() {},
  // methods: {}
};
</script>
<style lang="scss" scoped>
.svg-container {
  padding: 6px 5px 6px 15px;
  // color: red;
  vertical-align: middle;
  width: 300px;
  display: inline-block;
}
button {
  // &:focus {
  //   color: mix($--color-white, $--color-primary, $--button-hover-tint-percent);
  //   border-color: transparent;
  //   background-color: transparent;
  // }
  // &:active {
  //   color: mix(
  //     $--color-black,
  //     $--color-primary,
  //     $--button-active-shade-percent
  //   );
  //   border-color: transparent;
  //   background-color: transparent;
  // }
}
</style>
