<template>  
  <client-only>
    <div class="right-side-bar-container">
      
      <ul class="right-side-bar">
        <p>Consultez les dernières offres et demandes et échangez !</p>
        <li v-for="offer in offers"><router-link tag="a" to="/" exact><img src="../images/orange-arrow-right.svg" class="arrow">{{ offer.title }}</router-link></li>
        <router-link tag="a" to="/voir-les-offres" exact><button  class="see-more-button">Voir plus d'offres</button></router-link></li>
      </ul>
      
      <ul class="right-side-bar">
        <li v-for="demand in demands"><router-link tag="a" to="/" exact><img src="../images/orange-arrow-right.svg" class="arrow">{{ demand.title}}</router-link></li>
        <router-link tag="a" to="/voir-les-demandes" exact><button  class="see-more-button">Voir plus de demandes</button></router-link></li>
      </ul>
    </div>
    
  </client-only>
</template>  

<script>  
import offersLimitThreeQuery from '~/apollo/queries/offer/offersLimitThree'
import demandsLimitThreeQuery from '~/apollo/queries/demand/demandsLimitThree'

export default {  
  data() {
    return {
      offersLimitThree: [],
      demandsLimitThree: [],
      query: ''
    }
  },
  apollo: {
    offers: {
      prefetch: true,
      query: offersLimitThreeQuery
    },
    demands: {
      prefetch: true,
      query: demandsLimitThreeQuery
    }
  },
  computed: {
    filteredList() {
      return this.offersLimitThree.filter(offer => {
        return offer.title.toLowerCase().includes(this.query.toLowerCase())
      });
      return this.demandsLimitThree.filter(demand => {
        return demand.title.reverse().includes(this.query.toLowerCase())
      })
    },
  }
  
}
</script>  