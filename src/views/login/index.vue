<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <img src="./logo_index.png" alt />
        <el-form-item prop="mobile">
          <!-- prop会使得校验规则 与 当前项目联系 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入校验码"></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
          <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // 注意：属性绑定、双向数据绑定的值需要通过data做支持
  data () {
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请无条件遵守规矩'))
    }
    return {
      // 定义表单数据对象
      loginForm: {
        mobile: '', // 手机号码
        code: '', // 验证码
        xieyi: '' // 协议
      },
      // 表单校验
      loginFormRules: {
        // 校验字段: [{ 规则 }, { 规则 }, { 规则 }]
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [
          { required: true, message: '验证码必填' }
        ],
        xieyi: [
          // { validator: 校验函数 }
          { validator: xieyiTest }
        ]
      }
    }
  },
  methods: {
    // 系统登录时进行全部校验
    login () {
      // console.log(this)
      // el-form组件获取：this.$refs.loginFormRef
      // 语法：this.$refs.loginFormRef.validate(回调函数)
      this.$refs.loginFormRef.validate(valid => {
        // vaild返回布尔值
        // console.log(valid)
        // 判断valid的值是true还是false，true就表示校验成功，页面跳转。false表示验证失败，不做处理
        if (valid) {
          var pro = this.$http.post('/authorizations', this.loginForm)
          pro
            .then(result => {
              console.log(result)
              if (result.data.message === 'OK') {
                window.sessionStorage.setItem('userinfor', JSON.stringify(result.data.data))
                this.$router.push('/home')
              }
            })
            .catch(err => {
              return this.$message.error('出现错误' + err)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: gray;
  background-image: url("./login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .login-box {
    .el-checkbox {
      margin-right: 10px;
      text-align: left;
    }
    width: 410px;
    height: 345px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
      margin: 20px auto;
    }
    .el-form {
      width: 75%;
    }
  }
}
</style>
