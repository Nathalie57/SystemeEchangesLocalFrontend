<template>
    <div>
        <client-only>
            <div class="table-container">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:member.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:member.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:member.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:member.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:member.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:member.id }}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ member.pseudo }} !</h2>
                <h2>Echanges en attente de confirmation</h2>
                <div v-if="member.demands && member.demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par la demande</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands" v-if="demand.state==0">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>{{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>
                <div v-if="member.demands && member.demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par l'offre</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in member.offers" v-if="offer.state==0">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>{{ offer.amount }} grains de sel</td>
                                <td>{{ offer.memberExchange.pseudo }}</td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>
                <h2>Echanges à valider</h2>
                <div v-if="demands && demands.length>0">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre ayant publié la demande</th>
                                <th>Valider l'échange</th>
                                <th>Annuler l'échange</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in demands" v-if="demand.memberExchange && demand.memberExchange.id==member.id">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>{{ demand.amount }} grains de sel</td>
                                <td>{{ demand.member.pseudo }}</td>
                                <td><button class="see-more-button">Valider</button></td>
                                <td><button class="see-more-button">Annuler</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas d'échange en cours.</p>
                </div>
                <h2>Echanges réalisés</h2>
                <div v-if="member.demands">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Demande</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par la demande</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="demand in member.demands" v-if="demand.memberExchange && demand.state==1">
                                <td>{{ demand.title }}</td>
                                <td>{{ demand.description }}</td>
                                <td>{{ demand.amount }} grains de sel</td>
                                <td>{{ demand.memberExchange.pseudo }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas encore finalisé d'échange.</p>
                </div>
                <div v-if="member.offers">                    
                    <table>
                        <thead>
                            <tr>
                                <th>Offre</th>
                                <th>Description</th>
                                <th>Montant</th>
                                <th>Membre concerné par l'offre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="offer in member.offers" v-if="offer.memberExchange && offer.state==1">
                                <td>{{ offer.title }}</td>
                                <td>{{ offer.description }}</td>
                                <td>{{ offer.amount }} grains de sel</td>
                                <td>{{ offer.memberExchange.pseudo }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p>Vous n'avez pas encore finalisé d'échange.</p>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>  
import memberQuery from '~/apollo/queries/member/member'
import demandsInWaitQuery from '~/apollo/queries/demand/demandsInWait'

export default {  
    layout: 'withCategories',
    data() {
        return {
            member: Object,
            demands: Object,
            login: true,
          //  memberExchange:this.member.id
        }
    },
    apollo: {
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        },
        demands: {
            prefetch: true,
            query: demandsInWaitQuery,
            
        },
    }
}
</script>