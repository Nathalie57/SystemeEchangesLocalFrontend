<template>   
    <div>
        <client-only>
        <div class="table-container">
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
                        <td><router-link tag="a" to="/" exact>{{ offer.offer_title }}</router-link></td>
                        <td>{{ offer.offer_description }}</td>
                        <td><router-link tag="a" to="/{ name: 'category', params: {id:3}}" exact>{{ offer.category.title }}</router-link></td>
                        <td>{{ offer.offer_expiration_date }}</td>
                        <td><router-link tag="a" to="/" exact>{{ offer.member.pseudo }}</router-link></td>
                    </tr>
                </tbody>
            </table>
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