<template>
  <div class="mainContainer">
    <h1 id="title_lista">LISTA DE HAMBURGUESAS DISPONIBLES</h1>
    <button class="botonAgregar_container" v-on:click="() => openCreateModal()">Crear nueva hamburguesa</button>
    <div class="container">
      <template v-for="burger in burgers" :key="burger">
        <BurgerCard :nombre="burger.nombre"
                    :funcionMostrarConfirm="() => showInfo(burger)"
                    :funcionEliminar="() => deleteBurger(burger)" />
        <ShowInfoModal v-if="showInfoModal" :funcionCerrar="closeInfoModal" :datos="actualBurger"/>
      </template>
    </div>
    <DeleteModal v-if="showDeleteModal"
                 :funcionConfirmar="confirmDelete"
                 :funcionCancelar="cancelDelete" />
    <NewBurgerModal v-if="showCreateModal"
                    :funcionCerrar="closeCreateModal"
                    :funcionAgregarBurger="(newBurger) => processNewBurgerData(newBurger)" />
  </div>
</template>

<script>
import BurgerCard from '../components/BurgerCard.vue'
import DeleteModal from '../components/DeleteModal.vue'
import ShowInfoModal from '../components/ShowInfoModal.vue'
import NewBurgerModal from '../components/NewBurgerModal.vue'

export default {
  name: 'Burgers',
  components: {
    BurgerCard,
    DeleteModal,
    NewBurgerModal,
    ShowInfoModal,
  },

  data() {
    return {
      burgers: [],

      actualBurger: {},
      lastIndexToDelete: 0,

      showCreateModal: false,
      showDeleteModal: false,
      showInfoModal: false
    }
  },

  methods: {
    getBurgers() {
      this.$http.get('https://prueba-hamburguesas.herokuapp.com/burger/')
          .then((response) => { this.burgers = response.data; }, err => console.log(err));
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    processNewBurgerData(newBurger) {
      console.log(newBurger)
    },

    closeCreateModal() {
      this.showCreateModal = false;
    },

    showInfo(burger) {
      this.showInfoModal = true
      this.actualBurger = burger
    },

    closeInfoModal() {
      this.showInfoModal = false
    },

    deleteBurger(burger) {
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
  }
}
</script>

<style scoped lang="scss">
@import '../globalStyles';

.mainContainer {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.container {
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 5px;
}

.botonAgregar_container {
  align-self: flex-end;
  margin-right: 20%;
  background-color: $alternative-color;
  border: 0;
  border-radius: $rad-light;
  color: white;
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  margin-top: 40px;
  width: calc(200px + 8vw);
}

#title_lista {
  margin-top: 20px;
  font-size: calc(16px + 1.5vw);
  width: 80%;
}

</style>
