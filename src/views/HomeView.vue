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
    </nav>

    <!-- Display first 5 items of levelData -->
    <ul>
      <li v-for="(item, index) in (levelData || []).slice(0, 5)" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const topikStore = useTopikStore();
    const { levelData } = storeToRefs(topikStore); // Ensures reactivity
    const selectedLevel = ref(null); // Track active level

    function setLevel(level) {
      selectedLevel.value = level; // Set active level

      if (level === 'topik1') {
        topikStore.loadTopik1();
      } else if (level === 'topik2') {
        topikStore.loadTopik2();
      }

      console.log('Level set to: ', level);
    }

    return { levelData, setLevel, selectedLevel };
  },
};
</script>

<style scoped>
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
</style>
