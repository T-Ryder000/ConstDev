export default function createServices(data) {
  const container = document.querySelector('[data-category="carousel"]');

  if (!container) {
    console.error('Element with [data-category="carousel"] not found');
    return;
  }

  const { data: products } = data;

  products.forEach(dat => {
    const item = document.createElement('button');
    // Adicionando a classe
    item.classList.add('card');

    // Adicionando atributos
    item.setAttribute('data-toggle', 'portfilter');
    item.setAttribute('data-target', 'armas');
    item.setAttribute('name', 'submit');
    item.setAttribute('value', 'armas');

    item.innerHTML = `
      <div class="img">
        <i
          class="icon-category fa-solid fa-blog"
          draggable="false"
          aria-hidden="true"
        ></i>
      </div>
      <h2>${dat.name}</h2>
    `;

    container.appendChild(item);
  });
}
