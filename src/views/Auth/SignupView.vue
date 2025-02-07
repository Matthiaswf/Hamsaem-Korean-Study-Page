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

      <button v-if="!isPending" type="submit">Sign Up</button>
      <div v-if="error" class="error-message">{{ error }}</div>

      <button v-if="isPending" type="submit" :disabled="isPending">
        {{ isPending ? 'Loading...' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useSignup from '@/composables/useSignup';
import leoProfanity from 'leo-profanity'; // ✅ New profanity filter

export default {
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const selectedProfile = ref('');
    const error = ref(null);

    const profilePictures = ref([
      '/userThumbnails/bear.svg',
      '/userThumbnails/cat.svg',
      '/userThumbnails/chicken.svg',
      '/userThumbnails/dog.svg',
      '/userThumbnails/koala.svg',
      '/userThumbnails/lion.svg',
      '/userThumbnails/meerkat.svg',
      '/userThumbnails/sea-lion.svg',
    ]);

    const bannedUsernames = ['admin', 'root', 'moderator', 'test', 'support'];
    const router = useRouter();
    const { error: signupError, signup, isPending } = useSignup();

    // **Load Profanity List**
    onMounted(() => {
      leoProfanity.loadDictionary(); // ✅ Load default profanity dictionary
    });

    // **Email Validation**
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        error.value = 'Invalid email format.';
        return false;
      }
      if (email.length > 254 || email.length < 5) {
        error.value = 'Email must be between 5 and 254 characters.';
        return false;
      }
      return true;
    };

    // **Username Validation**
    const validateUsername = (name) => {
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(name)) {
        error.value =
          'Username can only contain letters, numbers, and underscores (3-20 characters).';
        return false;
      }
      if (bannedUsernames.includes(name.toLowerCase())) {
        error.value = 'This username is not allowed.';
        return false;
      }
      if (leoProfanity.check(name)) {
        error.value = 'This username contains inappropriate words.';
        return false;
      }
      return true;
    };

    // **Form Submission**
    const submitForm = async () => {
      error.value = null;

      if (!validateEmail(email.value) || !validateUsername(username.value)) {
        return;
      }

      if (!selectedProfile.value) {
        error.value = 'Please select a profile picture.';
        return;
      }

      try {
        await signup(
          email.value,
          password.value,
          username.value,
          selectedProfile.value
        );
        router.push('/');
      } catch (err) {
        console.error('Signup error:', err);
        error.value = err.message;
      }
    };

    return {
      email,
      username,
      password,
      selectedProfile,
      error,
      profilePictures,
      isPending,
      submitForm,
    };
  },
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

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
