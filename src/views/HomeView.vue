<template>
  <div class="home-container">
    <!-- Filter Nav -->
    <nav class="filter">
      <button @click="setLevel('topik1')">Topik I</button>
      <button @click="setLevel('topik2')">Topik II</button>
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
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

export default {
  setup() {
    const topikStore = useTopikStore();
    const { levelData } = storeToRefs(topikStore); // Ensures reactivity

    function setLevel(level) {
      if (level === 'topik1') {
        topikStore.loadTopik1();
      } else if (level === 'topik2') {
        topikStore.loadTopik2();
      }

      console.log('Level set to: ', level);
      return;
    }

    return { levelData, setLevel };
  },
};
</script>
