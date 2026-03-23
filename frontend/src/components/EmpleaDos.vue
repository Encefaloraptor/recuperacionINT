<template>
    <div class="container-fluid my-2 p-2 border rounded-4 shadow-lg bg-white">
        <h3 class="text-center mb-4 fw-semibold text-success border-bottom pb-2 mt-2">
            <i class="bi bi-person-badge me-2"></i>Gestión de Empleados
        </h3>

        <!-- Formulario -->
        <form class="mb-2">

            <!-- Nombre y Apellidos -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="nombre" class="form-label mb-0 text-nowrap w-25">
                        Nombre: <span class="text-danger">*</span>
                    </label>
                    <input type="text" id="nombre" class="form-control flex-grow-1" placeholder="Nombre del empleado" />
                </div>

                <div class="col-md-6 d-flex align-items-center">
                    <label for="apellidos" class="form-label me-4 mb-0 text-nowrap">Apellidos:</label>
                    <input type="text" id="apellidos" class="form-control flex-grow-1" />
                </div>
            </div>

            <!-- Email y Móvil -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="email" class="form-label mb-0 text-nowrap w-25">
                        Email: <span class="text-danger">*</span>
                    </label>
                    <input type="email" id="email" class="form-control flex-grow-1" />
                </div>

                <div class="col-md-3 d-flex align-items-center">
                    <label for="movil" class="form-label me-4 ms-4 mb-0 text-nowrap">Móvil:</label>
                    <input type="tel" id="movil" class="form-control flex-grow-1 text-center" />
                </div>
            </div>

            <!-- Puesto -->
            <div class="mb-3 row g-3 align-items-center">
                <div class="col-md-5 d-flex align-items-center">
                    <label for="puesto" class="form-label mb-0 text-nowrap w-25">Puesto:</label>
                    <select id="puesto" class="form-select flex-grow-1">
                        <option disabled value="">Seleccione puesto</option>
                        <option value="rrhh">RRHH</option>
                        <option value="contabilidad">Contabilidad</option>
                        <option value="almacen">Almacén</option>
                        <option value="ventas">Ventas</option>
                    </select>
                </div>

                <div class="col-md-6 d-flex align-items-center justify-content-end">
                    <button type="button" class="btn btn-outline-secondary btn-sm ms-2 p-1">
                        <i class="bi bi-arrow-clockwise fs-5"></i>
                    </button>
                </div>
            </div>

            <!-- Botón guardar -->
            <div class="d-flex align-items-center mt-3">
                <div class="flex-grow-1 d-flex justify-content-center">
                    <button type="submit" class="btn btn-success px-4">
                        Guardar Empleado
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
                    <tr v-for="(empleado, index) in empleados" :key="empleado.id">
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
                            <button class="btn btn-danger btn-sm">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button class="btn btn-warning btn-sm ms-2">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Paginación (estática) -->
    <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-success btn-sm me-2 rounded-0 border-1 shadow-none" disabled>
            <i class="bi bi-chevron-left"></i>
        </button>
        <span class="mx-3 align-self-center text-muted">Página 1</span>
        <button class="btn btn-outline-success btn-sm rounded-0 border-1 shadow-none" disabled>
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";

// ── Modelo de datos ──────────────────────────────────────────────────────────
function emptyEmpleado() {
    return { id: null, apellidos: "", nombre: "", email: "", movil: "", puesto: "" };
}

// Array de empleados con datos de ejemplo
const empleados = ref([
    { id: 1, apellidos: "García López", nombre: "Ana", email: "ana.garcia@empresa.com", movil: "612345678", puesto: "rrhh" },
    { id: 2, apellidos: "Martínez Ruiz", nombre: "Pedro", email: "pedro.martinez@empresa.com", movil: "623456789", puesto: "contabilidad" },
    { id: 3, apellidos: "Fernández Díaz", nombre: "Laura", email: "laura.fernandez@empresa.com", movil: "634567890", puesto: "ventas" },
    { id: 4, apellidos: "Sánchez Mora", nombre: "Carlos", email: "carlos.sanchez@empresa.com", movil: "645678901", puesto: "almacen" },
]);

// ── Helpers puros ────────────────────────────────────────────────────────────
const puestoLabel = (p) =>
    ({ rrhh: "RRHH", contabilidad: "Contabilidad", almacen: "Almacén", ventas: "Ventas" }[p] ?? p);

const badgePuesto = (p) =>
    ({ rrhh: "bg-primary", contabilidad: "bg-info text-dark", almacen: "bg-secondary", ventas: "bg-success" }[p] ?? "bg-light text-dark");
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