<template>
  <v-dialog
    v-model="informationDialogVisibility"
    persistent
    width="350"
  >
    <div class="information-dialog scrapping" v-if="informationDialogType === 'scraping'">
      <h4 style="margin-bottom: 1rem">Skrapowanie produktu</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog scrapping" v-if="informationDialogType === 'uploading'">
      <h4 style="margin-bottom: 1rem">Dodawanie produktu do bazy danych</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog scrapping" v-if="informationDialogType === 'removing'">
      <h4 style="margin-bottom: 1rem">Usuwanie produktu z bazy danych</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog scrapping" v-if="informationDialogType === 'updating'">
      <h4 style="margin-bottom: 1rem">Aktualizowanie produktu</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'removing succesful'">
      <h4>Produkt został usunięty z bazy danych</h4>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'updating succesful'">
      <h4>Produkt został zaktualizowany</h4>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'uploading succesful'">
      <h4>Produkt został dodany do bazy danych</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'uploading failed'">
      <h4>Produkt nie został dodany do bazy danych. Sprawdź połączenie z internetem.</h4>
      <div class="dialog-button short" style="padding-top: 1rem">
        <v-btn
          style="text-transform: none"
          color="blue-grey"
          class="ma-2 white--text"
          @click="closeInformationDialog"
        >
          OK
        </v-btn>
      </div>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'updating failed'">
      <h4>Produkt nie zaktualizowany. Sprawdź połączenie z internetem.</h4>
      <div class="dialog-button short" style="padding-top: 1rem">
        <v-btn
          style="text-transform: none"
          color="blue-grey"
          class="ma-2 white--text"
          @click="closeInformationDialog"
        >
          OK
        </v-btn>
      </div>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'removing failed'">
      <h4>Produkt nie został usunięty z bazy danych. Sprawdź połączenie z internetem.</h4>
      <div class="dialog-button short" style="padding-top: 1rem">
        <v-btn
          style="text-transform: none"
          color="blue-grey"
          class="ma-2 white--text"
          @click="closeInformationDialog"
        >
          OK
        </v-btn>
      </div>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'removing confirmation'">
      <h4>Czy na pewno chcesz usunąć ten produkt?</h4>
      <div class="button-row">
        <div class="dialog-button short" style="padding-top: 1rem">
          <v-btn
            style="text-transform: none"
            color="blue-grey"
            class="ma-2 white--text"
            @click="closeInformationDialog"
          >
            Wróć
          </v-btn>
        </div>
        <div class="dialog-button short" style="padding-top: 1rem">
          <v-btn
            style="text-transform: none"
            color="blue-grey"
            class="ma-2 white--text"
            @click="removeProduct"
          >
            TAK
          </v-btn>
        </div>
      </div>
    </div>
    <div class="information-dialog scrapping" v-else-if="informationDialogType === 'scraping succesful'">
      <h4>Skrapowanie zakończone</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'target is not defined'">
      <h4>Link do produktu nie został dodany</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'connection error'">
      <h4>Brak połączenia z internetem</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'scraping failed'">
      <h4>Produkt nie może zostać zeskrapowany. Sprawdź czy link jest poprawny lub czy połączenie z internetem jest dobrej jakości.</h4>
      <div class="dialog-button short" style="padding-top: 1rem">
        <v-btn
          style="text-transform: none"
          color="blue-grey"
          class="ma-2 white--text"
          @click="closeInformationDialog"
        >
          OK
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'InformationDialog',
  props: {
    informationDialogVisibility: Boolean,
    informationDialogType: String,
    category: String,
    productId: String
  },
  methods: {
    removeProduct () {
      this.$emit('removeProduct')
    },
    closeInformationDialog () {
      this.$emit('closeInformationDialog', false)
    }
  }
}
</script>

<style lang="scss">
.button-row {
  justify-content: right;
  padding: 1rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
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
.information-dialog {
  text-align: center;
  color: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.success {
    background-color: #D32F2F;
    h4 {
      color: #fff;
    }
  }
  &.failure {
    background-color: #000;
    h4 {
      color: #fff
    }
  }
  &.scrapping {
    background-color: #D32F2F;
    h4 {
      color: #fff;
    }
  }
}
</style>
