const store = new Vuex.Store({
        state: {
            sitename: `Be.Pro`,
            cart: [],
            products: [],
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
    getters: {
        cartItemCount(state){
            return state.cart.length;
        },
    },
    mutations:{
        addToCart(state, item){
            state.cart.push(item);
        },
        removeFromCart(state, item) {
            let index = state.cart.indexOf(item);

            if (index > -1) {
                let product = state.cart[index];
                state.cart.splice(index, 1);
            }
        },

        addProducts(state, arrProducts){
            for(let i = 0; i < arrProducts.length; i++){
                state.products.push(arrProducts[i]);
            }
        },

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
                                        <router-link  :to="{ path: '/' }" exact class="menu__link">Shop</router-link>
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
            ...Vuex.mapState(['sitename', 'basket','sechProduct']),
            ...Vuex.mapGetters(['cartItemCount'])

        },
 
    });

const Card = {
    template:`
        <div class="card">
            <span class="card__btn" v-if='item.sale'>sale</span>
            <div class="card__inner_top">
                <a href="#" class="product__link" @click.prevent>
                    <img :src="item.img" :alt="item.alt" class="card__img">
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
            <p class='btn-card-wrap'>
                <router-link :to="{name:'detailsProd', params:{id:item.id}}" class='padinaten-btn'>Подробнее</router-link>
                <button class="padinaten-btn" @click='addToCart(item)'>Добавить</button>
            </p>
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
                                <span v-if=(product.sale) class="form__prise">{{product.salePrice }}<span class="form__prise_small">{{product.price }}</span></span>
                                <span v-else class="form__prise">{{product.price }}</span>
                         </div>
                          
                          <div class="btn__inner">
                              <button class="btn product__btn" @click='addToCart(product)'>Add To Cart</button>
                          </div> 
                      </div>
                </div>
                     
                  <div class="">

                       <img v-bind:src="product.img" alt="" class="datails-img">

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
                            <td>{{product.title}} </td>
                            <td><img :src='product.img'/> </td>
                            <td>
                                <span v-if='(product.sale)'>{{ product.salePrice}}</span>
                                <span v-else>{{ product.price}}</span>
                            </td>
                            <td><a href="#" @click.prevent='addToCart(product)'>Добавить</a></td>
                            <td><a href="#" @click.prevent='removeFromCart(product)'>Удалить</a></td>
                        </tr>
                    </tbody>
                </table>
                <p>Всего товаров: {{ cartItemCount }}  <span class='price-table' >Цена: {{totalPrice}}</span> <a class='btn' @click='toOder'>Заказать</a></p>

            </div>
            <div class='container' v-else> <h3>корзина пуста</h3></div>
        </div>
    `,
 
    computed: {
         ...Vuex.mapState(['products', 'cart']),
         ...Vuex.mapGetters(['cartItemCount']),
        totalPrice: function(){
            let total = 0;
            for (let item of this.$store.state.cart) {
               if(item.sale){
                    total += item.salePrice;
                }else if(item.sale==false){
                    total += item.price;
                }           
                
            }

            return total.toFixed(2);
        },

    },
    methods:{
        addToCart: function(product){
            this.$store.commit('addToCart', product);
            },
        removeFromCart: function(item) {
            this.$store.commit('removeFromCart', item);
        },
        toOder: function(){
            alert('Ваш заказ оформлен')
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
       'shop': Product ,
        'detailsProd':DetailsProd,
        'basket':Basket
    },
    data:{
        menu:0
      
    },
    computed:{
       ...Vuex.mapState(['sitename', 'basket','sechProduct']), 
       ...Vuex.mapGetters(['cartItemCount'])
    },

})