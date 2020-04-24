<template>  
  <client-only>
    <div class="left-side-bar-container">
      
      <ul class="left-side-bar">
        <li v-for="category in categories"><router-link :to="{ name:'category-id', params: { id:category.id }}" tag="a">{{ category.title }}</router-link></li>
        
      </ul>
    </div>
    
  </client-only>
</template>  

<script>  
import categoriesQuery from '~/apollo/queries/category/categories'

export default {  
  data() {
    return {
      categories: [],
      query: ''
    }
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  },
  computed: {
    filteredList() {
      return this.categories.filter(category => {
        return category.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  }
  
}
</script>  