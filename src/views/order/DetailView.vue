<template>
    <div class="card mt-3 mb-3" v-if="data">
        <div class="card-header">
            {{ data.name }}
            &nbsp;&nbsp;<span style="font-weight: bold">{{ data.quantity }}개</span>
        </div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>요청 사항 </p>
                <footer class="blockquote-footer">{{ data.request_detail }}</footer>
            </blockquote>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="moveRegister">수정하기</button>
            <button class="btn btn-danger" @click="deleteMenu">삭제</button>
            <button class="btn btn-outline-primary" @click="moveList">목록</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useCommonStore} from '@/stores/common'
import { api } from '@/utils/axios'

const router = useRouter()
const route = useRoute()
const data = ref(null)
const common = useCommonStore()

common.changeTitle('주문 상세 확인')

async function getOrder() {
    const { data: resData } = await api.orders.findOne(route.params.id)
    data.value = resData[0]
    console.log(data.value)
}

function moveRegister() {
    router.push({
        name: 'order-update',
        params: { id: route.params.id }
    })
}

async function deleteMenu() {
    const confirmResult = confirm('삭제하시겠습니까?')
    if (!confirmResult) return

    const { data: resData } = await api.orders.delete(route.params.id)
    if (resData.success) {
        alert(resData.message)
        router.push({
            name: 'orders'
        })
    } else {
        alert(resData.message)
    }
}

function moveList() {
    router.push({
        name: 'orders'
    })
}

getOrder()
</script>

<style scoped></style>