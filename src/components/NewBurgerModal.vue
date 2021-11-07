<template>
  <transition name="modal">
    <div class="modal-create-masking">
      <div class="modal-create-wrap">
        <button class="modal-create-button-close" v-on:click="funcionCerrar">X</button>
        <div class="modal-create-container">
          <div class="modal-create-elements">
            <h2 class="modal-create-text-title">CREAR NUEVA HAMBURGUESA</h2>
            <div class="modal-create-category-form">
              <div class="modal-create-label-form">
                <h4 class="modal-create-label-element">Nombre</h4>
                <h4 class="modal-create-label-element">N° Calorias</h4>
              </div>
              <div class="modal-create-input-form">
                <input id="nombre_burger" type="text" v-model="newBurger.nombre">
                <input type="number" id="calorias_burger" v-model="newBurger.calorias">
              </div>
            </div>
            <div class="modal-create-ingredients">
              <input type="text" id="ingrediente_burger" v-model="ingredient">
              <button class="modal-create-button-add-ingredient" v-on:click="addNewIngredient">Agregar</button>
              <button class="modal-create-button-reset" v-on:click="removeIngredients">Reset</button>
            </div>
            <p class="modal-create-ingredients-added">{{ newBurger.ingredientes.join(' - ') }}</p>
            <button class="modal-create-button-confirm"
                    v-on:click="getSubmitDataAndConfirm">Agregar Hamburguesa</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NewBurgerModal',
  data() {
    return {
      newBurger: {
        nombre: '',
        calorias: 0,
        ingredientes: []
      },
      ingredient: ''
    }
  },
  methods: {
    getSubmitDataAndConfirm() {
      if (this.newBurger.nombre === '') {
        alert('nombre no puede estar vacio')
      }
      else {
        this.funcionAgregarBurger(this.newBurger)
      }
    },

    addNewIngredient() {
      this.newBurger.ingredientes.push(this.ingredient)
      this.ingredient = ''
    },

    removeIngredients() {
      this.ingredient = ''
      this.newBurger.ingredientes = []
    }
  },
  props: {
    funcionCerrar: {
      type: Function,
    },
    funcionAgregarBurger: {
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

.modal-create-masking {
  @extend %modal-masking;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-create-wrap {
  background-color: transparent;
  vertical-align: middle;
  display: table-cell;
}

.modal-create-container {
  @extend %flex-align-center;
  background-color: $primary-color;
  border-radius: $rad-light;
  height: 250px;
  margin: 0 auto;
  padding: 10px 20px;
  width: calc(170px + 15vw);
}

.modal-create-elements {
  @extend %flex-align-center-column;
  background-color: transparent;
  flex: 1;
  height: 100%;
}

.modal-create-text-title {
  color: white;
  background-color: transparent;
  font-size: calc(9px + 1vw);
}

.modal-create-category-form {
  @extend %flex-align-center;
  background-color: transparent;
  color: white;
}

.modal-create-label-form {
  background-color: transparent;
  flex: 1;
}

.modal-create-label-element {
  background-color: transparent;
  font-size: calc(9px + 0.5vw);
  margin-top: 25px;
}

.modal-create-input-form {
  background-color: transparent;
  flex: 2;
}

#nombre_burger, #calorias_burger {
  margin-top: 25px;
  width: 90%;
}

.modal-create-ingredients {
  background-color: transparent;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  width: 80%;
}

#ingrediente_burger {
  flex: 1;
}

.modal-create-ingredients-added {
  background-color: transparent;
  color: white;
  font-style: italic;
  margin-top: 10px;
  width: 80%;
}

.modal-create-button-add-ingredient {
  @extend %button-light-borderless;
  background-color: $dark-select-color;
  font-size: calc(8px + 0.5vw);
  height: 25px;
}

.modal-create-button-reset {
  @extend %button-light-borderless;
  background-color: $warning-color;
  font-size: calc(8px + 0.5vw);
  height: 25px;
}

.modal-create-button-confirm {
  @extend %button-smooth-borderless;
  background-color: $light-select-color;
  font-size: calc(8px + 0.5vw);
  font-weight: bold;
  height: 40px;
  margin-top: 15px;
}

.modal-create-button-close {
  @extend %button-smooth-borderless;
  background-color: $warning-color;
  font-size: 16px;
  height: 35px;
  position: relative;
  right: calc(-105px - 7.5vw);
  top: 30px;
  width: 35px;
}

</style>