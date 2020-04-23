<template>  
  <client-only>
    
    <div v-for="demand in demands"><router-link tag="a" to="/" exact><img src="../images/orange-arrow-right.svg" class="arrow">{{ demand.demand_title }}</router-link></div>
  </client-only>
</template>  

<script>  
import demandsWithMemberQuery from '~/apollo/queries/demand/demandsWithMember'

export default {  
  data() {
    return {
      demandsWithMember: [],
      query: ''
    }
  },
  apollo: {
    demands: {
      prefetch: true,
      query: demandsWithMemberQuery
    }
  },
  computed: {
    filteredList() {
      return this.demands.filter(demand => {
        return demandsWithMemberQuery.title.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  }
}
</script>  