<template>
    <RouterLink :to="{ name: 'menus-register' }">
        <button class="order-button btn btn-outline-dark w-100">
            메뉴 추가하기
        </button>
    </RouterLink>
    <ul>
        <li v-for="menu in menus" :key="menu.id" @click="moveDetail(menu.id)">
            <div class="menu-container">
                <div class="menu-image" :style="`background-image: url(${setImage(menu.image_src)})`"></div>
                <div class="menu-info-wrapper">
                    <h2 class="menu-name">{{ menu.name }}</h2>
                    <p class="menu-description">{{ menu.description }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useCommonStore } from '@/stores/common'
import { api } from '@/utils/axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const common = useCommonStore()
const menus = ref([])

async function getMenus() {
    const { data } = await api.menus.findAll()
    menus.value = data
}

function setImage(image_src) {
    return `http://ondol.o-r.kr:8080/public/${image_src}`
}

function moveDetail(id) {
    router.push({
        name: 'menus-detail',
        params: { id }
    })
}

common.changeTitle('메뉴 목록')
getMenus()
</script>

<style scoped>
.menu-container {
    display: flex;
    align-items: center;
    border-bottom: 3px solid black;
}

.menu-info-wrapper {
    margin: 0 auto;
    text-align: center;
}

.menu-name {
    font-size: 25px;
    font-weight: bold;
}

.menu-description {
    padding-top: 10px;
}

.menu-image {
    background-size: cover;
    background-position: center;
    width: 180px;
    height: 180px;
}
</style>