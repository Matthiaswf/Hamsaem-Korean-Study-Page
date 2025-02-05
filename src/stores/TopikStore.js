import { defineStore } from 'pinia';
import topik1Data from '@/assets/topikData/topik1.json';
import topik2Data from '@/assets/topikData/topik2.json';

export const useTopikStore = defineStore('topik', {
  state: () => ({
    topik1: [], // Stores Topik 1 data
    topik2: [], // Stores Topik 2 data
    levelData: [], // ✅ The active data being displayed
  }),
  actions: {
    loadTopik1() {
      this.levelData = topik1Data; // ✅ Assign data to `levelData`
    },
    loadTopik2() {
      this.levelData = topik2Data; // ✅ Assign data to `levelData`
    },
  },
});
