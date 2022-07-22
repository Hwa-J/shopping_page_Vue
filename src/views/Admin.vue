<template>
  <main>
    <MyPageLNB>
      <h2>관리자</h2>
      <RouterLink
        to="/admin/products"
        class="list-item">
        전체 상품 조회
      </RouterLink>
      <RouterLink
        to="/admin/product/add"
        class="list-item">
        상품 추가
      </RouterLink>
    </MyPageLNB>
    <div class="viewspace">
      <RouterView />
    </div>
  </main>
</template>

<script>
import MyPageLNB from '../components/MyPageLNB.vue'
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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
