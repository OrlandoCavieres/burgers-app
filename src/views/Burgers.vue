<template>
  <div class="mainContainer">
    <div class="separador">

    </div>
    <div class="container">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Burgers',
  methods: {
    getBurgers() {

    }
  }
}
</script>

<style scoped lang="scss">
$radius: 25px;
$primary-color: #5D4954;
$hmin: 30vh;
$wmin: 20vw;

.mainContainer {
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: $hmin;
  min-width: $wmin;
}
.separador {
  background: $primary-color;
  border-radius: $radius;
  elevation: lower;
  height: 7px;
  width: 90%;
}
.container {
  align-self: center;
  border: 3px solid;
  display: flex;
  width: 95%;
  margin-top: 5px;
  height: 200vh;
}
</style>
