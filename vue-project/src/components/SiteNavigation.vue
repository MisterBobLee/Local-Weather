<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <span class="text-3xl">&#8451;</span>
                    <p class="text-2xl">當地天氣</p>
                </div>
            </RouterLink>
            <div class="flex gap-6 flex-1 justify-end">
                <span class="text-3xl hover:text-weather-secondary duration-300 cursor-pointer"
                    @click="toggleModal">&#8505;</span>
                <span class="text-3xl hover:text-weather-secondary duration-300 cursor-pointer" @click="addCity"
                    v-if="route.query.preview === 'true'">&#43;</span>
            </div>
            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">關於:</h1>
                    <p class="mb-4">
                        尋找你要得城市，你會找到當天以及未來的天氣資訊。
                    </p>
                    <h2 class="text-2xl">如何操作:</h2>
                    <ol class="list-decimal list-outside mb-4 mx-8">
                        <li>
                            在搜尋欄尋找你要的城市。
                        </li>
                        <li>
                            選擇你在搜尋欄想要查看的城市。
                        </li>
                        <li>
                            如果想要追蹤城市資訊的話，請點擊左上角的"+"。
                        </li>
                    </ol>
                    <h2 class="text-2xl">移除已追蹤的城市</h2>
                    <p>
                        如果你想要移除已追蹤的城市，點選城市，並畫到頁面最下方，點擊"移除城市"。
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'uid'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const addCity = () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"))
    }

    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng
        }
    }
    savedCities.value.push(locationObj)
    localStorage.setItem("savedCities", JSON.stringify(savedCities.value))

    let query = Object.assign({}, route.query)
    delete query.preview
    query.id = locationObj.id
    router.replace({ query })
}

const modalActive = ref(null)
const toggleModal = () => {
    modalActive.value = !modalActive.value
}
</script>
