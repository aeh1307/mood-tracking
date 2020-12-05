<template>
  <div class="mainPage">
    <BackgroundImage/>
  </div>

</template>
<script>
import BackgroundImage from "~/components/backgroundImage/BackgroundImage";

export default {
  components: {
    BackgroundImage,
  },
}
</script>

<style scoped>
.mainPage {
  position: absolute;
  overflow: hidden;
}
</style>
