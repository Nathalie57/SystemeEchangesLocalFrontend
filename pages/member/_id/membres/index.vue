<template>
    <div>
        <client-only>
        <div v-if="login">
            <div class="table-container">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres'}" exact>Liste des membres</router-link></li>
                </ul>
                <h2>Bonjour {{ user.username }} !</h2>
                <table v-if="users">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Date d'inscription</th>
                            <th>Email</th>
                            <th>Numéro de téléphone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td>{{ user.firstname }} {{ user.lastname }}</td>
                            <td>{{ user.registrationDate | dateFormat }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phonenumber }}</td>
                            <td><router-link tag="a" :to="{ name:'member-id', params: { id:user.id }}" exact>Voir les offres et les demandes</router-link></td>
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
import usersQuery from '~/apollo/queries/user/users'
import userQuery from '~/apollo/queries/user/user'

export default {  
    layout: 'withCategories',
    data() {
        return {
            users: Object,
            login: true
        }
    },
    apollo: {
        users: {
            prefetch: true,
            query: usersQuery,
        },
        user: {
            prefetch: true,
            query: userQuery,
            variables () {
                return { id: this.$route.params.id }
            }
        }
    }
}
</script>