import React, { useState, useRef, useEffect } from 'react';
import '../styles/FormBrigada.css';

const expertos = ['Paola', 'Pache', 'Diego', 'Ricardo', 'Arley', 'Soraya'];

const CrearBrigada = ({ onCreate, onCancel }) => {
  const [form, setForm] = useState({
    investigacion: '',
    jefe: '',
    botanico: '',
    auxiliar: '',
    coinvestigadores: ['', '']
  });

  const [errores, setErrores] = useState([]);
  const investigaciones = ['investigacion 1', 'investigacion 2', 'investigacion 3', 'investigacion 4', 'investigacion 5', 'investigacion 6'];
  const modalRef = useRef();

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onCancel]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoChange = (index, value) => {
    const nuevos = [...form.coinvestigadores];
    nuevos[index] = value;
    setForm((prev) => ({ ...prev, coinvestigadores: nuevos }));
  };

  const agregarCoInvestigador = () => {
    setForm((prev) => ({
      ...prev,
      coinvestigadores: [...prev.coinvestigadores, '']
    }));
  };

  const eliminarCoInvestigador = (index) => {
    setForm((prev) => {
      const nuevos = [...prev.coinvestigadores];
      nuevos.splice(index, 1);
      return { ...prev, coinvestigadores: nuevos };
    });
  };

  const estaSeleccionado = (nombre) => {
    return (
      nombre === form.jefe ||
      nombre === form.botanico ||
      nombre === form.auxiliar ||
      form.coinvestigadores.includes(nombre)
    );
  };

  const validarDuplicados = () => {
    const todos = [
      form.jefe,
      form.botanico,
      form.auxiliar,
      ...form.coinvestigadores
    ].filter(Boolean);
    const duplicados = todos.filter((e, i) => todos.indexOf(e) !== i);
    setErrores(duplicados);
    return duplicados.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarDuplicados()) return;
    onCreate(form);
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2>CREAR BRIGADA</h2>
        <form onSubmit={handleSubmit}>
          <label>Investigacion</label>
          <select
            name="investigacion"
            value={form.investigacion || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            {investigaciones.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>

          <label>Jefe de brigada</label>
          <select
            name="jefe"
            value={form.jefe}
            onChange={handleChange}
            className={errores.includes(form.jefe) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {expertos
              .filter(e => !estaSeleccionado(e) || form.jefe === e)
              .map((e, i) => (
                <option key={i} value={e}>{e}</option>
              ))}
          </select>

          <label>Botanico</label>
          <select
            name="botanico"
            value={form.botanico}
            onChange={handleChange}
            className={errores.includes(form.botanico) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {expertos
              .filter(e => !estaSeleccionado(e) || form.botanico === e)
              .map((e, i) => (
                <option key={i} value={e}>{e}</option>
              ))}
          </select>

          <label>Auxiliar técnico</label>
          <select
            name="auxiliar"
            value={form.auxiliar}
            onChange={handleChange}
            className={errores.includes(form.auxiliar) ? 'error' : ''}
            required
          >
            <option value="">Seleccionar</option>
            {expertos
              .filter(e => !estaSeleccionado(e) || form.auxiliar === e)
              .map((e, i) => (
                <option key={i} value={e}>{e}</option>
              ))}
          </select>

          {form.coinvestigadores.map((val, i) => (
            <div key={i} className="coinvestigador-group">
              <label>Co-investigador</label>
              <div className="co-row">
                <select
                  value={val}
                  onChange={(e) => handleCoChange(i, e.target.value)}
                  className={errores.includes(val) ? 'error' : ''}
                  required
                >
                  <option value="">Seleccionar</option>
                  {expertos
                    .filter(e => !estaSeleccionado(e) || val === e)
                    .map((e, j) => (
                      <option key={j} value={e}>{e}</option>
                    ))}
                </select>
                {form.coinvestigadores.length > 1 && (
                  <button
                    type="button"
                    className="delete-co"
                    onClick={() => eliminarCoInvestigador(i)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="button" className="form-button add" onClick={agregarCoInvestigador}>
            ➕ Agregar co-investigador
          </button>

          <button type="submit" className="form-button">CREAR</button>
          <button type="button" className="form-button cancel" onClick={onCancel}>CANCELAR</button>
        </form>
      </div>
    </div>
  );
};

export default CrearBrigada;
