<template>

  <div v-if = "(display)&&(edit)">
    <project-form v-on:cancel="close" v-bind:given-project = "project"></project-form>
  </div>

  <div v-else-if = "display" class = "preview">
    <div class = "preview-file">
      <a target="_blank" v-bind:href="project.files.image">
        <img v-bind:src="project.files.image" />
      </a>
    </div>
    <div class = "preview-file">
      <video style = "background: black" height="200px" controls>
          <source v-bind:src="project.files.video" type="video/mp4">
      </video>
    </div>
    <div style = "display: inline-block;">
      <div style = "font-size: 1.5em; font-weight: bold">
        {{project.meta.name}}
      </div>
      <div style = "font-size: 1em; padding: 4px 0">
        width: {{project.meta.width}}
      </div>
    </div>
    <div class = "my-button" style = "bottom: 20px; right: 20px;" v-on:click = "close">Close</div>
    <div class ="edit" v-on:click = "editmode">
      <img src="./assets/edit.svg" style="height: 20px" />
    </div>
  </div>



  <div v-else class="row-style">
    <div class="thumbnail">
      <img v-bind:src = "project.files.image" /> <!-- For thumbnail extention add "project.meta.image + '_thumb'" -->
    </div>
    <div class="name">
      {{project.meta.name}}
    </div>
    <div class="width">
      {{project.meta.width}}
    </div>
    <div class = "dropdown" v-on:click = "onClick" >
      ⌄
    </div>
  </div>




</template>

<script>
import {bus} from './main.js';
export default{

  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data(){
    return{
      display: false,
      edit: false,
    }
  },
  methods: {
    onClick(){
      bus.$emit('select', 'kk');
      this.display = true;
    },
    close(){
      this.display = false;
      this.edit = false;
    },
    editmode(){
      this.edit= true;
    }
  },
  created(){
    bus.$on('select', (data) => {
      this.display = false;
      this.edit = false;
    });
  }
}
</script>

<style scoped>
.thumbnail{
  height: 50px;
  width: 50px;
  background: grey;
  overflow: hidden;
  display: inline-block;
}
.preview{
  padding: 2vw;
  padding-right: calc(2vw + 50px);
  box-shadow: 0px 0px 10px #999;
  position: relative;
  overflow: hidden;
}
.row-style {
  width: 100%;
  padding: 10px 0;
  display: inline-block;
  height: 50px;
  border-bottom: 1px solid #ddd;
}
.dropdown{
  float: right;
  font-size: 1.5em;
  padding: 1px 13.42px 6px 13.42px;
  margin: 5px;
  cursor: grab;
  user-select: none;
  border-radius: 20px;
}
.dropdown:hover{
  /* background: #e0e0e9; */
  box-shadow: 0px 0px 5px #c0c0d0;
}
.dropdown:active{
  box-shadow: 0px 0px 5px #a0a0b0;
}
.name{
  width: 30vw;
  padding: 0 10px;
  display: inline-block;
}
.width{
  width: 20vw;
  padding: 0 10px;
  display: inline-block;
}
.preview-file{
  height: 200px;
  margin: 10px 20px 10px 10px;
  box-shadow: 0px 0px 5px #808090;
  float: left;
  overflow: hidden;
  display: inline-block;
}
.my-button:hover{
  box-shadow: 0px 0px 5px #c0c0d0;
}
.my-button:active{
  box-shadow: 0px 0px 5px #a0a0b0;
}
.my-button{
  position: absolute;
  width: 60px;
  background: white;
  border-radius: 15px;
  height: 18px;
  text-align: center;
  padding: 6px 0.6em;
  user-select: none;
  color: #444;
}

.metadata{
  height: 200px;
  display: inline-block;
}
.data-lables{
  font-size: 2em;
  font-weight: bold;
}
.edit{
  height: 20px;
  position:absolute;
  top: 20px;
  right:20px;
  padding: 10px;
  border-radius: 20px;
}
.edit:hover{
  box-shadow: 0px 0px 5px #c0c0d0;
}
</style>
