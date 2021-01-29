<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newSmartphoneDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-header">
      <h3>Panel produktu smartfon</h3>
    </div>
    <div id="new-product-dialog">
      <div class="container">
        <div class="row-dialog">
          <v-text-field
            v-model="newSmartphone.details.shopLink"
            label="Zeskrapuj dane smartfona z linku"
          ></v-text-field>
          <v-btn
            :disabled="scrapingStatement"
            style="text-transform: none"
            color="blue-grey"
            class="ma-2 white--text"
            @click="scrapeSmartphone"
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
            v-model="newSmartphone.images.imageOne"
            label="Zdjęcie nr 1"
            :rules="rules.smartphoneDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newSmartphone.images.imageTwo"
            label="Zdjęcie nr 2"
            :rules="rules.smartphoneDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newSmartphone.images.imageThree"
            label="Zdjęcie nr 3"
            :rules="rules.smartphoneDetails"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              v-model="newSmartphone.details.brand"
              label="Marka"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.details.model"
              label="Model"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.details.screen"
              label="Ekran"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.details.battery"
              label="Bateria"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              v-model="newSmartphone.details.ram"
              label="RAM"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.details.memory"
              label="Pamięć"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.details.price"
              label="Cena"
              :rules="rules.smartphoneDetails"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="row-dialog">
          <v-textarea
            v-model="newSmartphone.details.description"
            name="input-7-4"
            label="Opis produktu"
            :rules="rules.smartphoneDetails"
            required
          ></v-textarea>
        </div>
        <div class="button-row">
          <div class="col-test">
            <div class="dialog-button short">
              <v-btn
                style="text-transform: none"
                color="blue-grey"
                class="ma-2 white--text"
                @click="returnToAdminPanel"
              >
                Wróć
                <v-icon
                  right
                  dark
                >
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="col-test">
            <div class="dialog-button">
              <v-btn
                v-if="!updateStatement"
                :disabled="uploadStatement"
                style="text-transform: none; color: white"
                color="#df3968"
                class="my-2"
                @click="saveSmartphone"
              >
                Dodaj produkt do bazy danych
                <v-icon
                  right
                  dark
                >
                  mdi-upload
                </v-icon>
              </v-btn>
              <v-btn
                v-if="updateStatement"
                :disabled="uploadStatement"
                style="text-transform: none; color: white"
                color="#df3968"
                class="my-2"
                @click="updateSmartphone"
              >
                Zaktualizuj produkt
                <v-icon
                  right
                  dark
                >
                  mdi-upload
                </v-icon>
              </v-btn>
            </div>
            <div class="dialog-button">
              <v-btn
                style="text-transform: none"
                color="blue-grey"
                class="ma-2 white--text"
                @click="clearCells"
              >
                Wyczyść pola
                <v-icon
                  right
                  dark
                >
                  mdi-eraser
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <InformationDialog
        :informationDialogVisibility.sync="informationDialogVisibility"
        :informationDialogType.sync="informationDialogType"
        v-on:closeInformationDialog="closeInformationDialog"
      />
    </div>
  </v-dialog>
</template>

<script>
import ProductsService from '@/services/productsService'
import Smartphone from '@/models/Smartphone'
import InformationDialog from '@/components/InformationDialog'

export default {
  name: 'newSmartphoneDialog',
  components: { InformationDialog },
  data () {
    return {
      rules: {
        smartphoneDetails: [val => (val || '').length > 0 || 'To pole jest wymagane']
      },
      informationDialogVisibility: false,
      informationDialogType: null,
      scrapeLoadingStatement: false,
      newObjectStatement: false,
      newSmartphone: Smartphone,
      scrapingTarget: null,
      productsService: new ProductsService()
    }
  },
  props: {
    productsCategory: String,
    currentProductsNumber: Number,
    updateStatement: Boolean,
    productToUpdate: Object
  },
  methods: {
    closeInformationDialog (value) {
      this.informationDialogVisibility = value
      this.informationDialogType = null
    },
    refreshProductsList () {
      this.$emit('refreshProductsList', 'smartphones')
    },
    returnToAdminPanel () {
      this.$emit('closeProductDialog', null)
      if (this.updateStatement === true) {
        this.$emit('resetUpdateStatus', false)
      }
      this.clearCells()
    },
    async saveSmartphone () {
      this.informationDialogType = 'uploading'
      this.informationDialogVisibility = true
      await this.productsService.createSmartphone(this.newSmartphone)
        .then(response => {
          if (response === 'error') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'uploading failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'uploading succesful'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
            setTimeout(function () {
              this.informationDialogType = null
              this.informationDialogVisibility = false
              this.returnToAdminPanel()
              this.refreshProductsList()
            }
              .bind(this),
            1500)
          }
        })
    },
    async updateSmartphone () {
      this.informationDialogType = 'updating'
      this.informationDialogVisibility = true
      await this.productsService.updateProduct('smartphones', this.productToUpdate._id, this.newSmartphone)
        .then(response => {
          if (response === 'error') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'updating failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'updating succesful'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
            setTimeout(function () {
              this.informationDialogType = null
              this.informationDialogVisibility = false
              this.returnToAdminPanel()
              this.refreshProductsList()
            }
              .bind(this),
            1500)
          }
        })
    },
    clearCells () {
      this.newSmartphone.images.imageOne = ''
      this.newSmartphone.images.imageTwo = ''
      this.newSmartphone.images.imageThree = ''
      this.newSmartphone.details.brand = ''
      this.newSmartphone.details.model = ''
      this.newSmartphone.details.shopLink = ''
      this.newSmartphone.details.screen = ''
      this.newSmartphone.details.battery = ''
      this.newSmartphone.details.ram = ''
      this.newSmartphone.details.memory = ''
      this.newSmartphone.details.description = ''
      this.newSmartphone.details.price = ''
    },
    async scrapeSmartphone () {
      if (this.newSmartphone.details.shopLink !== '') {
        this.informationDialogType = 'scraping'
        this.informationDialogVisibility = true
        const productAddress = this.newSmartphone.details.shopLink.replace('https://www.x-kom.pl/p/', '')
        await this.productsService.scrapeSmartphone(productAddress).then(product => {
          if (product === 'error') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'scraping failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
            if (product.details.brand === '' && product.details.model === '' && product.details.screen === '' && product.details.battery === '' && product.details.ram === '' && product.details.memory === '' && product.details.description === '' && product.details.price === '') {
              this.informationDialogType = null
              this.informationDialogVisibility = false
              setTimeout(function () {
                this.informationDialogType = 'scraping failed'
                this.informationDialogVisibility = true
              }
                .bind(this),
              500)
            } else {
              this.newSmartphone.images.imageOne = product.images.imageOne
              this.newSmartphone.images.imageTwo = product.images.imageTwo
              this.newSmartphone.images.imageThree = product.images.imageThree
              this.newSmartphone.details.brand = product.details.brand
              this.newSmartphone.details.model = product.details.model
              this.newSmartphone.details.screen = product.details.screen
              this.newSmartphone.details.battery = product.details.battery
              this.newSmartphone.details.ram = product.details.ram
              this.newSmartphone.details.memory = product.details.memory
              this.newSmartphone.details.description = product.details.description
              this.newSmartphone.details.price = product.details.price
              this.informationDialogType = null
              this.informationDialogVisibility = false
              setTimeout(function () {
                this.informationDialogType = 'scraping succesful'
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
          }
        })
      }
    }
  },
  computed: {
    scrapingStatement () {
      return this.newSmartphone.details.shopLink === ''
    },
    uploadStatement () {
      return this.newSmartphone.details.brand === '' || this.newSmartphone.details.model === '' || this.newSmartphone.details.screen === '' || this.newSmartphone.details.battery === '' || this.newSmartphone.details.ram === '' || this.newSmartphone.details.memory === '' || this.newSmartphone.details.description === '' || this.newSmartphone.details.price === ''
    },
    informationDialogWidth () {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 70 + '%'
      } else {
        return 95 + '%'
      }
    },
    newSmartphoneDialogVisibility () {
      return this.productsCategory === 'smartphones'
    }
  },
  watch: {
    'updateStatement' (value) {
      if (value === true) {
        console.log(this.productToUpdate)
        this.newSmartphone.images.imageOne = this.productToUpdate.images.imageOne
        this.newSmartphone.images.imageTwo = this.productToUpdate.images.imageTwo
        this.newSmartphone.images.imageThree = this.productToUpdate.images.imageThree
        this.newSmartphone.details.brand = this.productToUpdate.details.brand
        this.newSmartphone.details.model = this.productToUpdate.details.model
        this.newSmartphone.details.screen = this.productToUpdate.details.screen
        this.newSmartphone.details.battery = this.productToUpdate.details.battery
        this.newSmartphone.details.ram = this.productToUpdate.details.ram
        this.newSmartphone.details.memory = this.productToUpdate.details.memory
        this.newSmartphone.details.description = this.productToUpdate.details.description
        this.newSmartphone.details.price = this.productToUpdate.details.price
      }
    }
  }
}
</script>

<style lang="scss">
  .col-test {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .button-row {
    justify-content: right;
    padding: 1rem;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
  .v-dialog {
    overflow-y: hidden;
  }
  .choose-type-container {
    width: 20%;
  }
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
    height: 470px;
    overflow-y: auto;
    background-color: #fff;
  }
  .dialog-button {
    margin: 0.4rem;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 300px;
    &.short {
      margin: 0.5rem;
      width: 150px;
      display: flex;
      justify-content: right;
    }
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
