import { defineStore } from 'pinia';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    images: [],
    loading: false,
  }),
  getters: {},
  actions: {
    async getImages() {
      this.loading = true;

      // get images from assets/hamgopalooza directory
      const context = require.context(
        '@/assets/hamgopalooza',
        false,
        /\.(png|jpe?g|svg)$/
      );
      const data = context.keys().map(context);

      this.images = data;
      this.loading = false;
    },
  },
});
