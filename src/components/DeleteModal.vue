<template>
  <transition name="modal">
    <div class="modal-delete-masking">
      <div class="modal-delete-wrap">
        <div class="modal-delete-container">
          <img id="alert-icon" src="../assets/warning.svg" alt="alert-svg" />
          <div class="modal-delete-text">
            <h3>Eliminando Hamburguesa</h3>
            <p>¿Estás seguro que deseas eliminar esta hamburguesa?</p>
            <div class="modal-delete-buttons">
              <button class="modal-delete-button-confirm" v-on:click="funcionConfirmar">Si, eliminar</button>
              <button class="modal-delete-button-cancel" v-on:click="funcionCancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'DeleteModal',
  props: {
    funcionConfirmar: {
      type: Function
    },
    funcionCancelar: {
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

.modal-delete-masking {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  display: table;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.modal-delete-wrap {
  background-color: transparent;
  vertical-align: middle;
  display: table-cell;
}

.modal-delete-container {
  align-items: center;
  border-radius: $rad-light;
  width: 350px;
  height: 140px;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  margin: 0 auto;
  padding: 10px 20px;
}

.modal-delete-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.modal-delete-buttons {
  align-self: flex-end;
}

.modal-delete-button-confirm {
  border: 0;
  height: 35px;
  color: white;
  font-size: 16px;
  border-radius: $rad-light;
  margin-right: 5px;
  background-color: $warning-color;
}

.modal-delete-button-cancel {
  border: 0;
  height: 35px;
  color: white;
  font-size: 16px;
  border-radius: $rad-light;
  margin-right: 5px;
  background-color: $alternative-color;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-delete-container, .modal-leave-active .modal-delete-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#alert-icon {
  width: 80px;
  height: 80px;
}

</style>