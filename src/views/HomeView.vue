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
      <button class="not-mobile" @click="setDrill(true)">Drill</button>
      <button
        class="not-mobile"
        @click="setGame(true)"
        :class="{ active: isPlaying === true }"
      >
        Hamgopalooza
      </button>
    </nav>
    <ChoiceQuiz
      v-if="levelData && !isPlaying && !isDrilling"
      :levelData="levelData"
    />
    <Drill v-else-if="isDrilling" />
    <Game v-else-if="isPlaying" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';
import ChoiceQuiz from '@/components/ChoiceQuiz.vue';
import Drill from '@/components/Drill.vue';
import Game from '@/components/Game.vue';

export default {
  components: {
    ChoiceQuiz,
    Drill,
    Game,
  },
  setup() {
    const topikStore = useTopikStore();
    const { levelData } = storeToRefs(topikStore);
    const selectedLevel = ref(null);
    const isPlaying = ref(false);
    const isDrilling = ref(false);

    function setLevel(level) {
      selectedLevel.value = level;
      if (level === 'topik1') {
        topikStore.loadTopik1();
        isDrilling.value = false;
        isPlaying.value = false;
      } else if (level === 'topik2') {
        topikStore.loadTopik2();
        isDrilling.value = false;
        isPlaying.value = false;
      }
    }

    function setDrill() {
      selectedLevel.value = null;
      isPlaying.value = false;
      isDrilling.value = true;
    }

    function setGame(value) {
      selectedLevel.value = null;
      isDrilling.value = false;
      isPlaying.value = value;
    }

    return {
      levelData,
      setLevel,
      selectedLevel,
      isPlaying,
      isDrilling,
      setGame,
      setDrill,
    };
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;
  width: 100%;
}

.filter {
  width: fit-content;
  height: 50px;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

button {
  min-width: 130px;
  height: 40px;
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

button.active {
  background: #000;
  color: #fff;
}

/* Mobile Styling */
@media (max-width: 768px) {
  .home-container {
    gap: 0px;
  }

  .not-mobile {
    display: none;
  }
}
</style>
