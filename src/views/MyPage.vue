<template>
  <main>
    <MyPageLNB>
      <h2>마이페이지</h2>
      <RouterLink
        to="/my-page/update"
        class="list-item">
        회원정보
      </RouterLink>
      <RouterLink
        to="/my-page/account"
        class="list-item">
        계좌정보
      </RouterLink>
    </MyPageLNB>
    <div class="viewspace">
      <RouterView />
    </div>
  </main>
</template>

<script>
import MyPageLNB from '~/components/MyPageLNB'

export default {
  components: { MyPageLNB }
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  height: 100vh;  
  .list-item {
    padding: 8px 0;
  }
  .viewspace {
    padding: 34px 50px;
    display: flex;
    flex-direction: column;
  }
}
</style>
