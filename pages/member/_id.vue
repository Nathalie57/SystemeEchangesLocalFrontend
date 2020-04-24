<template>   
    <div>
        <client-only>
        <div class="table-container">
        <h2>{{ member.pseudo }}, membre depuis le {{ member.registration_date }}</h2>
            <h3>Ses demandes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Date d'expiration de la demande</th>
                        <th>Catégorie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="demand in member.demands">
                        <td>{{ demand.demand_title }}</td>
                        <td>{{ demand.demand_description }}</td>
                        <td>{{ demand.demand_expiration_date }}</td>
                        <td><router-link tag="a" to="/" exact>{{ demand.category.title }}</router-link></td>
                    </tr>
                </tbody>
            </table>
            <h3>Ses offres</h3>
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
                    <tr v-for="offer in member.offers">
                        <td>{{ offer.offer_title }}</td>
                        <td>{{ offer.offer_description }}</td>
                        <td>{{ offer.offer_expiration_date }}</td>
                        <td><router-link tag="a" to="/" exact>{{ offer.category.title }}</router-link></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </client-only>
    </div>
    
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object
        }
    },
    apollo: {
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
    computed:{
        memberTitle(){
            return this.member.find(member => member.pseudo === this.pseudo)
        }
    },
}

</script>  