<template>


  <div class = "form-field">

    <!-- <div class = "dropbox">
      <input type = "file" v-on:change = "imageSelect" accept="image/*"/>

      <div v-if="imageSelected" class = "loading"></div>
      <img v-if="imageSelected" v-bind:src = "url"></img>

      <p v-else-if = "imageUploaded">ddddd</p>
      <p v-else>Upload target image</p>
    </div> -->
      <!-- <div v-bind:class = "{dropbox: sexyzoe, dropboxvid: !sexyzoe}">
        <input type = "file" v-on:change = "videoSelect" accept="video/mp4"/>

        <video v-if = "videoSelected" width="150px" height="150px" controls>
            <source v-bind:src="vid" type="video/mp4">
        </video>
        <p v-else-if = "videoUploaded">dddd</p>
        <p v-else>Upload video</p>
      </div> -->
      <form-file fileType = "image/*" >
        <p>Upload target image.</p>
      </form-file>

      <form-file fileType = "video/mp4">
        <p>Upload video file.</p>
      </form-file>
      <div class = "metadata">
        <div id = "label-tag">Name</div>
        <input type="text" v-model = "project.metadata.name" placeholder="project name" />
        <div id = "label-tag">Width</div>
        <input type="number" v-model = "project.metadata.width" placeholder="image width"/>
    </div>
        <template v-if = "!error">
    <div class = "button-box">
      <div class = "my-button" v-on:click = "upload">Upload</div>
      <div class = "my-button" v-on:click = "clear">Clear</div>
    </div>

    </template>

    <template v-else>
      <div class = "window">
        <div class = "errors-window">
          <span class = "error" v-for = "er in errors">
            {{er}}
        </span>
        </div>
        <div class = "back" v-on:click = "back">back</div>
        </div>


    </template>
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
      project:{
        metadata:{
          name:null,
          width: null
        },
        files:{
          image: null,
          video: null
        }
      },
      imageStatus: 0,
      videoStatus: 0,
      url: null,
      vid: null,
      error: false,
      errors: [],
    }
  },

  methods: {
    clear(){
      this.project.files.video = null;
      this.project.files.image = null;
      this.project.metadata.name = null;
      this.project.metadata.width = null;
      this.imageStatus = 0;
      this.videoStatus = 0;
    },
    imageSelect(event){
      if(event.target.files.length != 1){
        this.project.files.image = "to many files"
      }else{
        this.project.files.image = event.target.files[0];
        this.imageStatus = 1;
        this.url = URL.createObjectURL(event.target.files[0]);
      }
    },
    videoSelect(event){
      if(event.target.files.length != 1){
        this.project.files.video = "to many files"
      }else{
        this.project.files.video = event.target.files[0];
        this.videoStatus = 1;
        this.vid = URL.createObjectURL(event.target.files[0]);
      }
    },
    upload(){

      if(!this.project.metadata.name){
        this.error = true;
        this.errors.push("No name specified.");
      }
      if(!this.project.metadata.width){
        this.error = true;
        this.errors.push("No width specified.");
      }
      if(!this.project.files.image){
        this.error = true;
        this.errors.push("No image file selected.");
      }
      if(!this.project.files.video){
        this.error = true;
        this.errors.push("No video file selected.");
      }
      if(this.errors.length != 0){
        return this.error = true;
      }else{
        // do something
      }
    },
    back(){
      this.error = false;
      this.errors = [];
      return
    }
  },
  computed:{
    sexyzoe(){
      if(this.videoStatus){
        return false;
      }else{
        return true;
      }
    },
    imageUploaded(){

    },
    videoUploaded(){

    },
    imageSelected(){
      return this.imageStatus == 1;
    },
    videoSelected(){
      return this.videoStatus == 1;
    }
  }
}
</script>

<style>
  .form-field{
    height: 150px;
    padding: 20px;
    background: #ccc;
    z-index: 0;
    position: relative;
    overflow: hidden;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
  }

  .errors-window{
    width: 200px;
    height: 110px;
    padding: 20px;
    background: #eee;
    margin: 0 auto;
    box-shadow: 4px 4px 3px #333;

  }

  .loading{
    height: 100%;
    width: 10px;
    background: green;
    z-index: 4;
    float:left;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .window{
    height: 100%;
    width: 100%;
    padding: 20px;
    text-align: center;
    background: rgba(50, 50, 50, 0.8);
    z-index: 10;

    float:left;
    position: absolute;
    left: 0px;
    top: 0px;
  }

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    float: left;
    z-index: 1;
    overflow: hidden;
    margin-right: 20px;
    background: #e0e0ff;
    color: dimgray;
    height: 150px;
    width: 150px;
    display: inline-block;
    cursor: pointer;
    position:relative;
  }
  .dropboxvid {
    outline: 2px dashed grey; /* the dash box */
    float: left;
    overflow: hidden;
    margin-right: 20px;
    background: #000;
    color: dimgray;
    height: 150px;
    width: 150px;
    display: inline-block;
    cursor: grab;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 0.6em;
    text-align: center;
    margin:0;
    padding: calc(50% - 0.3em) 0;
  }

  .my-button{
    background: white;
    height: 1.2em;
    padding: 0.4em 0.6em;
    margin-top: 10px;
    user-select: none;
    color: #666;
  }
  .back{
    background: white;
    height: 1.2em;
    padding: 0.4em 0.6em;
    margin-top: 10px;
    user-select: none;
    color: #666;
  }
  .button-box{
    height: calc(2*(1.2em + 0.8em + 10px));
    padding-top: calc(150px - 2*(1.2em + 0.8em + 10px));
    display: inline-block;
    float: right;
  }

  img{
    z-index: 2;
    height:100%;
    width: auto;
    transform: translateX(-12.5%);
  }

  .my-button:hover{
    background: #f9f9ff;
  }
  .my-button:active{
    background: #f9f9ff;
    box-shadow: 3px 3px 3px #e0e0ff;
  }



  input[type = "text"], input[type = "number"]{
    border-width: 0;
    height:1.2em;
    padding: 0.2em;
    margin-bottom:calc(1*(150px - 2*23px - 2*25.56px)/4);
    font-size: 1em;
  }

  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }

  input[type = "text"]:focus, input[type = "number"]:focus{
    background: #f9f9ff;
    outline-color:#e0e0ff;
    outline-width:2px;
  }

  .metadata{
    display: inline-block;
    height: 150px;
  }

  #label-tag{
    padding-bottom: calc((150px - 2*23px - 2*25.56px)/4);
    font-size: 1.2em;
  }

  .error{
    color: red;
    font-weight: bold;
    opacity: 1;
    display: block;
    text-align: justify;
  }

</style>
