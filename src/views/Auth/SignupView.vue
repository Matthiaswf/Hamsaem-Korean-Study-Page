<template>
  <div class="signup-container">
    <h1 class="title">Sign Up</h1>
    <form @submit.prevent="submitForm">
      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Username</label>
      <input type="text" v-model="username" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <label>Select Profile Picture</label>
      <div class="profile-options">
        <div
          v-for="(image, index) in profilePictures"
          :key="index"
          class="profile-option"
          :class="{ selected: selectedProfile === image }"
          @click="selectedProfile = image"
        >
          <img :src="image" alt="Profile" />
        </div>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const username = ref('');
const password = ref('');
const selectedProfile = ref('');

const profilePictures = ref([
  'https://via.placeholder.com/50',
  'https://via.placeholder.com/50?text=1',
  'https://via.placeholder.com/50?text=2',
  'https://via.placeholder.com/50?text=3',
  'https://via.placeholder.com/50?text=4',
  'https://via.placeholder.com/50?text=5',
  'https://via.placeholder.com/50?text=6',
  'https://via.placeholder.com/50?text=7',
]);

const submitForm = () => {
  alert(`Signed up with: ${email.value}, ${username.value}`);
};
</script>

<style scoped>
.signup-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border: 2px solid black;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: black;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
  color: black;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid black;
  outline: none;
  background: white;
  color: black;
  box-sizing: border-box; /* Prevents the input from overflowing */
}

.profile-options {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.profile-option {
  width: 50px;
  height: 50px;
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.profile-option img {
  width: 100%;
  height: 100%;
}

.profile-option.selected {
  background: black;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: black;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
}

button:hover {
  background: gray;
}
</style>
