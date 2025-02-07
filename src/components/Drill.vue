<template>
  <div class="drill-container">
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

    <div class="drill">
      <p v-if="currentItem">
        <strong>English:</strong> {{ currentItem.english }} <br />
        <strong>Korean:</strong> {{ currentItem.korean }}
      </p>
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
    let intervalId = null;

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
      intervalId = setInterval(() => {
        if (currentIndex.value < levelData.value.length - 1) {
          currentIndex.value++;
        } else {
          pauseDrill(); // Stop when reaching the end
        }
      }, 2000);
    }

    function pauseDrill() {
      clearInterval(intervalId);
      isPlaying.value = false;
    }

    function resetDrill() {
      pauseDrill();
      currentIndex.value = 0;
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
    };
  },
};
</script>

<style scoped>
.drill-container {
  text-align: center;
}

.topik-selector-container {
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;
}

button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.active {
  font-weight: bold;
  color: white;
  background-color: #007bff;
}

.drill {
  font-size: 20px;
  margin-top: 20px;
}
</style>
