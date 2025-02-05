<template>
  <div class="navbar-container">
    <nav>
      <router-link to="/" class="home-logo"
        ><img src="@/assets/icons/navbar/logo.png" alt=""
      /></router-link>
      <h1 class="logo-text">
        <router-link to="/">함샘</router-link>
      </h1>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  overflow: hidden;
}
.navbar-container {
  padding: 16px 10px;
  margin-bottom: 60px;
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

.home-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;
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
</style>
