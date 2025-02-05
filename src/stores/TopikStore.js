import { defineStore } from 'pinia';
import topik1Data from '@/assets/topikData/topik1.json';

export const useTopikStore = defineStore('topik', {
  state: () => ({
    topik1: topik1Data, // Load JSON data directly into state
  }),
  getters: {
    getTopik1() {
      return this.topik1;
    },
  },
});
