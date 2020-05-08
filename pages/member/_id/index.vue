<template>   
    <div>
        <client-only>
        <div v-if="login">
            <div class="table-container" v-if="member.demands && member.offers">
            <h2>{{ member.pseudo }}, membre depuis le {{ member.registrationDate }}</h2>
                <div v-if="member.demands.length>0">
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
                                <td><router-link tag="a" :to="{ name:'voir-les-demandes-demande-id', params: { id:demand.id }}" exact>{{ demand.title }}</router-link></td>
                                <td>{{ demand.description | summary }}</td>
                                <td>{{ demand.expirationDate }}</td>
                                <td><router-link tag="a" :to="{ name:'category-id', params: { id:demand.category.id }}" exact>{{ demand.category.title }}</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>{{ member.pseudo }} n'a pas de demande en cours.</h3>
                </div>
                <div v-if="member.offers.length>0">
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
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate }}</td>
                                <td><router-link tag="a" :to="{ name:'category-id', params: { id:offer.category.id }}" exact>{{ offer.category.title }}</router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>{{ member.pseudo }} n'a pas d'offre en cours.</h3>
                </div>

                </div>
            </div>

            <div v-else class="table-container">
                <p><router-link tag="a" to="/connexion" exact>Connectez-vous</router-link> pour voir les offres et les demandes des membres</p>
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
            member: Object,
            login: true
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
}

</script>  

