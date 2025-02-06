<template>
  <div class="navbar-container">
    <nav>
      <div class="logo">
        <router-link to="/" class="home-logo"
          ><img src="@/assets/icons/navbar/logo.png" alt=""
        /></router-link>
        <h1 class="logo-text">
          <router-link to="/">함샘</router-link>
        </h1>
      </div>

      <div v-if="user" class="user">
        <img class="user-thumbnail" :src="user.photoURL" alt="" />
        <h2 class="user-displayName" v-if="user">{{ user.displayName }}</h2>
        <img
          class="logout-button"
          @click="logout"
          src="@/assets/icons/navbar/logout.svg"
          alt=""
        />
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';

export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();

    return { user, logout, document };
  },
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.navbar-container {
  padding: 16px 10px;
  margin-bottom: 0px;
  height: 100px;
  width: 100vw;
}

nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.home-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;
}

.user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.user-thumbnail {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-displayName {
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 10px;
}

.logout-button {
  height: 30px;
  width: 30px;
  padding-top: 5px;
  cursor: pointer;
}

a {
  font-family: Gamja Flower;
  text-decoration: none;
  color: black;
  font-size: 6rem;
  margin-left: 20px;
}

nav img {
  height: 100px;
  width: auto;
}

/* Mobile Styling */
@media (max-width: 768px) {
  .navbar-container {
    margin-bottom: 0px;
  }
}
</style>
