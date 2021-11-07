<template>
  <div class="card">
    <div class="cardInner" v-on:click="funcionMostrarConfirm">
      <div id="image_slot">
        <img id="image_element"
             src="https://pruebeydisfrute.com/wp-content/uploads/2021/01/2-proud-burger.png"
             alt="burgerImage"/>
      </div>
      <div id="nombre_slot">
        <p id="nombre_texto">{{ nombre }}</p>
      </div>
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
    },
    funcionMostrarConfirm: {
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
  @extend %flex-center;
  background-color: $primary-color;
  border-radius: $rad-light;
  box-shadow: 1px 2px 2px black;
  height: calc(60px + 2vw);
  margin-top: 15px;
  width: 80%;
}

.card:hover {
  background-color: $primary-color-bright
}

.cardInner {
  @extend %flex-center, %expand-to-all;
  background-color: transparent;
  border-radius: $rad-light;
}

.carInner:hover {
  background-color: $primary-color-bright;
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
  background-color: transparent;
  flex: 1
}

#nombre_texto {
  background-color: transparent;
  color: white;
  font-size: calc(5px + 2vw);
  padding-left: calc(10px + 1.5vw);
  text-align: left;
}

#boton_slot {
  background-color: transparent;
}

#boton_contain {
  @extend %button-light-borderless;
  background-color: $warning-color;
  font-size: calc(8px + 1vw);
  height: calc(30px + 1.8vw);
  margin-right: $margin-xtreme-calc;
  width: calc(60px + 10vw)
}

</style>