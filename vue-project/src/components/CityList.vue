<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0" class="text-2xl">
        目前還沒有追蹤的城市。
    </p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useRouter } from 'vue-router';

function getRandomAwaitTime() {
    return Math.random() * (750) + 250;
}

const savedCities = ref([])
const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'))

        const request = []
        savedCities.value.forEach((city) => {
            request.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`))
        })
        
        const weatherData = await Promise.all(request)

        await new Promise((res) => setTimeout(res, getRandomAwaitTime()))

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data
        })
    }
}
await getCities()

const router = useRouter()
const goToCityView = (city) => {
    router.push({
        name: 'cityView',
        params: { state: city.state, city: city.city },
        query: { id: city.id,
                 lat: city.coords.lat, 
                 lng: city.coords.lng,
                }
    })
}
</script>
