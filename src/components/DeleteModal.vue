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

%button-delete-properties {
  height: 35px;
  font-size: 16px;
  margin-right: 5px;
}

.modal-delete-masking {
  @extend %modal-masking;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-delete-wrap {
  background-color: transparent;
  vertical-align: middle;
  display: table-cell;
}

.modal-delete-container {
  @extend %flex-center;
  background-color: #FFF;
  border-radius: $rad-light;
  height: 140px;
  margin: 0 auto;
  padding: 10px 20px;
  width: 350px;
}

.modal-delete-text {
  @extend %flex-align-center-column;
  justify-content: space-between;
  height: 100%;
}

.modal-delete-buttons {
  align-self: flex-end;
}

.modal-delete-button-confirm {
  @extend %button-light-borderless, %button-delete-properties;
  background-color: $warning-color;
}

.modal-delete-button-cancel {
  @extend %button-light-borderless, %button-delete-properties;
  background-color: $alternative-color;
}

#alert-icon {
  width: 80px;
  height: 80px;
}

</style>