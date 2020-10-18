<template>
  <v-dialog
    v-model="informationDialogVisibility"
    persistent
    width="350"
  >
    <div class="information-dialog success" v-if="informationDialogType === 'scraping'">
      <h4 style="margin-bottom: 1rem">Skrapowanie</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'loading'">
      <h4>Laptop został dodany do bazy danych</h4>
    </div>
    <div class="information-dialog success" v-else-if="informationDialogType === 'scraping finished'">
      <h4>Skrapowanie zakończone</h4>
    </div>
    <div class="information-dialog failure" v-else-if="informationDialogType === 'target is not defined'">
      <h4>Link do produktu nie został dodany</h4>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'InformationDialog',
  props: {
    informationDialogVisibility: Boolean,
    informationDialogType: String
  }
}
</script>

<style lang="scss">
.information-dialog {
  color: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.success {
    background-color: #df3968;
  }
  &.failure {
    background-color: #000;
  }
}
</style>
