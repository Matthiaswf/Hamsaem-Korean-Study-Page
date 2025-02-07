<template>
  <div class="drill-container">
    <h1>Vocabulary Drill</h1>
    <span class="instructions">Read the card within your selected time</span>

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

    <div class="timer-container">
      <button
        @click="toggleInterval"
        :disabled="isPlaying"
        class="timer-button"
      >
        {{ drillInterval === 2 ? '1s' : '2s' }}
      </button>
      <p class="timer">Time left: {{ countdown }}s</p>
    </div>

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
    const drillInterval = ref(2); // Default interval is 2 seconds
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
          countdown.value = drillInterval.value; // Reset countdown for next card
        } else {
          pauseDrill(); // Stop when reaching the end
        }
      }, drillInterval.value * 1000);
    }

    function startCountdown() {
      countdown.value = drillInterval.value; // Reset countdown
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
      countdown.value = drillInterval.value; // Reset countdown
    }

    function toggleInterval() {
      drillInterval.value = drillInterval.value === 2 ? 1 : 2;
      countdown.value = drillInterval.value; // Update countdown when toggled
    }

    const currentItem = computed(() => levelData.value[currentIndex.value]);

    return {
      selectedLevel,
      setLevel,
      startDrill,
      pauseDrill,
      resetDrill,
      toggleInterval,
      currentItem,
      isPlaying,
      countdown,
      drillInterval,
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

.instructions {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.topik-selector-container,
.controls button {
  width: 91px;
}

.topik-selector-container,
.controls,
.timer-container {
  width: 80%; /* Ensures alignment with the heading */
  max-width: 500px;
  display: flex;
  gap: 15px; /* Restore button spacing */
  justify-content: flex-start; /* Align buttons to the start of the container */
}

.topik-selector-container button,
.controls button {
  margin: 0;
  margin-bottom: 1rem;
  padding: 12px 18px; /* Restore original button size */
  font-size: 16px; /* Restore original font size */
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;

  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #000;
  color: #fff;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}

.timer-container {
  align-items: center;
}

.timer-button {
  font-size: 14px; /* Compact size for timer button */
  padding: 8px 12px;
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  cursor: pointer;
}

.timer {
  font-size: 18px;
  font-weight: bold;
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
