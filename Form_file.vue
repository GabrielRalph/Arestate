<template>
  <div class = "form-file-style" v-bind:style = "styleSelect">

    <!-- File has not yet been selected, display a dropbox -->
    <template v-if = "initial">
        <input type = "file" v-on:change = "fileHandler" v-bind:accept="fileType"/>
        <slot></slot>
    </template>

    <!--  -->
    <template v-if = "fileSelect">
      <img v-if = "isImage" v-bind:src = "url"></img>
      <video v-if = "isVideo">
          <source v-bind:src="url" type="video/mp4">
      </video>
    </template>

    <div v-if = "uploaded"> </div> -->

  </div>
</template>


<script>
export default{
  props: {
    fileType:{
      type: String
    },
    loadingProgress: {
      type: Number
    },
    uploade: {
      type: Boolean
    }
  },

  data(){
    return{
      url: null,
      file: null,
      status: 0,
    }
  },

  methods: {
    fileHandler(){
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(event.target.files[0]);
      this.status = 1;
      // this.$emit();
    }
  },

  computed: {
    styleSelect(){
      if(this.status == 1){
        return {
          background: '#000'
        }
      }
    },
    initial(){
      if(this.status == 0){
        console.log("initial");
        return true;
      }else{
        return false;
      }
    },
    fileSelect(){
      if(this.status == 1){
        console.log("fileSelect");
        return true
      }else{
        return false
      }
    },
    isImage(){
      if(this.fileType.includes("image")){
        console.log("isImage");
        return true
      }else{
        return false
      }
    },
    isVideo(){
      if(this.fileType.includes("video")){
        console.log("video")
        return true;
      }else{
        false;
      }
    }
  },
}
</script>


<style>

img{

}

video{
  height: 150px;
  width: 150px;
}

input[type = "file"]{
  opacity: 0;/* invisible but it's there! */
  height: 150px;
  width: 150px;
  position: absolute;
  cursor: pointer;
}

.preveiw{
  width: 100%;
  height: 200px;
  background: #eee;
}

.form-file-style{
  height: 150px;
  width: 150px;
  margin-right: 20px;
  background: #e0e0ff;
  color: dimgray;
  float: left;
  overflow: hidden;
  display: inline-block;
}

.form-file-style:hover{
  background: #bbf;
}

.form-file-style p {
  font-size: 0.6em;
  text-align: center;
  margin: 0;
  padding: calc(139px/2) 0;
}

</style>

  <!-- <div v-if= "imageSelected" class = "loading"></div> -->
