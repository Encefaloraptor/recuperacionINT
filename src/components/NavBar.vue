<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
    <div class="container-fluid">
      <!-- Marca o logo -->
      <a class="navbar-brand" href="/"> 
        <img src="../assets/logo.svg" alt="logo" width="36" height="24">
      </a>

      <!-- Botón de hamburguesa en pantallas pequeñas -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links de navegación -->
      <div
        class="collapse navbar-collapse ms-5"
        id="navbarNav"
      >
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
        <router-link to="/empleados" class="nav-link">Empleados</router-link>
          </li>
          <li class="nav-item">
              <router-link to="/tareas" class="nav-link">Tareas</router-link>
          </li>
           <li class="nav-item">
              <router-link to="/estadisticas" class="nav-link">Estadísticas</router-link>
          </li>
           <li class="nav-item">
              <router-link to="/tareas" class="nav-link">Tareas</router-link>
          </li>
           <li class="nav-item">
              <router-link to="/about" class="nav-link">Acerca de</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
<style></style>
