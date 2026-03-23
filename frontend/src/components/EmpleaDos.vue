<template>
    <div class="container-fluid my-2 p-2 border rounded-4 shadow-lg bg-white">
        <h3 class="text-center mb-4 fw-semibold text-success border-bottom pb-2 mt-2">
            <i class="bi bi-person-badge me-2"></i>Gestión de Empleados
        </h3>

        <!-- Formulario -->
        <form @submit.prevent="guardarEmpleado" class="mb-2">

            <!-- Nombre y Apellidos -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="nombre" class="form-label mb-0 text-nowrap w-25">
                        Nombre: <span class="text-danger">*</span>
                    </label>
                    <input type="text" id="nombre" v-model="nuevoEmpleado.nombre" @blur="capitalizarTexto('nombre')"
                        class="form-control flex-grow-1" :class="{ 'is-invalid': errores.nombre }" />
                    <div v-if="errores.nombre" class="invalid-feedback">El nombre es obligatorio.</div>
                </div>

                <div class="col-md-6 d-flex align-items-center">
                    <label for="apellidos" class="form-label me-4 mb-0 text-nowrap">Apellidos:</label>
                    <input type="text" id="apellidos" v-model="nuevoEmpleado.apellidos"
                        @blur="capitalizarTexto('apellidos')" class="form-control flex-grow-1" />
                </div>
            </div>

            <!-- Email y Móvil -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="email" class="form-label mb-0 text-nowrap w-25">
                        Email: <span class="text-danger">*</span>
                    </label>
                    <input type="email" id="email" v-model="nuevoEmpleado.email" @blur="validarEmail"
                        class="form-control flex-grow-1" :class="{ 'is-invalid': errores.email }" />
                    <div v-if="errores.email" class="invalid-feedback">Email obligatorio o inválido.</div>
                </div>

                <div class="col-md-3 d-flex align-items-center">
                    <label for="movil" class="form-label me-4 ms-4 mb-0 text-nowrap">Móvil:</label>
                    <input type="tel" id="movil" v-model="nuevoEmpleado.movil" @blur="validarMovil"
                        class="form-control flex-grow-1 text-center" :class="{ 'is-invalid': errores.movil }" />
                    <div v-if="errores.movil" class="invalid-feedback">Móvil inválido (6xx/7xx).</div>
                </div>
            </div>

            <!-- Puesto -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="puesto" class="form-label mb-0 text-nowrap w-25">Puesto:</label>
                    <select id="puesto" v-model="nuevoEmpleado.puesto" class="form-select flex-grow-1">
                        <option disabled value="">Seleccione puesto</option>
                        <option value="rrhh">RRHH</option>
                        <option value="contabilidad">Contabilidad</option>
                        <option value="almacen">Almacén</option>
                        <option value="ventas">Ventas</option>
                    </select>
                </div>

                <div class="col-md-6 d-flex align-items-center justify-content-end">
                    <button type="button" class="btn btn-outline-secondary btn-sm ms-2 p-1" @click="recargarTodo"
                        title="Recargar">
                        <i class="bi bi-arrow-clockwise fs-5"></i>
                    </button>
                </div>
            </div>

            <!-- Botones -->
            <div class="d-flex align-items-center mt-3">
                <div class="flex-grow-1 d-flex justify-content-center">
                    <button type="submit" class="btn btn-success px-4">
                        {{ editando ? "Modificar Empleado" : "Guardar Empleado" }}
                    </button>
                    <button v-if="editando" type="button" class="btn btn-secondary px-4 ms-2" @click="cancelarEdicion">
                        Cancelar
                    </button>
                </div>
            </div>
        </form>

        <!-- Listado -->
        <div class="table-responsive mt-2">
            <div class="d-flex justify-content-center mb-2 w-100">
                <h5 class="text-center mb-3 fw-semibold text-success border-top pb-2 w-100 pt-4">
                    <i class="bi bi-list me-2"></i>Listado de Empleados
                    <span class="badge bg-success ms-2">{{ empleados.length }}</span>
                </h5>
            </div>

            <table class="table table-bordered table-striped table-sm small w-100">
                <thead class="table-success">
                    <tr>
                        <th class="text-center py-1">ID</th>
                        <th class="text-center py-1">Apellidos</th>
                        <th class="text-center py-1">Nombre</th>
                        <th class="text-center py-1">Email</th>
                        <th class="text-center py-1">Móvil</th>
                        <th class="text-center py-1">Puesto</th>
                        <th class="text-center py-1">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="empleados.length === 0">
                        <td colspan="7" class="text-center text-muted py-3">
                            <i class="bi bi-inbox me-2"></i>No hay empleados registrados.
                        </td>
                    </tr>
                    <tr v-for="(empleado, index) in empleadosPaginados" :key="empleado.id"
                        :class="{ 'table-warning': empleadoEditandoId === empleado.id }">
                        <th scope="row" class="text-center py-1">{{ index + 1 }}</th>
                        <td class="py-1">{{ empleado.apellidos }}</td>
                        <td class="py-1">{{ empleado.nombre }}</td>
                        <td class="py-1">{{ empleado.email }}</td>
                        <td class="text-center py-1">{{ empleado.movil }}</td>
                        <td class="text-center py-1">
                            <span class="badge" :class="badgePuesto(empleado.puesto)">
                                {{ puestoLabel(empleado.puesto) }}
                            </span>
                        </td>
                        <td class="text-center py-1">
                            <button @click="delEmpleado(empleado.id)" class="btn btn-danger btn-sm" title="Eliminar">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button @click="selEmpleado(empleado.id)" class="btn btn-warning btn-sm ms-2"
                                title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Paginación -->
    <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-success btn-sm me-2 rounded-0 border-1 shadow-none" @click="beforePagina"
            :disabled="currentPage <= 1">
            <i class="bi bi-chevron-left"></i>
        </button>
        <span class="mx-3 align-self-center text-muted">
            Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button class="btn btn-outline-success btn-sm rounded-0 border-1 shadow-none" @click="nextPagina"
            :disabled="currentPage >= totalPages">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>


</template>

<script setup>
import { ref, computed } from "vue";


// ── Modelo de datos ──────────────────────────────────────────────────────────
function emptyEmpleado() {
    return { id: null, apellidos: "", nombre: "", email: "", movil: "", puesto: "" };
}

const empleados = ref([
    { id: 1, apellidos: "García López", nombre: "Ana", email: "ana.garcia@empresa.com", movil: "612345678", puesto: "rrhh" },
    { id: 2, apellidos: "Martínez Ruiz", nombre: "Pedro", email: "pedro.martinez@empresa.com", movil: "623456789", puesto: "contabilidad" },
    { id: 3, apellidos: "Fernández Díaz", nombre: "Laura", email: "laura.fernandez@empresa.com", movil: "634567890", puesto: "ventas" },
    { id: 4, apellidos: "Sánchez Mora", nombre: "Carlos", email: "carlos.sanchez@empresa.com", movil: "645678901", puesto: "almacen" },
]);

// ── Estado formulario y validaciones ────────────────────────────────────────
const nuevoEmpleado = ref(emptyEmpleado());
const editando = ref(false);
const empleadoEditandoId = ref(null);
const errores = ref({ nombre: false, email: false, movil: false });

// ── Paginación ───────────────────────────────────────────────────────────────
const currentPage = ref(1);
const empleadosPorPage = 10;

const totalPages = computed(() =>
    Math.max(1, Math.ceil(empleados.value.length / empleadosPorPage))
);

const empleadosPaginados = computed(() => {
    const start = (currentPage.value - 1) * empleadosPorPage;
    return empleados.value.slice(start, start + empleadosPorPage);
});

const beforePagina = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPagina = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
let nextId = 5; // starts after the 4 sample employees

// ── Helpers puros ────────────────────────────────────────────────────────────
const puestoLabel = (p) =>
    ({ rrhh: "RRHH", contabilidad: "Contabilidad", almacen: "Almacén", ventas: "Ventas" }[p] ?? p);

const badgePuesto = (p) =>
    ({ rrhh: "bg-primary", contabilidad: "bg-info text-dark", almacen: "bg-secondary", ventas: "bg-success" }[p] ?? "bg-light text-dark");

// ── Validaciones ────────────────────────────────────────────────────────────
const validarFormulario = () => {
    errores.value.nombre = !nuevoEmpleado.value.nombre.trim();
    validarEmail();
    validarMovil();
    return !errores.value.nombre && !errores.value.email;
};

const validarEmail = () => {
    const email = nuevoEmpleado.value.email.trim();
    if (!email) { errores.value.email = true; return; }
    errores.value.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validarMovil = () => {
    const movil = nuevoEmpleado.value.movil.trim();
    if (!movil) { errores.value.movil = false; return; }
    errores.value.movil = !/^[67]\d{8}$/.test(movil);
};

const capitalizarTexto = (campo) => {
    const texto = nuevoEmpleado.value[campo] ?? "";
    nuevoEmpleado.value[campo] = texto
        .toLowerCase()
        .split(" ")
        .map((p) => (!p ? "" : p.charAt(0).toLocaleUpperCase() + p.slice(1)))
        .join(" ");
};



// ── addEmpleado ──────────────────────────────────────────────────────────────
const addEmpleado = (datos) => {
    empleados.value.push({ ...datos, id: nextId++ });
};

// ── selEmpleado — carga en formulario para editar ────────────────────────────
const selEmpleado = (id) => {
    const emp = empleados.value.find((e) => e.id === id);
    if (!emp) return;
    nuevoEmpleado.value = { ...emp };
    editando.value = true;
    empleadoEditandoId.value = id;
    errores.value = { nombre: false, email: false, movil: false };
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// ── delEmpleado ──────────────────────────────────────────────────────────────
const delEmpleado = (id) => {
    const emp = empleados.value.find((e) => e.id === id);
    if (!emp) return;
    if (!confirm(`¿Eliminar a ${emp.nombre} ${emp.apellidos}?`)) return;
    empleados.value = empleados.value.filter((e) => e.id !== id);
    if (empleadoEditandoId.value === id) cancelarEdicion();
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
};

// ── guardarEmpleado (add o update) ──────────────────────────────────────────
const guardarEmpleado = () => {
    if (!validarFormulario()) return;

    if (editando.value) {
        const index = empleados.value.findIndex((e) => e.id === empleadoEditandoId.value);
        if (index !== -1) empleados.value[index] = { ...nuevoEmpleado.value };
    } else {
        addEmpleado(nuevoEmpleado.value);
    }

    cancelarEdicion();
};

// ── Cancelar / Recargar ──────────────────────────────────────────────────────
const cancelarEdicion = () => {
    nuevoEmpleado.value = emptyEmpleado();
    editando.value = false;
    empleadoEditandoId.value = null;
    errores.value = { nombre: false, email: false, movil: false };
};

const recargarTodo = () => {
    cancelarEdicion();
};
</script>

<style scoped>
.invalid-feedback {
    display: block;
}

.is-invalid {
    border-color: #dc3545;
    background-color: #fff5f5;
}

.table th,
.table td {
    vertical-align: middle;
}
</style>