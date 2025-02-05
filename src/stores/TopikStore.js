import { defineStore } from 'pinia';
import topik1Data from '@/assets/topikData/topik1.json';

export const useTopikStore = defineStore('topik', {
  state: () => ({
    topik1: [], // Ensures reactivity
  }),
  actions: {
    loadTopik1() {
      this.topik1 = topik1Data; // Load data into state
    },
    getTopik1() {
      return this.topik1; // Function to return state
    },
  },
});
