<script setup>
import { ref, reactive, onMounted } from "vue";
import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "../services/usuarios.service.js";
import { useUsuarioStore } from "../store/usuarioStore.js";

// Store
const usuarioStore = useUsuarioStore();

const usuarios = ref([]);

const novoUsuario = reactive({
    dni: "",
    nome: "",
    correo: "",
    provincia: "",
    activo: false,
    tipoCuenta: "",
});

const usuarioSeleccionado = ref(null);
const tarefasUsuario = ref([]);

onMounted(() => {
    cargarUsuarios();
});

// 🔹 Cargar usuarios
async function cargarUsuarios() {
    try {
        const res = await getUsuarios();
        usuarios.value = res.data;
    } catch (error) {
        console.error("Erro ao cargar usuarios", error);
    }
}

// 🔹 Crear ou actualizar
async function gardarUsuario() {
    try {
        if (usuarioSeleccionado.value) {
            await updateUsuario(usuarioSeleccionado.value.id, {
                ...novoUsuario,
            });
        } else {
            await createUsuario(novoUsuario);
        }

        usuarioStore.seleccionarUsuario(
            usuarioSeleccionado.value || novoUsuario
        );

        await cargarUsuarios();
        limparFormulario();
    } catch (error) {
        console.error("Erro ao gardar usuario", error);
    }
}

// 🔹 Eliminar
async function eliminarUsuario(index) {
    const usuario = usuarios.value[index];

    try {
        await deleteUsuario(usuario.id);

        await cargarUsuarios();

        if (
            usuarioSeleccionado.value &&
            usuarioSeleccionado.value.id === usuario.id
        ) {
            limparFormulario();
            usuarioStore.limparUsuario();
        }
    } catch (error) {
        console.error("Erro ao eliminar usuario", error);
    }
}

// 🔹 Editar
function editarUsuario(index) {
    const usuario = usuarios.value[index];

    Object.assign(novoUsuario, usuario);
    usuarioSeleccionado.value = usuario;
    usuarioStore.seleccionarUsuario(usuario);

    tarefasUsuario.value = [];
}

// 🔹 Limpar formulario
function limparFormulario() {
    novoUsuario.dni = "";
    novoUsuario.nome = "";
    novoUsuario.correo = "";
    novoUsuario.provincia = "";
    novoUsuario.activo = false;
    novoUsuario.tipoCuenta = "";

    usuarioSeleccionado.value = null;
    tarefasUsuario.value = [];
}
</script>
