<template>
  <project-display></project-display>
</template>


<script>
export default{

  props: {
    projects: Array
  },
  data(){
    return{
      columns: 0,
      rows: 0,
      sumChars: 0
    }
  },
  methods: {
    getColumns: function(){
      var max = 0;
      var columnTitles = [];
      var columnSizes = []
      for(var i = 0; i < this.projects.length; i++){
        for(var key in this.projects[i].metadata){
          if(columnTitles.indexOf(key) == -1){
            columnTitles.push(key);
            var data = String(this.projects[i].metadata[key]);
            if(key.length>data.length){
              columnSizes.push(key.length);
            }else{
              columnSizes.push(data.length);
            }
          }else{
            var index = columnTitles.indexOf(key);
            var data = String(this.projects[i].metadata[key]);
            if(data.length > columnSizes[index]){
              columnSizes[index] = data.length;
            }
          }
        }
      }
      var sum = columnSizes.reduce(function(total, num) {
        return total + num;
      });
      var columnRatios = [];
      columnSizes.forEach(function(e){
        columnRatios.push(94*e/sum);
      });
      var columnData = {};
      columnTitles.forEach(function(e, i){
        columnData[e] = columnRatios[i];
      });
      console.log(columnData);
      return columnData;
    }
  }
}
</script>

<style>
.header{
  height: 40px;
  border-bottom: 1px solid grey;
}

.thumbnail{
  height:30px;
  width: 30px;
  background: green;
  margin: 5px 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  float: left;
}

.elements{
  height: 40px;
  display: table-cell;
  vertical-align: bottom;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}

</style>
