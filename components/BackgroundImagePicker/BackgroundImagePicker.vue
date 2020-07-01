<template class="backgroundPhotosDisplayContainer">
  <div class="backgroundPhotosDisplay">
    TEST
    <!--<div class="photoRow">
      <div><img class="backgroundPhoto" src="../../assets/hillPathNew.jpg" alt="country road"></div>
      <div> <img class="backgroundPhoto" src="../../assets/bali.jpg" alt="green nature in Bali"></div>
    </div>
   <div class="photoRow">
     <div><img class="backgroundPhoto" src="../../assets/water.jpg" alt="lake and mountain"></div>
     <div><img class="backgroundPhoto" src="../../assets/ocean.jpg" alt="lake and mountain"></div>
   </div>-->

  </div>
</template>
<script>
  export default {
    name: "BackgroundImage.vue",

  }

</script>
<style scoped>
  .backgroundPhotosDisplayContainer{
    min-width: 300px;
    min-height: 400px;
  }
  .backgroundPhotosDisplay {
    width: 100%;
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .photoRow {
    display: flex;
    flex-direction: row;
  }
  .backgroundPhoto {
    max-width: 40%;
    max-height:40%;
  }
</style>
