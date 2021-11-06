<template>
  <div class="card">
    <div id="image_slot">
      <img id="image_element"
           src="https://pruebeydisfrute.com/wp-content/uploads/2021/01/2-proud-burger.png"
           alt="burgerImage"/>
    </div>
    <div id="nombre_slot">
      <p id="nombre_texto">{{ nombre }}</p>
    </div>
    <div id="boton_slot">
      <button id="boton_contain" v-on:click="funcionEliminar">ELIMINAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BurgerCard',
  props: {
    nombre: {
      type: String,
      default: 'Una Rica Hamburguesa'
    },
    funcionEliminar: {
      type: Function
    }
  }
}
</script>

<style scoped lang="scss">
@import '../globalStyles';

$image-ratio-calc: calc(30px + 2vw);
$margin-xtreme-calc: calc(5px + 0.5vw);

.card {
  align-items: center;
  background-color: $primary-color;
  border-radius: $rad-light;
  box-shadow: 1px 2px 2px black;
  display: flex;
  flex-direction: row;
  height: calc(60px + 2vw);
  justify-content: center;
  margin-top: 15px;
  width: 80%;
}

#image_slot {
  background-color: transparent;
  margin-left: $margin-xtreme-calc;
}

#image_element {
  border-radius: $rad-light;
  height: $image-ratio-calc;
  width: $image-ratio-calc;
}

#nombre_slot {
  flex: 3
}

#nombre_texto {
  background-color: $primary-color;
  text-align: left;
  font-size: calc(5px + 2vw);
  padding-left: calc(10px + 1.5vw);
  color: white;
}

#boton_slot {
  background-color: transparent;
}

#boton_contain {
  background-color: $warning-color;
  color: white;
  font-size: calc(8px + 1vw);
  border: 0;
  border-radius: $rad-light;
  margin-right: $margin-xtreme-calc;
  height: calc(30px + 1.8vw);
  width: calc(60px + 10vw);
}

</style>