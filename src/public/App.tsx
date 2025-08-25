// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/App.css';
import { sdlc, stlc, roles, roleToRequirements, nonFunctionalRequirements, type RoleKey } from '../js/datos';

const App: React.FC = () => {
  // Estados para controlar la rotación del selector
  const [selectedMethodology, setSelectedMethodology] = useState<'sdlc' | 'stlc' | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number, left: number } | null>(null);
  const [popoverSide, setPopoverSide] = useState<'start' | 'end'>('start');
  // Estado para modal de roles (Planificación / Análisis)
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [rolesModalPhaseIndex, setRolesModalPhaseIndex] = useState<number | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'rf' | 'nfr'>('rf');
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);

  const POPOVER_WIDTH = 380;
  const POPOVER_MARGIN = 20;
  // Referencias para los elementos de fase
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


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

  // Calcular rotación del indicador (arco)
  const getRotation = () => {
    // Posiciones deseadas:
    // - Neutro: abajo (90°)
    // - SDLC: izquierda (180°)
    // - STLC: derecha (0°)
    if (selectedMethodology === 'sdlc') return 180;
    if (selectedMethodology === 'stlc') return 0;
    return 90;
  };

  // Función para calcular posición del popover
  const calculatePopoverPosition = (index: number, forceSide?: 'start' | 'end') => {
    if (!phaseRefs.current[index] || !containerRef.current) return null;

    const phaseEl = phaseRefs.current[index]!;
    const containerEl = containerRef.current;

    const phaseRect = phaseEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    let side: 'start' | 'end' = forceSide ?? 'end';
    if (!forceSide) {
      const spaceRight = window.innerWidth - phaseRect.right;
      side = spaceRight >= (POPOVER_WIDTH + POPOVER_MARGIN) ? 'end' : 'start';
    }
    if (popoverSide !== side) setPopoverSide(side);

    const top = (phaseRect.top - containerRect.top) + (phaseRect.height / 2);

    const left =
      side === 'end'
        ? (phaseRect.right - containerRect.left) + POPOVER_MARGIN
        : (phaseRect.left - containerRect.left) - POPOVER_WIDTH - POPOVER_MARGIN;

    return { top, left };
  };


  // Manejar clic en una fase
  const handlePhaseClick = (index: number) => {
    if (selectedMethodology === 'sdlc') {
      // Abrir modal grande solo para Planificación (0) y Análisis (1)
      if (index === 0 || index === 1) {
        setSelectedPhase(index);
        setRolesModalPhaseIndex(index);
        setIsRolesModalOpen(true);
        setActiveModalTab('rf');
        setSelectedRole(null);
        setPopoverPosition(null);
        return;
      }
      if (selectedPhase === index) {
        setSelectedPhase(null);
        setPopoverPosition(null);
      } else {
        setSelectedPhase(index);

        // Usar setTimeout para asegurar que el DOM esté actualizado
        setTimeout(() => {
          const position = calculatePopoverPosition(index, 'end');
          if (position) {
            setPopoverPosition(position);
          }
        }, 10);
      }
    } else if (selectedMethodology === 'stlc') {
      if (selectedPhase === index) {
        setSelectedPhase(null);
        setPopoverPosition(null);
      } else {
        setSelectedPhase(index);
        setTimeout(() => {
          const position = calculatePopoverPosition(index,'start');
          if (position) setPopoverPosition(position);
        }, 10);
      }
    }
  };

  const closeRolesModal = () => {
    setIsRolesModalOpen(false);
    setSelectedRole(null);
    setRolesModalPhaseIndex(null);
  };

  const handleRoleClick = (roleKey: RoleKey) => {
    setSelectedRole(roleKey);
  };

  const handleBackInModal = () => {
    if (selectedRole) {
      setSelectedRole(null);
    } else {
      closeRolesModal();
    }
  };

  // Reposicionar popover en resize/scroll
  const repositionPopover = () => {
    if (selectedPhase !== null && selectedMethodology !== null) {
      const position = calculatePopoverPosition(selectedPhase, popoverSide);
      if (position) {
        setPopoverPosition(position);
      }
    }
  };

  // Efecto para reposicionar el popover en scroll y resize
  useEffect(() => {
    const handleResize = () => {
      repositionPopover();
    };

    const handleScroll = () => {
      repositionPopover();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [selectedPhase, selectedMethodology, popoverSide]);

  // Efecto para ajustar popover si se sale de la pantalla
  useEffect(() => {
    if (popoverPosition && popoverRef.current && containerRef.current) {
      const popover = popoverRef.current;
      const container = containerRef.current;

      // Esperar a que el popover se renderice
      setTimeout(() => {
        const popoverRect = popover.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let newPosition = { ...popoverPosition };
        let needsUpdate = false;


        // Ajustar si se sale por arriba o abajo
        const popoverTop = containerRect.top + popoverPosition.top;
        if (popoverTop - (popoverRect.height / 2) > 5) {
          newPosition.top = (30-containerRect.top) + (popoverRect.height / 3);
          needsUpdate = true;
        } else if (popoverTop + (popoverRect.height / 2) > window.innerHeight - 5) {
          newPosition.top = (window.innerHeight - 20 - containerRect.top) - (popoverRect.height / 2);
          needsUpdate = true;
        }

        if (needsUpdate) {
          setPopoverPosition(newPosition);
        }
      }, 50);
    }
  }, [popoverPosition, selectedPhase]);

  // Bloquear scroll del fondo cuando el mega modal está abierto
  useEffect(() => {
    if (isRolesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isRolesModalOpen]);

  return (
    <div className="container-fluid py-2 modern-bg">
      <header className="text-center header-gradient">
        <div className="container">
          <div className="title-container">
            <h1 className="elegant-main-title">
              <span className="title-icon-wrapper">
                <i className="bi bi-diagram-3-fill"></i>
              </span>
              <span className="title-text">
                <span className="organizer-text">Organizador</span>
                <span className="sdlc-text">SDLC</span>
                <span className="ampersand">&</span>
                <span className="stlc-text">STLC</span>
              </span>
            </h1>
            <div className="title-divider"></div>
            <p className="lead subtitle-text">Sistema de Reservas para Hotel - Gestión de Procesos</p>
          </div>
        </div>
      </header>

      <div className=" container-fluid position-relative px-4" ref={containerRef}>
        <div className="row justify-content-center align-items-center mb-5 g-2">
          {/* Tarjeta SDLC - Ocupa todo el ancho disponible */}
          <div className="col-lg-4 col-xl-4  mb-4">
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
                          ref={(el) => { phaseRefs.current[index] = el; }}
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

          <div className="col-lg-3 col-xl-3 selector-col text-center d-flex flex-column justify-content-center align-items-center my-4">
            <div
              className="ultra-modern-selector-circle mx-auto d-flex align-items-center justify-content-center position-relative"
              onClick={rotateSelector}
              data-mode={selectedMethodology ?? 'neutral'}
            >
              <div className="selector-core-modern">
                <div className="selector-indicator">
                  {selectedMethodology === 'sdlc' ? (
                    <>
                      <i className="bi bi-code-slash text-white fs-5"></i>
                      <span className="selector-indicator-text">SDLC</span>
                    </>
                  ) : selectedMethodology === 'stlc' ? (
                    <>
                      <i className="bi bi-shield-check text-white fs-5"></i>
                      <span className="selector-indicator-text">STLC</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-question-circle text-white fs-5"></i>
                      <span className="selector-indicator-text">Seleccionar</span>
                    </>
                  )}
                </div>
              </div>
              <div className="selector-rings">
                <div className="selector-ring ring-1"></div>
                <div className="selector-ring ring-2"></div>
              </div>

              <div
                className="selector-arc"
                aria-hidden="true"
                style={{ transform: `translate(-50%, -50%) rotate(${getRotation()}deg)` }}
              ></div>
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
                </div>
              </div>

              <div className="selector-labels" aria-hidden="true">
                <span className="selector-label label-sdlc">SDLC</span>
                <span className="selector-label label-neutral">Seleccionar</span>
                <span className="selector-label label-stlc">STLC</span>
              </div>
            </div>

            <div className="mt-4">
              <span className={`badge rounded-pill px-3 py-2 ${selectedMethodology ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                {selectedMethodology === null ? "Selecciona Vista" :
                  selectedMethodology === 'sdlc' ? "Vista SDLC Activa" : "Vista STLC Activa"}
              </span>
            </div>
          </div>

          {/* Tarjeta STLC - Ocupa todo el ancho disponible */}
          <div className="col-lg-4 col-xl-4 mb-4">
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
                          ref={(el) => { phaseRefs.current[index] = el; }}
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

        {selectedPhase !== null && selectedMethodology === 'sdlc' && popoverPosition && (
          <div
            className={`popover-custom bs-popover-${popoverSide} show animate-fade-in`}
            style={{
              position: 'absolute',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
              transform: 'translateY(-50%)',
              zIndex: 9999
            }}
            ref={popoverRef}
          >
            <div className="popover-arrow"></div>
            <div className="popover-header bg-transparent border-0 d-flex align-items-center justify-content-between">
              <h6 className="mb-0 sdlc-color fw-bold">
                <i className="bi bi-link-45deg me-2"></i>
                Relación SDLC-STLC
              </h6>
              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => { setSelectedPhase(null); setPopoverPosition(null); }}
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

              {/* Contenido adicional para Diseño del sistema: UML + STLC */}
              {sdlc.phases[selectedPhase].title === 'Diseño del sistema' && (
                <div className="mt-3">
                  <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-diagram-3 me-2"></i>Diagramas UML recomendados</h6>
                  <ul className="small mb-3">
                    <li>Diagrama de Casos de Uso: Reserva, Cancelación, Check‑in/Check‑out.</li>
                    <li>Diagrama de Clases: <code>Reserva</code>, <code>Habitacion</code>, <code>Tarifa</code>, <code>Pago</code>, <code>Usuario</code>.</li>
                    <li>Diagrama de Secuencia: Flujo "Reserva con depósito" (Cliente→Web→Pasarela→Sistema).</li>
                    <li>Diagrama de Actividad: Búsqueda y disponibilidad con alternativas.</li>
                    <li>Diagrama de Estados: Ciclo de vida de <code>Reserva</code> (pendiente, pagado, cancelado, no‑show).</li>
                  </ul>
                  <div className="use-case-container-modern p-3 rounded-3">
                    <h6 className="d-flex align-items-center mb-2 stlc-color fw-semibold">
                      <i className="bi bi-shield-check me-2"></i>Validación STLC sobre diseños
                    </h6>
                    <ul className="small mb-0">
                      <li>Revisiones estáticas: consistencia entre casos de uso y clases (trazabilidad RF→clases→endpoints).</li>
                      <li>Generación de casos de prueba a partir de secuencias (mensajes, errores, timeouts de pasarela).</li>
                      <li>Model‑based testing: derivar paths del diagrama de estados de <code>Reserva</code>.</li>
                    </ul>
                  </div>
                </div>
              )}

              {sdlc.phases[selectedPhase].title === 'Pruebas' && (
                <div className="mt-3">
                  <h6 className="stlc-color fw-semibold mb-2"><i className="bi bi-clipboard2-check me-2"></i>Tipos de pruebas (STLC)</h6>
                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">Unitarias</div>
                        <ul className="small mb-0">
                          <li>Servicios de disponibilidad, cálculo de tarifas.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">Integración</div>
                        <ul className="small mb-0">
                          <li>Reserva ↔ Pago ↔ Disponibilidad.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">API</div>
                        <ul className="small mb-0">
                          <li>Contratos y errores; códigos y payloads.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">E2E</div>
                        <ul className="small mb-0">
                          <li>Búsqueda → reserva → pago → confirmación.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">Rendimiento</div>
                        <ul className="small mb-0">
                          <li>Picos 20:00; 100 req/s.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">Seguridad</div>
                        <ul className="small mb-0">
                          <li>AuthZ por rol, OWASP Top 10, privacidad de datos.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">Usabilidad</div>
                        <ul className="small mb-0">
                          <li>Flujo sin fricción; móvil.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="role-card">
                        <div className="fw-semibold stlc-color mb-1">UAT</div>
                        <ul className="small mb-0">
                          <li>Validación de escenarios reales.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {sdlc.phases[selectedPhase].title === 'Desarrollo' && (
                <div className="mt-3">
                  <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-braces-asterisk me-2"></i>Buenas prácticas de desarrollo</h6>
                  <ul className="small mb-3">
                    <li>Branching (main/dev/feature) y PRs con checks automáticos.</li>
                    <li>CI/CD: build, lint, pruebas unitarias y de contratos.</li>
                    <li>Feature flags para cambios en tarifas/políticas.</li>
                  </ul>
                  <div className="use-case-container-modern p-3 rounded-3">
                    <h6 className="d-flex align-items-center mb-2 stlc-color fw-semibold"><i className="bi bi-patch-check me-2"></i>STLC durante desarrollo</h6>
                    <ul className="small mb-0">
                      <li>Unitarias obligatorias para disponibilidad y tarifas.</li>
                      <li>Contratos API con mocks de pasarela de pago.</li>
                      <li>Smoke E2E en pipeline para flujos críticos.</li>
                    </ul>
                  </div>
                </div>
              )}

              {sdlc.phases[selectedPhase].title === 'Implementación/Despliegue' && (
                <div className="mt-3">
                  <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-rocket-takeoff me-2"></i>Estrategia de despliegue</h6>
                  <ul className="small mb-3">
                    <li>Migración de datos (clientes, reservas, tarifas).</li>
                    <li>Capacitación de recepción y gerencia.</li>
                  </ul>
                  <div className="use-case-container-modern p-3 rounded-3">
                    <h6 className="d-flex align-items-center mb-2 stlc-color fw-semibold"><i className="bi bi-clipboard-pulse me-2"></i>STLC post‑deploy</h6>
                    <ul className="small mb-0">
                      <li>Smoke: búsqueda, reserva, pago, notificación.</li>
                      <li>Monitoreo P95/P99, errores 5xx, logs.</li>
                      <li>Rollback verificado.</li>
                    </ul>
                  </div>
                </div>
              )}

              {sdlc.phases[selectedPhase].title === 'Mantenimiento' && (
                <div className="mt-3">
                  <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-tools me-2"></i>Operación y mejora continua</h6>
                  <ul className="small mb-3">
                    <li>SLA, rotación de logs, observabilidad.</li>
                    <li>Gestión de incidentes y cambios versionados.</li>
                    <li>Optimización de rendimiento en picos.</li>
                  </ul>
                  <div className="use-case-container-modern p-3 rounded-3">
                    <h6 className="d-flex align-items-center mb-2 stlc-color fw-semibold"><i className="bi bi-arrow-repeat me-2"></i>STLC en mantenimiento</h6>
                    <ul className="small mb-0">
                      <li>Regresión por release y pruebas de resiliencia.</li>
                      <li>Pruebas de seguridad recurrentes (OWASP Top 10).</li>
                      <li>UAT para validar mejoras con recepción/gerencia.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedPhase !== null && selectedMethodology === 'stlc' && popoverPosition && (
          <div
            className={`popover-custom bs-popover-${popoverSide} show animate-fade-in stlc-mode`}
            style={{
              position: 'absolute',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
              transform: 'translateY(-50%)',
              zIndex: 9999
            }}
            ref={popoverRef}
          >
            <div className="popover-arrow"></div>
            <div className="popover-header bg-transparent border-0 d-flex align-items-center justify-content-between">
              <h6 className="mb-0 stlc-color fw-bold">
                <i className="bi bi-link-45deg me-2"></i>
                Relación STLC‑SDLC
              </h6>
              <button
                type="button"
                className="btn-close btn-close-sm"
                onClick={() => { setSelectedPhase(null); setPopoverPosition(null); }}
                aria-label="Close"
              ></button>
            </div>
            <div className="popover-body p-3">
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <i className={`${stlc.phases[selectedPhase].icon} me-2 stlc-color`}></i>
                  <h6 className="mb-0 stlc-color fw-semibold">
                    {stlc.phases[selectedPhase].title}
                  </h6>
                </div>
                <p className="text-muted small lh-sm mb-3">
                  {stlc.phases[selectedPhase].description}
                </p>
              </div>

              <div className="connection-arrow text-center mb-3">
                <i className="bi bi-arrow-down text-muted fs-5"></i>
              </div>

              <div className="mb-3">
                <h6 className="sdlc-color fw-semibold mb-2">
                  <i className="bi bi-code-slash me-2"></i>
                  {stlc.phases[selectedPhase].relatedPhase || sdlc.phases[selectedPhase]?.title || 'Fase relacionada del SDLC'}
                </h6>
              </div>

              <div className="use-case-container-modern p-3 rounded-3">
                <h6 className="d-flex align-items-center mb-2 text-dark fw-semibold">
                  <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
                  Caso de Uso
                </h6>
                <p className="small mb-0 text-dark lh-sm">
                  {stlc.phases[selectedPhase].useCase || 'Aplicación práctica de esta fase de pruebas en el sistema de reservas.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODAL GRANDE ROLES/RF/NFR ===================== */}
        {isRolesModalOpen && rolesModalPhaseIndex !== null && (
          <div className="mega-modal-overlay" role="dialog" aria-modal="true">
            <div className="mega-modal-container">
              <div className="mega-modal-header">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-check sdlc-color"></i>
                  <h5 className="mb-0 fw-bold sdlc-color">
                    {sdlc.phases[rolesModalPhaseIndex].title} · SDLC
                  </h5>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={handleBackInModal}>
                    {selectedRole ? 'Volver' : 'Cerrar'}
                  </button>
                </div>
              </div>
              <div className="mega-modal-subheader">
                <p className="small text-muted mb-0">
                  {sdlc.phases[rolesModalPhaseIndex].description}
                </p>
              </div>

              <div className="mega-modal-tabs">
                <button
                  className={`mega-tab sdlc-theme ${activeModalTab === 'rf' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('rf')}
                >
                  <i className="bi bi-people me-2"></i>Roles y Reqs. Funcionales
                </button>
                <button
                  className={`mega-tab stlc-theme ${activeModalTab === 'nfr' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('nfr')}
                >
                  <i className="bi bi-shield-lock me-2"></i>NFR y Pruebas STLC
                </button>
              </div>

              <div className="mega-modal-body">
                {activeModalTab === 'rf' && (
                  <>
                    {/* Contenido específico por fase: Planificación (0) vs Análisis (1) vs Desarrollo (3) vs Implementación (5) vs Mantenimiento (6) */}
                    {rolesModalPhaseIndex === 0 && (
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-lg-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-bullseye me-2"></i>Objetivos y Alcance</h6>
                            <ul className="small mb-0">
                              <li>Definir alcance MVP: búsqueda, reservas, pagos con depósito.</li>
                              <li>Stakeholders: Dueño, Gerente, Recepción, Cliente.</li>
                              <li>Roadmap de hitos: MVP → Integraciones → Reporting.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-speedometer2 me-2"></i>KPIs de proyecto</h6>
                            <ul className="small mb-0">
                              <li>Conversión de búsqueda→reserva ≥ 3%.</li>
                              <li>Tiempo P95 de disponibilidad ≤ 2s.</li>
                              <li>Defectos críticos en producción = 0 al lanzamiento.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-lg-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-exclamation-triangle me-2"></i>Riesgos</h6>
                            <ul className="small mb-0">
                              <li>Integración con pasarela inestable → mocks y reintentos.</li>
                              <li>Datos maestros inconsistentes → migración y validaciones.</li>
                              <li>Estacionalidad → pruebas de rendimiento con picos.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {rolesModalPhaseIndex === 1 && (
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-xl-6">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-journal-text me-2"></i>Historias de usuario</h6>
                            <ul className="small mb-0">
                              <li>Como Cliente, quiero buscar por fechas para ver disponibilidad (RF‑01).</li>
                              <li>Como Recepcionista, quiero unificar reserva y llegada para no duplicar datos (RF‑05).</li>
                              <li>Como Admin. Financiero, quiero conciliar pagos para detectar pendientes (RF‑07, RF‑13).</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div className="role-card">
                            <h6 className="stlc-color fw-semibold mb-2"><i className="bi bi-list-check me-2"></i>Criterios de aceptación (STLC)</h6>
                            <ul className="small mb-2">
                              <li>Dado fechas válidas, cuando busco, entonces veo tipos y tarifas (RF‑02).</li>
                              <li>Dado sin cupo, cuando busco, entonces recibo alternativas (RF‑03).</li>
                              <li>Dado depósito 30%, cuando pago, entonces el saldo refleja el 70% restante (RF‑06).</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {rolesModalPhaseIndex === 3 && (
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-braces-asterisk me-2"></i>Buenas prácticas</h6>
                            <ul className="small mb-0">
                              <li>Branching Git (main/dev/feature), PRs con checks.</li>
                              <li>CI/CD: build, lint, unit tests, quality gate.</li>
                              <li>Feature flags para cambios de tarifas/políticas.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="stlc-color fw-semibold mb-2"><i className="bi bi-patch-check me-2"></i>Pruebas continuas (STLC)</h6>
                            <ul className="small mb-0">
                              <li>Unitarias obligatorias en servicios críticos.</li>
                              <li>Contratos API y mocks de pasarela de pago.</li>
                              <li>Regresión rápida en pipeline (smoke E2E).</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-diagram-3 me-2"></i>Integraciones</h6>
                            <ul className="small mb-0">
                              <li>Pasarela de pagos con reintentos/timeout.</li>
                              <li>Mensajería para notificaciones (email/WhatsApp).</li>
                              <li>Inventario/ocupación en tiempo real.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {rolesModalPhaseIndex === 5 && (
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-rocket-takeoff me-2"></i>Estrategia de despliegue</h6>
                            <ul className="small mb-0">
                              <li>Blue/Green o canary para cambios de políticas.</li>
                              <li>Migración de datos (clientes, reservas, tarifas).</li>
                              <li>Capacitación a recepción y gerencia.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="stlc-color fw-semibold mb-2"><i className="bi bi-clipboard-pulse me-2"></i>Verificación post‑deploy (STLC)</h6>
                            <ul className="stlc-color small mb-0">
                              <li>Smoke: búsqueda, reserva, pago, notificación.</li>
                              <li>Monitoreo P95/P99, errores 5xx, logs.</li>
                              <li>Rollback plan probado.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-shield-lock me-2"></i>Conformidad</h6>
                            <ul className="small mb-0">
                              <li>PCI‑DSS para pagos y protección de datos.</li>
                              <li>Backups y encriptación en reposo/transito.</li>
                              <li>Auditoría de acciones críticas.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {rolesModalPhaseIndex === 6 && (
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-tools me-2"></i>Operación</h6>
                            <ul className="small mb-0">
                              <li>SLA de atención; rotación de logs y métricas.</li>
                              <li>Gestión de incidentes y problemas.</li>
                              <li>Gestión de cambios versionada.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="stlc-color fw-semibold mb-2"><i className="bi bi-arrow-repeat me-2"></i>Regresión y hardening (STLC)</h6>
                            <ul className="stlc-color small mb-0">
                              <li>Suite de regresión por release.</li>
                              <li>Pruebas de resiliencia y recuperación.</li>
                              <li>Pruebas de seguridad recurrentes.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12 col-xl-4">
                          <div className="role-card">
                            <h6 className="sdlc-color fw-semibold mb-2"><i className="bi bi-graph-up-arrow me-2"></i>Mejora continua</h6>
                            <ul className="small mb-0">
                              <li>Feedback de recepción/cliente y priorización.</li>
                              <li>Optimización de rendimiento en picos.</li>
                              <li>Actualizaciones de métodos de pago.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {!selectedRole && (
                      <div className="row g-3">
                        {roles.map((role) => (
                          <div key={role.key} className="col-12 col-md-6 col-lg-4">
                            <div className="role-card h-100" onClick={() => handleRoleClick(role.key)}>
                              <div className="d-flex align-items-start gap-2 mb-2">
                                <i className={`${role.icon} fs-5 sdlc-color`}></i>
                                <h6 className="mb-0 fw-semibold">{role.name}</h6>
                              </div>
                              <p className="small text-muted mb-0">{role.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedRole && (
                      <div className="role-detail">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-arrow-left-circle cursor-pointer" onClick={() => setSelectedRole(null)}></i>
                            <h6 className="mb-0">Requisitos del rol · {roles.find(r => r.key === selectedRole)?.name}</h6>
                          </div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedRole(null)}>Volver</button>
                        </div>

                        <div className="list-group list-group-flush">
                          {roleToRequirements[selectedRole].map((req) => (
                            <div className="list-group-item role-req-item" key={req.code}>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <div className="fw-bold sdlc-color">{req.code} · {req.title}</div>
                                  <div className="small text-muted">{req.details}</div>
                                </div>
                              </div>
                              <ul className="stlc-color small mt-2 mb-0">
                                {req.stlcTests.map((t, idx) => (
                                  <li key={idx}>{t}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeModalTab === 'nfr' && (
                  <div className="nfr-grid">
                    {nonFunctionalRequirements.map(section => (
                      <div className="nfr-card" key={section.area}>
                        <div className="nfr-card-header">
                          <i className="sdlc-color bi bi-sliders me-2"></i>
                          <span className="sdlc-color fw-semibold">{section.area}</span>
                        </div>
                        <div className="nfr-card-body">
                          {section.items.map(item => (
                            <div className=" nfr-item" key={item.code}>
                              <div className="d-flex justify-content-between">
                                <div className="sdlc-color fw-semibold">{item.code}: {item.requirement}</div>
                                
                              </div>
                              <ul className="stlc-color small mb-0 mt-2">
                                {item.stlcTests.map((t, idx) => (
                                  <li key={idx}>{t}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tabla comparativa mejorada - Ocupa todo el ancho */}
        <div className="row mt-5 pt-4">
          <div className="col-12">
            <div className="table-container-modern">
              <div className="text-center mb-4">
                <h2 className="mb-2 text-dark fw-bold elegant-title">
                  <i className="bi bi-table me-3"></i>
                  Comparación Detallada SDLC vs STLC
                </h2>
                <p className="text-muted mb-0 fs-6">Sistema de Reservas de Hotel - Análisis Comparativo</p>
              </div>

              <div className="table-responsive-lg">
                <table className="table modern-comparison-table">
                  <thead>
                    <tr className="table-header-row">
                      <th scope="col" className="sdlc-header fw-bold text-center">
                        <div className="header-content">
                          <i className="bi bi-code-slash me-2"></i>Fase SDLC
                        </div>
                      </th>
                      <th scope="col" className="sdlc-header fw-bold">
                        <div className="header-content">
                          Actividades Desarrollo
                        </div>
                      </th>
                      <th scope="col" className="stlc-header fw-bold text-center">
                        <div className="header-content">
                          <i className="bi bi-shield-check me-2"></i>Fase STLC
                        </div>
                      </th>
                      <th scope="col" className="stlc-header fw-bold">
                        <div className="header-content">
                          Actividades Pruebas
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sdlc.phases.map((phase, index) => (
                      <tr key={index} className="comparison-row">
                        <td className="phase-title-cell sdlc-phase text-center">
                          <div className="phase-content">
                            <i className={`${phase.icon} me-2`}></i>
                            <span>{phase.title}</span>
                          </div>
                        </td>
                        <td className="activity-desc sdlc-activity">
                          <div className="activity-content">
                            {phase.description}
                            
                          </div>
                        </td>
                        <td className="phase-title-cell stlc-phase text-center">
                          <div className="phase-content">
                            <i className={`${stlc.phases[index]?.icon || 'bi bi-circle'} me-2`}></i>
                            <span>{stlc.phases[index]?.title || 'Pruebas de Regresión'}</span>
                          </div>
                        </td>
                        <td className="activity-desc stlc-activity">
                          <div className="activity-content">
                            {stlc.phases[index]?.description || 'Pruebas de regresión para asegurar que cambios no rompan funcionalidad existente del sistema de reservas.'}
                            
                          </div>
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

