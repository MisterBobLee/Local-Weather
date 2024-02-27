<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- banner -->
        <div v-if="route.query.preview === 'true'" class="text-white p-4 bg-weather-secondary w-full text-center">
            <p>如果想要追蹤這座城市，請按下右上角的"+"。</p>
        </div>
        <!-- weather overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-8xl mb-2">{{ route.params.city }}</h1>
            <p class="text-xl mb-12">
                {{
                    new Date(weatherData.currentTime).toLocaleDateString("zh-TW",
                        {
                            weekday: "long",
                            day: "2-digit",
                            month: "long"
                        }
                    )
                }}
                {{
                    new Date(weatherData.currentTime).toLocaleTimeString("zh-TW",
                        {
                            timeStyle: "short"
                        }
                    )
                }}
            </p>
            <p class="text-8xl mb-8">
                &nbsp&nbsp&nbsp{{ Math.round(weatherData.current.temp) }}&#8451;
            </p>
            <div class="text-center text-xl">
                <p>體感溫度{{ Math.round(weatherData.current.feels_like) }}&deg;</p>
                <div>
                    <p v-if="sky === 'clear sky'">晴天</p>
                    <p v-else-if="sky === 'few clouds'">多雲時晴</p>
                    <p v-else-if="sky === 'scattered clouds'">多雲</p>
                    <p v-else-if="sky === 'broken clouds'">多雲時陰</p>
                    <p v-else-if="sky === 'overcast clouds'">陰天</p>
                    <p v-else-if="sky === 'light rain'">小雨</p>
                    <p v-else-if="sky === 'shower rain'">暫雨</p>
                    <p v-else-if="sky === 'rain'">大雨</p>
                    <p v-else-if="sky === 'thunderstorm'">雷雨</p>
                    <p v-else-if="sky === 'snow'">降雪</p>
                    <p v-else-if="sky === 'mist'">起霧</p>
                    <P v-else>{{ sky }}</P>
                </div>
                <img class="w-[150px] h-auto"
                    :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">
            </div>
        </div>

        <hr class="border-white border-opacity-30 border w-full">

        <!-- hourly weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4 text-2xl font-bold">每小時更新天氣</h2>
                <div class="flex gap-8 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col items-center">
                        <p class="whitespace-nowrap py-2">
                            {{
                                new Date(hourData.currentTime).toLocaleDateString("zh-TW",
                                    {
                                        day: "2-digit",
                                        month: 'short'
                                    }
                                )
                            }}
                        </p>
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourData.currentTime).toLocaleTimeString("zh-TW", { hour: 'numeric' })
                            }}
                        </p>
                        <img class="w-[50px] h-[75px] object-cover"
                            :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="">
                        <p class="text-xl pb-4">{{ Math.round(hourData.temp) }}&deg;</p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-30 border w-full">

        <!-- weekly weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4 text-2xl font-bold">每周預報</h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="text-xl py-1 px-3">
                        {{
                            new Date(day.dt * 1000).toLocaleDateString("zh-TW", { weekday: "long" })
                        }}
                    </p>
                    <img class="w-[50px] h-[50px] object-cover"
                        :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                    <div class="flex flex-1 gap-6 justify-end">
                        <p class="text-xl">最高溫: {{ Math.round(day.temp.max) }}&deg;</p>
                        <p class="text-xl">最低溫: {{ Math.round(day.temp.min) }}&deg;</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex text-2xl items-center gap-2 px-4 py-1 mb-10 text-white rounded-md cursor-pointer duration-150 hover:bg-red-500" @click="removeCity">
            <span class="text-4xl">&#10540;</span>
            <p>移除城市</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

function getRandomAwaitTime() {
  return Math.random() * (750) + 250;
}

const route = useRoute()
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`)
        const localOffset = new Date().getTimezoneOffset() * 60000
        const utc = weatherData.data.current.dt * 1000 + localOffset
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
        });

        await new Promise((res) => setTimeout(res, getRandomAwaitTime()))

        return weatherData.data
    } catch (err) {
        console.log(err)
    }
}
const weatherData = await getWeatherData()
console.log(weatherData)

const sky = weatherData.current.weather[0].description

const router = useRouter()
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'))
    const updatedCities = cities.filter((city) => city.id !== route.query.id)
    localStorage.setItem('savedCities', JSON.stringify(updatedCities))
    router.push({name: 'home'})
}
</script>