<template>
  <div class="quiz-container">
    <h2>Translate: {{ quizQuestion.korean }}</h2>
    <div class="quiz-choices">
      <button v-for="item in selectedItems" :key="item.id">
        {{ item.english }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    levelData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    function getRandomItems(arr, num) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }

    // Generate 4 random choices
    const selectedItems = computed(() => getRandomItems(props.levelData, 4));

    // Randomly pick one item from the 4 choices as the quiz question
    const quizQuestion = computed(() =>
      selectedItems.value.length
        ? selectedItems.value[
            Math.floor(Math.random() * selectedItems.value.length)
          ]
        : null
    );

    return { selectedItems, quizQuestion };
  },
};
</script>

<style scoped>
.quiz-container {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #cc924b;
  border-radius: 10px;
  background-color: #fdf1e6;
}

h2 {
  text-align: center;
  color: #cc924b;
}

.quiz-choices {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

button {
  min-width: 150px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background: #cc924b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background: #a37136;
}
</style>
