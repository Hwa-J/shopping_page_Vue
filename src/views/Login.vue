<template>
  <div class="login">
    <h1>로그인</h1>
    <form
      class="login-form"
      @submit.prevent>
      <input
        v-model="email"
        class="user-id input"
        type="text"
        placeholder="아이디 또는 이메일을 입력해주세요."
        required />
    
      <input
        v-model="password"
        class="user-password input"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        required />
    
      <input
        class="btn main-color"
        type="submit"
        value="로그인"
        @click="login" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '123@123.com',
      password: 'test123123'
    }
  },
  methods: {
    async login() {
    await this.$store.dispatch('auth/login', this.$data)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    .input {
      margin: 8px 0;
    }
  }
}

input {
  width: 300px;
}
</style>
