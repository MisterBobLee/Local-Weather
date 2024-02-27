<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="搜尋您想要查詢的城市" v-model="searchQuery" @input="getSearchResults"
        class="py-2 px-1 w-full bg-weather-secondary border-y-2 focus:outline-none focus:shadow-[0px_2px_0_0_#F3FF00]">
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66]" v-if="mapboxSearchResults">
        <p v-if="searchError">抱歉!發生錯誤，請再試一次。</p>
        <p v-if="!serverError && mapboxSearchResults.length === 0">沒有結果。</p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-2">
      <Suspense>
        <CityList />
        <template #fallback>
          <div v-if="cities !== null">
            <div v-for="i in cities.length" class="mb-2">
              <CityCardSkeleton />
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

var cities = null

function skeletonList() {
  cities = JSON.parse(localStorage.getItem("savedCities"))
}
skeletonList()

const router = useRouter()

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',')
  let citiesExist = true
  if (cities !== null) {
    const citiesIter = cities.values()

    for (let i = 0; i < cities.length; i++) {
      const citiesInLocal = citiesIter.next().value.city
      if (searchResult.text !== citiesInLocal) {
        citiesExist = true
      } else {  
        citiesExist = false
        break
      }
    }
  }

  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: citiesExist
    }
  })

}

const mapboxAPIKey = 'pk.eyJ1IjoiYXNkbGVlbXJib2JsZWU1MjAyIiwiYSI6ImNsc3ZocnJnajJoZ2UycXRnem4yd25wbmcifQ.F-rB8tjl8sSwJEJxOMm7jQ'
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(searchQuery.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`)
        mapboxSearchResults.value = result.data.features
      } catch {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}


</script>