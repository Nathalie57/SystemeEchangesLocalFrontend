<template>   
    <div>
        <client-only>
        <div class="table-container">
        <h2>Catégorie {{ category.title }}</h2>
            <div v-if="category.demands.length>0">
                <h3>Les demandes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Date d'expiration de la demande</th>
                            <th>Membre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="demand in category.demands">
                            <td>{{ demand.demand_title }}</td>
                            <td>{{ demand.demand_description }}</td>
                            <td>{{ demand.demand_expiration_date }}</td>
                            <td><router-link tag="a" :to="{ name:'member-id', params: { id:demand.member.id }}" exact>{{ demand.member.pseudo }}</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <h3>Il n'y a pas de demande en cours dans cette catégorie.</h3>
            </div>

            <div v-if="category.offers.length>0">
            <h3>Les offres</h3>
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Date d'expiration de l'offre</th>
                        <th>Membre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="offer in category.offers">
                        <td>{{ offer.offer_title }}</td>
                        <td>{{ offer.offer_description }}</td>
                        <td>{{ offer.offer_expiration_date }}</td>
                        <td><router-link tag="a" :to="{ name:'member-id', params: { id:offer.member.id }}" exact>{{ offer.member.pseudo }}</router-link></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div v-else>
                <h3>Il n'y a pas d'offre en cours dans cette catégorie.</h3>
            </div>
            
            </div>
        </client-only>
    </div>
    
</template>

<script>  
import categoryQuery from '~/apollo/queries/category/category'

export default {  
    layout: 'withCategories',
    data() {
        return {
            category: Object,            
        }
    },
    apollo: {
        category: {
            prefetch: true,
            query: categoryQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
    computed:{
        categoryTitle(){
            return this.category.find(category => category.title === this.title)
        }
    },
}

</script>  