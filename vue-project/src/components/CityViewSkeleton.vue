<template>
    <div class="flex flex-col flex-1">
        <!-- Overview -->
        <div class="flex flex-col py-12 items-center">
            <AnimatedPlaceHolder class="max-w-[300px] h-[96px] w-full mb-1" />
            <AnimatedPlaceHolder class="max-w-[240px] h-[28px] w-full mb-12" />
            <AnimatedPlaceHolder class="max-w-[140px] h-[96px] w-full mb-8" />
            <AnimatedPlaceHolder class="max-w-[300px] h-[28px] w-full" />
            <AnimatedPlaceHolder class="max-w-[300px] h-[28px] w-full" />
        </div>
        <!-- Hourly -->
        <div class="flex flex-col py-12 px-8 items-center">
            <AnimatedPlaceHolder class="max-w-screen-md h-[100px] w-full mb-12 " />
        </div>
        <!-- Weekly -->
        <div class="flex flex-col py-12 px-8 items-center">
            <AnimatedPlaceHolder class="max-w-screen-md h-[100px] w-full mb-12" />
        </div>
    </div>
</template>
  
<script setup>
import AnimatedPlaceHolder from "./AnimatedPlaceHolder.vue";
</script>