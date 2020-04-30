<template>
    <div>
        <client-only>
        <div v-if="login">
            <div class="table-container" v-if="members">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:member.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:member.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:member.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:member.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:member.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:member.id }}" exact>Liste des membres</router-link></li>
                </ul>            
                <table>
                    <thead>
                        <tr>
                            <th>Pseudo</th>
                            <th>Date d'inscription</th>
                            <th>Email</th>
                            <th>Numéro de téléphone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in members">
                            <td>{{ member.pseudo }}</td>
                            <td>{{ member.registrationDate }}</td>
                            <td>{{ member.email }}</td>
                            <td>{{ member.phonenumber }}</td>
                            <td><router-link tag="a" :to="{ name:'member-id', params: { id:member.id }}" exact>Voir les offres et les demandes</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else class="table-container">
            <p><router-link tag="a" to="/connexion" exact>Connectez-vous</router-link> pour voir les offres et les demandes des membres</p>
        </div>
        </client-only>
    </div>
    
</template>

<script>  
import membersQuery from '~/apollo/queries/member/members'
import memberQuery from '~/apollo/queries/member/member'

export default {  
    layout: 'withCategories',
    data() {
        return {
            members: Object,
            login: true
        }
    },
    apollo: {
        members: {
            prefetch: true,
            query: membersQuery,
        },
        member: {
            prefetch: true,
            query: memberQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    }
}
</script>