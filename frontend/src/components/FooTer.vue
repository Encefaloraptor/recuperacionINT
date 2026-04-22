<template>
    <footer class="navbar navbar-dark bg-success position-sticky top-100 w-100 mt-auto">
        <div class="container">
            <p class="mb-1">
                &copy; {{ new Date().getFullYear() }} Gestión de Tareas
            </p>
            <ul class="list-inline mb-0 ">
                <li class="nav-item list-inline-item  rounded px-2 ">
                    <router-link class="nav-link text-light text-decoration-none" to="/aviso-legal">Aviso
                        legal</router-link>
                </li>
                <li class="nav-item list-inline-item">
                    <router-link class="nav-link text-light text-decoration-none" to="/politica-privacidad">Política de
                        privacidad</router-link>
                </li>
                <li class="nav-item list-inline-item">
                    <router-link class="nav-link text-light text-decoration-none" to="/contacto">Contacto</router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script setup></script>
<style scoped></style>
