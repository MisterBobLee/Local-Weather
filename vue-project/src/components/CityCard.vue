<template>
    <div class="flex py-3 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer hover:bg-weather-tertiary">
        <div class="flex flex-col flex-1">
            <h2 class="text-3xl pb-2">{{ city.city }}</h2>
            <h3>{{ city.state }}</h3>
        </div>

        <div class="felx flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(city.weather.main.temp) }}&#8451;
            </p>
            <div class="flex gap-2">
                <span class="text-base pt-2">
                    最高溫: {{ Math.round(city.weather.main.temp_max)  }}&deg;
                </span>
                <span class="text-base pt-2">
                    最低溫: {{ Math.round(city.weather.main.temp_min)  }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        city: {
            type: Object,
            default: () => {}
        }
    })
</script>
