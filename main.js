import Vue from 'vue'
import App from './App.vue'
import Table from './Table.vue'
import TableRow from './TableRow.vue'
import Form from './Form.vue'


Vue.component('table-row', TableRow)
Vue.component('projects-table', Table)
Vue.component('project-form', Form)

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
