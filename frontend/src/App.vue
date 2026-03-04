<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="w-75 w-lg-80  d-flex mx-auto"></div>
    <NavBar />

    <main>
      <router-view />
    </main>
    <FooTer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
</script>

<style scoped>
@media (max-width: 768px) {
  body {
    background: lightgray;
  }
}
</style>
