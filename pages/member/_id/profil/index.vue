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
                <h2 v-if="member.walletAmount!=null">Contenu de votre porte-monnaie : {{member.walletAmount }} grains de sel</h2>
                <div v-else>Votre porte-monnaie est vide</div>
                <h2>Date d'inscription:</h2><p>{{ member.registrationDate | dateFormat }}
                <h2>Votre profil :</h2>
                    <p>Nom : {{ member.lastname }}</p>
                    <p>Prénom : {{ member.firstname }}</p>
                    <p>Pseudo : {{ member.pseudo }}</p>
                    <p>Date de naissance : {{ member.birthday | dateFormat }}</p>
                <h2>Vos coordonnées :</h2>
                    <p>Adresse : {{ member.address}}</br>
                                 {{ member.zip}} {{ member.town }}</p>
                    <p>Numéro de téléphone : {{ member.phonenumber}}</p>
                    <p>Email : {{ member.email }}</p>
                    </br>
                <button>Modifier votre profil</button>
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