const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts().then(data => { //data - объект js
            this.goods = data;
            //console.log(data);
            this.render()

        });

    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

/**
 * Класс корзины, который отвечает за все действия с корзиной пользователя, в данном класе на данный момент реализовано отображение списка товаров и удаление их верстки из корзины.
 */
class Basket {
    constructor(container = '.btn-cart', img = 'https://via.placeholder.com/200x150') {
        this.container = container;
        this.img = img;
        this.basketObject = [];
        this._getProducts().then(data => {
            this.basketObject = data.contents;
            //console.log(this.basketObject);
            this.initBasket();
        });
    }

    /**
     * Метод для подключения к файлу с в котором храняться данные о товарах
     * @returns Возвращает массив объектов товаров
     */
    _getProducts() {

        return fetch(`${API}/getBasket.json`).then(str => str.json());
    }

    /**
     * Инициализирует работу всех методов
     */
    initBasket() {
        this.render();
        this.removeGood();
    }

    addGood() {

    }

    /**
     * Мето отвечает за удаление товаров из корзины, пока только визуально,по клику на кнопку удаления.
     */
    removeGood() {
        const deletButton = document.querySelectorAll('.item__del');
        deletButton.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.target.parentNode.remove();
            })
        })

    }

    changeGood() {

    }

    /**
     * Метод отвечающий за отрисовку и добавления в вертку разметки корзины
     */
    render() {
        const basketButton = document.querySelector(this.container);
        const basket = document.querySelector('.basket');

        basket.insertAdjacentHTML('afterbegin', this.template());
        basketButton.addEventListener('click', function () {
            basket.classList.toggle('active');
        })
    }

    /**
     * Метод для создание готовой строки с данными о товарах
     * @returns Возвращает строку с разметкой
     */
    template() {
        let str = '<div class="basket__list">';
        for (let item of this.basketObject) {

            str += `<div class="list__item">
                        <img class="item__img" src="${this.img}" alt="">
                        <div class="text__box">
                            <p class="item__name">${item.product_name}</p>
                            <p class="item__price">${item.price} руб.</p>
                        </div>
                        <div class="item__del"></div>
                    </div>`;
        }
        str += '</div>';

        return str;
    }
}


let basket = new Basket();
let list = new ProductsList();
//console.log(list.allProducts);

let num = a => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(a) {
				resolve(a + 10); //после resolve всегда вызываеться обработчик then
			}else {
                reject('error'); //после reject всегда вызываеться обработчик catch
            }
		}, 3000);
        return 5000;
	})
}

num(5)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

