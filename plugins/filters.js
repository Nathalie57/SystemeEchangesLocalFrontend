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
})
