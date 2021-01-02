<template>
  <div id="admin-panel">
    <section class="rankings-menu admin-panel">
      <v-menu
        class="drop-down-cat"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="rankings-menu-el admin-panel"
               :class="{ active: $route.path === '/adminpanel/laptops/gamingLaptops' || $route.path === '/adminpanel/laptops/regularLaptops'}"
               v-bind="attrs"
               v-on="on"
          >
            <p class="category rankings">Laptopy</p>
          </div>
        </template>
        <v-list>
          <v-list-item
            color="#fff"
            @click="switchCategory('laptops/gamingLaptops')"
          >
            <v-list-item-title>gamingowe</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="switchCategory('laptops/regularLaptops')"
          >
            <v-list-item-title>biurowe</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div :class="{ active: $route.path === '/adminpanel/smartphones'}" class="rankings-menu-el admin-panel" @click="switchCategory('smartphones')">
        <p class="category rankings">Smartfony</p>
      </div>
      <div :class="{ active: $route.path === '/adminpanel/graphicsCards'}" class="rankings-menu-el admin-panel" @click="switchCategory('graphicsCards')">
        <p class="category rankings">Karty graficzne</p>
      </div>
      <v-menu
        class="drop-down-cat"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="#df3968"
            x-small
            fab
          >
            <v-icon style="color: #fff">
              mdi-plus-thick
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openProductDialog('laptops')">
            <v-list-item-title>Laptop</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openProductDialog('smartphones')">
            <v-list-item-title>Smartfon</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openProductDialog('graphicsCards')">
            <v-list-item-title>Karta graficzna</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </section>
    <section>
      <div class="container">
        <v-autocomplete
          v-model="selectedProduct"
          :items="allProducts"
          id="autocomplete-input"
          style="padding: 2rem 0"
          background-color="rgba(255,255,255, 0.8)"
          search="searchValue"
          hide-no-data
          item-value="id"
          item-text="details.model"
          label="Wybierz kategorię urządzeń"
          solo
          hide-details
          search-input.sync="search"
          cache-items
          return-object
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Brak wybranej kateogrii
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
        <div id="products" v-if="allProducts.length !== 0 && !errorStatement">
          <div v-if="$route.params.category === 'graphicsCards'">
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img class="product-image" :src="product.images.imageOne"/>
                <div class="second-col">
                  <h3>{{ product.brand + ' ' + product.model }}</h3>
                  <p class="product-specs">RAM: {{ product.ram }} | Chipset: {{ product.chipset
                    }} | Taktowanie procesora: {{ product.cpuClockSpeed }}</p>
                  <div class="price">
                    {{ product.price }}
                  </div>
                </div>
                <div class="third-col">
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
          <div v-if="$route.params.category === 'laptops'">
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img contain class="product-image" :src="product.images.imageOne"/>
                <div class="second-col">
                  <h3>{{ product.brand + ' ' + product.model }}</h3>
                  <p class="product-specs">RAM: {{ product.ram }} | CPU: {{ product.cpu
                    }} | Dysk: {{ product.drive }}</p>
                  <div class="price">
                    {{ product.price }}
                  </div>
                </div>
                <div class="third-col">
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
          <div v-if="$route.params.category === 'smartphones'">
            <transition-group name="fade" id="products-group">
              <div v-for="product in products" :key="product._id" id="product-el"
                   class="product-el"
                    @click="productElAction(product)">
                <v-carousel
                  :show-arrows="false"
                  hide-delimiters
                  :cycle="product.largeProductEl"
                  interval="2000"
                  height="200"
                >
                  <v-carousel-item
                    v-for="(image,i) in objectToArray(product)"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                    <v-img contain class="product-image" :src="image"/>
                  </v-carousel-item>
                </v-carousel>
                <div class="second-col">
                  <h3>{{ product.details.model }}</h3>
                  <p class="product-specs">Ekran: {{ product.details.screen }} | Bateria: {{ product.details.battery
                    }} | Pamięć: {{ product.details.memory }}</p>
                  <transition name="fade">
                    <p v-if="product.largeProductEl" class="product-specs">Ekran: {{ product.details.screen }} |
                    Bateria: {{
                      product.details.battery
                  }} | Pamięć: {{ product.details.memory }}</p>
                  </transition>
                  <div class="price">
                    {{ product.details.price }}
                  </div>
                </div>
                <div class="third-col">
                  <v-btn
                    @click.stop="updateProduct(product)"
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    @click.stop="removeConfirmation(product._id)"
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
        <div v-if="allProducts.length === 0 && !errorStatement && !loadingStatement">
          BRAK PRODUKTÓW DO WYŚWIETLENIA
        </div>
        <div v-if="loadingStatement">
          <transition-group name="fade">
            <v-progress-linear
              :key="1"
              color="#202020"
              indeterminate
            ></v-progress-linear>
            <br
              :key="2"
            >
            <v-progress-linear
              :key="3"
              color="#df3968"
              indeterminate
            ></v-progress-linear>
            <br
              :key="4"
            >
            <v-progress-linear
              :key="5"
              color="#202020"
              indeterminate
            ></v-progress-linear>
            <br
              :key="6"
            >
            <v-progress-linear
              :key="7"
              color="#df3968"
              indeterminate
            ></v-progress-linear>
          </transition-group>
        </div>
        <div v-if="errorStatement">
          BRAK POŁĄCZENIA Z BAZĄ DANYCH
        </div>
        <transition name="fade">
          <v-btn
            style="margin-top: 0.7rem"
            v-if="arrowVisibility === true"
            @click="clearFilters"
            color="rgb(223, 57, 104)"
            top
            small
            right
            fab
          >
            <v-icon style="color: #fff; font-size: 24px">
              mdi-arrow-left-bold
            </v-icon>
          </v-btn>
        </transition>
      </div>
    </section>
    <NewLaptopDialog
      :currentProductsNumber="currentProductsNumber"
      :productsCategory="productsCategory"
      v-on:closeProductDialog="closeProductDialog"
    />
<!--      :currentProductsNumber="currentProductsNumber"-->
    <NewSmartphoneDialog
      :productsCategory="productsCategory"
      :updateStatement.sync="updateStatement"
      :productToUpdate.sync="productToUpdate"
      v-on:resetUpdateStatus="resetUpdateStatus"
      v-on:closeProductDialog="closeProductDialog"
      v-on:refreshProductsList="refreshProductsList"
    />
    <NewGraphicsCardDialog
      :currentProductsNumber="currentProductsNumber"
      :productsCategory="productsCategory"
      v-on:closeProductDialog="closeProductDialog"
    />
    <InformationDialog
      :informationDialogVisibility.sync="informationDialogVisibility"
      :informationDialogType.sync="informationDialogType"
      :category.sync="$route.params.category"
      v-on:closeInformationDialog="closeInformationDialog"
      v-on:removeProduct="removeProduct"
    />
  </div>
</template>

<script>
import ProductsService from '@/services/productsService'
import NewLaptopDialog from '@/components/CRUD/Laptop/NewLaptopDialog'
import NewGraphicsCardDialog from '@/components/CRUD/GraphicsCard/NewGraphicsCardDialog'
import NewSmartphoneDialog from '@/components/CRUD/Smartphone/NewSmartphoneDialog'
import InformationDialog from '@/components/InformationDialog'
export default {
  name: 'AdminPanel',
  components: { NewLaptopDialog, NewGraphicsCardDialog, NewSmartphoneDialog, InformationDialog },
  data () {
    return {
      noOfProductInArr: null,
      productToUpdate: null,
      updateStatement: false,
      productId: null,
      informationDialogVisibility: false,
      informationDialogType: null,
      errorStatement: false,
      loadingStatement: false,
      currentProductsNumber: null,
      productsService: new ProductsService(),
      allProducts: [],
      products: [],
      selectedProduct: null,
      arrowVisibility: false,
      productsCategory: null
    }
  },
  methods: {
    objectToArray (object) {
      if (object.largeProductEl) {
        const arr = [
          object.images.imageOne,
          object.images.imageTwo,
          object.images.imageThree
        ]
        return arr.filter((image) => (image !== ''))
      } else {
        return [
          object.images.imageOne
        ]
      }
    },
    resetUpdateStatus (value) {
      this.updateStatement = value
    },
    updateProduct (product) {
      this.productToUpdate = product
      this.updateStatement = true
      this.openProductDialog(this.$route.params.category)
    },
    removeConfirmation (productId) {
      this.productId = productId
      this.informationDialogType = 'removing confirmation'
      this.informationDialogVisibility = true
    },
    closeInformationDialog (value) {
      this.informationDialogVisibility = value
      this.informationDialogType = null
    },
    async removeProduct () {
      this.informationDialogType = 'removing'
      this.informationDialogVisibility = true
      await this.productsService.removeProduct(this.$route.params.category, this.productId)
        .then(response => {
          if (response === 'error') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'removing failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'removing succesful'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
            setTimeout(function () {
              this.informationDialogType = null
              this.informationDialogVisibility = false
            }
              .bind(this),
            1500)
          }
        })
      this.refreshProductsList(this.$route.params.category)
    },
    refreshProductsList (value) {
      if (this.$route.params.category === value) {
        this.getProducts(value, undefined)
      } else {
        this.switchCategory(value)
      }
    },
    openProductDialog (category) {
      this.productsCategory = category
      // this.currentProductsNumber = await this.productsService.getCountOfProducts(category)
    },
    closeProductDialog (value) {
      this.productsCategory = value
    },
    returnButtonAppearance () {
      if (window.pageYOffset > 100) {
        this.returnButtonVisibility = true
      } else {
        this.returnButtonVisibility = false
      }
    },
    getImgUrl (imagePath) {
      return require('../assets/productImages' + imagePath)
    },
    async getProducts (category, subcategory) {
      this.loadingStatement = true
      // this.currentProductsNumber = null
      this.products = []
      if (subcategory !== undefined) {
        // this.currentProductsNumber = await this.productsService.getCountByCategory(category, subcategory)
        await this.productsService.getSubProducts(category, subcategory)
          .then(response => {
            this.loadingStatement = false
            if (response === 'error') {
              this.errorStatement = true
            } else {
              this.allProducts = this.products = response.map((response) => ({ ...response, largeProductEl: false }))
            }
          })
      } else {
        // this.currentProductsNumber = await this.productsService.getCountOfProducts(category)
        await this.productsService.getAllProducts(category)
          .then(response => {
            this.loadingStatement = false
            if (response === 'error') {
              this.errorStatement = true
            } else {
              this.allProducts = this.products = response.map((response) => ({ ...response, largeProductEl: false }))
            }
          })
      }
    },
    async switchCategory (category) {
      if (`/adminpanel/${category}` !== this.$route.path) {
        this.$router.push(`/adminpanel/${category}`)
      }
    },
    clearFilters () {
      this.products = this.allProducts
      this.arrowVisibility = false
    },
    productElAction (product) {
      if (this.noOfProductInArr === null) {
        document.getElementById('products-group').children.item(this.products.indexOf(product)).className = 'product-el large'
        this.noOfProductInArr = this.products.indexOf(product)
        product.largeProductEl = true
      } else if (this.noOfProductInArr !== null && this.noOfProductInArr !== this.products.indexOf(product)) {
        this.products[this.noOfProductInArr].largeProductEl = false
        document.getElementById('products-group').children.item(this.noOfProductInArr).className = 'product-el'
        document.getElementById('products-group').children.item(this.products.indexOf(product)).className = 'product-el large'
        product.largeProductEl = true
        this.noOfProductInArr = this.products.indexOf(product)
      } else if (this.noOfProductInArr !== null && this.noOfProductInArr === this.products.indexOf(product)) {
        document.getElementById('products-group').children.item(this.noOfProductInArr).className = 'product-el'
        this.products[this.noOfProductInArr].largeProductEl = false
        this.noOfProductInArr = null
      }
    }
  },
  watch: {
    '$route.path' () {
      this.getProducts(this.$route.params.category, this.$route.params.subcategory)
    },
    'selectedProduct' (value) {
      this.products = null
      setTimeout(function () {
        this.products = this.allProducts.filter(({ model }) => model.includes(value.model))
        this.arrowVisibility = true
      }
        .bind(this),
      600)
    },
    'products.length' () {
      if (document.getElementById('admin-panel').offsetHeight - window.outerHeight < 100) {
        this.$emit('outerHeightAlert', true)
      }
    }
  },
  mounted () {
    this.getProducts(this.$route.params.category, this.$route.params.subcategory)
  }
}
</script>

<style lang="scss">
.product-el {
  margin: 0.3rem 0;
  padding: 1rem 1rem;
  background: #fff;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  transition: padding 0.5s, box-shadow 0.3s;
  &.large {
    padding: 5rem 1rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 5px 0 15px #BDBDBD;
  }

  .second-col {
    padding: 2rem 0.5rem;
    text-align: left;
    flex-direction: column;
  }
}
.middle-el {
  display: flex;
  justify-content: center;
}
#admin-panel {
  flex: 1;
}
</style>
