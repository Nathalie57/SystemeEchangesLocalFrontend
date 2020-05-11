<template>   
    <div>
        <client-only>
            <div class="table-container" v-if="user.demands && user.offers">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:user.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ user.username }} !</h2>
                <div v-if="user.demands.length>0">
                    <h3>Vos demandes en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Date d'expiration de la demande</th>
                                <th>Valider l'échange</th>
                                <th>Renouveler la demande</th>
                                <th>Supprimer la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in user.demands" v-if="demand.state==0">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description | summary  }}</td>
                                <td>{{ demand.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-validation-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-renouveler-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Renouveler</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-demande-title', params: { id:user.id, title:demand.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas de demande en cours.</h3>
                </div>
                <div v-if="user.offers.length>0">
                    <h3>Vos offres en cours</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Date d'expiration de l'offre</th>
                                <th>Valider l'échange</th>
                                <th>Renouveler l'offre</th>
                                <th>Supprimer l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in user.offers"  v-if="offer.state==0">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description | summary }}</td>
                                <td>{{ offer.expirationDate | dateFormat }}</td>
                                <td><router-link tag="a" :to="{ name:'member-id-validation-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Valider</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-renouveler-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Renouveler</button></router-link></td>
                                <td><router-link tag="a" :to="{ name:'member-id-supprimer-offre-title', params: { id:user.id, title:offer.id }}" exact><button class="see-more-button">Supprimer</button></router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <h3>Vous n'avez pas d'offre en cours.</h3>
                </div>

                
            </div>
        </client-only>
    </div>
    
</template>

<script>  
import userQuery from '~/apollo/queries/user/user'
import demandQuery from '~/apollo/queries/demand/demand'
import offerQuery from '~/apollo/queries/offer/offer'

export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            demand: Object,
            login: true
        }
    },
    apollo: {
        user: {
            prefetch: true,
            query: userQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
}
</script>  

<style>

</style>