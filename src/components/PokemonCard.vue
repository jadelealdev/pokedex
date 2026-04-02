<template>
  <div class="pokemon-card" @click="$emit('select', pokemon)">
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img" />

    <h2>{{ pokemon.name }}</h2>

    <div class="types">
      <span
        v-for="type in pokemon.types"
        :key="type"
        class="type-badge"
        :style="{ backgroundColor: typeColors[type] || '#999' }"
      >
        {{ type }}
      </span>
    </div>

    <button class="favorite-btn" @click.stop="$emit('favorite', pokemon)">
      ⭐ Favorito
    </button>
  </div>
</template>

<script setup>
defineProps({
  pokemon: Object
})

const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8'
}
</script>