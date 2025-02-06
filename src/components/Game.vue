<template>
  <div class="game-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="game" v-for="image in images" :key="image.id">
        <img :src="image.url" alt="game" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useGameStore } from '@/stores/GameStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const gameStore = useGameStore();

    // Turns them into Refs so we can use images
    const { images, loading } = storeToRefs(gameStore);

    // Get the images
    gameStore.getImages();

    console.log(images);

    return {
      images,
      loading,
    };
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Arial', sans-serif;
  background-color: white;
  padding: 30px;
  min-height: 100vh;
  width: 100vw;
}
</style>
