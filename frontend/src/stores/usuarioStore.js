import { defineStore } from "pinia";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    usuario: null,
  }),
  actions: {
    seleccionarUsuario(usuario) {
      this.usuario = usuario;
    },
    limparUsuario() {
      this.usuario = null;
    },
  },
});
