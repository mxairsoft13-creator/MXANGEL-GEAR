const products = [

  {
    id: 1,

    name: "PLAYERA MXANGEL / NIGHT OPS",

    price: 449,

    type: "shirt",

    image: "nightops-negra-frente.jpg",

    desc:
      "Diseño táctico MXANGEL GEAR inspirado en operaciones nocturnas."
  },


  {
    id: 2,

    name: "HOODIE / ORIGEN",

    price: 799,

    type: "hoodie",

    image: "hoodie-origen-frente.jpg",

    desc:
      "Sudadera MXANGEL GEAR de estilo urbano y táctico."
  },


  {
    id: 3,

    name: "PLAYERA / SIMULATION",

    price: 499,

    type: "shirt",

    image: "zonaroja-blanca-frente.png",

    desc:
      "Diseño ZONA ROJA inspirado en simulación, estrategia y comunidad."
  }

];



/* =====================================================
   CARGAR CARRITO GUARDADO
===================================================== */

let cart = [];

try {

  cart =
    JSON.parse(
      localStorage.getItem(
        "mxangelCart"
      ) || "[]"
    );

} catch(error) {

  cart = [];

}



/* =====================================================
   FORMATO DE DINERO
===================================================== */

const money = n =>

  new Intl.NumberFormat(
    "es-MX",
    {

      style: "currency",

      currency: "MXN",

      maximumFractionDigits: 0

    }

  ).format(n);



/* =====================================================
   PRODUCTOS
===================================================== */

const grid =
  document.getElementById(
    "productGrid"
  );



if(grid){

  grid.innerHTML =

    products.map(p => `

      <article class="product">


        <div
          class="product-art ${p.type}"
        >

          <img
            src="${p.image}"
            alt="${p.name}"
            style="
              width:100%;
              height:100%;
              object-fit:contain;
              position:relative;
              z-index:3;
            "
          >

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
              data-id="${p.id}"
            >

              AGREGAR +

            </button>


          </div>


        </div>


      </article>

    `).join("");

}



/* =====================================================
   GUARDAR CARRITO
===================================================== */

function save(){

  localStorage.setItem(

    "mxangelCart",

    JSON.stringify(cart)

  );


  renderCart();

}



/* =====================================================
   AGREGAR PRODUCTO
===================================================== */

function add(id){

  let item =

    cart.find(

      x =>
        x.id === id

    );


  if(item){

    item.qty++;

  }

  else{

    cart.push({

      id: id,

      qty: 1

    });

  }


  save();


  toast();

}



/* =====================================================
   ELIMINAR PRODUCTO
===================================================== */

function remove(id){

  cart =

    cart.filter(

      x =>
        x.id !== id

    );


  save();

}



/* =====================================================
   RENDERIZAR CARRITO
===================================================== */

function renderCart(){

  const box =

    document.getElementById(
      "cartItems"
    );


  if(!box){

    return;

  }


  let count = 0;

  let total = 0;



  if(cart.length > 0){


    box.innerHTML =

      cart.map(x => {


        const p =

          products.find(

            product =>
              product.id === x.id

          );


        if(!p){

          return "";

        }


        count += x.qty;


        total +=

          p.price *
          x.qty;



        return `

          <div class="cart-item">


            <div class="cart-product-info">


              <!-- ==========================
                   IMAGEN DEL PRODUCTO
              =========================== -->

              <div class="cart-item-thumb">

                <img
                  src="${p.image}"
                  alt="${p.name}"
                >

              </div>


              <!-- ==========================
                   INFORMACIÓN
              =========================== -->

              <div class="cart-product-details">


                <strong
                  class="cart-product-name"
                >

                  ${p.name}

                </strong>


                <span
                  class="cart-product-meta"
                >

                  ${x.qty}
                  ×
                  ${money(p.price)}

                </span>


                <span
                  class="cart-product-meta"
                >

                  SUBTOTAL:
                  ${money(
                    p.price *
                    x.qty
                  )}

                </span>


              </div>


            </div>



            <!-- ==========================
                 ELIMINAR
            =========================== -->

            <button
              class="remove"
              onclick="remove(${p.id})"
            >

              QUITAR

            </button>


          </div>

        `;


      }).join("");

  }

  else{

    box.innerHTML = `

      <p
        style="
          color:#9ca39a;
          padding:20px 0;
        "
      >

        Tu carrito está vacío.

      </p>

    `;

  }



  const cartCount =

    document.getElementById(
      "cartCount"
    );


  const cartTotal =

    document.getElementById(
      "cartTotal"
    );



  if(cartCount){

    cartCount.textContent =
      count;

  }


  if(cartTotal){

    cartTotal.textContent =
      money(total);

  }

}



/* =====================================================
   BOTONES AGREGAR
===================================================== */

document
  .querySelectorAll(".add")
  .forEach(button => {


    button.onclick = () => {


      const id =

        Number(
          button.dataset.id
        );


      add(id);

    };


  });



/* =====================================================
   CARRITO LATERAL
===================================================== */

const drawer =

  document.getElementById(
    "drawer"
  );


const overlay =

  document.getElementById(
    "overlay"
  );



function openCart(){

  if(drawer){

    drawer.classList.add(
      "open"
    );

  }


  if(overlay){

    overlay.classList.add(
      "show"
    );

  }

}



function closeCart(){

  if(drawer){

    drawer.classList.remove(
      "open"
    );

  }


  if(overlay){

    overlay.classList.remove(
      "show"
    );

  }

}



/* =====================================================
   BOTÓN CARRITO
===================================================== */

const cartButton =

  document.getElementById(
    "cartBtn"
  );


if(cartButton){

  cartButton.onclick =
    openCart;

}



/* =====================================================
   CERRAR CARRITO
===================================================== */

const closeCartButton =

  document.getElementById(
    "closeCart"
  );


if(closeCartButton){

  closeCartButton.onclick =
    closeCart;

}



if(overlay){

  overlay.onclick =
    closeCart;

}



/* =====================================================
   MENSAJE PRODUCTO AGREGADO
===================================================== */

function toast(){

  const t =

    document.getElementById(
      "toast"
    );


  if(!t){

    return;

  }


  t.classList.add(
    "show"
  );


  setTimeout(

    () => {

      t.classList.remove(
        "show"
      );

    },

    1600

  );

}



/* =====================================================
   CHECKOUT
===================================================== */

const checkoutButton =

  document.getElementById(
    "checkoutBtn"
  );


if(checkoutButton){

  checkoutButton.onclick = () => {


    if(cart.length === 0){

      alert(
        "Tu carrito está vacío."
      );

      return;

    }



    let total = 0;


    cart.forEach(item => {


      const product =

        products.find(

          p =>
            p.id === item.id

        );


      if(product){

        total +=

          product.price *
          item.qty;

      }

    });



    alert(

      "Total de tu pedido: " +

      money(total) +

      "\n\n" +

      "Aquí conectaremos el pago con PayPal."

    );


  };

}



/* =====================================================
   INICIALIZAR
===================================================== */

renderCart();
