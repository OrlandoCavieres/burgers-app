<template>
  <div id="nav">
    <div id="homeRoute">
      <router-link to="/">Home</router-link>
    </div>
    <div id="burgerRoute">
      <router-link to="/hamburguesas">Hamburguesas</router-link>
    </div>
  </div>
  <div class="separador" />
  <router-view id="route-v"/>
</template>

<style lang="scss">
@import 'globalStyles';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-select-color;
  align-items: center;
  display: flex;
  flex-direction: column;
}

* {
  margin: 0;
  background: #fff7f1;
}

#nav {
  align-self: center;
  display: flex;
  padding: 30px;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: $dark-select-color;
  background: transparent;
}

#nav a.router-link-exact-active {
  color: $light-select-color;

}

#homeRoute {
  flex: 1;
  background: transparent;
}

#homeRoute:before {
  background-color: $alternative-color;
  color: white;
}

#burgerRoute {
  flex: 1;
  background: transparent;
}

.separador {
  background: $primary-color;
  border-radius: $rad-smooth;
  elevation: lower;
  height: 7px;
  width: 90%;
}

#route-v {
  width: 100%;
}
</style>
