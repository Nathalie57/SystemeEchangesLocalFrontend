<template>  
  <client-only>
    <footer class="footer-container">
        <div class="footer">
            <router-link tag="a" to="/qui-sommes-nous" exact>Qui sommes-nous ?</router-link>
            <div class="wrap">
                <div class="search">
                    <input type="search" v-model="query" class="searchTerm" placeholder="Rechercher sur le site">
                    <button type="submit" class="searchButton">
                        <img src="../images/research.svg" class="icon">
                    </button>
                </div>
            </div>
            <router-link tag="a" to="/mentions-legales" exact>Mentions légales</router-link>
        </div>
    </footer>
  </client-only>
</template>  

<script>  
import demandsQuery from '~/apollo/queries/demand/demands'

export default {  
  data() {
    return {
      demands: [],
      query: ''
    }
  },
  apollo: {
    demands: {
      prefetch: true,
      query: demandsQuery
    }
  },
  computed: {
    filteredList() {
      return this.demands.filter(demand => {
        return demand.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  }
}
</script> 