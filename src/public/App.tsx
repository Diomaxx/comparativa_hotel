// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/App.css';

// Definición de tipos TypeScript
type Phase = {
  title: string;
  description: string;
  icon: string;
  relatedPhase?: string;
  useCase?: string;
};

type Methodology = {
  name: string;
  color: string;
  lightColor: string;
  phases: Phase[];
  definition: string;
};

const App: React.FC = () => {
  // Estados para controlar la rotación del selector
  const [selectedMethodology, setSelectedMethodology] = useState<'sdlc' | 'stlc' | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{top: number, left: number} | null>(null);
  
  // Referencias para los elementos de fase
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Datos para SDLC
  const sdlc: Methodology = {
    name: "SDLC",
    color: "#2563eb",
    lightColor: "#eff6ff",
    definition: "Ciclo de Vida de Desarrollo de Software: Proceso sistemático para planificar, crear, probar y desplegar software de manera eficiente y controlada.",
    phases: [
      {
        title: "Planificación",
        description: "Identificar requerimientos del sistema de reservas, definir alcance, recursos y cronograma. Para el hotel, se determinan necesidades como reservas online, gestión de habitaciones y reporting.",
        icon: "bi bi-calendar-check",
        relatedPhase: "Análisis de requerimientos de pruebas",
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
  const stlc: Methodology = {
    name: "STLC",
    color: "#059669",
    lightColor: "#ecfdf5",
    definition: "Ciclo de Vida de Pruebas de Software: Proceso sistemático para verificar y validar que el software cumple con los requisitos establecidos y estándares de calidad.",
    phases: [
      {
        title: "Análisis de requerimientos de pruebas",
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

  // Función para rotar el selector
  const rotateSelector = () => {
    setSelectedPhase(null);
    setPopoverPosition(null);
    
    if (selectedMethodology === null) {
      setSelectedMethodology('sdlc');
    } else if (selectedMethodology === 'sdlc') {
      setSelectedMethodology('stlc');
    } else {
      setSelectedMethodology(null);
    }
  };

  // Calcular rotación del selector
  const getRotation = () => {
    if (selectedMethodology === 'sdlc') return 0;
    if (selectedMethodology === 'stlc') return 180;
    return 90;
  };

  // Manejar clic en una fase
  const handlePhaseClick = (index: number) => {
    if (selectedMethodology === 'sdlc') {
      if (selectedPhase === index) {
        setSelectedPhase(null);
        setPopoverPosition(null);
      } else {
        setSelectedPhase(index);
        // Calcular posición del popover basado en el elemento clickeado
        if (phaseRefs.current[index]) {
          const rect = phaseRefs.current[index]!.getBoundingClientRect();
          const containerRect = document.querySelector('.container-xl')!.getBoundingClientRect();
          
          setPopoverPosition({
            top: rect.top - containerRect.top + rect.height / 2,
            left: rect.right - containerRect.left + 20
          });
        }
      }
    } else if (selectedMethodology === 'stlc') {
      if (selectedPhase === index) {
        setSelectedPhase(null);
      } else {
        setSelectedPhase(index);
      }
    }
  };

  // Efecto para reposicionar el popover en scroll y resize
  useEffect(() => {
    const handleResize = () => {
      if (selectedPhase !== null && selectedMethodology === 'sdlc' && phaseRefs.current[selectedPhase]) {
        const rect = phaseRefs.current[selectedPhase]!.getBoundingClientRect();
        const containerRect = document.querySelector('.container-xl')!.getBoundingClientRect();
        
        setPopoverPosition({
          top: rect.top - containerRect.top + rect.height / 2,
          left: rect.right - containerRect.left + 20
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [selectedPhase, selectedMethodology]);

  return (
    <div className="container-fluid py-4 modern-bg">
      <header className="text-center mb-5 py-5 header-gradient">
        <div className="container">
          <h1 className="text-white display-3 fw-bold mb-3">
            <i className="bi bi-diagram-3-fill me-3"></i>
            Organizador SDLC & STLC
          </h1>
          <p className="lead text-white opacity-90 mb-0">Sistema de Reservas para Hotel - Gestión de Procesos</p>
        </div>
      </header>

      <div className="container-xl position-relative">
        <div className="row justify-content-center align-items-start mb-5">
          {/* Tarjeta SDLC */}
          <div className="col-lg-4 col-md-10 mb-4">
            <div 
              className={`card ultra-modern-card h-100 border-0 shadow-lg transition-all ${selectedMethodology === 'sdlc' ? 'highlighted-card sdlc-highlighted' : ''}`}
            >
              <div className="card-header bg-transparent border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="icon-container-modern rounded-circle d-flex align-items-center justify-content-center me-3 sdlc-gradient">
                    <i className="bi bi-code-slash text-white fs-3"></i>
                  </div>
                  <div>
                    <h3 className="card-title mb-1 sdlc-color">SDLC</h3>
                    <small className="text-muted">Software Development</small>
                  </div>
                </div>
              </div>
              
              <div className="card-body pt-0">
                {selectedMethodology !== 'sdlc' ? (
                  <div className="definition-container">
                    <p className="card-text text-muted fs-6 lh-lg">{sdlc.definition}</p>
                    <div className="feature-badges mt-3">
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Planificación
                      </span>
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Desarrollo
                      </span>
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Implementación
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h6 className="text-dark mb-3 border-bottom pb-2 fw-bold">
                      <i className="bi bi-list-ul me-2 sdlc-color"></i>
                      Fases del SDLC para Sistema de Reservas
                    </h6>
                    <div className="phase-list">
                      {sdlc.phases.map((phase, index) => (
                        <div 
                          key={index}
                          ref={el => phaseRefs.current[index] = el}
                          className={`phase-item-modern mb-3 p-3 rounded-3 hover-effect cursor-pointer ${selectedPhase === index ? 'phase-selected-modern sdlc-selected' : ''}`}
                          onClick={() => handlePhaseClick(index)}
                        >
                          <div className="d-flex align-items-center">
                            <div className="phase-icon-container me-3">
                              <i className={`${phase.icon} sdlc-color fs-5`}></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="phase-title mb-1 sdlc-color fw-semibold">{phase.title}</h6>
                              <p className="phase-desc text-muted small mb-0 lh-sm">{phase.description.substring(0, 100)}...</p>
                            </div>
                            <i className="bi bi-chevron-right text-muted"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selector circular central mejorado */}
          <div className="col-lg-2 col-md-12 text-center d-flex flex-column justify-content-center align-items-center my-4">
            <div 
              className="ultra-modern-selector-circle mx-auto d-flex align-items-center justify-content-center position-relative"
              onClick={rotateSelector}
              style={{ transform: `rotate(${getRotation()}deg)` }}
            >
              <div className="selector-core-modern"></div>
              <div className="selector-rings">
                <div className="selector-ring ring-1"></div>
                <div className="selector-ring ring-2"></div>
              </div>
              <div 
                className="selector-arrow-ultra" 
                style={{ 
                  borderTopColor: selectedMethodology === 'sdlc' ? sdlc.color : 
                                  selectedMethodology === 'stlc' ? stlc.color : '#6b7280'
                }}
              ></div>
              <div className="selector-glow-modern"></div>
              
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="text-center selector-content">
                  <i className="bi bi-arrow-repeat text-muted fs-4 mb-1"></i>
                  <div className="selector-text-modern d-block small fw-medium text-muted">Click</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`badge rounded-pill px-3 py-2 ${selectedMethodology ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                {selectedMethodology === null ? "Selecciona Vista" : 
                 selectedMethodology === 'sdlc' ? "Vista SDLC" : "Vista STLC"}
              </span>
            </div>
          </div>

          {/* Tarjeta STLC */}
          <div className="col-lg-4 col-md-10 mb-4">
            <div 
              className={`card ultra-modern-card h-100 border-0 shadow-lg transition-all ${selectedMethodology === 'stlc' ? 'highlighted-card stlc-highlighted' : ''}`}
            >
              <div className="card-header bg-transparent border-0 py-4">
                <div className="d-flex align-items-center">
                  <div className="icon-container-modern rounded-circle d-flex align-items-center justify-content-center me-3 stlc-gradient">
                    <i className="bi bi-shield-check text-white fs-3"></i>
                  </div>
                  <div>
                    <h3 className="card-title mb-1 stlc-color">STLC</h3>
                    <small className="text-muted">Software Testing</small>
                  </div>
                </div>
              </div>
              
              <div className="card-body pt-0">
                {selectedMethodology !== 'stlc' ? (
                  <div className="definition-container">
                    <p className="card-text text-muted fs-6 lh-lg">{stlc.definition}</p>
                    <div className="feature-badges mt-3">
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Análisis
                      </span>
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Pruebas
                      </span>
                      <span className="badge bg-light text-dark rounded-pill me-2 mb-2">
                        <i className="bi bi-check2 me-1"></i>Validación
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h6 className="text-dark mb-3 border-bottom pb-2 fw-bold">
                      <i className="bi bi-list-ul me-2 stlc-color"></i>
                      Fases del STLC para Sistema de Reservas
                    </h6>
                    <div className="phase-list">
                      {stlc.phases.map((phase, index) => (
                        <div 
                          key={index} 
                          className={`phase-item-modern mb-3 p-3 rounded-3 hover-effect cursor-pointer ${selectedPhase === index ? 'phase-selected-modern stlc-selected' : ''}`}
                          onClick={() => handlePhaseClick(index)}
                        >
                          <div className="d-flex align-items-center">
                            <div className="phase-icon-container me-3">
                              <i className={`${phase.icon} stlc-color fs-5`}></i>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="phase-title mb-1 stlc-color fw-semibold">{phase.title}</h6>
                              <p className="phase-desc text-muted small mb-0 lh-sm">{phase.description.substring(0, 100)}...</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Popover para SDLC con posición dinámica */}
        {selectedPhase !== null && selectedMethodology === 'sdlc' && popoverPosition && (
          <div 
            className="popover-custom bs-popover-end show animate-fade-in"
            style={{
              position: 'absolute',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
              zIndex: 1000
            }}
          >
            <div className="popover-arrow" style={{ top: '30px' }}></div>
            <div className="popover-header bg-transparent border-0 d-flex align-items-center justify-content-between">
              <h6 className="mb-0 sdlc-color fw-bold">
                <i className="bi bi-link-45deg me-2"></i>
                Relación SDLC-STLC
              </h6>
              <button 
                type="button" 
                className="btn-close btn-close-sm"
                onClick={() => {setSelectedPhase(null); setPopoverPosition(null);}}
                aria-label="Close"
              ></button>
            </div>
            <div className="popover-body p-3">
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <i className={`${sdlc.phases[selectedPhase].icon} me-2 sdlc-color`}></i>
                  <h6 className="mb-0 sdlc-color fw-semibold">
                    {sdlc.phases[selectedPhase].title}
                  </h6>
                </div>
                <p className="text-muted small lh-sm mb-3">
                  {sdlc.phases[selectedPhase].description}
                </p>
              </div>

              <div className="connection-arrow text-center mb-3">
                <i className="bi bi-arrow-down text-muted fs-5"></i>
              </div>

              <div className="mb-3">
                <h6 className="stlc-color fw-semibold mb-2">
                  <i className="bi bi-shield-check me-2"></i>
                  {sdlc.phases[selectedPhase].relatedPhase}
                </h6>
              </div>

              <div className="use-case-container-modern p-3 rounded-3">
                <h6 className="d-flex align-items-center mb-2 text-dark fw-semibold">
                  <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
                  Caso de Uso
                </h6>
                <p className="small mb-0 text-dark lh-sm">
                  {sdlc.phases[selectedPhase].useCase}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla comparativa mejorada */}
        <div className="row mt-5 pt-4">
          <div className="col-12">
            <div className="card ultra-modern-card border-0 shadow-lg">
              <div className="card-header bg-transparent border-0 py-4">
                <div className="text-center">
                  <h2 className="mb-2 text-dark fw-bold">
                    <i className="bi bi-table me-3"></i>
                    Comparación Detallada SDLC vs STLC
                  </h2>
                  <p className="text-muted mb-0 fs-6">Sistema de Reservas de Hotel - Análisis Comparativo</p>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-hover align-middle modern-table">
                    <thead>
                      <tr className="table-light">
                        <th scope="col" className="sdlc-color fw-bold border-0 py-3">
                          <i className="bi bi-code-slash me-2"></i>Fase SDLC
                        </th>
                        <th scope="col" className="sdlc-color fw-bold border-0 py-3">Actividades Desarrollo</th>
                        <th scope="col" className="stlc-color fw-bold border-0 py-3">
                          <i className="bi bi-shield-check me-2"></i>Fase STLC
                        </th>
                        <th scope="col" className="stlc-color fw-bold border-0 py-3">Actividades Pruebas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sdlc.phases.map((phase, index) => (
                        <tr key={index} className="hover-effect table-row-modern">
                          <td className="fw-semibold border-0 py-4">
                            <div className="d-flex align-items-center">
                              <i className={`${phase.icon} me-2 sdlc-color`}></i>
                              {phase.title}
                            </div>
                          </td>
                          <td className="border-0 py-4 text-muted">{phase.description}</td>
                          <td className="fw-semibold border-0 py-4">
                            <div className="d-flex align-items-center">
                              <i className={`${stlc.phases[index]?.icon || 'bi bi-circle'} me-2 stlc-color`}></i>
                              {stlc.phases[index]?.title || 'Pruebas de Regresión'}
                            </div>
                          </td>
                          <td className="border-0 py-4 text-muted">
                            {stlc.phases[index]?.description || 'Pruebas de regresión para asegurar que cambios no rompan funcionalidad existente del sistema de reservas.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 py-5 footer-modern">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h6 className="text-muted mb-2">Organizador Gráfico SDLC & STLC</h6>
              <p className="text-muted small mb-0">Sistema de Reservas de Hotel - Gestión Integral de Procesos de Desarrollo y Pruebas</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;