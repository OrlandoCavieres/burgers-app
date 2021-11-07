<template>
  <transition name="modal">
    <!-- Masking del fondo para oscurecer mientras que se da foco al contenedor principal -->
    <div class="modal-create-masking">
      <div class="modal-create-wrap">
        <!-- Boton fuera del contenedor principal, ya que tiene posicion fuera de foco en absoluta -->
        <button class="modal-create-button-close" v-on:click="funcionCerrar">X</button>
        <!-- Contenedor principal del modal -->
        <div class="modal-create-container">
          <!-- Cuadro mas interno para generar margenes -->
          <div class="modal-create-elements">
            <h2 class="modal-create-text-title">CREAR NUEVA HAMBURGUESA</h2>
            <!-- Primeros dos campos comparten formato y sizes, por lo que se ordenan juntos -->
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
            <!-- Ultimo campo es distinto al resto ya que permite agregar a una lista creciente ingredientes
                 a medida que se van escribiendo y presionando el boton agregar-->
            <div class="modal-create-ingredients">
              <input type="text" id="ingrediente_burger" v-model="ingredient">
              <!-- Boton que agrega lo que se encuentre escrito en el input correspondiente a una lista de
                   ingredientes -->
              <button class="modal-create-button-add-ingredient" v-on:click="addNewIngredient">Agregar</button>
              <!-- Boton que resetea la lista y la variable que guarda el nuevo valor -->
              <button class="modal-create-button-reset" v-on:click="removeIngredients">Reset</button>
            </div>
            <!-- Texto que muestra los valores agregados como ingredientes -->
            <p class="modal-create-ingredients-added">{{ newBurger.ingredientes.join(' - ') }}</p>
            <!-- Boton que chequea y envia la informacion obtenida de los datos llenados a la vista que llama
                 al modal -->
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
      // Objeto que guarda los datos finales ingresados para una nueva hamburguesa
      newBurger: {
        nombre: '',
        calorias: 0,
        ingredientes: []
      },
      // Se guarda el valor actual del input de ingredientes para posteriormente agregarlo a la lista al
      // presionar el boton agregar
      ingredient: ''
    }
  },
  methods: {
    /**
     * Metodo que verifica que el nombre no se encuentre vacio, y si no lo esta envia los datos a la vista
     * que llamo al modal, para que ésta pueda finalmente enviar los datos al servidor.
     */
    getSubmitDataAndConfirm() {
      if (this.newBurger.nombre === '') {
        alert('Nombre no puede estar vacio')
      }
      else if (this.newBurger.ingredientes.length === 0) {
        alert('Debe tener al menos un ingrediente')
      }
      else {
        this.funcionAgregarBurger(this.newBurger)
      }
    },

    /**
     * Agrega un ingrediente a la lista de ingredientes del objeto newBurger. Al final resetea el estado
     * actual escrito en el input para ingrediente
     */
    addNewIngredient() {
      this.newBurger.ingredientes.push(this.ingredient)
      this.ingredient = ''
    },

    /**
     * Resetea tanto la lista de ingredientes del objeto newBurger, como el estado del input para ingrediente
     */
    removeIngredients() {
      this.ingredient = ''
      this.newBurger.ingredientes = []
    }
  },
  props: {
    // Funciones necesarias en la vista que llama al modal para controlar al mismo y a los datos que
    // provienen de él.
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