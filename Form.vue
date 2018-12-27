<template>
  <div class = "form-field">

    <template v-if = "(!error)&&(!uploading)">
      <!-- Image Drop Box -->
      <div class = "form-dropbox">
        <input type = "file" v-on:change = "imageSelect" accept="image/*"/>
        <img v-if="isImage" v-bind:src = "preview.image" />
        <p v-else = "isImage">Upload target image</p>
      </div>

      <!-- Video Drop Box -->
      <div class = "form-dropbox" v-bind:style = "videoStyle">
        <input type = "file" v-on:change = "videoSelect" accept="video/mp4"/>
        <video v-if = "isVideo" width="150px" height="150px" controls>
            <source v-bind:src="preview.video" type="video/mp4">
        </video>
        <p v-else>Upload target video</p>
      </div>

      <!-- Metadata -->
      <div class = "metadata">
        <div class = "label-tag">Name</div>
        <input type="text" v-model = "project.meta.name" placeholder="project name" />
        <div class = "label-tag">Width</div>
        <input type="number" v-model = "project.meta.width" placeholder="image width"/>
      </div>

      <!-- Buttons -->
        <div class = "my-button" style = "bottom: calc(20px + 2*(32px + 10px)); right: 20px;" v-on:click = "upload">Upload</div>
        <div class = "my-button" style = "bottom: calc(20px + 32px + 10px); right: 20px;" v-on:click = "clear">Clear</div>
        <div class = "my-button" style = "bottom: 20px; right: 20px;" v-on:click = "cancel">Cancel</div>
    </template>

    <template v-if = "error">
      <!-- Buttons -->
      <div class = "errorhead">Looks like we have encounter some errors in uploading your project.</div>
      <div class = error-contents>
        <p class = "errors" v-for = "error in errors"> {{error}} </p>
      </div>
      <div class = "my-button" style = "bottom: 20px; right: 20px;" v-on:click = "back">Back</div>

    </template>

    <template v-if = "uploading">
      <div class = "loading-bar" v-on:click ="doss">
        <div class = "loaded" v-bind:style = "'width:'+ progress+'vw'">

        </div>
      </div>
    </template>

  </div>
</template>

<script>
import {bus} from './main.js';
export default{

  props: {
    givenProject:{
      type: Object
    }
  },

  data(){
    return{
      project: {
         meta: {
           name: null,
           width: null
         },
         files:{
           image: null,
           video: null
         }
      },
      preview:{
        video: null,
        image: null
      },
      uploading: false,
      errors: [],
      progress: 0
    }
  },
  methods: {
    doss(){
      this.progress ++;
      if(this.progress > 40){
        this.$emit('cancel', true);
      }
      console.log(this.progress);

    },
    progressCount(){
      return 'width: 60px'
    },
    cancel(){
      this.$emit('cancel', true);
    },
    back(){
      this.errors = [];
    },
    upload(){
      this.errors = [];
      if(!this.project.meta.name){
        this.errors.push("No name specified.");
      }
      if(!this.project.meta.width){
        this.errors.push("No width specified.");
      }
      if(!this.project.files.image){
        this.errors.push("No target image selected.");
      }else if(this.project.files.image.size > 1024*1024){
        this.errors.push("Image file greater than 1Mb");
      }
      if(!this.project.files.video){
        this.errors.push("No target video selected.");
      }else if(this.project.files.video.size > 1024*1024*3){
        this.errors.push("Video file greater than 1Mb");
      }
      if(this.errors.length == 0){
        console.log(this.project)
        bus.$emit('uploading', this.project);
        this.uploading = true;
      }else{
        console.log(this.errors);
      }
    },
    clear(){
      this.project.meta.name = null;
      this.project.meta.width = null;
      this.project.files.image = null;
      this.project.files.video = null;
      this.preview.video = null;
      this.preview.image = null;
      this.status = 0;
      this.errors = [];
    },
    imageSelect(event){
      this.project.files.image = event.target.files[0];
      this.preview.image = URL.createObjectURL(event.target.files[0]);
    },
    videoSelect(event){
      this.project.files.video = event.target.files[0];
      this.preview.video = URL.createObjectURL(event.target.files[0]);
    }
  },
  computed: {
    error(){
      if(this.errors.length != 0){
        return true
      }else{
        return false
      }
    },
    videoStyle(){
      if(this.preview.video){
        return {background: 'black'}
      }else{
        return {background: '#e5e5f5'}
      }
    },
    isVideo(){
      if(this.project.files.video){
        return true
      }else{
        return false
      }
    },
    isImage(){
      if(this.project.files.image){
        return true
      }else{
        return false
      }
    }
  },
  created(){
    if(this.givenProject){
      this.project.meta.name = this.givenProject.meta.name;
      this.project.meta.width = this.givenProject.meta.width;
      this.project.files.image = this.givenProject.files.image;
      this.project.files.video = this.givenProject.files.video;
      this.preview.image = this.givenProject.files.image;
      this.preview.video = this.givenProject.files.video;
    }
  }
}
</script>

<style>
.form-field{
  height: 150px;
  padding: 2vw;
  box-shadow: 0px 0px 10px #999;
  z-index: 0;
  position: relative;
  overflow: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
}

.loading-bar{
  height: 15px;
  width: 40vw;
  margin: 67.5px 24vw;
  background: #ddd;
  overflow:hidden;
}
.loaded{
  background: #4d4;
  height: 100%;
  display: inline-block;
  float: left;
}

.errorhead{
  font-size: 1.3em;
  width:calc(100% - 2*20px);
  padding: 20px;
  top:0;
  left:0;
  display: block;
  background: rgba(255, 0, 0, 0.3);
  position: absolute;
  margin: 0;
  font-weight: normal;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
}
.errors{
  font-size: 1em;
  color: darkred;
  display: inline-block;
  margin: 2px 0;
}
.error-contents{
  position: absolute;
  padding-top: 15px;
  top: 64px;
  width: 200px;
  display: inline-block;
}

.form-dropbox{
  height: 150px;
  width: 150px;
  margin-right: 20px;
  background: #e5e5f5;
  box-shadow: 0px 0px 5px #808090;
  color: dimgray;
  float: left;
  overflow: hidden;
  display: inline-block;
}
.form-dropbox:hover{
  background: #eef;
}
.form-dropbox p {
  font-size: 0.6em;
  text-align: center;
  margin: 0;
  padding: calc(139px/2) 0;
}

input[type = "file"]{
  opacity: 0;/* invisible but it's there! */
  height: 150px;
  width: 150px;
  position: absolute;
  cursor: pointer;
}

.label-tag{
  padding-bottom: calc((150px - 2*23px - 2*25.56px)/4);
  font-size: 1.2em;
}

.metadata{
  height: 150px;
  display: inline-block;
}


input[type = "text"], input[type = "number"]{
  border: 1px solid grey;
  height:1.6em;
  padding: 0.2em 0.5em;
  border-radius: 1em;
  margin-bottom:calc(1*(150px - 2*23px - 2*25.56px)/4);
  font-size: 1em;
}
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button{
  -webkit-appearance: none;
  margin: 0;
}
input[type = "text"]:focus, input[type = "number"]:focus{
  border-width: 2;
  background: #f9f9ff;
  outline-color:#e0e0ff;
  outline-offset: 0;
  outline-width:0;
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
  padding: 6px 0.6em;
  text-align: center;
  user-select: none;
  color: #444;
}
</style>
