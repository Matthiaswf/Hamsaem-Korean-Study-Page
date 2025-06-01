<template>
  <footer class="footer-container">
    <a
      href="https://www.mattwf.dev/"
      target="_blank"
      rel="noopener"
      class="footer-link"
    >
      Created by Mattwf
    </a>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer-container {
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 16px;
  background: transparent;
  font-size: 14px;
  color: #555;
}

.footer-link {
  color: #555;
  text-decoration: none;
}

.footer-link:hover {
  color: #000;
}
</style>
