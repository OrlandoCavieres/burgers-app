<template>
  <transition name="modal">
    <div class="modal-show-masking">
      <div class="modal-show-wrap">
        <button class="modal-show-button-close" v-on:click="funcionCerrar">X</button>
        <div class="modal-show-container">
          <img id="image_infoModal"
               src="https://pruebeydisfrute.com/wp-content/uploads/2021/01/2-proud-burger.png"
               alt="ImageBurger">
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
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: table;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
}

.modal-show-wrap {
  background-color: transparent;
  vertical-align: middle;
  display: table-cell;
}

.modal-show-container {
  align-items: center;
  border-radius: $rad-light;
  width: calc(250px + 15vw);
  height: 200px;
  background-color: $primary-color;
  display: flex;
  margin: 0 auto;
  padding: 10px 20px;
}

.modal-show-elements {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
  background-color: transparent;
}

.modal-text-title {
  color: white;
  background-color: transparent;
}

.modal-text-subtitle {
  align-self: flex-start;
  color: white;
  margin-top: 25px;
  padding-left: 15px;
  background-color: transparent;
}

.modal-text-info {
  align-self: flex-start;
  color: white;
  margin-top: 10px;
  font-style: italic;
  padding-left: 30px;
  background-color: transparent;
}

.modal-show-button-close {
  position: relative;
  top: 30px;
  right: calc(-140px - 7.5vw);
  border: 0;
  height: 35px;
  width: 35px;
  color: white;
  font-size: 16px;
  border-radius: $rad-smooth;
  background-color: $warning-color;
}

#image_infoModal {
  height: calc(100px + 4vw);
  width: calc(100px + 4vw)
}

</style>