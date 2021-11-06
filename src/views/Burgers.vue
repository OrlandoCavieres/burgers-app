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
  </div>
</template>

<script>
import BurgerCard from '../components/BurgerCard.vue'

export default {
  name: 'Burgers',
  components: {
    BurgerCard
  },
  data() {
    return {
      burgers: [],
      showDeleteModal: false
    }
  },
  methods: {
    getBurgers() {
      this.$http.get('https://prueba-hamburguesas.herokuapp.com/burger/')
          .then((response) => { this.burgers = response.data; }, err => console.log(err));
    },

    deleteBurger(burger) {
      this.burgers.splice(this.burgers.indexOf(burger), 1)
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
