<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="emit('close')">✕</button>

      <img :src="pokemon.image" :alt="pokemon.name" class="modal-img" />

      <h2 class="modal-title">
        {{ pokemon.name }}
      </h2>

      <div class="pokemon-info">
        <div class="info-card">
          <span class="label">Altura</span>
          <span class="value">{{ pokemon.height }}</span>
        </div>

        <div class="info-card">
          <span class="label">Peso</span>
          <span class="value">{{ pokemon.weight }}</span>
        </div>
      </div>

      <h3 class="section-title">Tipos</h3>

      <div class="types">
        <span
          v-for="type in pokemon.types"
          :key="type"
          class="type-badge"
        >
          {{ type }}
        </span>
      </div>

      <h3 class="section-title">Estadísticas</h3>

      <div
        v-for="stat in pokemon.stats"
        :key="stat.name"
        class="stat-item"
      >
        <div class="stat-header">
          <span class="stat-name">{{ stat.name }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>

        <div class="stat-bar">
          <div
            class="stat-fill"
            :style="{ width: stat.value + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: Object
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 30px;
  color: white;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: crimson;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.modal-img {
  width: 180px;
  display: block;
  margin: 0 auto 15px;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
}

.modal-title {
  text-align: center;
  text-transform: capitalize;
  font-size: 32px;
  margin-bottom: 25px;
}

.pokemon-info {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.info-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 15px;
  text-align: center;
}

.label {
  display: block;
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 5px;
}

.value {
  font-size: 20px;
  font-weight: bold;
}

.section-title {
  margin-bottom: 12px;
  font-size: 20px;
}

.types {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.type-badge {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 8px 14px;
  text-transform: capitalize;
  font-size: 14px;
}

.stat-item {
  margin-bottom: 18px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.stat-name {
  text-transform: capitalize;
}

.stat-value {
  font-weight: bold;
}

.stat-bar {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 30px;
  background: linear-gradient(to right, #00f260, #0575e6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .modal-content {
    padding: 20px;
  }

  .pokemon-info {
    flex-direction: column;
  }

  .modal-title {
    font-size: 26px;
  }

  .modal-img {
    width: 140px;
  }
}
</style>