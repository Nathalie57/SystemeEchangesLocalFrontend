<template>   
    <div>
        <client-only>
        <div class="table-container" v-if="offers">
            <div v-if="offers.length>0">
              <h2>Les offres en cours</h2>
                  <table>
                      <thead>
                          <tr>
                              <th>Titre</th>
                              <th>Description</th>
                              <th>Catégorie</th>
                              <th>Date d'expiration de l'offre</th>
                              <th>Membre</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="offer in offers">
                              <td><router-link tag="a" to="/" exact>{{ offer.title }}</router-link></td>
                              <td>{{ offer.description }}</td>
                              <td><router-link tag="a" :to="{ name: 'category-id', params: {id:offer.category.id}}" exact>{{ offer.category.title }}</router-link></td>
                              <td>{{ offer.expirationDate }}</td>
                              <td><router-link tag="a" :to="{ name:'member-id', params: { id:offer.member.id }}" exact>{{ offer.member.pseudo }}</router-link></td>
                          </tr>
                      </tbody>
                  </table>
            </div> 
            <div v-else>
                <h3>Il n'y a pas d'offre en cours.</h3>
            </div>   
        </div>
        </client-only>
    </div>
    
</template>

<script>  
import offersWithMemberQuery from '~/apollo/queries/offer/offersWithMember'

export default {  
    layout: 'withCategories',
    data() {
        return {
            offer: Object
        }
    },
    apollo: {
        offers: {
            prefetch: true,
            query: offersWithMemberQuery
        }
    },
    computed: {
        filteredList() {
            return this.offers.filter(offer => {
            return offersWithMemberQuery.title.toLowerCase().includes(this.query.toLowerCase())
            })
        },
    }
}

</script>  