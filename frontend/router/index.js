import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import InicioView from "../../frontend/src/components/Inicio.vue";
import EmpleadosView from "../../frontend/src/components/EmpleaDos.vue";
import Tareas from "../../frontend/src/components/TarEas.vue";
import Estadisticas from "../../frontend/src/components/EstadisTicas.vue";
import AcercaDe from "../../frontend/src/components/AbouT.vue";
import ConTacto from "../src/components/ConTacto.vue";
import AvisoLegal from "../src/components/AvisoLegal.vue";
import PoliticaPrivacidad from "../src/components/PoliticaPrivacidad.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
