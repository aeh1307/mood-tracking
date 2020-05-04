<template>
  <div>
    <TopMenu/>
    <nuxt/>
    <MainMenu/>
  </div>
</template>
<script>
  import MainMenu from "../components/mainMenu/MainMenu";
  import TopMenu from "../components/topMenu/TopMenu";

  export default {
    components: {
      MainMenu,
      TopMenu,
    }
  }


</script>

<style>
html, body {
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>
