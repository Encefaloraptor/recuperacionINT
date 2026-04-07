import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    usuario: localStorage.getItem("user") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true",
  }),

  actions: {
    login(nombre, esAdmin = false) {
      this.usuario = nombre;
      this.isAdmin = esAdmin;
      localStorage.setItem("user", nombre);
      localStorage.setItem("isAdmin", esAdmin);
    },
    logout() {
      this.usuario = null;
      this.isAdmin = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
    },
  },
});
