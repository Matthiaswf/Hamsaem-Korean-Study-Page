import { defineStore } from 'pinia';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    images: [],
    selectedImages: [],
    round: 1,
    loading: false,
  }),
  getters: {},
  actions: {
    async getImages() {
      this.loading = true;

      // Get images from assets directory
      const context = require.context(
        '@/assets/hamgopalooza',
        false,
        /\.(png|jpe?g|svg|webp)$/
      );

      this.images = context.keys().map((path, index) => {
        const imageUrl = context(path);

        return {
          id: index, // Unique ID
          src: imageUrl, // Corrected source path
        };
      });

      this.loading = false;
    },
    async getSelectedImages() {
      return this.selectedImages;
    },

    selectImage(id) {
      this.selectedImages.push(id);
    },

    getRound() {
      return this.round;
    },
    incrementRound() {
      this.round++;
    },

    shuffleImages() {
      // Shuffle using Fisher-Yates algorithm
      const shuffled = [...this.images];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      this.images = shuffled; // Vue will detect this change
    },
    resetGame() {
      this.selectedImages = [];
      this.round = 1;
    },
  },
});
