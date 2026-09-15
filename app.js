const products = [

  {
    id: 1,
    name: "PLAYERA MXANGEL / CORE",
    price: 449,
    type: "shirt",
    desc:
      "Playera comercial de corte urbano. Diseño demo frontal."
  },

  {
    id: 2,
    name: "HOODIE / ORIGEN",
    price: 799,
    type: "hoodie",
    desc:
      "Sudadera demo para la primera colección de la marca."
  },

  {
    id: 3,
    name: "GORRA / MX MARK",
    price: 399,
    type: "cap",
    desc:
      "Gorra casual con identidad MXANGEL GEAR."
  }

];


let cart =
  JSON.parse(
    localStorage.getItem("mxangelCart")
    || "[]"
  );


const money = n =>

  new Intl.NumberFormat(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }
  ).format(n);


const grid =
  document.getElementById(
    "productGrid"
  );


grid.innerHTML =
  products.map(p => `

    <article class="product">

      <div
        class="product-art ${p.type}">

        <div class="art-logo">

          MXANGEL
          <br>
          GEAR

        </div>

      </div>


      <div class="product-info">

        <h3>
          ${p.name}
        </h3>

        <p>
          ${p.desc}
        </p>


        <div class="row">

          <span class="price">

            ${money(p.price)}

          </span>


          <button
            class="add"
            data-id="${p.id}">

            AGREGAR +

          </button>

        </div>

      </div>

    </article>

  `).join("");



function save() {

  localStorage.setItem(
    "mxangelCart",
    JSON.stringify(cart)
  );

  renderCart();

}



function add(id) {

  let item =
    cart.find(
      x => x.id === id
    );


  if (item) {

    item.qty++;

  } else {

    cart.push({
      id,
      qty: 1
    });

  }


  save();

  toast();

}



function remove(id) {

  cart =
    cart.filter(
      x => x.id !== id
    );

  save();

}



function renderCart() {

  const box =
    document.getElementById(
      "cartItems"
    );


  let count = 0;

  let total = 0;


  box.innerHTML =
    cart.length

    ?

    cart.map(x => {

      const p =
        products.find(
          p => p.id === x.id
        );


      count += x.qty;

      total +=
        p.price * x.qty;


      return `

        <div class="cart-item">

          <div>

            <strong>
              ${p.name}
            </strong>

            <br>

            <span>

              ${x.qty}
              ×
              ${money(p.price)}

            </span>

          </div>


          <button
            class="remove"
            onclick="remove(${p.id})">

            QUITAR

          </button>

        </div>

      `;

    }).join("")

    :

    `
      <p style="color:#9ca39a">
        Tu carrito está vacío.
      </p>
    `;


  document.getElementById(
    "cartCount"
  ).textContent = count;


  document.getElementById(
    "cartTotal"
  ).textContent = money(total);

}



document
  .querySelectorAll(".add")
  .forEach(button => {

    button.onclick = () =>

      add(
        Number(
          button.dataset.id
        )
      );

  });



const drawer =
  document.getElementById(
    "drawer"
  );


const overlay =
  document.getElementById(
    "overlay"
  );



function openCart() {

  drawer.classList.add(
    "open"
  );

  overlay.classList.add(
    "show"
  );

}



function closeCart() {

  drawer.classList.remove(
    "open"
  );

  overlay.classList.remove(
    "show"
  );

}



document.getElementById(
  "cartBtn"
).onclick = openCart;


document.getElementById(
  "closeCart"
).onclick = closeCart;


overlay.onclick =
  closeCart;



function toast() {

  const t =
    document.getElementById(
      "toast"
    );


  t.classList.add(
    "show"
  );


  setTimeout(
    () =>
      t.classList.remove(
        "show"
      ),
    1600
  );

}



document.getElementById(
  "checkoutBtn"
).onclick = () => {

  alert(
    "Esta primera versión está en modo demo. Aquí conectaremos los pagos y envíos reales."
  );

};


renderCart();