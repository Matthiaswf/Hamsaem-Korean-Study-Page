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
      <button @click="toggleRandomOrder" :class="{ active: isRandomOrder }">
        {{ isRandomOrder ? 'Random' : 'In Order' }}
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
      <p class="remaining-vocab">
        Remaining: {{ remainingVocabCount }} <span class="divider"></span> Total
        Time Left: {{ formattedTotalTimeLeft }}
      </p>
    </div>

    <div class="time-left-display">{{ formattedCountdown }}</div>

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
    const isRandomOrder = ref(false); // State for random/sequential order
    const countdown = ref(2);
    const drillInterval = ref(2);
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
      if (!shuffledLevelData.value.length) return;

      isPlaying.value = true;
      startCountdown();
      intervalId = setInterval(() => {
        if (currentIndex.value < shuffledLevelData.value.length - 1) {
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
          countdown.value -= 0.01; // Update every 10ms
          countdown.value = parseFloat(countdown.value.toFixed(2));
        }
      }, 10);
    }

    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    function toggleRandomOrder() {
      isRandomOrder.value = !isRandomOrder.value; // Toggle between random and in order
      resetDrill(); // Reset the drill whenever the order changes
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

    const shuffledLevelData = computed(() => {
      return isRandomOrder.value
        ? shuffleArray(levelData.value)
        : levelData.value;
    });

    const currentItem = computed(
      () => shuffledLevelData.value[currentIndex.value]
    );

    const remainingVocabCount = computed(
      () => shuffledLevelData.value.length - currentIndex.value
    );

    const totalRemainingTime = computed(
      () => remainingVocabCount.value * drillInterval.value
    );

    const formattedCountdown = computed(() => countdown.value.toFixed(1));

    const formattedTotalTimeLeft = computed(() => {
      const totalSeconds = totalRemainingTime.value;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      return `${hours}h ${minutes}min ${seconds}s`;
    });

    return {
      selectedLevel,
      setLevel,
      startDrill,
      pauseDrill,
      resetDrill,
      toggleInterval,
      toggleRandomOrder,
      currentItem,
      isPlaying,
      isRandomOrder,
      countdown,
      drillInterval,
      shuffledLevelData,
      remainingVocabCount,
      totalRemainingTime,
      formattedCountdown,
      formattedTotalTimeLeft,
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
  height: 100%;
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
  width: 80%;
  max-width: 500px;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

.topik-selector-container button,
.controls button {
  margin: 0;
  width: 120px;
  margin-bottom: 1rem;
  padding: 12px 18px;
  font-size: 16px;
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
  width: 120px;
}

button.active {
  font-weight: bold;
  color: white;
  background-color: black;
}

.timer-container {
  align-items: center;
}

.timer-button {
  font-size: 14px;
  padding: 8px 12px;
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  cursor: pointer;
}

.remaining-vocab {
  font-size: 16px;
  font-weight: bold;
}

.divider {
  display: inline-block;
  width: 2px;
  height: 10px;
  background-color: black;
  margin: 0 12px;
  vertical-align: baseline;
}

.time-left-display {
  font-size: 36px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
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
