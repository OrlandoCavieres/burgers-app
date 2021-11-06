<template>
  <div class="mainContainer">
    <div class="container">
      <template v-for="burger in burgers" :key="burger">
        <BurgerCard :nombre="burger.nombre" :funcionEliminar="() => deleteBurger(burger)" />
      </template>
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
      burgers: [
        {
          nombre: 'McBurguer'
        },
        {
          nombre: 'Electrico'
        }
      ]
    }
  },
  methods: {
    deleteBurger(burger) {
      this.burgers.splice(this.burgers.indexOf(burger), 1)
    }
  }
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
</style>
