<template>
  <div class="home-container">
    <!-- Filter Nav -->
    <nav class="filter">
      <button
        @click="setLevel('topik1')"
        :class="{ active: selectedLevel === 'topik1' }"
      >
        Topik I
      </button>
      <button
        @click="setLevel('topik2')"
        :class="{ active: selectedLevel === 'topik2' }"
      >
        Topik II
      </button>
      <button @click="setGame(true)" :class="{ active: isPlaying === true }">
        Hamgopalooza
      </button>
    </nav>
    <ChoiceQuiz v-if="levelData && !isPlaying" :levelData="levelData" />
    <Game v-else-if="isPlaying" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';
import ChoiceQuiz from '@/components/ChoiceQuiz.vue';
import Game from '@/components/Game.vue';

export default {
  components: {
    ChoiceQuiz,
    Game,
  },
  setup() {
    const topikStore = useTopikStore();
    const { levelData } = storeToRefs(topikStore); // Ensures reactivity
    const selectedLevel = ref(null); // Track active level
    const isPlaying = ref(false); // Track game state

    function setLevel(level) {
      selectedLevel.value = level; // Set active level

      if (level === 'topik1') {
        topikStore.loadTopik1();
        isPlaying.value = false;
      } else if (level === 'topik2') {
        topikStore.loadTopik2();
        isPlaying.value = false;
      }
    }

    function setGame(value) {
      selectedLevel.value = null; // Reset active level
      isPlaying.value = value; // Set game state
    }

    return { levelData, setLevel, selectedLevel, isPlaying, setGame };
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.filter {
  width: fit-content;
  height: 50px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background: #cc924b;
  box-shadow: 0 5px #d6ae7c;
}

button:hover {
  box-shadow: 0 3px #495057;
  top: 1px;
}

button:active {
  box-shadow: 0 0 #495057;
  top: 5px;
}

/* Flip colors for active button */
button.active {
  background: #fff;
  color: #495057;
  border: 2px solid #495057;
  box-shadow: 0 5px #495057;
}

/* Mobile Styling */
@media (max-width: 768px) {
  .home-container {
    gap: 0px;
  }
}
</style>
