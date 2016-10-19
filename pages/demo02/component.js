import $ from 'jquery'

let showMyName = (name) => {
  $('h1').text(`Hello world! My name is ${ name }!`)
}

module.exports = function(){
  showMyName('demo02')
  alert('component demo02')
}