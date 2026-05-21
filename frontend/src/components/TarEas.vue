<template>
    <div class="container-fluid my-2 p-2 border rounded-4 shadow-lg bg-white">
        <h3 class="text-center mb-4 fw-semibold border-bottom pb-2 mt-2 text-tareas">
            <i class="bi bi-kanban me-2"></i>Gestión de Tareas
        </h3>

        <!-- ══════════════ FORMULARIO ══════════════ -->
        <form @submit.prevent="guardarTarea" class="mb-2">

            <!-- Título + Fecha -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-6 d-flex align-items-center">
                    <label for="titulo" class="form-label mb-0 text-nowrap label-w">
                        Título: <span class="text-danger">*</span>
                    </label>
                    <input type="text" id="titulo" v-model="nuevaTarea.titulo" class="form-control flex-grow-1"
                        :class="{ 'is-invalid': errores.titulo }" placeholder="Nombre de la tarea" />
                    <div v-if="errores.titulo" class="invalid-feedback">El título es obligatorio.</div>
                </div>

                <div class="col-md-4 d-flex align-items-center">
                    <label for="fecha" class="form-label mb-0 text-nowrap me-2">Fecha:</label>
                    <input type="date" id="fecha" v-model="nuevaTarea.fecha" class="form-control w-auto" />
                </div>
            </div>

            <!-- Descripción -->
            <div class="mb-3 row g-3 align-items-start">
                <div class="col-md-10 d-flex align-items-start">
                    <label for="descripcion" class="form-label mb-0 text-nowrap label-w mt-2">Descripción:</label>
                    <textarea id="descripcion" v-model="nuevaTarea.descripcion" class="form-control flex-grow-1"
                        rows="2" placeholder="Descripción detallada..."></textarea>
                </div>
            </div>

            <!-- Estado + Prioridad -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-4 d-flex align-items-center">
                    <label for="estado" class="form-label mb-0 text-nowrap label-w">
                        Estado: <span class="text-danger">*</span>
                    </label>
                    <select id="estado" v-model="nuevaTarea.estado" class="form-select flex-grow-1"
                        :class="{ 'is-invalid': errores.estado }">
                        <option disabled value="">Seleccione estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="finalizada">Finalizada</option>
                    </select>
                    <div v-if="errores.estado" class="invalid-feedback">El estado es obligatorio.</div>
                </div>

                <div class="col-md-5 d-flex align-items-center ms-md-3">
                    <label class="form-label mb-0 text-nowrap me-3">Prioridad:</label>
                    <div class="d-flex gap-3">
                        <div class="form-check">
                            <input type="radio" id="prioBaja" v-model="nuevaTarea.prioridad" value="baja"
                                class="form-check-input" />
                            <label for="prioBaja" class="form-check-label text-success fw-semibold">Baja</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" id="prioMedia" v-model="nuevaTarea.prioridad" value="media"
                                class="form-check-input" />
                            <label for="prioMedia" class="form-check-label text-warning fw-semibold">Media</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" id="prioAlta" v-model="nuevaTarea.prioridad" value="alta"
                                class="form-check-input" />
                            <label for="prioAlta" class="form-check-label text-danger fw-semibold">Alta</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empleado búsqueda por ID -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-7 d-flex align-items-center">
                    <label class="form-label mb-0 text-nowrap label-w">
                        Empleado: <span class="text-danger">*</span>
                    </label>
                    <div class="d-flex flex-grow-1 align-items-center gap-2">
                        <input type="number" v-model.number="busquedaEmpleadoId" class="form-control"
                            :class="claseInputEmpleado" placeholder="ID del empleado" min="1" />
                        <button type="button" class="btn btn-primary btn-sm flex-shrink-0" @click="buscarEmpleado"
                            title="Buscar empleado">🔎</button>
                        <span v-if="empleadoSeleccionado" class="text-nowrap fw-semibold small text-tareas">
                            {{ empleadoSeleccionado.nombre }} {{ empleadoSeleccionado.apellidos }}
                        </span>
                    </div>
                    <div v-if="errores.empleadoId" class="invalid-feedback d-block ms-2">
                        El empleado es obligatorio.
                    </div>
                </div>

                <!-- Badge usuario Pinia + botón recargar -->
                <div class="col-md-4 d-flex align-items-center justify-content-end gap-2">
                    <span v-if="authStore.usuario" class="badge bg-secondary">
                        <i class="bi bi-person-circle me-1"></i>{{ authStore.usuario }}
                    </span>
                    <button type="button" class="btn btn-outline-secondary btn-sm p-1" @click="recargarTodo"
                        title="Recargar">
                        <i class="bi bi-arrow-clockwise fs-5"></i>
                    </button>
                </div>
            </div>

            <!-- Botones -->
            <div class="d-flex align-items-center mt-3">
                <div class="flex-grow-1 d-flex justify-content-center gap-2">
                    <button type="submit" class="btn btn-tareas px-4 text-white">
                        {{ editando ? "Modificar" : "Guardar" }}
                    </button>
                    <button v-if="editando" type="button" class="btn btn-secondary px-4" @click="cancelarEdicion">
                        Cancelar
                    </button>
                </div>
            </div>
        </form>

        <!-- ══════════════ SEPARADOR ══════════════ -->
        <div class="table-responsive mt-2">
            <div class="d-flex justify-content-center mb-2 w-100">
                <h5 class="text-center mb-3 fw-semibold text-success border-top pb-2 w-100 pt-4">
                    <i class="bi bi-list me-2"></i>Listado de Tareas
                    <span class="badge bg-success ms-2">{{ tareas.length }}</span>
                </h5>
            </div>
        </div>
        <!-- ══════════════ TABLA ══════════════ -->
        <div class="table-responsive mt-2">
            <table class="table table-bordered table-sm small w-100">
                <thead class="thead-tareas">
                    <tr>
                        <th class="text-center py-1">#</th>
                        <th class="text-center py-1">Fecha</th>
                        <th class="py-1">Título</th>
                        <th class="py-1">Descripción</th>
                        <th class="text-center py-1">Estado</th>
                        <th class="text-center py-1">Prioridad</th>
                        <th class="text-center py-1">Empleado</th>
                        <th class="text-center py-1">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="tareasPaginadas.length === 0">
                        <td colspan="8" class="text-center text-muted py-4">
                            <i class="bi bi-inbox me-2"></i>No hay tareas registradas.
                        </td>
                    </tr>
                    <tr v-for="(tarea, index) in tareasPaginadas" :key="tarea.id"
                        :class="{ 'table-warning': tareaEditandoId === tarea.id }">
                        <th scope="row" class="text-center py-1">
                            {{ (currentPage - 1) * tareasPorPage + index + 1 }}
                            <!-- Cambiar para que muestre el id de la tarea correspondiente o que las tareas se muestren ordenadas por id del empleado-->


                        </th>
                        <td class="text-center py-1 text-nowrap">{{ tarea.fecha || '—' }}</td>
                        <td class="py-1 fw-semibold">{{ tarea.titulo }}</td>
                        <td class="py-1 desc-col">{{ tarea.descripcion || '—' }}</td>
                        <td class="text-center py-1">
                            <span class="badge" :class="badgeEstado(tarea.estado)">
                                {{ estadoLabel(tarea.estado) }}
                            </span>
                        </td>
                        <td class="text-center py-1">
                            <span class="badge" :class="badgePrioridad(tarea.prioridad)">
                                {{ prioridadLabel(tarea.prioridad) }}
                            </span>
                        </td>
                        <td class="text-center py-1">{{ nombreEmpleado(tarea.empleadoId) }}</td>
                        <td class="text-center py-1">
                            <button @click="delTarea(tarea.id)" class="btn btn-danger btn-sm" title="Eliminar">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button @click="selTarea(tarea.id)" class="btn btn-warning btn-sm ms-2" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- ══════════════ PAGINACIÓN ══════════════ -->
    <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-tareas btn-sm me-2 rounded-0 border-1 shadow-none" @click="beforePagina"
            :disabled="currentPage <= 1">
            <i class="bi bi-chevron-left"></i>
        </button>
        <span class="mx-3 align-self-center text-muted small">
            Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button class="btn btn-outline-tareas btn-sm rounded-0 border-1 shadow-none" @click="nextPagina"
            :disabled="currentPage >= totalPages">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { useAuthStore } from "../stores/auth";
import { getEmpleados } from "../servicios/empleados-service.js";
import { getTareas, createTarea, updateTarea, deleteTarea } from "../servicios/tareas-service.js";
const authStore = useAuthStore();

const empleados = ref([]);
const tareas = ref([]);
const loading = ref(false);

const tareasOrdenadas = computed(() =>
    [...tareas.value].sort((a, b) => a.empleadoId - b.empleadoId)
);

function emptyTarea() {
    return {
        id: null,
        fecha: "",
        titulo: "",
        descripcion: "",
        estado: "",
        prioridad: "media",
        empleadoId: null,
    };
}

// ── Estado formulario ────────────────────────────────────────────────────────
const nuevaTarea = ref(emptyTarea());
const editando = ref(false);
const tareaEditandoId = ref(null);
const errores = ref({ titulo: false, estado: false, empleadoId: false });

// ── Estado búsqueda empleado ─────────────────────────────────────────────────
const busquedaEmpleadoId = ref(null);
const empleadoSeleccionado = ref(null);
const estadoBusqueda = ref("idle");

const claseInputEmpleado = computed(() => ({
    "input-empleado-ok": estadoBusqueda.value === "ok",
    "input-empleado-error": estadoBusqueda.value === "error",
    "is-invalid": errores.value.empleadoId,
}));

// ── Paginación ────────────────────────────────────────────────────────────────
const currentPage = ref(1);
const tareasPorPage = 8;

const totalPages = computed(() =>
    Math.max(1, Math.ceil(tareasOrdenadas.value.length / tareasPorPage))
);

const tareasPaginadas = computed(() => {
    const start = (currentPage.value - 1) * tareasPorPage;
    return tareasOrdenadas.value.slice(start, start + tareasPorPage);
});

const beforePagina = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPagina = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

// ── Helpers ───────────────────────────────────────────────────────────────────
const nombreEmpleado = (id) => {
    const e = empleados.value.find((emp) => emp.id === id);
    return e ? `${e.nombre} ${e.apellidos}` : "—";
};

const estadoLabel = (e) => ({ pendiente: "Pendiente", en_proceso: "En Proceso", finalizada: "Finalizada" }[e] ?? e);
const prioridadLabel = (p) => ({ baja: "Baja", media: "Media", alta: "Alta" }[p] ?? p);

const badgeEstado = (e) => ({
    pendiente: "bg-danger",
    en_proceso: "bg-warning text-dark",
    finalizada: "bg-success",
}[e] ?? "bg-secondary");

const badgePrioridad = (p) => ({
    baja: "bg-success",
    media: "bg-warning text-dark",
    alta: "bg-danger",
}[p] ?? "bg-secondary");

const rowClasEstado = (e) => ({
    pendiente: "row-pendiente",
    en_proceso: "row-en-proceso",
    finalizada: "row-finalizada",
}[e] ?? "");

const mostrarCarga = (titulo) => {
    Swal.fire({
        title: titulo,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

const cerrarCarga = () => {
    if (Swal.isVisible()) Swal.close();
};

const cargarDatos = async () => {
    loading.value = true;
    mostrarCarga("Cargando tareas y empleados...");
    try {
        const [resEmpleados, resTareas] = await Promise.all([getEmpleados(), getTareas()]);
        empleados.value = resEmpleados.data;
        tareas.value = resTareas.data;
        if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
    } catch (error) {
        console.error("Error cargando datos", error);
        Swal.fire({
            icon: "error",
            title: "Error al cargar los datos",
            text: error.message || "No se pudo conectar con la API.",
        });
    } finally {
        loading.value = false;
        cerrarCarga();
    }
};

// ── buscarEmpleado ────────────────────────────────────────────────────────────
const buscarEmpleado = () => {
    const id = busquedaEmpleadoId.value;

    if (!id) {
        Swal.fire({ icon: "warning", title: "Introduce un ID de empleado", timer: 1500, showConfirmButton: false });
        return;
    }

    const emp = empleados.value.find((e) => e.id === Number(id));

    if (emp) {
        empleadoSeleccionado.value = emp;
        nuevaTarea.value.empleadoId = emp.id;
        estadoBusqueda.value = "ok";
        errores.value.empleadoId = false;
    } else {
        empleadoSeleccionado.value = null;
        nuevaTarea.value.empleadoId = null;
        estadoBusqueda.value = "error";
        busquedaEmpleadoId.value = null;
        Swal.fire({
            icon: "error",
            title: "Empleado no encontrado",
            text: `No existe ningún empleado con ID ${id}.`,
            timer: 2000,
            showConfirmButton: false,
        });
    }
};

// ── selTarea ──────────────────────────────────────────────────────────────────
const selTarea = (id) => {
    const tarea = tareas.value.find((t) => t.id === id);
    if (!tarea) return;

    nuevaTarea.value = { ...tarea };
    editando.value = true;
    tareaEditandoId.value = id;
    errores.value = { titulo: false, estado: false, empleadoId: false };

    // Restaurar buscador de empleado
    busquedaEmpleadoId.value = tarea.empleadoId;
    empleadoSeleccionado.value = empleados.value.find((e) => e.id === tarea.empleadoId) ?? null;
    estadoBusqueda.value = empleadoSeleccionado.value ? "ok" : "idle";

    window.scrollTo({ top: 0, behavior: "smooth" });
};

// ── delTarea ──────────────────────────────────────────────────────────────────
const delTarea = async (id) => {
    const tarea = tareas.value.find((t) => t.id === id);
    if (!tarea) return;

    const confirmacion = await Swal.fire({
        title: `¿Eliminar "${tarea.titulo}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#dc3545",
    });

    if (!confirmacion.isConfirmed) return;

    loading.value = true;
    mostrarCarga("Eliminando tarea...");
    try {
        await deleteTarea(id);
        await cargarDatos();
        if (tareaEditandoId.value === id) cancelarEdicion();
        Swal.fire({ icon: "success", title: "Tarea eliminada", timer: 1300, showConfirmButton: false });
    } catch (error) {
        console.error("Error eliminando tarea", error);
        Swal.fire({
            icon: "error",
            title: "Error al eliminar tarea",
            text: error.message || "No se pudo completar la operación.",
        });
    } finally {
        loading.value = false;
        cerrarCarga();
    }
};

// ── guardarTarea ──────────────────────────────────────────────────────────────
const guardarTarea = async () => {
    if (!validarFormulario()) return;

    const confirmacion = await Swal.fire({
        title: editando.value ? "¿Modificar esta tarea?" : "¿Guardar nueva tarea?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: editando.value ? "Modificar" : "Guardar",
        cancelButtonText: "Cancelar",
    });
    if (!confirmacion.isConfirmed) return;

    loading.value = true;
    mostrarCarga(editando.value ? "Guardando tarea..." : "Creando tarea...");
    try {
        if (editando.value) {
            await updateTarea(tareaEditandoId.value, nuevaTarea.value);
            Swal.fire({ icon: "success", title: "Tarea modificada", timer: 1300, showConfirmButton: false });
        } else {
            await createTarea(nuevaTarea.value);
            Swal.fire({ icon: "success", title: "Tarea añadida", timer: 1300, showConfirmButton: false });
        }
        await cargarDatos();
        cancelarEdicion();
    } catch (error) {
        console.error("Error guardando tarea", error);
        Swal.fire({
            icon: "error",
            title: "Error al guardar tarea",
            text: error.message || "No se pudo completar la operación.",
        });
    } finally {
        loading.value = false;
        cerrarCarga();
    }
};

// ── cancelarEdicion / recargarTodo ────────────────────────────────────────────
const cancelarEdicion = () => {
    nuevaTarea.value = emptyTarea();
    editando.value = false;
    tareaEditandoId.value = null;
    errores.value = { titulo: false, estado: false, empleadoId: false };
    busquedaEmpleadoId.value = null;
    empleadoSeleccionado.value = null;
    estadoBusqueda.value = "idle";
};

const recargarTodo = async () => {
    currentPage.value = 1;
    cancelarEdicion();
    await cargarDatos();
};

// ── Validaciones ──────────────────────────────────────────────────────────────
const validarFormulario = () => {
    const titulo = nuevaTarea.value.titulo.trim();
    errores.value.titulo = !titulo;
    errores.value.estado = !nuevaTarea.value.estado;
    errores.value.empleadoId = !nuevaTarea.value.empleadoId;

    if (errores.value.titulo || errores.value.estado || errores.value.empleadoId) {
        Swal.fire({
            icon: "warning",
            title: "Faltan campos obligatorios",
            text: "Revisa Título, Estado y Empleado.",
            timer: 2000,
            showConfirmButton: false,
        });
        return false;
    }

    const tituloDuplicado = tareas.value.some(
        (t) => t.titulo.trim().toLowerCase() === titulo.toLowerCase() && t.id !== tareaEditandoId.value
    );

    if (tituloDuplicado) {
        Swal.fire({
            icon: "warning",
            title: "Título duplicado",
            text: "Ya existe otra tarea con el mismo título.",
            timer: 2200,
            showConfirmButton: false,
        });
        return false;
    }

    return true;
};

onMounted(() => {
    cargarDatos();
});
</script>

<style scoped>
.text-tareas {
    color: #198754;
}

.btn-tareas {
    background-color: #198754;
    border-color: #198754;
}

.btn-outline-tareas {
    border-color: #198754 !important;
    color: #198754 !important;
}

.btn-outline-tareas:hover {
    background-color: #198754 !important;
    color: white !important;
}

.border-tareas {
    border-color: #198754 !important;
}

.thead-tareas {
    background-color: #198754;
    color: white;
}

.thead-tareas th {
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.03em;
}

/* ── Label ancho fijo (alineación uniforme) ── */
.label-w {
    width: 110px;
    min-width: 110px;
}

/* ── Input empleado: amarillo si encontrado, rojo si no ── */
.input-empleado-ok {
    border-color: #198754 !important;
    background-color: #fff9c4 !important;
}

.input-empleado-error {
    border-color: #dc3545 !important;
    background-color: #ffe0e0 !important;
}

/* ── Color de fila según estado de la tarea ── */
.row-pendiente {
    background-color: #fff0f0 !important;
}

/* rojo suave  */
.row-en-proceso {
    background-color: #fffbef !important;
}

/* amarillo suave */
.row-finalizada {
    background-color: #f0fff4 !important;
}

/* ── Descripción truncada en tabla ── */
.desc-col {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ── Validación ── */
.invalid-feedback {
    display: block;
}

.is-invalid {
    border-color: #dc3545;
    background-color: #fff5f5;
}

/* ── Tabla ── */
.table th,
.table td {
    vertical-align: middle;
}
</style>