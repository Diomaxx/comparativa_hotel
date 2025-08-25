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