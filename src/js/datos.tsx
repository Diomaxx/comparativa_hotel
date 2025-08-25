// js/datos.jsx

// Definición de tipos TypeScript
export type Phase = {
    title: string;
    description: string;
    icon: string;
    relatedPhase?: string;
    useCase?: string;
};

export type Methodology = {
    name: string;
    color: string;
    lightColor: string;
    phases: Phase[];
    definition: string;
};

// Datos para SDLC
export const sdlc: Methodology = {
    name: "SDLC",
    color: "#2563eb",
    lightColor: "#eff6ff",
    definition: "Ciclo de Vida de Desarrollo de Software: Proceso sistemático para planificar, crear, probar y desplegar software de manera eficiente y controlada.",
    phases: [
        {
            title: "Planificación",
            description: "Identificar requerimientos del sistema de reservas, definir alcance, recursos y cronograma. Para el hotel, se determinan necesidades como reservas online, gestión de habitaciones y reporting.",
            icon: "bi bi-calendar-check",
            relatedPhase: "Análisis de Requisitos",
            useCase: "Durante la planificación del SDLC, el equipo de pruebas comienza a analizar qué aspectos del sistema de reservas requerirán verificación, como la disponibilidad de habitaciones en tiempo real y la integración con pasarelas de pago."
        },
        {
            title: "Análisis de requisitos",
            description: "Realizar entrevistas con personal del hotel, definir historias de usuario (ej: 'Como cliente quiero reservar una habitación online'), casos de uso y observación de procesos actuales.",
            icon: "bi bi-clipboard-data",
            relatedPhase: "Planificación de pruebas",
            useCase: "Con los requisitos definidos, el equipo STLC planifica cómo probar cada funcionalidad: tipos de pruebas necesarias, recursos requeridos y cronograma para validar el sistema de reservas."
        },
        {
            title: "Diseño del sistema",
            description: "Definir arquitectura del sistema de reservas, interfaces de usuario, diseño de base de datos para habitaciones, clientes y reservas, y APIs de integración con sistemas de pago.",
            icon: "bi bi-diagram-3",
            relatedPhase: "Diseño de casos de prueba",
            useCase: "A partir de los diseños del sistema, el equipo de pruebas diseña casos específicos para validar cada componente: flujos de reserva, cancelaciones, gestión de habitaciones y reportes."
        },
        {
            title: "Desarrollo",
            description: "Codificación del sistema de reservas: frontend para la web del hotel, backend con lógica de negocio, integración con pasarela de pagos y base de datos.",
            icon: "bi bi-code-slash",
            relatedPhase: "Configuración del entorno",
            useCase: "Mientras los desarrolladores codifican, el equipo de pruebas prepara los entornos necesarios para evaluar el sistema: servidores, bases de datos de prueba y herramientas de automatización."
        },
        {
            title: "Pruebas",
            description: "Validación funcional (reservas, cancelaciones, consultas) y no funcional (rendimiento con múltiples usuarios simultáneos, seguridad de datos de clientes).",
            icon: "bi bi-bug-fill",
            relatedPhase: "Ejecución de pruebas",
            useCase: "En esta fase ambos ciclos se sincronizan: los desarrolladores corrigen errores reportados por el equipo de pruebas, quien ejecuta los casos diseñados para el sistema de reservas."
        },
        {
            title: "Implementación/Despliegue",
            description: "Paso a producción: despliegue en servidores del hotel, migración de datos existentes, capacitación al personal y lanzamiento público del sistema.",
            icon: "bi bi-rocket-takeoff",
            relatedPhase: "Cierre de pruebas",
            useCase: "El equipo de pruebas realiza las verificaciones finales en el entorno de producción y genera el reporte de cierre, confirmando que el sistema de reservas cumple con los criterios de calidad establecidos."
        },
        {
            title: "Mantenimiento",
            description: "Corrección de errores reportados (ej: problemas con tipos de habitación), implementación de mejoras (nuevos métodos de pago) y actualizaciones periódicas.",
            icon: "bi bi-tools",
            relatedPhase: "Pruebas de regresión",
            useCase: "Para cada actualización del sistema, el equipo de pruebas ejecuta pruebas de regresión para asegurar que los cambios no afecten funcionalidades existentes del sistema de reservas."
        }
    ]
};

// Datos para STLC
export const stlc: Methodology = {
    name: "STLC",
    color: "#059669",
    lightColor: "#ecfdf5",
    definition: "Ciclo de Vida de Pruebas de Software: Proceso sistemático para verificar y validar que el software cumple con los requisitos establecidos y estándares de calidad.",
    phases: [
        {
            title: "Análisis de reqs. de pruebas",
            description: "Determinar qué se va a probar en el sistema de reservas: funcionalidades críticas (reservas, cancelaciones), requisitos no funcionales (tiempos de respuesta, seguridad) y compatibilidad con dispositivos.",
            icon: "bi bi-search",
            relatedPhase: "Planificación SDLC",
            useCase: "El equipo de pruebas analiza los requisitos iniciales del sistema de reservas para identificar qué aspectos requieren verificación y validación."
        },
        {
            title: "Planificación de pruebas",
            description: "Seleccionar estrategia de pruebas (manual/automática), definir criterios de entrada/salida para cada fase, asignar recursos y elaborar cronograma para las pruebas del sistema de reservas.",
            icon: "bi bi-kanban",
            relatedPhase: "Análisis de requisitos SDLC",
            useCase: "Con base en los requisitos documentados, el equipo STLC planifica las actividades de prueba para el sistema de reservas, coordinándose con el cronograma de desarrollo."
        },
        {
            title: "Diseño de casos de prueba",
            description: "Preparar entradas (datos de reserva), salidas esperadas (confirmación), escenarios de prueba (reserva exitosa, habitación no disponible) y datos de prueba para todas las funcionalidades.",
            icon: "bi bi-pencil-square",
            relatedPhase: "Diseño del sistema SDLC",
            useCase: "A partir de los diseños técnicos, se crean casos de prueba detallados para validar cada componente del sistema de reservas."
        },
        {
            title: "Configuración del entorno",
            description: "Preparar servidores de prueba, bases de datos con información de habitaciones y reservas, herramientas de testing y configurar entorno similar a producción para validar el sistema.",
            icon: "bi bi-gear-fill",
            relatedPhase: "Desarrollo SDLC",
            useCase: "Mientras los desarrolladores codifican, el equipo de pruebas prepara los ambientes necesarios para evaluar el sistema de reservas."
        },
        {
            title: "Ejecución de pruebas",
            description: "Ejecutar casos de prueba para el sistema de reservas: registrar resultados, reportar defectos (ej: error al aplicar descuentos) y verificar correcciones.",
            icon: "bi bi-play-circle-fill",
            relatedPhase: "Pruebas SDLC",
            useCase: "Se ejecutan las pruebas planificadas y se reportan los defectos encontrados en el sistema de reservas para su corrección."
        },
        {
            title: "Cierre de pruebas",
            description: "Evaluar métricas (cobertura, defectos encontrados/corregidos), elaborar reporte final de pruebas y obtener aprobación para pasar a producción el sistema de reservas.",
            icon: "bi bi-flag-fill",
            relatedPhase: "Implementación SDLC",
            useCase: "Al finalizar las pruebas, se genera el reporte final que avala la calidad del sistema de reservas para su despliegue a producción."
        }
    ]
};

// ==================== ROLES, RF POR ROL Y NFR ====================

export type RoleKey =
  | 'cliente'
  | 'recepcionista'
  | 'dueno'
  | 'gerente'
  | 'adminFinanciero'
  | 'rrhh'
  | 'atencionCliente';

export type Role = {
  key: RoleKey;
  name: string;
  description: string;
  icon: string;
};

export const roles: Role[] = [
  { key: 'cliente', name: 'Cliente', description: 'Explora disponibilidad, reserva, paga y gestiona cambios.', icon: 'bi bi-person-check' },
  { key: 'recepcionista', name: 'Recepcionista', description: 'Opera reservas, check‑in/out y modificaciones.', icon: 'bi bi-person-badge' },
  { key: 'dueno', name: 'Dueño', description: 'Visión, reportes globales y límites de precios.', icon: 'bi bi-building-fill' },
  { key: 'gerente', name: 'Gerente General', description: 'Define políticas (depósitos, horarios) y aprueba excepciones.', icon: 'bi bi-person-gear' },
  { key: 'adminFinanciero', name: 'Admin. Financiero', description: 'Conciliación de pagos y devoluciones.', icon: 'bi bi-cash-coin' },
  { key: 'rrhh', name: 'RRHH', description: 'Altas/bajas de usuarios, permisos y capacitación.', icon: 'bi bi-people-gear' },
  { key: 'atencionCliente', name: 'Atención al Cliente', description: 'Seguimiento post‑venta y reclamos.', icon: 'bi bi-headset' },
];

export type RoleRequirement = {
  code: string; // RF-01...
  title: string;
  details: string;
  stlcTests: string[]; // Ideas de pruebas
};

export const roleToRequirements: Record<RoleKey, RoleRequirement[]> = {
  cliente: [
    { code: 'RF-01', title: 'Búsqueda por fechas y huéspedes', details: 'Ingresar rango de fechas y cantidad; obtener resultados válidos.', stlcTests: [
      'Caja negra: combinaciones de fechas válidas/ inválidas (fecha fin < inicio).',
      'Boundary: huéspedes = 1, máx. permitido; fechas en temporada alta/baja.',
    ] },
    { code: 'RF-02', title: 'Disponibilidad y tarifas', details: 'Mostrar tipos de habitación, tarifa total y desglose.', stlcTests: [
      'Verificación de cálculo: subtotal, impuestos, depósito, moneda.',
      'UI: orden por precio/ocupación; consistencia en móvil y desktop.',
    ] },
    { code: 'RF-03', title: 'Alertas y alternativas', details: 'Si no hay cupo, ofrecer fechas cercanas/tipos alternativos.', stlcTests: [
      'Flujo sin disponibilidad: propuesta de 3 fechas cercanas y 2 tipos.',
      'Prueba de regresión al actualizar inventario.',
    ] },
    { code: 'RF-04', title: 'Captura de datos antes de pagar', details: 'Nombre, documento y contacto previos al pago.', stlcTests: [
      'Validación de campos obligatorios y formatos (email, documento).',
      'Seguridad: no exponer datos sensibles en URL ni logs.',
    ] },
    { code: 'RF-06', title: 'Pago de depósito', details: 'Permitir depósito configurable (20–50%).', stlcTests: [
      'Cálculo correcto del porcentaje; tolerancia de redondeo.',
      'Integración sandbox pasarela y reintentos ante timeout.',
    ] },
    { code: 'RF-10', title: 'Cancelaciones y cambios', details: 'Ver políticas y aplicar penalidades segun plazo.', stlcTests: [
      'Escenarios: dentro/fuera de plazo; no‑show; cambio de fecha.',
      'Idempotencia al reintentar cancelación.',
    ] },
    { code: 'RF-11', title: 'Notificaciones', details: 'Email/WhatsApp de confirmación y cambios.', stlcTests: [
      'Entrega y contenido: placeholders, idioma, zona horaria.',
      'Pruebas de enlace profundo al detalle de reserva.',
    ] },
  ],
  recepcionista: [
    { code: 'RF-01', title: 'Búsquedas operativas', details: 'Buscar por fechas, nombre o nro. de reserva.', stlcTests: [
      'Búsqueda parcial/ exacta; rendimiento con 10k reservas.',
    ] },
    { code: 'RF-02', title: 'Disponibilidad por tipo', details: 'Visual de ocupación por tipo/fecha y tarifa.', stlcTests: [
      'Consistencia con inventario maestro; concurrencia con web.',
    ] },
    { code: 'RF-05', title: 'Unificar reserva y llegada', details: 'Evitar repetir datos en check‑in.', stlcTests: [
      'Persistencia: datos fluyen de reserva a check‑in.',
      'Negativos: edición parcial y conflictos de validación.',
    ] },
    { code: 'RF-08', title: 'Check‑in desde 08:00', details: 'Permitir llegadas programadas 10:00.', stlcTests: [
      'Reglas de horario; zonas horarias; reloj del sistema.',
    ] },
    { code: 'RF-09', title: 'Early/Late check‑in/out', details: 'Reglas y cargos automáticos.', stlcTests: [
      'Cálculo cargos; excepciones aprobadas por gerente.',
    ] },
    { code: 'RF-11', title: 'Notificaciones operativas', details: 'Envío de confirmaciones y cambios.', stlcTests: [
      'Auditoría de envíos y reintentos en cola.',
    ] },
  ],
  dueno: [
    { code: 'RF-12', title: 'Roles y auditoría', details: 'Permisos y trazabilidad.', stlcTests: [
      'RBAC: acceso por perfil, intento de escalada.',
    ] },
    { code: 'RF-13', title: 'Reportes globales', details: 'Visión de ocupación e ingresos.', stlcTests: [
      'Exactitud con muestras de datos; tiempos de generación.',
    ] },
  ],
  gerente: [
    { code: 'RF-06', title: 'Política de depósito', details: 'Definir % y excepciones.', stlcTests: [
      'Cambio de política: efecto inmediato y versionado.',
    ] },
    { code: 'RF-08', title: 'Política de check‑in/out', details: 'Reglas y aprobaciones especiales.', stlcTests: [
      'Flujos de aprobación; registro de auditoría.',
    ] },
    { code: 'RF-10', title: 'Políticas de cancelación', details: 'Plazos, penalidades, devoluciones.', stlcTests: [
      'Matrices de penalidad; redondeos; edge cases calendario.',
    ] },
    { code: 'RF-12', title: 'Gestión de roles', details: 'Permisos avanzados y auditoría.', stlcTests: [
      'Pruebas de autorización en endpoints críticos.',
    ] },
  ],
  adminFinanciero: [
    { code: 'RF-07', title: 'Integración pagos', details: 'Conciliación, comprobantes y estados.', stlcTests: [
      'Webhook: firmado, duplicados; reconciliación con montos.',
    ] },
    { code: 'RF-10', title: 'Devoluciones', details: 'Procesar refund según política.', stlcTests: [
      'Refund parcial/total; fallos de pasarela; reintentos seguros.',
    ] },
    { code: 'RF-13', title: 'Reportes financieros', details: 'Depósitos pendientes, ingresos.', stlcTests: [
      'Cortes por fecha; moneda; consistencia con contabilidad.',
    ] },
  ],
  rrhh: [
    { code: 'RF-12', title: 'Altas/bajas y permisos', details: 'Gestión de usuarios/roles.', stlcTests: [
      'Ciclo de vida de usuario; expiración de contraseñas.',
    ] },
  ],
  atencionCliente: [
    { code: 'RF-11', title: 'Comunicaciones', details: 'Confirmaciones, cambios y cancelaciones.', stlcTests: [
      'Plantillas multilenguaje; enlaces de seguimiento.',
    ] },
    { code: 'RF-10', title: 'Reclamos y no‑show', details: 'Aplicar políticas y gestionar reclamos.', stlcTests: [
      'Flujos de reclamo y SLA; pruebas de idempotencia.',
    ] },
  ],
};

export type NonFunctionalRequirement = {
  code: string; // NFR-XX
  requirement: string;
  stlcTests: string[];
};

export const nonFunctionalRequirements: { area: string; items: NonFunctionalRequirement[] }[] = [
  {
    area: 'Rendimiento',
    items: [
      { code: 'NFR-01', requirement: 'Búsqueda y disponibilidad P95 < 2s con 200 usuarios concurrentes.', stlcTests: [
        'Pruebas de carga (JMeter/k6): perfiles pico y base.', 'Monitorizar P95/P99 y consumo de recursos.',
      ] },
      { code: 'NFR-02', requirement: 'Generación de reportes < 5s para 12 meses.', stlcTests: [
        'Datasets grandes; caché; paginación.',
      ] },
    ],
  },
  {
    area: 'Seguridad',
    items: [
      { code: 'NFR-03', requirement: 'Cumplir OWASP Top 10 y PCI‑DSS para pagos.', stlcTests: [
        'DAST (ZAP) y SAST; pruebas de CSRF/XSS/IDOR.',
      ] },
      { code: 'NFR-04', requirement: 'Registro de auditoría para acciones críticas.', stlcTests: [
        'Verificar integridad de logs, timestamps y usuario.',
      ] },
    ],
  },
  {
    area: 'Usabilidad/Accesibilidad',
    items: [
      { code: 'NFR-05', requirement: 'Soporte móvil y WCAG AA.', stlcTests: [
        'A11y: contraste, foco, lector de pantalla; responsive.',
      ] },
    ],
  },
  {
    area: 'Confiabilidad',
    items: [
      { code: 'NFR-06', requirement: 'Disponibilidad 99.5% y recuperación ante fallos.', stlcTests: [
        'Pruebas de resiliencia; canary/rollback.',
      ] },
    ],
  },
];