<template>
  <div id="app">
    <header class="app-header">
      <h2>{{ common.title }}</h2>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="app-footer">
      <div class="footer-text">ALL right reserved</div>
      <RouterLink :to="{ name: 'menus-home' }">관리자페이지(메뉴)</RouterLink>
      <br />
      <RouterLink :to="{ name: 'home' }">메인페이지(주문)</RouterLink>
    </footer>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common'

const common = useCommonStore()
common.changeTitle('SSAFY-CAFE')
</script>

<style scoped>
.app-header,
.app-footer {
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  text-align: center;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100wh;
}

.app-main {
  flex: 1;
}
</style>