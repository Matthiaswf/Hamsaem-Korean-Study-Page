<template>
  <div>
    <h1>Topik 1</h1>
    <div v-for="t in topik1" :key="t.id">
      <p>{{ t.id }}</p>
      <p>{{ t.english }}</p>
      <p>{{ t.korean }}</p>
    </div>
  </div>
</template>

<script>
import { useTopikStore } from '@/stores/TopikStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

export default {
  setup() {
    const topikStore = useTopikStore();
    const { topik1 } = storeToRefs(topikStore); // Ensures reactivity

    onMounted(() => {
      topikStore.loadTopik1(); // Load data into state
      console.log(topikStore.getTopik1()); // Log the state to verify it's working
    });

    return { topik1 };
  },
};
</script>
