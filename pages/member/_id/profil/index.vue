<template>   
    <div>
        <client-only>
            <div class="table-container">
                <ul class="member-menu">
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-profil', params: { id:user.id }}" exact>Mon profil</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-dashboard', params: { id:user.id }}" exact>Gérer mes offres et demandes en cours</router-link></li>
                    <li class="blue-text"><router-link tag="a" :to="{name:'member-id-echanges', params: { id:user.id }}" exact>Gérer mes échanges</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-creer-offre', params: { id:user.id }}" exact>Déposer une offre</router-link></li>
                    <li class="green-text"><router-link tag="a" :to="{name:'member-id-creer-demande', params: { id:user.id }}" exact>Déposer une demande</router-link></li>
                    <li class="orange-text"><router-link tag="a" :to="{name:'member-id-membres', params: { id:user.id }}" exact>Liste des membres</router-link></li>

                </ul>
                <h2>Bonjour {{ user.username }} !</h2>
                <h2 v-if="user.walletAmount!=null">Contenu de votre porte-monnaie : {{user.walletAmount }} grains de sel</h2>
                <div v-else>Votre porte-monnaie est vide</div>
                <h2>Date d'inscription:</h2><p>{{ user.registrationDate | dateFormat }}
                <h2>Votre profil :</h2>
                    <p>Nom : {{ user.lastname }}</p>
                    <p>Prénom : {{ user.firstname }}</p>
                    <p>Pseudo : {{ user.username }}</p>
                    <p>Date de naissance : {{ user.birthday | dateFormat }}</p>
                <h2>Vos coordonnées :</h2>
                    <p>Adresse : {{ user.address}}</br>
                                 {{ user.zip}} {{ user.town }}</p>
                    <p>Numéro de téléphone : {{ user.phonenumber}}</p>
                    <p>Email : {{ user.email }}</p>
                    </br>
                <button>Modifier votre profil</button>
            </div>
        </client-only>
    </div>
</template>

<script>  
import userQuery from '~/apollo/queries/user/user'

import axios from 'axios';


export default {  
    layout: 'withCategories',
    data() {
        return {
            user: Object,
            login: true
        }
    },
    apollo: {
        user: {
            prefetch: true,
            query: userQuery,
            variables () {
                return { id: this.$route.params.id }
            },
        }
    },
    

   
}
</script>

<style>
  .member-menu-container{
    display: flex;
    width: 100px;
    position: absolute;
    margin-top:17%;
    margin-left:30%;
    padding:5px; 
	text-align:left;	
    top: 150px;
    left: 200px;
}</style