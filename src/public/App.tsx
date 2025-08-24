// App.tsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/App.css';
import { sdlc, stlc } from '../js/datos';

const App: React.FC = () => {
  // Estados para controlar la rotación del selector
  const [selectedMethodology, setSelectedMethodology] = useState<'sdlc' | 'stlc' | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number, left: number } | null>(null);

  // Referencias para los elementos de fase
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          <h1 className="display-3 fw-bold mb-3 elegant-title">
            <i className="bi bi-diagram-3-fill me-3"></i>
            SDLC & STLC Organizer
          </h1>
          <p className="lead opacity-90 mb-0">Sistema de Reservas para Hotel - Gestión de Procesos</p>
        </div>
      </header>

      <div className="container-fluid position-relative px-4">
        <div className="row justify-content-center align-items-start mb-5">
          {/* Tarjeta SDLC - Ocupa todo el ancho disponible */}
          <div className="col-lg-5 col-xl-5 mb-4">
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

          {/* Selector circular central mejorado */}
          <div className="col-lg-2 col-xl-2 text-center d-flex flex-column justify-content-center align-items-center my-4">
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
              {/* Aguja eliminada a petición: solo usamos el degradado (arco) */}
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
                  <div className="selector-text-modern d-block small fw-medium text-muted">Click para cambiar</div>
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
          <div className="col-lg-5 col-xl-5 mb-4">
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
            </div>
          </div>
        )}

        {/* Tabla comparativa mejorada - Ocupa todo el ancho */}
        <div className="row mt-5 pt-4">
          <div className="col-12">
            <div className="table-container-full">
              <div className="text-center mb-4">
                <h2 className="mb-2 text-dark fw-bold elegant-title">
                  <i className="bi bi-table me-3"></i>
                  Comparación Detallada SDLC vs STLC
                </h2>
                <p className="text-muted mb-0 fs-6">Sistema de Reservas de Hotel - Análisis Comparativo</p>
              </div>

              <div className="table-responsive">
                <table className="table modern-table-full">
                  <thead>
                    <tr>
                      <th scope="col" className="sdlc-color fw-bold py-3 text-center">
                        <i className="bi bi-code-slash me-2"></i>Fase SDLC
                      </th>
                      <th scope="col" className="sdlc-color fw-bold py-3">Actividades Desarrollo</th>
                      <th scope="col" className="stlc-color fw-bold py-3 text-center">
                        <i className="bi bi-shield-check me-2"></i>Fase STLC
                      </th>
                      <th scope="col" className="stlc-color fw-bold py-3">Actividades Pruebas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sdlc.phases.map((phase, index) => (
                      <tr key={index} className="table-row-modern">
                        <td className="fw-semibold py-4 text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <i className={`${phase.icon} me-2 sdlc-color`}></i>
                            <span>{phase.title}</span>
                          </div>
                        </td>
                        <td className="py-4 text-muted activity-cell">
                          <div className="table-cell-content">
                            {phase.description}
                          </div>
                        </td>
                        <td className="fw-semibold py-4 text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <i className={`${stlc.phases[index]?.icon || 'bi bi-circle'} me-2 stlc-color`}></i>
                            <span>{stlc.phases[index]?.title || 'Pruebas de Regresión'}</span>
                          </div>
                        </td>
                        <td className="py-4 text-muted activity-cell">
                          <div className="table-cell-content">
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