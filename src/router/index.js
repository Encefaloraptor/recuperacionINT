import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import InicioView from "../components/Inicio.vue";
import EmpleadosView from "../components/EmpleaDos.vue";
import Tareas from "../components/TarEas.vue";
import Estadisticas from "../components/EstadisTicas.vue";
import AcercaDe from "../components/AbouT.vue";

const routes = [
    {
        path: "/",
        name: "Inicio",
        component: InicioView,
    },
    {
        path: "/empleados",
        name: "Empleados",
        component: EmpleadosView,
    },
    {
        path: "/tareas",
        name: "Tareas",
        component: Tareas,
    },
    {
        path: "/estadisticas",
        name: "Estadísticas",
        component: Estadisticas,
    },
    {
        path: "/about",
        name: "Acerca de",
        component: AcercaDe,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;