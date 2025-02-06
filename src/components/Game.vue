<template>
  <div class="game-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div class="game-rules" v-if="gameSate === 0">
      <h2>Need to cool off?</h2>
      <h4>Here are the rules:</h4>

      <ul class="rules-list">
        <li>There are 20 unique pictures</li>
        <li>Click each picture only once!</li>
        <li>Click all 20 pictures to win!</li>
      </ul>

      <button @click="gameSate = 1">Start Game</button>
    </div>
    <div class="round-display" v-if="gameSate === 1">
      <h4>Round: {{ round }} / 20</h4>
    </div>
    <div class="game" v-if="gameSate === 1">
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
import { ref } from 'vue';
import { useGameStore } from '@/stores/GameStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const gameSate = ref(0);

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
      gameSate,
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
  justify-content: flex-start; /* Centers content vertically */
  background-color: white;
  min-height: 100vh; /* Ensure it takes the full viewport height */
  width: 100vw;
}

.game-rules {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
}

.rules-list {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
  font-size: 24px;
}

li {
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 1rem;
}

button {
  padding: 1rem 2rem;
  font-size: 24px;
  background-color: #cc924b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
  transform: scale(1.05);
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
  cursor: pointer;
}

.game-img img {
  border-radius: 12px;
}
</style>
