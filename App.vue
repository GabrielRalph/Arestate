

<template>
  <div>
    <div class="user-info">
      <div class = "user-pic">
        <img v-bind:src="displayPicture" alt="display picture">
      </div>
      <span class="username">{{username}}</span>
      <div v-if="!add" class = "plus" style = "bottom: 10px; right: 10px;" v-on:click = "addHandler">+</div>
    </div>
    <project-form v-if="add" v-on:cancel="cancelHandler"></project-form>
    <div class="table-header"></div>
    <div class="table-style" v-bind:style = "kkk()">
      <table-row v-for ="pro in projects" v-bind:project="pro"></table-row>
    </div>
  </div>
</template>

<script>
import {bus} from './main.js';
export default {

  data () {
    return {
      displayPicture: 'https://carimages.com.au/heKtVHqiN29Lkmiu7-DARZYX9a0=/fit-in/930x620/filters:stretch(FFFFFF)/editorial/115997/2018-mercedes-amg-gt-s-862.jpg',
      username: 'Gabriel Ralph',
      add: false,
      projects: [{
        thumbnail:'thumb.png',
        meta:{
          name:'My first project',
          width:5,
          date:'12/11/2010',
        },
        files:{
          image:'https://carimages.com.au/heKtVHqiN29Lkmiu7-DARZYX9a0=/fit-in/930x620/filters:stretch(FFFFFF)/editorial/115997/2018-mercedes-amg-gt-s-862.jpg',
          video:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }
      },
      {
        thumbnail:'thumb.png',
        meta:{
          name:'cocky little ho ho',
          width:2,
          date:'6/9/2018',
        },
        files:{
          video:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          image:'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/16q3/669461/2017-mercedes-amg-gt-r-first-ride-review-car-and-driver-photo-671040-s-original.jpg?crop=1xw:1xh;center,center&resize=900:*'
        }
      }]
    }
  },

  methods: {
    submit(){
      this.projects.push(this.$refs.text.value);
    },
    addHandler(){
      this.add = true;
    },
    cancelHandler(){
      this.add = false;
    },
    kkk(){
      if(this.add){
        return 'height:calc(100vh - 26vw - 220px);'
      }else{
        return 'height:calc(100vh - 22vw - 70px);'
      }
    }
  },
  created(){
    bus.$on('uploading', (data) => {
      this.projects.push(data)
    });
  }
}
</script>

<style>
  body{
    margin: 3vw;
    overflow: hidden;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
  }
  .table-style{
    overflow: auto;
    padding: 0.5vw;
    width: 93vw;


  }
  .user-pic {
	   height: 15vw;
     width: 15vw;
     overflow: hidden;
     display: inline-flex;
     background: #f9f9f9;
  }
  .username{
  	width: auto;
    font-size: calc(6px + 4vw);
  	padding: 0 3vw 0 3vw;
}
  .user-info{
    padding: 0 0 2vw 0;
    height: 15vw;
    width: 94vw;
    position: relative;
    float: left;
    border-bottom: 1px solid #999;
  }
  img{
    z-index: 2;
    height:100%;
    width: auto;

  }
  .plus:hover{
    box-shadow: 0px 0px 5px #c0c0d0;
  }
  .plus:active{
    box-shadow: 0px 0px 5px #a0a0b0;
  }
  .plus{
    position: absolute;
    width: 20px;
    background: white;
    border-radius: 20px;
    height: 18px;
    text-align: center;
    padding: 11px 10px;
    user-select: none;
    color: #444;
  }
  .table-header{
    height: 60px;
    padding-bottom: 10px;
    width:100%;
    border-bottom: 1px solid grey;
    display:inline-block;
  }
</style>
