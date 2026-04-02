import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    favorites: [],
    darkMode: false,
    search: ''
  }),

  actions: {
    addFavorite(pokemon) {
      const exists = this.favorites.find(p => p.id === pokemon.id)

      if (!exists) {
        this.favorites.push(pokemon)
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(p => p.id !== id)
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },

    setSearch(value) {
      this.search = value
    }
  },

  persist: true
})