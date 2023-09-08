<template>
    <div class="form-wrapper">
        <div>
            <span>메뉴 이름: </span>
            <input type="text" v-model="name">
        </div>
        <div>
            <span>메뉴 설명: </span>
            <input type="text" v-model="description">
        </div>
        <input type="file" @change="fileChange">
        <div v-if="route.params.id">
            <button @click="menuUpdate">메뉴 수정하기</button>
            <button @click="updateImage">이미지 수정하기</button>
        </div>
        <div v-else>
            <button @click="menuCreate">메뉴 추가하기</button>
        </div>
    </div>
    <div class="image-wrapper" v-if="file">
        <img :src="setURL(file)" alt="" class="selected-image">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCommonStore } from '@/stores/common'
import { useRouter, useRoute } from 'vue-router'
import { api } from '@/utils/axios'

const route = useRoute()
const router = useRouter()
const name = ref('')
const description = ref('')
const file = ref(null)
const common = useCommonStore()

async function getMenus() {
    const { data } = await api.menus.findOne(route.params.id)
    name.value = data.name
    description.value = data.description
}

async function menuUpdate() {
    const { data } = await api.menus.update(
        route.params.id,
        name.value,
        description.value
    )
    alert(data.message)
    router.push({
        name: 'menus-detail',
        params: { id: route.params.id }
    })
}

async function updateImage() {
    const { data } = await api.menus.updateImage(
        route.params.id,
        file.value
    )
    alert(data.message)
}

if (route.params.id) {
    common.changeTitle('메뉴 수정하기')
    getMenus()
} else {
    common.changeTitle('메뉴 추가하기')
}

function fileChange(e) {
    file.value = e.target.files[0]
}

async function menuCreate() {
    if (!name.value || !description.value || !file.value) {
        alert('빈 값')
        return;
    }

    const { data } = await api.menus.create(
        name.value,
        description.value,
        file.value
    )
    if (data.success) {
        alert(data.message)
        router.push({ name: 'menus' })
    } else {
        alert(data.message)
    }
}

function setURL(file) {
    const imageURL = URL.createObjectURL(file)
    return imageURL
}
</script>

<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    border: 1px solid black;
    padding: 20px;
}

.form-wrapper>* {
    margin: 10px;
}

.image-wrapper {
    margin-top: 30px;
    border: 1px solid black;
}

.selected-image {
    width: 100%;
}
</style>