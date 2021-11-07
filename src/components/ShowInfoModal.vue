<template>
  <transition name="modal">
    <!-- Masking del fondo para oscurecer mientras que se da foco al contenedor principal -->
    <div class="modal-show-masking">
      <div class="modal-show-wrap">
        <!-- Boton fuera del contenedor principal, ya que tiene posicion fuera de foco en absoluta -->
        <button class="modal-show-button-close" v-on:click="funcionCerrar">X</button>
        <!-- Contenedor principal del modal -->
        <div class="modal-show-container">
          <!-- Imagen a la izquierda -->
          <img id="image_infoModal"
               src="https://pruebeydisfrute.com/wp-content/uploads/2021/01/2-proud-burger.png"
               alt="ImageBurger">
          <!-- Datos a la derecha -->
          <div class="modal-show-elements">
            <h2 class="modal-text-title">{{ datos['nombre'] }}</h2>
            <h4 class="modal-text-subtitle">Ingredientes</h4>
            <p class="modal-text-info">{{ datos['ingredientes'].join('  -  ') }}</p>
            <h4 class="modal-text-subtitle">Calorías</h4>
            <p class="modal-text-info">{{ datos['calorias'] }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: 'ShowInfoModal',
  props: {
    // Se requieren los datos del objeto del cual se desea mostrar informacion, ademas de una funcion para
    // cerrar el modal
    datos: {
      type: Object,
      required: true
    },
    funcionCerrar: {
      type: Function
    }
  }
}
</script>

<style scoped lang="scss">
@import '../globalStyles';

* {
  background-color: white;
}

.modal-show-masking {
  @extend %modal-masking;
  background-color: rgba(0, 0, 0, 0.2);
}

.modal-show-wrap {
  background-color: transparent;
  display: table-cell;
  vertical-align: middle;
}

.modal-show-container {
  @extend %flex-align-center;
  background-color: $primary-color;
  border-radius: $rad-light;
  height: 200px;
  margin: 0 auto;
  padding: 10px 20px;
  width: calc(250px + 15vw);
}

.modal-show-elements {
  @extend %flex-align-center-column;
  background-color: transparent;
  flex: 1;
  height: 100%;
}

.modal-text-title {
  background-color: transparent;
  color: white;
}

.modal-text-subtitle {
  background-color: transparent;
  align-self: flex-start;
  color: white;
  margin-top: 25px;
  padding-left: 15px;
}

.modal-text-info {
  align-self: flex-start;
  background-color: transparent;
  color: white;
  font-style: italic;
  margin-top: 10px;
  padding-left: 30px;
}

.modal-show-button-close {
  @extend %button-smooth-borderless;
  position: relative;
  top: 30px;
  right: calc(-140px - 7.5vw);
  height: 35px;
  width: 35px;
  font-size: 16px;
  background-color: $warning-color;
}

#image_infoModal {
  height: calc(100px + 4vw);
  width: calc(100px + 4vw)
}

</style>