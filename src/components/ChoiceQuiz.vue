<template>
  <div class="quiz-container">
    <h1>Vocabulary Quiz</h1>
    <div class="quiz-card">
      <h2 v-if="quizQuestion">
        Translate: <span>{{ quizQuestion.korean }}</span>
      </h2>
      <h2 v-else>Select a Level</h2>

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
          <img
            :src="randomFailImage"
            alt="Success Image"
            class="success-image"
          />
          Incorrect!
        </div>
        <div v-else class="success">
          <img
            :src="randomSucessImage"
            alt="Success Image"
            class="success-image"
          />
          Correct!
        </div>
        <button class="next-btn" @click="newRound">Next Question</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    levelData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const successImages = [
      require('@/assets/icons/cats/cool.svg'),
      require('@/assets/icons/cats/hearts.svg'),
      require('@/assets/icons/cats/party.svg'),
      require('@/assets/icons/cats/smile.svg'),
    ];
    const failImages = [
      require('@/assets/icons/cats/angry.svg'),
      require('@/assets/icons/cats/tears.svg'),
      require('@/assets/icons/cats/shocked.svg'),
    ];

    const userSelectedItem = ref(null);
    const quizState = ref(1);
    const selectedItems = ref([]);
    const quizQuestion = ref(null);
    const randomSucessImage = ref(null);
    const randomFailImage = ref(null);

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
/* General Layout */
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Arial', sans-serif;
  background-color: white;
  padding: 30px;
  min-height: 100vh;
  width: 100vw;
}

/* Quiz Card Styling */
.quiz-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  text-align: center;
  border: 2px solid #333;
  position: relative;
}

/* Question Styling */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #444;
}

h2 {
  font-size: 20px;
  color: #333;
}

h2 span {
  font-weight: bold;
  color: #0077cc;
}

/* Quiz Choices */
.quiz-choices {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Answer Buttons */
.quiz-option {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  background: white;
  color: #333;
  border: 2px solid #0077cc;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
}

.quiz-option:hover {
  background: #0077cc;
  color: white;
}

/* Correct / Incorrect Message */
.result h2 {
  margin: 15px 0;
}

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #28a745;
  font-size: 24px;
  font-weight: bold;
}

.success-image {
  width: 60px;
  height: 60px;
  margin: 20px;
  object-fit: cover;
}

.fail {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc3545;
  font-size: 24px;
  font-weight: bold;
}

.fail-image {
  width: 60px;
  height: 60px;
  margin: 20px;
  object-fit: cover;
}

/* Next Button */
.next-btn {
  background: #0077cc;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.next-btn:hover {
  background: #005fa3;
}

/* Mobile Styling */
@media (max-width: 768px) {
  .quiz-container {
    min-height: 0;
    height: fit-content;
    padding-bottom: 0px;
  }
}
</style>
