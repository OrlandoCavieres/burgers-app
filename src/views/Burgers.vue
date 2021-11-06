<template>
  <div class="mainContainer">
    <h1 id="title_lista">LISTA DE HAMBURGUESAS DISPONIBLES</h1>
    <div class="container">
      <template v-for="burger in burgers" :key="burger">
        <BurgerCard :nombre="burger.nombre" :funcionEliminar="() => deleteBurger(burger)" />
      </template>
    </div>
    <div class="plusButton">

    </div>
    <DeleteModal v-if="showDeleteModal"
                 :funcionConfirmar="confirmDelete"
                 :funcionCancelar="cancelDelete" />
  </div>
</template>

<script>
import BurgerCard from '../components/BurgerCard.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default {
  name: 'Burgers',
  components: {
    BurgerCard,
    DeleteModal
  },
  data() {
    return {
      burgers: [],
      showDeleteModal: false,
      lastIndexToDelete: 0
    }
  },
  methods: {
    getBurgers() {
      this.$http.get('https://prueba-hamburguesas.herokuapp.com/burger/')
          .then((response) => { this.burgers = response.data; }, err => console.log(err));
    },

    deleteBurger(burger) {
      console.log(burger)
      this.showDeleteModal = true
      this.lastIndexToDelete = this.burgers.indexOf(burger)
    },

    confirmDelete() {
      this.$http.delete('https://prueba-hamburguesas.herokuapp.com/burger/' + 
                        this.burgers[this.lastIndexToDelete].id)
          .then(() => {
            this.burgers.splice(this.lastIndexToDelete, 1)
            this.showDeleteModal = false
          }, err => console.log(err))
    },

    cancelDelete() {
      this.showDeleteModal = false
    }
  },
  created() {
    this.getBurgers();
  },
}
</script>

<style scoped lang="scss">
@import '../globalStyles';

.mainContainer {
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: $hmin;
  min-width: $wmin;
}

.container {
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 5px;
}

#title_lista {

}

</style>
