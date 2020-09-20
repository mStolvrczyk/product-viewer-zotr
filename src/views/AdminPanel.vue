<template>
  <div id="admin-panel">
    <div class="admin-panel-card">
    </div>
<!--      :rules="nameRules"-->
<!--      :counter="10"-->
<!--    <v-text-field-->
<!--      v-model="firstname"-->
<!--      label="First name"-->
<!--      required-->
<!--    ></v-text-field>-->
<!--    <v-btn @click="scrape"></v-btn>-->
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
