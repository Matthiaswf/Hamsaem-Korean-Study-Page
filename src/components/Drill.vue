<template>
  <div class="drill-container">
    <h1>Vocabulary Drill</h1>

    <nav class="topik-selector-container">
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
    </nav>

    <div class="controls">
      <button @click="startDrill" :disabled="isPlaying">Start</button>
      <button @click="pauseDrill" :disabled="!isPlaying">Pause</button>
      <button @click="resetDrill">Reset</button>
    </div>

    <p class="timer">Time left: {{ countdown }}s</p>

    <div class="drill-card" v-if="currentItem">
      <h2>
        <span>{{ currentItem.korean }} - {{ currentItem.english }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const topikStore = useTopikStore();
    const { levelData } = storeToRefs(topikStore);

    const selectedLevel = ref(null);
    const currentIndex = ref(0);
    const isPlaying = ref(false);
    const countdown = ref(2); // Timer starts at 2 seconds
    let intervalId = null;
    let countdownId = null;

    function setLevel(level) {
      selectedLevel.value = level;
      resetDrill(); // Reset when changing levels
      if (level === 'topik1') {
        topikStore.loadTopik1();
      } else if (level === 'topik2') {
        topikStore.loadTopik2();
      }
    }

    function startDrill() {
      if (!levelData.value.length) return;
      isPlaying.value = true;
      startCountdown();
      intervalId = setInterval(() => {
        if (currentIndex.value < levelData.value.length - 1) {
          currentIndex.value++;
          countdown.value = 2; // Reset countdown for next card
        } else {
          pauseDrill(); // Stop when reaching the end
        }
      }, 2000);
    }

    function startCountdown() {
      countdown.value = 2; // Reset countdown
      countdownId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        }
      }, 1000);
    }

    function pauseDrill() {
      clearInterval(intervalId);
      clearInterval(countdownId);
      isPlaying.value = false;
    }

    function resetDrill() {
      pauseDrill();
      currentIndex.value = 0;
      countdown.value = 2; // Reset countdown
    }

    const currentItem = computed(() => levelData.value[currentIndex.value]);

    return {
      selectedLevel,
      setLevel,
      startDrill,
      pauseDrill,
      resetDrill,
      currentItem,
      isPlaying,
      countdown,
    };
  },
};
</script>

<style scoped>
.drill-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  padding: 30px;
  min-height: 100vh;
  width: 100vw;
  color: #000;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.topik-selector-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.controls {
  margin-bottom: 15px;
}

button {
  margin: 5px;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #000;
  color: #fff;
}

.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}

.timer {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.drill-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  text-align: center;
  border: 2px solid #000;
  margin-top: 20px;
}

h2 {
  font-size: 28px;
  font-weight: 500;
}

h2 span {
  font-weight: bold;
}
</style>
