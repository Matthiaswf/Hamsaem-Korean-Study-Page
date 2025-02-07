<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <form @submit.prevent="submitForm">
      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <button v-if="!isPending" type="submit">Login</button>
      <button v-if="isPending" type="submit" disabled>
        {{ isPending ? 'Loading...' : 'Login' }}
      </button>

      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '@/composables/useLogin'; // Custom login composable

// Form Fields
const email = ref('');
const password = ref('');

// Login Functionality
const { error, login, isPending } = useLogin();
const router = useRouter();

const submitForm = async () => {
  error.value = null; // Reset error before attempting login

  try {
    await login(email.value, password.value);
    router.push('/'); // Redirect on successful login
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.message; // Store the error to display in UI
  }
};
</script>

<style scoped>
.login-container {
  width: 500px;
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

@media (max-width: 768px) {
  .login-container {
    width: 90%; /* Adjusted width for smaller screens */
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    border: none;
  }

  .title {
    font-size: 20px; /* Adjusted font size */
  }

  input {
    margin-top: 5px; /* Adjusted margin */
  }

  label {
    margin-top: 5px; /* Adjusted margin */
  }

  button {
    margin-top: 20px; /* Adjusted margin */
  }

  .error-message {
    margin-top: 5px; /* Adjusted margin */
  }
}
</style>
