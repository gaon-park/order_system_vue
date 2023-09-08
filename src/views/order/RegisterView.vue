<template>
    <div class="form-wrapper">
        <div class="input-group mb-3 mt-3">
            <label class="input-group-text" for="menuId">메뉴</label>
            <select class="form-select" id="menuId" v-model="menuId">
                <option v-for="menu in data" :key="menu.id" :value="menu.id">
                    {{ menu.name }}
                </option>
            </select>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="quantity">수량</label>
            <input id='quantity' type="number" class="form-control" v-model="quantity">
            <button class="btn btn-outline-secondary" type="button" @click="quantity++"> + </button>
            <button class="btn btn-outline-secondary" type="button" @click="quantity--; if (quantity < 1) quantity = 1;"> -
            </button>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">요청 사항</span>
            <textarea class="form-control" v-model="requestDetail"></textarea>
        </div>
        <div v-if="route.params.id" class="d-grid gap-2">
            <button class="btn btn-primary mb-3" @click="update">주문 수정하기</button>
        </div>
        <div v-else>
            <button class="btn btn-primary mb-3" @click="create">주문 등록하기</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '@/utils/axios'
import { useRouter, useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common'

const router = useRouter()
const route = useRoute()
const common = useCommonStore()

const data = ref([])
const menuId = ref(0)
const quantity = ref(1)
const requestDetail = ref('')

async function setOptions() {
    const { data: resData } = await api.menus.findAll()
    data.value = resData
}

async function update() {
    if (!menuId.value || !quantity.value) {
        alert('메뉴와 수량은 빈 값일 수 없습니다')
        return
    }

    const { data: resData } = await api.orders.update(
        route.params.id,
        menuId.value,
        quantity.value,
        requestDetail.value
    )
    if (resData.success) {
        alert(resData.message)
        router.push({ name: 'orders' })
    } else {
        alert(resData.message)
    }
}

async function create() {
    if (!menuId.value || !quantity.value) {
        alert('메뉴와 수량은 빈 값일 수 없습니다')
        return
    }

    const { data: resData } = await api.orders.create(
        menuId.value,
        quantity.value,
        requestDetail.value
    )
    if (resData.success) {
        alert(resData.message)
        router.push({ name: 'orders' })
    } else {
        alert(resData.message)
    }
}

setOptions()

async function getOrder() {
    const { data: resData } = await api.orders.findOne(route.params.id)
    menuId.value = data.value.find((o) => o.name === resData[0].name).id
    quantity.value = resData[0].quantity
    requestDetail.value = resData[0].request_detail
}

if (route.params.id) {
    common.changeTitle('주문 수정하기')
    getOrder()
} else {
    common.changeTitle('주문 등록하기')
}

</script>

<style lang="scss" scoped></style>