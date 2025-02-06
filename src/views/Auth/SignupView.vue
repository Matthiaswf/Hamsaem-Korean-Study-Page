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

// Form Fields
const email = ref('');
const username = ref('');
const password = ref('');
const selectedProfile = ref('');

// Correct way to import local assets in Vue 3
const profilePictures = ref([
  new URL('@/assets/icons/userThumbnails/bear.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/cat.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/chicken.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/dog.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/koala.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/lion.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/meerkat.svg', import.meta.url).href,
  new URL('@/assets/icons/userThumbnails/sea-lion.svg', import.meta.url).href,
]);

const submitForm = () => {
  alert(
    `Signed up with: ${email.value}, ${username.value}, Profile: ${selectedProfile.value}`
  );
};
</script>

<style scoped>
.signup-container {
  width: 500px; /* Increased width to accommodate everything */
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
  padding: 10px;
  margin-top: 10px;
  border: 1px solid black;
  outline: none;
  background: white;
  color: black;
  box-sizing: border-box;
}

.profile-options {
  display: flex;
  justify-content: center;
  gap: 15px; /* Adjusted spacing between thumbnails */
  flex-wrap: wrap; /* Allow thumbnails to wrap if they exceed the width */
  margin-top: 20px;
}

.profile-option {
  width: 100px; /* Thumbnail size */
  height: 100px; /* Ensure a square container */
  border: 3px solid black; /* Default border */
  border-radius: 50%; /* Perfectly circular */
  overflow: hidden; /* Clip anything outside the circle */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.profile-option.selected {
  border-color: #007bff; /* Highlight color for the selected thumbnail */
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.5); /* Add glow effect */
}

.profile-option img {
  width: 100%; /* Scale image to fill parent */
  height: 100%; /* Ensure the image fits the circle */
  object-fit: cover; /* Ensures image covers the circle properly */
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 25px;
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
