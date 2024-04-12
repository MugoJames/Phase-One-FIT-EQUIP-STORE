//Define variables in the global scope
let cartVisible =false;
let cart = [];
//Define functions in the global scope
function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartVisible = !cartVisible;
  if (cartVisible) {
      cartElement.classList.add('show');
      displayCart(); // Display cart items when cart is shown
  } else {
      cartElement.classList.remove('show');
  }
}

function displayCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  cart.forEach(product => {
    cartItems.innerHTML += `
    <div class="cart-items">
    <p>${product.name}</p>
    <p>price: ${product.price}</p>
    <p>${product.id}</p>
    </div>
    `
  })
}


function addToCart(productid, name, price ) {
  const product = { id: productid, name: name, price: price};
  cart.push(product);
  displayCart();
}

document.addEventListener('DOMContentLoaded',function(){


  let cart =[];
  //Add event listner to add to Cart Buttons
  document.querySelector('.products').addEventListener('click',function(e) {
    if (e.target && e.target.classList.contains('add-to-cart')){
      const productid = e.target.dataset.productid;addToCart(productid);
    }
  });
  //

  const productsContainer =
 document.querySelector('.products');
 const searchbar =
 document.getElementById('searchbar');
    async function fetchproducts(url,query ='') {
        let data = await fetch(url);
        let response = await data.json();
        productsContainer.innerHTML ='';

        response.forEach(product => {
          let description = product.description || '';
          if (!query || product.name.toLowerCase().includes(query.toLowerCase()) ||
          description.toLowerCase().includes(query.toLowerCase())) {
            productsContainer.innerHTML += `
            <div class="products">
              <img src="${product.image}" alt="" class="product-image">
              <h2 class="product-name">${product.name}</h2>
              <h4 class="product-description" id="productDescription_${product.id}">
                  ${getDescriptionWithReadMore(product.description, product.id)}
              </h4>
              <div class="product-price-container" >
                <h3 class="product-price">${product.price}</h3>
                <a href="#!" data-productId =${product.id}
                <button onclick="addToCart('${product.id}', '${product.name}', '${product.price}',)"
                class="add-to-cart" ><ion-icon name="cart-outline"></ion-icon></button>
              </div>
            </div>

            `;

          }
        });
      }

      //Define the getDescription with readmore
      function getDescriptionWithReadMore(description, productId) {
        //Set maximum Length of description
        const maxLength = 60;
        //Check if description length exceeds maximum length
        if (description.length > maxLength) {
          //If description is longer display truncated version with readmore
            return `
            <span id="description_${productId}_truncated">${description.substring(0, maxLength)}</span>
            <span id="description_${productId}_more" style="display:none">${description.substring(maxLength)}<span
            class="readless"onclick="showLess('${productId}')">...Read less</span></span>
            <span id="description_${productId}_readMoreBtn" class="readmore"
            onclick="showMore('${productId}')">Read more...</span>
            `;
        } else {
          //display fuul description
            return description;
        }
    }


   fetchproducts("http://localhost:3000/products");
      searchbar.addEventListener('input', () => {
        fetchproducts("http://localhost:3000/products", searchbar.value);

      })

});

function showMore(productId) {
  document.getElementById(`description_${productId}_truncated`).style.display = 'inline';
  document.getElementById(`description_${productId}_more`).style.display = 'inline';
  document.getElementById(`description_${productId}_readMoreBtn`).style.display = 'none';
}

function showLess(productId) {
  document.getElementById(`description_${productId}_truncated`).style.display = 'inline';
  document.getElementById(`description_${productId}_more`).style.display = 'none';
  document.getElementById(`description_${productId}_readMoreBtn`).style.display = 'inline';
}
