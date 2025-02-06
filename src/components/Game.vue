<template>
  <div class="game-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div class="round-display" v-else>
      <h4>Round: {{ round }} / 20</h4>
    </div>
    <div class="game">
      <div
        class="game-img"
        v-for="image in images"
        :key="image.id"
        @click="selectImage(image.id)"
      >
        <img :src="image.src" :alt="'Game Image ' + image.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/GameStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    let gameLost = false;

    const gameStore = useGameStore();

    // Turns them into Refs so we can use images
    const { images, selectedImages, round, loading } = storeToRefs(gameStore);

    // Get the images
    gameStore.getImages();

    function selectImage(id) {
      if (selectedImages.value.includes(id)) {
        gameLost = true;
        gameStore.resetGame();
        gameStore.shuffleImages();
        console.log('Game Over');
        return;
      } else {
        gameStore.selectImage(id);
        gameStore.incrementRound();
        if (round.value === 20) {
          console.log('Win');
        }
        gameStore.shuffleImages();
      }
    }

    return {
      images,
      loading,
      round,
      selectImage,
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

h4 {
  margin-bottom: 1em;
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
