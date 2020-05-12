<template>   
    <div>
        <client-only>
        <div v-if="login">
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
                                  <td><router-link tag="a" :to="{ name:'voir-les-offres-offre-id', params: { id:offer.id }}" exact>{{ offer.title }}</router-link></td>
                                  <td>{{ offer.description | summary }}</td>
                                  <td><router-link tag="a" :to="{ name: 'category-id', params: {id:offer.category.id}}" exact>{{ offer.category.title }}</router-link></td>
                                  <td>{{ offer.expirationDate | dateFormat }}</td>
                                  <td><router-link tag="a" :to="{ name:'member-id', params: { id:offer.user.id }}" exact>{{ offer.user.firstname | firstLetter }} {{ offer.user.lastname | firstLetter }}</router-link></td>
                              </tr>
                          </tbody>
                      </table>
                </div> 
                <div v-else>
                    <h3>Il n'y a pas d'offre en cours.</h3>
                </div>   
            </div>
        </div>
        <div v-else>
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
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="offer in offers">
                                  <td><router-link tag="a" to="/" exact>{{ offer.title }}</router-link></td>
                                  <td>{{ offer.description | summary }}</td>
                                  <td><router-link tag="a" :to="{ name: 'category-id', params: {id:offer.category.id}}" exact>{{ offer.category.title }}</router-link></td>
                                  <td>{{ offer.expirationDate | dateFormat }}</td>
                              </tr>
                          </tbody>
                      </table>
                </div> 
                <div v-else>
                    <h3>Il n'y a pas d'offre en cours.</h3>
                </div>   
            </div>
        </div>
        </client-only>
    </div>
    
</template>

<script>  
import offersWithUserQuery from '~/apollo/queries/offer/offersWithUser'

export default {  
    layout: 'withCategories',
    data() {
        return {
            offer: Object,
            login:true
        }
    },
    apollo: {
        offers: {
            prefetch: true,
            query: offersWithUserQuery
        }
    },
}

</script>  