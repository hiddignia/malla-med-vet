javascript
const ramos = [
  { id: 'matematica', nombre: 'Matemática general', sem: 1, requisitos: [] },
  { id: 'bioestadistica', nombre: 'Bioestadística', sem: 2, requisitos: ['matematica'] },
  { id: 'quimica', nombre: 'Química', sem: 1, requisitos: [] },
  { id: 'bioquimica', nombre: 'Bioquímica', sem: 2, requisitos: ['quimica'] },
  { id: 'biologia', nombre: 'Biología celular', sem: 1, requisitos: [] },
  { id: 'zoologia', nombre: 'Zoología', sem: 3, requisitos: ['biologia'] },
  { id: 'genetica', nombre: 'Genética', sem: 4, requisitos: ['bioestadistica'] },
  { id: 'introduccion', nombre: 'Introducción a la medicina veterinaria', sem: 1, requisitos: [] },
  { id: 'practica_basica', nombre: 'Práctica básica', sem: 3, requisitos: ['introduccion'] },
  // Agrega todos los ramos que quieras aquí siguiendo el mismo formato
];

const container = document.getElementById('malla-container');
const estadoRamos = {};

function crearRamo(ramo) {
  const div = document.createElement('div');
  div.classList.add('ramo');
  div.dataset.id = ramo.id;
  div.textContent = ramo.nombre;
  div.classList.add(ramo.requisitos.length ? 'bloqueado' : '');

  if (ramo.requisitos.length === 0) {
    div.classList.remove('bloqueado');
  }

  div.addEventListener('click', () => {
    if (div.classList.contains('bloqueado') || div.classList.contains('aprobado')) return;

    div.classList.add('aprobado');
    estadoRamos[ramo.id] = true;

    desbloquearRamos();
  });

  container.appendChild(div);
}

function desbloquearRamos() {
  ramos.forEach(ramo => {
    if (estadoRamos[ramo.id]) return;

    const requisitosCumplidos = ramo.requisitos.every(req => estadoRamos[req]);
    if (requisitosCumplidos) {
      const div = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
      div.classList.remove('bloqueado');
    }
  });
}

function renderizarMalla() {
  ramos.sort((a, b) => a.sem - b.sem);
  ramos.forEach(crearRamo);
}

renderizarMalla();


---

