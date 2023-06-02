let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')


let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((ele) => ele.item).reduce((a, b) => a + b, 0);
}

calculation()

let generateCartItems = () => {
    if (basket.lenght !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((ele) => ele.id === id) || []

            return `
            <div class="cart-item">
                <img width="100" src="${search.img}" alt=""/>
                <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p >${search.name}</p>
                        <p class="cart-item-price">${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                </div>

                <div class="cart-buttons">
                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id = ${id} class="quantity">
                    ${item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>

                <h3>R ${item * search.price}</h3>
                </div>
            </div>  
            `;
        }).join(''))
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a herf="index.html">
        <button class="HomeBtn">Black to home</button>
      </a>
      `
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    //secrch fucntion this will search weather the item is there or not
    //if it is there it will add on to item
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
};

// the decrement is responseble decresing the number of the same items added when you press minus
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem('data', JSON.stringify(basket));
}

let update = (id) => {
    //function will make search for olny if the item exists only then the number
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculation();
    TotalAmount();
    localStorage.setItem('data', JSON.stringify(basket));
    // console.log(selectedItem.id)
}


let clearCart = ()=>{
    basket = []
    generateCartItems();
    calculation();
    TotalAmount();
    localStorage.setItem('data', JSON.stringify(basket));

}

let TotalAmount = () => {
    if (basket.label !== 0) {
        let amount = basket.map((ele) => {
            let { item, id } = ele;
            let search = shopItemsData.find((ele) => ele.id === id) || [];
            return item * search.price;
        }).reduce((a, b) => a + b, 0);

        label.innerHTML =`
        <h2 class="title">Total BiLL: R ${amount}</h2>
        <button onclick="checkout()" class="checkout">Checkout</button>        
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>        
        `
        // console.log(amount)
    } else return
}

TotalAmount()

let checkout = () =>{
    let amount = basket.map((ele) => {
        let { item, id } = ele;
        let search = shopItemsData.find((ele) => ele.id === id) || [];
        return item * search.price;
    }).reduce((a, b) => a + b, 0);
    alert("You have just bought R" + amount + " worth of stuff" )
}
