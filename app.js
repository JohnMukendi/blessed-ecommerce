let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || []

let generateshop = () => {
    return (shop.innerHTML = shopItemsData.map((ele) => {
        let { id, name, price, desc, img } = ele;
        let search = basket.find((x) => x.id === id) || []
        return `
        <div id = product-id-${id} class="item">
        <img width="200" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id = ${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        `;
    })
        .join(""));
};

generateshop();


let minus = document.querySelectorAll(".bi-dash-lg");
let plus = document.querySelectorAll(".bi-plus-lg");

// the increment is responseble incresing the number of the same items added when you press plus
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
    localStorage.setItem('data', JSON.stringify(basket));
};

// the update is responseble updating the number of the same items added and or subtracted when you press minus or plus
// the function will run every time increment and/or decrement is clicked
let update = (id) => {
    //function will make search for olny if the item exists only then the number
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
};


// adding all card numders 
// calculation will run only when the update function is trigered
let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    //this will return only the item
    //map will target all the objects one by one and will get only the item
    // the reduce function adds all the numbers
    //the parameters in the reduce function are a,b
    //a will serve as the previous and be will serve as the next number and these will be add together
    //0 will be defualt meaning the  calculation will start from zero
    cartIcon.innerHTML = basket.map((ele) => ele.item).reduce((a, b) => a + b, 0);
}

calculation()

