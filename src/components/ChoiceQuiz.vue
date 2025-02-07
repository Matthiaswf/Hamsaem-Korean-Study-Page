<template>
  <div class="quiz-container">
    <h1>Vocabulary Quiz</h1>
    <div class="quiz-card">
      <h2 v-if="quizQuestion">
        <span>{{ quizQuestion.korean }}</span>
      </h2>
      <h2 class="placeholder" v-else>Select a Level</h2>

      <div class="quiz-choices" v-if="quizState === 1">
        <button
          @click="userSelect(item.id)"
          v-for="item in selectedItems"
          :key="item.id"
          class="quiz-option"
        >
          {{ item.english }}
        </button>
      </div>

      <div v-else-if="quizState === 2" class="result">
        <div v-if="userSelectedItem !== quizQuestion.id" class="fail">
          <img :src="randomFailImage" alt="Fail Image" class="feedback-image" />
          <p class="fail-text">Incorrect!<br />{{ quizQuestion.english }}</p>
        </div>
        <div v-else class="success">
          <img
            :src="randomSucessImage"
            alt="Success Image"
            class="feedback-image"
          />
          <p class="success-text">Correct!</p>
        </div>
        <button class="next-btn" @click="newRound">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import coolCat from '@/assets/icons/cats/cool.svg';
import heartsCat from '@/assets/icons/cats/hearts.svg';
import partyCat from '@/assets/icons/cats/party.svg';
import smileCat from '@/assets/icons/cats/smile.svg';
import angryCat from '@/assets/icons/cats/angry.svg';
import tearsCat from '@/assets/icons/cats/tears.svg';
import shockedCat from '@/assets/icons/cats/shocked.svg';

export default {
  props: {
    levelData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const successImages = [coolCat, heartsCat, partyCat, smileCat];
    const failImages = [angryCat, tearsCat, shockedCat];

    const userSelectedItem = ref(null);
    const quizState = ref(1);
    const selectedItems = ref([]);
    const quizQuestion = ref(null);
    const randomSucessImage = ref(null);
    const randomFailImage = ref(null);

    function preloadImages(imageArray) {
      imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }

    function getRandomItems(arr, num) {
      if (!arr || arr.length === 0) return [];
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(num, arr.length));
    }

    function newRound() {
      if (!props.levelData || props.levelData.length === 0) return;

      randomSucessImage.value =
        successImages[Math.floor(Math.random() * successImages.length)];
      randomFailImage.value =
        failImages[Math.floor(Math.random() * failImages.length)];
      userSelectedItem.value = null;
      quizState.value = 1;
      selectedItems.value = getRandomItems(props.levelData, 4);
      quizQuestion.value = selectedItems.value.length
        ? selectedItems.value[
            Math.floor(Math.random() * selectedItems.value.length)
          ]
        : null;
    }

    function userSelect(id) {
      userSelectedItem.value = id;
      quizState.value = 2;
    }

    watch(
      () => props.levelData,
      (newVal) => {
        if (newVal.length > 0) {
          newRound();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      preloadImages(successImages);
      preloadImages(failImages);
    });

    return {
      selectedItems,
      quizQuestion,
      userSelect,
      userSelectedItem,
      quizState,
      newRound,
      randomSucessImage,
      randomFailImage,
    };
  },
};
</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  padding: 30px;
  min-height: 100vh;
  width: 100vw;
  color: #000;
}

.quiz-card {
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  text-align: center;
  border: 2px solid #000;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
}

h2 {
  font-size: 32px;
  font-weight: 500;
  margin: 0; /* Remove any unnecessary margins */
  text-align: center; /* Center-align the text */
  line-height: 1.5; /* Add better vertical spacing for text */
  min-height: 60px; /* Ensure enough vertical space */
}

h2 span {
  display: inline-block; /* Prevent unnecessary block-level height */
  vertical-align: middle; /* Align text vertically */
  font-weight: bold; /* Ensure it’s emphasized */
  text-align: center;
  min-height: 60px;
  min-width: 300px;
}

.placeholder {
  padding-top: 25px;
}

.quiz-choices {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quiz-option {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.quiz-option:hover {
  background: #000;
  color: #fff;
}

.feedback-image {
  width: 100px;
  height: 100px;
  margin: 15px 0;
  object-fit: contain;
}

.fail-text {
  color: red;
  font-size: 20px;
  font-weight: bold;
}

.success-text {
  color: green;
  font-size: 20px;
  font-weight: bold;
}

.next-btn {
  margin-top: 20px;
  background: #000;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.next-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .quiz-card {
    padding: 15px;
  }
}
</style>
