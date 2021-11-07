<template>
  <div class="mainContainer">
    <h1 id="title_lista">LISTA DE HAMBURGUESAS DISPONIBLES</h1>
    <!-- Boton para abrir el modal que permite llenar datos para crear una nueva hamburguesa -->
    <button class="botonAgregar_container" v-on:click="() => openCreateModal()">Crear nueva hamburguesa</button>
    <div class="separador_interior" />
    <div class="searchContainer">
      <input class="searchInputBox" type="text" v-model="searchText">
      <button class="searchButton" id="RealizarBusqueda" v-on:click="filterList">Buscar</button>
      <button class="searchButton" id="ResetearBusqueda" v-on:click="resetSearch">Reset</button>
    </div>
    <div class="container">
      <!-- Se genera la lista de hamburguesas empleando el componente BurgerCard y linkeando cada elemento a un
           modal de vista de informacion y funciones de control -->
      <template v-for="burger in burgers_filtered" :key="burger">
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
import axios from 'axios'

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
      burgers_filtered: [],

      // Estados consultados últimos antes de entrar a un modal que los necesite
      actualBurger: {},
      lastIndexToDelete: 0,
      searchText: '',

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
    async getBurgers() {
      await axios.get('https://prueba-hamburguesas.herokuapp.com/burger/')
                 .then((response) => {
                   this.burgers = response.data;
                   this.burgers_filtered = response.data}, err => console.log(err));
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
      axios.post('https://prueba-hamburguesas.herokuapp.com/burger/', newBurger, {
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
      axios.delete('https://prueba-hamburguesas.herokuapp.com/burger/' +
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
    },

    /**
     * Filtra la lista entrante de hamburguesas por los elementos que cumplan con coincidir en parte
     * con lo ingresado en el cuadro de busqueda cuando se hace click en el boton buscar
     */
    filterList() {
      if (this.searchText === '') {
        this.burgers_filtered = this.burgers
      }
      else {
        console.log(this.searchText)
        this.burgers_filtered = this.burgers.filter(burger => burger.nombre.includes(this.searchText) )
      }
    },

    /**
     * Resetea el cuadro de busqueda para recuperar la lista entera de hamburguesas
     */
    resetSearch() {
      this.searchText = ''
      this.filterList()
    }
  },

  created() {
    this.getBurgers();
  }
}
</script>

<style scoped lang="scss">
@import '../globalStyles';

%upper-button {
  background-color: $alternative-color;
  font-size: calc(9px + 0.5vw);
  font-weight: bold;
  height: 50px;
}

.mainContainer {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.separador_interior {
  background-color: $primary-color;
  border-radius: $rad-smooth;
  height: 5px;
  margin-top: 20px;
  width: 70%;
}

.searchContainer {
  @extend %flex-align-center;
  align-self: flex-start;
  margin-left: 20%;
  margin-top: 20px;
}

.searchInputBox {
  background-color: white;
  border: 2px solid $primary-color;
  border-radius: $rad-light;
  font-size: calc(12px + 0.5vw);
  height: 40px;
  padding-left: 15px;
  width: calc(50px + 20vw);
}

.searchButton {
  @extend %button-light-borderless, %upper-button;
  margin-left: 5px;
  width: calc(30px + 4vw);
}

.container {
  @extend %flex-center;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 5px;
  width: 80%;
}

.botonAgregar_container {
  @extend %button-light-borderless, %upper-button;
  align-self: flex-end;
  margin-right: 20%;
  margin-top: 40px;
  width: calc(10px + 20vw);
}

#title_lista {
  font-size: calc(16px + 1.5vw);
  margin-top: 20px;
  width: 80%;
}

</style>
