<template>
  <div class="signup">
    <h2>회원가입</h2>
    <form
      class="signup-form"  
      @submit.prevent>
      <div class="input-wraper">
        <div class="input-title">
          이름<span>*</span>
        </div>
        <input
          v-model.trim="displayName"
          class="input"
          type="text"
          placeholder="이름을 입력하세요."
          maxlength="20"
          required />
      </div>
      <div class="input-wraper">
        <div class="input-title">
          이메일<span>*</span>
        </div>
        <input
          v-model.trim="email"
          class="input"
          type="email"
          pattern=".+@.+\.com"
          placeholder="이메일을 입력하세요."
          required />
      </div>
      <div class="input-wraper">
        <div class="input-title">
          비밀번호<span>*</span>
        </div>
        <input
          ref="password"
          v-model.trim="password"
          class="input"
          type="password"
          placeholder="비밀번호를 8자 이상 입력해 주세요."
          minlength="8"
          required
          @change="confirmPassword" />
      </div>
      <div class="input-wraper">
        <div class="input-title">
          비밀번호 확인<span>*</span>
        </div>
        <input
          ref="confirm_password"
          class="input"
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요."
          minlength="8"
          required
          @input="confirmPassword" />
      </div>
      <div class="input-wraper">
        <div class="input-title">
          프로필
        </div>
        <img
          v-if="profileImgBase64"
          width="100"
          :src="profileImgBase64"
          alt="profile" />
        <div class="profileImgBase64"></div>
        <input
          type="file"
          @change="selectImage" />
      </div>
      <input
        type="submit"
        value="회원가입"
        class="btn main-color"
        @click="signup" />
    </form>
  </div>
</template>

<script>
export default {
    data() {
    return {
      email: '',
      password: '',
      displayName: '',
      profileImgBase64: ''
    }
  },
  methods: {
    async signup() {
      await this.$store.dispatch('auth/signup', this.$data)
    },
    confirmPassword(){
      if(this.$refs.password.value !== this.$refs.confirm_password.value) {
        this.$refs.confirm_password.setCustomValidity('비밀번호가 일치하지 않습니다.')
      }
    },
    selectImage(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.profileImgBase64 = e.target.result
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  &-form {
    padding: 20px;
  }
}
</style>

