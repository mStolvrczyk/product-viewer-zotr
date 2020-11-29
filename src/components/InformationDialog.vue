<template>
  <v-dialog
    v-model="informationDialogVisibility"
    persistent
    width="350"
  >
    <div class="information-dialog scrapping" v-if="informationDialogType === 'scraping'">
      <h4 style="margin-bottom: 1rem">Skrapowanie</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'uploading succesful'">
      <h4>Laptop został dodany do bazy danych</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'uploading failed'">
      <h4>Laptop nie został dodany do bazy danych. Sprawdź połączenie z internetem.</h4>
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
    <div class="information-dialog scrapping" v-else-if="informationDialogType === 'scraping finished'">
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
    informationDialogType: String
  },
  methods: {
    closeInformationDialog () {
      this.$emit('closeInformationDialog', false)
    }
  }
}
</script>

<style lang="scss">
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
    background-color: #df3968;
    h4 {
      color: #000;
    }
  }
  &.failure {
    background-color: #000;
    h4 {
      color: #fff
    }
  }
  &.scrapping {
    background-color: #df3968;
    h4 {
      color: #fff;
    }
  }
}
</style>
