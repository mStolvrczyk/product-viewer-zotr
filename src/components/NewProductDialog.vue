<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newProductDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-dialog">
      <div id="new-product-header">
        <h3>Dodaj {{ choosenProductCategory }}</h3>
      </div>
      <div class="container">
        <div class="row-dialog">
          <v-text-field
            label="Zeskrapuj laptop z linku"
            required
          ></v-text-field>
<!--            loading="true"-->
          <v-btn
            style="text-transform: none"
            :disabled="true"
            color="blue-grey"
            class="ma-2 white--text"
            @click="loader = 'loading3'"
          >
            Zeskrapuj dane
            <v-icon
              right
              dark
            >
              mdi-robot-industrial
            </v-icon>
          </v-btn>
        </div>
        <div class="row-dialog">
          <v-text-field
            label="Zdjęcie nr 1"
            required
          ></v-text-field>
          <v-text-field
            label="Zdjęcie nr 2"
            required
          ></v-text-field>
          <v-text-field
            label="Zdjęcie nr 3"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              label="Marka"
              required
            ></v-text-field>
            <v-text-field
              label="Model"
              required
            ></v-text-field>
            <v-text-field
              label="RAM"
              required
            ></v-text-field>
            <v-text-field
              label="CPU"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              label="GPU"
              required
            ></v-text-field>
            <v-text-field
              label="Dysk"
              required
            ></v-text-field>
            <v-text-field
              label="Matryca"
              required
            ></v-text-field>
            <v-text-field
              label="Cena"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="row-dialog choose-type">
          <v-btn-toggle v-model="alignment">
            <v-btn style="text-transform: lowercase">
              biurowy
            </v-btn>

            <v-btn style="text-transform: lowercase">
              gamingowy
            </v-btn>
          </v-btn-toggle>
        </div>
<!--        <div class="col-1">-->
<!--          <v-text-field-->
<!--            label="Zeskrapuj laptop z linku"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Model"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Marka"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="E-mail"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--        </div>-->
<!--        <div class="col-2">-->
<!--          <v-text-field-->
<!--            label="Zeskrapuj laptop z linku"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Model"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Marka"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--        </div>-->
      </div>
      <v-btn @click="closeNewProductDialog"></v-btn>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewProductDialog',
  props: {
    newProductDialogVisibility: Boolean,
    choosenProductCategory: String
  },
  methods: {
    closeNewProductDialog () {
      this.$emit('closeNewProductDialog', false)
    }
  },
  computed: {
    informationDialogWidth () {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 70 + '%'
      } else {
        return 95 + '%'
      }
    }
  }
}
</script>

<style lang="scss">
  .row-dialog {
    padding: 1rem;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    justify-content: center;
    &.choose-type {
      align-items: center;
    }
  }
  .dialog-col {
    padding: 3rem;
  }
  .second-row {
    background-color: #F5F5F5;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  h3 {
    color: #fff;
  }
  #new-product-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: black;
  }
  #new-product-dialog {
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .col-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
  }
  .col-2 {
    width: 100%;
  }
</style>
