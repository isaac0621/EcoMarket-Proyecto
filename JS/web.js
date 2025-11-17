const PRODUCTS = [
  {id:1,name:'Tomate orgánico',category:'verdura',price:1200,desc:'Tomates jugosos cultivados localmente.',img:'IMG/tomate.jpg'},
  {id:2,name:'Banano maduro',category:'fruta',price:800,desc:'Banano de plantación sostenible.',img:'IMG/Banano.webp'},
  {id:3,name:'Quinua real',category:'granos',price:3200,desc:'Quinua orgánica 500g.',img:'IMG/Quinua.png'},
  {id:4,name:'Lechuga fresca',category:'verdura',price:700,desc:'Crujiente y directa del huerto.',img:'IMG/Lechuga.jpg'},
  {id:5,name:'Manzana roja',category:'fruta',price:950,desc:'Manzanas locales.',img:'IMG/manzana-roja.webp'},
];

let CART = [];

const $ = s => document.querySelector(s);

function renderProducts(list = PRODUCTS){
  const grid = $('#product-grid');
  grid.innerHTML = '';
  list.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `
      <div class="card product-card h-100">
        <img src="${p.img}" class="card-img-top" style="height:180px;object-fit:cover">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p class="text-muted small">${p.desc}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div>
              <span class="price">₡${p.price}</span>
            </div>
            <div class="d-flex flex-column gap-2">
              <button class="btn btn-sm btn-outline-success" onclick="openProduct(${p.id})">Ver</button>
              <button class="btn btn-sm btn-success" onclick="addToCart('${p.name}',${p.price})">Añadir</button>
            </div>
          </div>
        </div>
      </div>`;
    grid.appendChild(div);
  });
}

renderProducts();
updateCartUI();

let modal = new bootstrap.Modal('#productModal');

function openProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  $('#modal-title').textContent = p.name;
  $('#modal-desc').textContent = p.desc;
  $('#modal-price').textContent = '₡' + p.price;
  $('#modal-img').innerHTML = `<img src="${p.img}" class="img-fluid rounded">`;
  $('#modal-add').onclick = ()=>{
    addToCart(p.name,p.price,parseInt($('#modal-qty').value||1));
    modal.hide();
  };
  modal.show();
}

function addToCart(name,price,qty=1){
  let item = CART.find(x=>x.name===name);
  if(item) item.qty += qty;
  else CART.push({name,price,qty});
  updateCartUI();

  // Notificación rápida
  showToast(`${name} añadido al carrito `);
}

function updateCartUI(){
  $('#cart-count').textContent = CART.reduce((s,i)=>s+i.qty,0);
  const cont = $('#cart-items');
  cont.innerHTML = '';
  let total = 0;

  CART.forEach((i,n)=>{
    total += i.price * i.qty;
    cont.innerHTML += `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>${i.qty} × ${i.name}</div>
      <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${n})">Eliminar</button>
    </div>`;
  });

  $('#cart-total').textContent = '₡' + total;
}


function removeItem(i){
  CART.splice(i,1);
  updateCartUI();
}

document.getElementById('ver-carrito').onclick = () =>{
  new bootstrap.Offcanvas('#cartCanvas').show();
};

function showToast(msg){
  const toast = document.createElement('div');
  toast.className = "toast align-items-center text-bg-success border-0 show";
  toast.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:9999; padding:10px 15px; border-radius:8px;";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
      ${msg}
      </div>
    </div>`;
  document.body.appendChild(toast);
  setTimeout(()=> toast.remove(), 2500);
}

function removeItem(i){
  CART.splice(i,1);
  updateCartUI();
}


document.getElementById('checkout-btn').onclick = () =>{
  if(CART.length === 0){
    alert("Tu carrito está vacío… todavía no has salvado al planeta ");
    return;
  }

  CART = [];
  updateCartUI();

  alert("Simulación de pago: pedido enviado.\n\nGracias por comprar local ");
};
