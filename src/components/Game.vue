<template>
  <div class="game-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div class="game" v-else>
      <div class="game-img" v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="'Game Image ' + index" />
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue';
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Arial', sans-serif;
  background-color: white;
  min-height: 100vh;
  width: 100vw;
}

.game {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  max-width: 1200px;
}

.game-img {
  width: 200px;
  height: 200px;
  border: 8px solid #ddc5b0;
  border-radius: 20px;
}

.game-img img {
  border-radius: 12px;
}
</style>
