<template>
    <div class="list-group mt-3 mb-3">
        <div v-for="order in orders" class="list-group-item list-group-item-action" @click="router.push({
            name: 'order-detail',
            params: {
                id: order.id
            }
        })">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ order.name }}</h5>
                <span style="font-weight: bold;">{{ order.quantity }}개</span>
            </div>
            <p class="mb-1">{{ order.request_detail }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCommonStore } from '@/stores/common'
import { api } from '@/utils/axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const common = useCommonStore()
const orders = ref([])

async function getOrders() {
    const { data } = await api.orders.findAll()
    orders.value = data
}
getOrders()

common.changeTitle('주문 전체 확인')
</script>

<style scoped></style>