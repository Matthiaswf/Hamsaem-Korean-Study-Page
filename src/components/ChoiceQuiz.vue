<template>
  <div class="quiz-container">
    <h2 v-if="quizQuestion">Translate: {{ quizQuestion.korean }}</h2>
    <h2 v-else>Select a Level</h2>

    <div class="quiz-choices" v-if="quizState === 1">
      <button
        @click="userSelect(item.id)"
        v-for="item in selectedItems"
        :key="item.id"
      >
        {{ item.english }}
      </button>
    </div>

    <div v-else-if="quizState === 2">
      <h2 v-if="userSelectedItem === quizQuestion.id">Correct!</h2>
      <h2 v-else>Incorrect!</h2>
      <button @click="newRound">Next Question</button>
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
    const userSelectedItem = ref(null);
    const quizState = ref(1);
    const selectedItems = ref([]);
    const quizQuestion = ref(null);

    function getRandomItems(arr, num) {
      if (!arr || arr.length === 0) return []; // Ensure we don't select from an empty array
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(num, arr.length));
    }

    function newRound() {
      if (!props.levelData || props.levelData.length === 0) return; // Prevent running when data is empty

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
      console.log('User selected:', id);
    }

    // Watch for when levelData is populated and trigger the first question
    watch(
      () => props.levelData,
      (newVal) => {
        if (newVal.length > 0) {
          newRound();
        }
      },
      { immediate: true } // Runs immediately if levelData is already available
    );

    return {
      selectedItems,
      quizQuestion,
      userSelect,
      userSelectedItem,
      quizState,
      newRound,
    };
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
