const store = new Vuex.Store({
        state: {
            sitename: `Be.Pro`,
            cart: [],
            products: [],
            cartItemCount:0,
            totalPrice:0,
        basket:{
            img:'image/menu-search/menu-cart.png',
            alt:'корзина покупок',
            number:'0'
        },
        sechProduct:{
            img:'image/menu-search/Search.png',
            alt:'кнопка поиска товара по сайту'
        },
                    
    },
    mutations:{
        addToCart(state, product){
            let item = JSON.parse(JSON.stringify(product));
            let found = state.cart.find(product => product.id == item.id);
            
            if ( found ) {
                found.num = found.num + 1 ;
                found.totalPrice = found.num * found.price;
                state.totalPrice += found.price;
            } else {
                if(item.sale){
                    item.price  = item.salePrice
                }
                item.num = 1;
                item.totalPrice = item.price ;
                state.totalPrice += item.price;
                state.cart.push(item); 
                }  
            state.cartItemCount ++; 
           
        },
        
        removeFromCart(state, item) {
            let index = state.cart.indexOf(item);

            if (index > - 1) {

                if(item.num > 1){
                    item.num = item.num - 1;
                    item.totalPrice = item.num * item.price;
                    state.totalPrice -= item.price;
                } else{
                    state.totalPrice -= item.price;
                    state.cart.splice(index, 1);
                }
                state.cartItemCount --;
            }
        },
        
        addProducts(state, arrProducts){
            for(let i = 0; i < arrProducts.length; i++){
                state.products.push(arrProducts[i]);
            }
        },
        deletCart(state){
              state.cart.splice(0, state.cart.length);
              state.cartItemCount = 0;
              alert('Ваш заказ оформлен');
        }
    },
    actions:{
        loadData({commit}){
            commit('addProducts', window.products);
        }
    }
});
            
store.dispatch('loadData');

Vue.component('v-header', {
      template: `
                <header class="header">
                    <div class="header__container">
                        <nav class="menu header__menu">
                            <div class="inner__left">
                            
                                <a href="#" class="logo header__logo">{{sitename}}</a>
                                <ul class="menu__list">
                                    <li class="menu__item">
                                        <router-link  :to="{name:'shop'}" exact class="menu__link">Shop</router-link>
                                </li>
                                </ul>
                            </div>
                            <div class="inner__right">
                                <ul class="search header__search">
                                    <li class="search__item">
                                    <router-link class="search__link" :to="{ path:'/basket'}"><img :src="basket.img" :alt="basket.alt" class="searth__img"><span class="cart__number"> {{ cartItemCount }} </span></router-link></li>
                                    <li class="search__item"><a href="#" class="search__link"><img :src="sechProduct.img" :alt="sechProduct.alt" class="searth__img"></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>`,
        computed: {
            ...Vuex.mapState(['sitename', 'basket','sechProduct','cartItemCount'])
        },
 
    });
Vue.component('v-footer',{
    template:`
    <footer class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="social">
                    <a href="#" class="footer__logo">ModaX</a>
                    <ul class="social__list">
                        <li class="social__item"><a href="" class="social__link"><span class="soccial__icon"><i class="fab fa-facebook-f"></i></span></a></li>
                        <li class="social__item"><a href="" class="social__link"><span class="soccial__icon"><i class="fab fa-twitter"></i></span></a></li>
                        <li class="social__item"><a href="" class="social__link"><span class="soccial__icon"><i class="fab fa-behance"></i></span></a></li>
                        <li class="social__item"><a href="" class="social__link"><span class="soccial__icon"><i class="fa fa-globe"></i></span></a></li>
                        <li class="social__item"><a href="" class="social__link"><span class="soccial__icon"><i class="fab fa-linkedin-in"></i></span></a></li>
                    </ul>
                </div>
                <div class="footer__nav">
                    <ul class="menu__list footer__list">
                        <li class="menu__item footer__item"><a href="" class="menu__link footer__link">man</a></li>
                        <li class="menu__item footer__item"><a href="" class="menu__link footer__link">woman</a></li>
                        <li class="menu__item footer__item"><a href="" class="menu__link footer__link">lookbook</a></li>
                        <li class="menu__item footer__item"><a href="" class="menu__link footer__link">sale</a></li>
                        <li class="menu__item footer__item"><a href="" class="menu__link footer__link">blog</a></li>
                    </ul>
                    <form action="" class="footer__form">
                        <label for="footer__email" class="footer__form-label">Subscribe to news</label>
                        <input type="email" class="email" id="footer__email" placeholder="Email Adrress">
                        <input type="submit" class="submit" value="Submit">
                    </form>
                </div>
                <div class="footer__contacts">
                    <h4 class="footer__contacts_head">
                        contact us
                    </h4>
                    <div class="footer__adress">San Francisco, California  400 Castro St, San Francisco, CA <span class="footer__adress_tel">
                        (+1) 686 868 9999
                    </span></div>
                    <ul class="payment__list">
                        <li class="payment__item"><a href="#" class="payment__link"><img src="image/footer/card-pay_1.png" alt="оплата карточкой"></a></li>
                        <li class="payment__item"><a href="#" class="payment__link"><img src="image/footer/card-pay_2.png" alt="оплата карточкой"></a></li>
                        <li class="payment__item"><a href="#" class="payment__link"><img src="image/footer/card-pay_3.png" alt="оплата карточкой"></a></li>
                        <li class="payment__item"><a href="#" class="payment__link"><img src="image/footer/card-pay_4.png" alt="оплата карточкой"></a></li>
                        <li class="payment__item"><a href="#" class="payment__link"><img src="image/footer/card-pay_5.png" alt="оплата карточкой"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
`,

});

const Card = {
    template:`
        <div class="card">
            <span class="card__btn" v-if='item.sale'>sale</span>
            <div class="card__inner_top">
                <a href="#" class="product__link" @click.prevent>
                    <img :src="'/' + item.img" :alt="item.alt" class="card__img">
                </a>   
            </div>
            <div class="card__inner_botton">
                <a href="#" class="card__title  banner__title card__title_link"  @click.prevent>{{ item.title }}</a>
                <p class="card__price" v-if='item.sale'>
                    <span class="card__price_gray">$ {{ item.price }} USD</span>$ {{ item.salePrice }} USD
                </p>
                <p class="card__price" v-else>
                    $ {{ item.price }} USD
                </p>
            </div>
            <div class='btn-card-wrap'>
                <router-link :to="{name:'detailsProd', params:{id:item.id}}" class='padinaten-btn'>Подробнее</router-link>
                <div>
                    <button class="padinaten-btn" v-if='(item.size!=0)' @click='addToCart(item)'>Добавить</button>
                    <span v-else>Нет в наличие</span>
                </div>
            </div>
        </div>
        `,
    props:['item'],

    computed: {
        ...Vuex.mapState(['products', 'cart'])
    },
    methods:{
        addToCart: function(product){
        this.$store.commit('addToCart', product);
        },
    }

};
const Product = {
    template: `
        <section class="products container-absolut">
            <div class="container">
                <div class='products__wrap'>
                    <card v-for="item in collection" v-bind:key="item.id" :item='item'></card>
                </div>
                <div class="btn-wrap-shop">
                    <div>
                        <button class="btn" v-if='(pageNumber.startpage==0)' disabled>назад</button>
                        <button class="btn" v-else @click='PrePage' >назад</button>
                    </div>
                    <div>
                        <button class="btn" v-if='(pageNumber.endpage>products.length)' disabled>вперед</button>
                        <button class=" btn" v-else @click='nextPage'>вперед</button>
                    </div>

                </div>
            </div>
        </section>
    `,
    data(){
         return {
             pageNumber:{
                 startpage:0,
                 endpage:8
             },
        } 
    },
    components:{
        'card':Card
    },
    computed: {
        ...Vuex.mapState(['products']),
        collection: function () {
            return this.paginate(this.products);
        },
    },
    methods: {
        nextPage() {
            this.pageNumber.startpage +=8;
            this.pageNumber.endpage +=8;
            return this.startpage;
        },
    PrePage() {
        this.pageNumber.startpage -=8;
        this.pageNumber.endpage -=8;
        return this.startpage;
    },
    paginate(products) { 
        return this.products.slice(this.pageNumber.startpage, this.pageNumber.endpage)
        },
    },
    
};

const DetailsProd = {
    
    template: `
     <section class="product-layter container-absolut">
        <div class="container">
            <div>
              <div class="product-layter__block">
                  <div class="product-layter__form">
                      <h2 class="section__title product-layter__subtitle banner__title">{{product.title}}</h2>

                      <div class="form__list_container">
                      <div class="inner__color">
                         <span class="list__titte">Color</span>
                          <ul class="product-layter__list fotm__list_color">
                              <li class="form__item_color" v-for='item in product.color'>
                                <input type="radio" name="color" class="form__input_color" :id="item" checked><label :for="item" class="fotm__color_label" :class='item'></label></li>
                             
                          </ul>  
                      </div>
                      <div class="ineer__size">
                          <span class="list__titte list__title_size">Size:</span>
                          <ul class="product-layter__list fotm__list_size" >
                              <li class="form__item_size" v-for='item in product.size'><input type="radio" name="size" class="form__input_size" :id="item"><label :for="item" class="form__size_label">{{item}}</label></li>
                              
                          </ul> 
                      </div>
                      </div>
                      <div class="form__btn_block">
                          <div>
                                <span v-if=(product.sale) class="form__prise">{{product.salePrice }}<span class="form__prise_small">$ {{product.price }} USD</span></span>
                                <span v-else class="form__prise">$ {{product.price }} USD </span>
                         </div>
                          
                          <div class="btn__inner">
                              <span v-if='(product.size==0)'> Нет в наличие</span>
                              <button class="btn product__btn" v-else @click='addToCart(product)'>Add To Cart</button>
                          </div> 
                      </div>
                </div>
                     
                  <div class="">

                       <img :src="'/' + product.img"  class="datails-img">

                  </div>  
              </div>
            </div>
          </div>
      </section>  
`,
    props:['id'],

    computed: {
        ...Vuex.mapState(['products', 'cart']),
        product: function(){
            let id = this.id;
            let arr = this.products.filter(function(prod){
            return prod.id === id;
            });
            return arr[0];
        },
    },
    methods:{
        addToCart: function(product){
            this.$store.commit('addToCart', product);
            },
        }

};
const Basket = {
    template: `
        <div class='container-absolut'>
            <div class='container container-absolut' v-if='(cart.length>0)'>
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Количество</th>
                            <th>Название</th>
                            <th>Картинка</th> 
                            <th>Цена</th>
                            <th>Добавить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(product, index) in cart"  :key="index">
                            <td>{{product.id}} </td>
                            <td>{{product.num}} </td>
                            <td>{{product.title}} </td>
                            <td><img :src="'/' + product.img" /> </td>
                            <td>
                                $ {{ product.totalPrice }} USD

                            </td>
                            <td><a href="#" @click.prevent='addToCart(product)'>Добавить</a></td>
                            <td><a href="#" @click.prevent='removeFromCart(product)'>Удалить</a></td>
                        </tr>
                    </tbody>
                </table>
                <p>Всего товаров: {{ cartItemCount }}  <span class='price-table' >Цена: {{totalPrice}}</span> <a class='btn' @click='deletCart'>Заказать</a></p>

            </div>
            <div class='container' v-else> <h3>корзина пуста</h3></div>
        </div>
    `,
 
    computed: {
         ...Vuex.mapState(['products', 'cart','cartItemCount', 'totalPrice'])
    },
    methods:{
        addToCart: function(product){
            this.$store.commit('addToCart', product);
            },
        removeFromCart: function(item) {
            this.$store.commit('removeFromCart', item);
        },
        toOder: function(){
            alert('Ваш заказ оформлен');
        },
        deletCart: function(){
             this.$store.commit('deletCart');
        }

 
    },
    components:{
        'card':Card
    },
}

const routes = [
  { 
    path: '/', 
    component:Product,
    name:'shop'
    },

    {
    path: '/basket', 
    component:Basket,
    name:'basket'
    },
    {
    path: '/detailsProd/:id/', 
    component: DetailsProd,
    name:'detailsProd',
    props:true
    },


];
const router = new VueRouter({
    mode: 'history',
    routes: routes
});



const app = new Vue({
    el:'#app',
    router: router,
    store,
    
    components:{
        'shop': Product,
        'detailsProd':DetailsProd,
        'basket':Basket
    },
    computed:{
    },

})