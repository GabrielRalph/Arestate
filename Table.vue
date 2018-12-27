<template>
  <div class = "window">
    <input type = "file" />
  </div>
</template>

<script>
export default{

  props: {
    projects: {
      type: Array
    }
  },

  data(){
    return{
    }
  },
  methods: {

  }
}
</script>

<style>
.window{
  width: 100%;
  height: 200px;
  background: #eee;
}
</style>
