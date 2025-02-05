import { defineStore } from 'pinia';

export const useTopikStore = defineStore({
  state: () => ({
    topik1: [],
  }),
  getters: {
    getTopik1() {
      return this.topik1;
    },
  },
});
