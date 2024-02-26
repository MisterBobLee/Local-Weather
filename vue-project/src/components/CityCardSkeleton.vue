<template>
    <div class="flex py-3 px-3 bg-weather-secondary rounded-md shadow-md hover:bg-weather-tertiary">
        <div class="flex flex-col flex-1 gap-4">
            <AnimatedPlaceHolder class="max-w-[60%] text-2xl"/>
            <AnimatedPlaceHolder class="max-w-[40%] text-sm"/>
        </div>

        <div class="flex flex-col items-end flex-1 gap-4">
            <AnimatedPlaceHolder class="max-w-[165px] w-full text-2xl"/>
            <AnimatedPlaceHolder class="max-w-[170px] w-full text-sm"/>
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceHolder from './AnimatedPlaceHolder.vue';


</script>
