<template>
    <div class="card mb-2" v-if="data">
        <img :src="setImage()" alt="" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ data.name }}</h5>
            <p class="card-text">{{ data.description }}</p>
            <button class="btn btn-primary" @click="moveRegister">수정하기</button>
            <button class="btn btn-danger" @click="deleteMenu">삭제</button>
            <button class="btn btn-outline-primary" @click="moveList">목록</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '@/utils/axios'

const router = useRouter()
const route = useRoute()
const data = ref(null)

async function getMenu() {
    const { data: resData } = await api.menus.findOne(route.params.id)
    data.value = resData
}

function setImage() {
    return `http://ondol.o-r.kr:8080/public/${data.value.image_src}`
}

function moveRegister() {
    router.push({
        name: 'menus-update',
        params: { id: route.params.id }
    })
}

async function deleteMenu() {
    const confirmResult = confirm('삭제하시겠습니까?')
    if (!confirmResult) return
    
    const { data:resData } = await api.menus.delete(route.params.id)
    if (resData.success) {
        alert(resData.message)
        router.push({
            name: 'menus'
        })
    } else {
        alert(resData.message)
    }
}

function moveList() {
    router.push({
        name: 'menus'
    })
}

getMenu()
</script>

<style scoped></style>