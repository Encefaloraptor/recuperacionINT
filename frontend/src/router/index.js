import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Inicio from "../components/Inicio.vue";
import EmpleaDos from "../components/EmpleaDos.vue";
import Tareas from "../components/TarEas.vue";
import Estadisticas from "../components/EstadisTicas.vue";
import AcercaDe from "../components/About.vue";
import ConTacto from "../components/ConTacto.vue";
import AvisoLegal from "../components/AvisoLegal.vue";
import PoliticaPrivacidad from "../components/PoliticaPrivacidad.vue";
import Usuarios from "../components/Usuarios.vue";
const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/empleados",
    name: "Empleados",
    component: EmpleaDos,
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
  },
  {
    path: "/contacto",
    name: "Contacto",
    component: ConTacto,
  },
  {
    path: "/aviso-legal",
    name: "Aviso legal",
    component: AvisoLegal,
  },
  {
    path: "/politica-privacidad",
    name: "Politica Privacidad",
    component: PoliticaPrivacidad,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
