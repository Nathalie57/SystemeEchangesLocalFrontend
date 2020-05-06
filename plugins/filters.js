import Vue from 'vue'

Vue.filter('summary', function (value) {
    if (!value) return ''
    return value.substr(0, 50) + "..."
}),

Vue.filter('dateFormat', function (value){
  if (!value) return ''
  const date = new Intl.DateTimeFormat("en-GB").format(value);
  return date;
})

