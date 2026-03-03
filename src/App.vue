<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center w-100">
    <div class="w-75 w-lg-80 mx-auto"></div>
    <NavBar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from "../src/components/NavBar.vue";
</script>

<style scoped>
@media (max-width: 768px) {
  body {
    background: lightgray;
  }
}
</style>
