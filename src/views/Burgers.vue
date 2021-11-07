<template>
  <div class="mainContainer">
    <h1 id="title_lista">LISTA DE HAMBURGUESAS DISPONIBLES</h1>
    <!-- Boton para abrir el modal que permite llenar datos para crear una nueva hamburguesa -->
    <button class="botonAgregar_container" v-on:click="() => openCreateModal()">Crear nueva hamburguesa</button>
    <div class="container">
      <!-- Se genera la lista de hamburguesas empleando el componente BurgerCard y linkeando cada elemento a un
           modal de vista de informacion y funciones de control -->
      <template v-for="burger in burgers" :key="burger">
        <BurgerCard :nombre="burger.nombre"
                    :funcionMostrarConfirm="() => showInfo(burger)"
                    :funcionEliminar="() => deleteBurger(burger)" />
        <ShowInfoModal v-if="showInfoModal" :funcionCerrar="closeInfoModal" :datos="actualBurger"/>
      </template>
    </div>
    <!-- Control del modal para eliminar una hamburguesa -->
    <DeleteModal v-if="showDeleteModal"
                 :funcionConfirmar="confirmDelete"
                 :funcionCancelar="cancelDelete" />
    <!-- Control del modal para crear una hamburguesa -->
    <NewBurgerModal v-if="showCreateModal"
                    :funcionCerrar="closeCreateModal"
                    :funcionAgregarBurger="(newBurger) => postNewBurgerData(newBurger)" />
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
      // lista de hamburguesas recueperada desde el servidor
      burgers: [],

      // Estados consultados últimos antes de entrar a un modal que los necesite
      actualBurger: {},
      lastIndexToDelete: 0,

      // Controles de visibilidad de modales
      showCreateModal: false,
      showDeleteModal: false,
      showInfoModal: false
    }
  },

  methods: {
    /**
     * Obtiene la lista de hamburguesas desde el servidor
     */
    getBurgers() {
      this.$http.get('https://prueba-hamburguesas.herokuapp.com/burger/')
          .then((response) => { this.burgers = response.data; }, err => console.log(err));
    },

    /**
     * Abre el modal para crear una hamburguesa
     */
    openCreateModal() {
      this.showCreateModal = true;
    },

    /**
     * Realiza envio al servidor de la nueva hamburguesa creada empleando metodo POST a la API
     * @param newBurger Objeto que representa a la nueva hamburguesa a ser enviado
     */
    postNewBurgerData(newBurger) {
      this.$http.post('https://prueba-hamburguesas.herokuapp.com/burger/', newBurger, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => this.burgers.push(response.data), err => console.log(err))
      this.closeCreateModal()
    },

    /**
     * Cierra el modal para crear una hamburguesa
     */
    closeCreateModal() {
      this.showCreateModal = false;
    },

    /**
     * Abre el modal para ver la informacion de una hamburguesa
     * @param burger Ultima hamburguesa consultada de la lista
     */
    showInfo(burger) {
      this.showInfoModal = true
      this.actualBurger = burger
    },

    /**
     * Cierra el modal para ver informacion de una hamburguesa
     */
    closeInfoModal() {
      this.showInfoModal = false
    },

    /**
     * Inicia el proceso de eliminar una hamburguesa guardando el indice de la hamburguesa que se desea eliminar
     * y mostrando el modal para confirmar eliminacion
     * @param burger
     */
    deleteBurger(burger) {
      this.showDeleteModal = true
      this.lastIndexToDelete = this.burgers.indexOf(burger)
    },

    /**
     * Realizar la eliminacion como tal de la hamburguesa en el servidor, mediante metodo DELETE de la API,
     * entregando el id de la hamburguesa a ser eliminada
     */
    confirmDelete() {
      this.$http.delete('https://prueba-hamburguesas.herokuapp.com/burger/' + 
                        this.burgers[this.lastIndexToDelete].id)
          .then(() => {
            this.burgers.splice(this.lastIndexToDelete, 1)
            this.showDeleteModal = false
          }, err => console.log(err))
    },

    /**
     * Cierra el modal de confirmacion de eliminacion
     */
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
  @extend %flex-center;
  flex-direction: column;
  width: 80%;
  margin-top: 5px;
  margin-bottom: 20px;
}

.botonAgregar_container {
  @extend %button-light-borderless;
  align-self: flex-end;
  margin-right: 20%;
  background-color: $alternative-color;
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
