<template>
  <div id="admin-panel">
    <section class="rankings-menu admin-panel">
      <v-menu
        class="drop-down-cat"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="rankings-menu-el"
               :class="{ active: $route.path === '/rankings/laptops/gamingLaptops' || $route.path === '/rankings/laptops/regularLaptops'}"
               v-bind="attrs"
               v-on="on"
          >
            <v-icon class="rankings-icon" color="#fff" size="27px">mdi-keyboard-outline</v-icon>
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
      <div :class="{ active: $route.path === '/rankings/smartphones'}" class="rankings-menu-el" @click="switchCategory('smartphones')">
        <v-icon class="rankings-icon" color="#fff" size="27px">mdi-cellphone</v-icon>
        <p class="category rankings">Smartfony</p>
      </div>
      <div :class="{ active: $route.path === '/rankings/graphicsCards'}" class="rankings-menu-el" @click="switchCategory('graphicsCards')">
        <v-icon class="rankings-icon" color="#fff" size="27px">mdi-expansion-card</v-icon>
        <p class="category rankings">Karty graficzne</p>
      </div>
      <!--    <div class="rankings-menu-el" @click="switchCategory('keyboards')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-keyboard-outline</v-icon>-->
      <!--      <p class="category rankings">Klawiatury</p>-->
      <!--    </div>-->
      <!--    <v-menu-->
      <!--      class="drop-down-cat"-->
      <!--      transition="slide-y-transition"-->
      <!--      bottom-->
      <!--    >-->
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <div class="rankings-menu-el"-->
      <!--           v-bind="attrs"-->
      <!--           v-on="on"-->
      <!--        >-->
      <!--          <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-keyboard-outline</v-icon>-->
      <!--          <p class="category rankings">Klawiatury</p>-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <v-list>-->
      <!--        <v-list-item-->
      <!--          color="#fff"-->
      <!--          @click="switchCategory('keyboards/true')"-->
      <!--        >-->
      <!--          <v-list-item-title>gamingowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--        <v-list-item-->
      <!--          @click="switchCategory('keyboards/false')"-->
      <!--        >-->
      <!--          <v-list-item-title>biurowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--      </v-list>-->
      <!--    </v-menu>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('wirelessheadphones')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-headphones</v-icon>-->
      <!--      <p class="category rankings">Słuchawki</p>-->
      <!--    </div>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('mouses')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-mouse</v-icon>-->
      <!--      <p class="category rankings">Myszki</p>-->
      <!--    </div>-->
      <!--    <v-menu-->
      <!--      class="drop-down-cat"-->
      <!--      transition="slide-y-transition"-->
      <!--      bottom-->
      <!--    >-->
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <div class="rankings-menu-el"-->
      <!--          v-bind="attrs"-->
      <!--          v-on="on"-->
      <!--        >-->
      <!--          <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-mouse</v-icon>-->
      <!--          <p class="category rankings">Myszki</p>-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <v-list>-->
      <!--        <v-list-item-->
      <!--          color="#fff"-->
      <!--          @click="switchCategory('mouses/true')"-->
      <!--        >-->
      <!--          <v-list-item-title>gamingowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--        <v-list-item-->
      <!--          @click="switchCategory('mouses/false')"-->
      <!--        >-->
      <!--          <v-list-item-title>biurowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--      </v-list>-->
      <!--    </v-menu>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('monitors')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-monitor</v-icon>-->
      <!--      <p class="category rankings">Monitory</p>-->
      <!--    </div>-->
    </section>
  </div>
</template>

<script>
import ProductsService from '@/services/productsService'
export default {
  name: 'AdminPanel',
  data () {
    return {
      firstname: 'dupa',
      productsService: new ProductsService()
    }
  },
  methods: {
    async scrape () {
      const products = await this.productsService.getScrapedProduct()
      this.firstname = products.details.brand
      // console.log(products.details.brand)
    }
  }
}
</script>

<style lang="scss">
.admin-panel-card {
  display: block;
  width: 50%;
  height: 50vh;
  background: rgb(255,255,255);
  box-shadow: 5px 0 15px #BDBDBD;
  //border-radius: 5px;
}
#admin-panel {
  flex: 1;
}
</style>
