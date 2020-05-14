import Vue from 'vue'

Vue.filter('summary', function (value) {
    if (!value) return ''
    return value.substr(0, 50) + "..."
}),

Vue.filter('dateFormat', function (value){
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString()
}),

Vue.filter('firstLetter', function strUcFirst(a){
  {return (a+'').charAt(0).toUpperCase()+a.substr(1);}
}),

Vue.filter('expirationDate', function(value){
  if (!value) return ''
  let date = new Date(value)
  let today = new Date()
  if(date>today) return value;
  return false
})
