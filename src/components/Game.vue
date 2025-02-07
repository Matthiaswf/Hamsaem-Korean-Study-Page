<template>
  <div class="game-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div class="game-rules" v-if="gameSate === 0">
      <h2>Need to cool off ?</h2>
      <h4>Here are the rules:</h4>

      <ul class="rules-list">
        <li>There are 20 unique pictures</li>
        <li>Click each picture only once!</li>
        <li>Click all 20 pictures to win!</li>
      </ul>

      <button @click="startGame">Start Game</button>
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
    <div class="game-result" v-if="gameSate === 2">
      <h2>Game Over!</h2>
      <img class="result-img" src="@/assets/icons/cats/tears.svg" alt="" />
      <button @click="gameSate = 1">Play Again</button>
    </div>
    <div class="game-result" v-if="gameSate === 3">
      <h2>You Win!</h2>
      <img class="result-img" src="@/assets/icons/cats/party.svg" alt="" />
      <button @click="gameSate = 1">Play Again</button>
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
    const { images, selectedImages, round, loading } = storeToRefs(gameStore);
    gameStore.getImages();

    function startGame() {
      gameStore.resetGame();
      gameStore.shuffleImages();
      gameSate.value = 1;
    }

    function selectImage(id) {
      if (selectedImages.value.includes(id)) {
        gameLost = true;
        gameStore.resetGame();
        gameStore.shuffleImages();
        gameSate.value = 2;
        return;
      } else {
        gameStore.selectImage(id);
        gameStore.incrementRound();
        if (round.value === 20) {
          gameSate.value = 3;
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
      startGame,
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
  background-color: #fff;
  min-height: 100vh;
  width: 100vw;
  padding-bottom: 10px;
}

.game-rules,
.game-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  text-align: center;
}

.rules-list {
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
  font-size: 24px;
}

h2 {
  margin-bottom: 1rem;
  font-size: 28px;
  font-weight: bold;
}

h4 {
  margin-bottom: 1em;
  font-size: 22px;
  font-weight: 500;
}

button {
  min-width: 150px;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  box-shadow: 0 5px #444;
  position: relative;
}

button:hover {
  background: #000;
  color: #fff;
}

button:active {
  top: 5px;
  box-shadow: 0 2px #444;
}

ul {
  text-align: left;
}

li {
  margin-bottom: 0.5rem;
}

.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  max-width: 1200px;
}

.game-img {
  width: 200px;
  height: 200px;
  border: 8px solid;
  border-image: linear-gradient(
      to bottom,
      rgba(121, 64, 45, 1) 0%,
      rgba(214, 190, 170, 1) 100%
    )
    1;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.game-img img {
  max-width: 100%;
  max-height: 100%;
}

.result-img {
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
}
</style>
