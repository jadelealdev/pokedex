<template>
  <div :class="['container', { 'dark-mode': store.darkMode }]">
    <div class="header">
        <h1 class="title">Pokédex</h1>

        <div class="favorites-icon" @click="showFavorites = !showFavorites">
         ❤️
        <span class="favorites-count">{{ store.favorites.length }}</span>
      </div>
    </div>

    <div class="top-bar">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar Pokémon..."
        class="search-input"
      />

      <button class="dark-btn" @click="store.toggleDarkMode()">
        {{ store.darkMode ? '☀️ Claro' : '🌙 Oscuro' }}
      </button>
    </div>
       <div v-if="showFavorites" class="favorites-panel">
        <button class="back-home-btn" @click="showFavorites = false">
  ← Volver al inicio
</button>
  <h2>Mis Favoritos</h2>

  <div v-if="store.favorites.length === 0">
    No has agregado favoritos
  </div>

  <div class="favorites-grid">
    <div
      v-for="pokemon in store.favorites"
      :key="pokemon.id"
      class="favorite-item"
    >
      <img :src="pokemon.image" :alt="pokemon.name" />
      <p>{{ pokemon.name }}</p>

      <button @click="store.removeFavorite(pokemon.id)">
        Eliminar
      </button>
    </div>
  </div>
</div>
    <div class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @favorite="store.addFavorite"
        @select="selectedPokemon = $event"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage">Anterior</button>
      <button @click="nextPage">Siguiente</button>
    </div>

    <PokemonModal
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      @close="selectedPokemon = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'
import PokemonModal from '../components/PokemonModal.vue'
import { getPokemons, getPokemonDetail } from '../services/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore'

const store = usePokemonStore()

const pokemons = ref([])
const selectedPokemon = ref(null)
const search = ref('')
const page = ref(0)
const showFavorites = ref(false)

const loadPokemons = async () => {
  const data = await getPokemons(12, page.value * 12)

  const detailedPokemons = await Promise.all(
    data.map(async (pokemon) => {
      const details = await getPokemonDetail(pokemon.name)

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
        types: details.types.map(t => t.type.name),
        height: details.height,
        weight: details.weight,
        stats: details.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      }
    })
  )

  pokemons.value = detailedPokemons
}

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const nextPage = () => {
  page.value++
  loadPokemons()
}

const prevPage = () => {
  if (page.value > 0) {
    page.value--
    loadPokemons()
  }
}

onMounted(() => {
  loadPokemons()
})
</script>