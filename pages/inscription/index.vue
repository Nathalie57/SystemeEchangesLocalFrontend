<template>  
  <div>
    <div class="form-container">
        <h2>Inscrivez-vous au SEL de Mâcon</h2>
        <form method="POST" @submit.prevent="register">
            <p>
                <label>Nom</label><br/>
                <input type="text" v-model="lastname" required autofocus>
                <span id="errorName"></span>
            </p>
            <p>
                <label>Prénom</label><br/>
                <input type="text" v-model="firstname" required>
            </p>
            <p>
                <label>Pseudo</label><br/>
                <input type="text" v-model="pseudo" required><br/>
            </p>
            <p>
                <label>Date de naissance</label><br/>
                <input type="date" v-model="birthday" placeholder="14/01/1982" required>
            </p>    
            <p>
                <label>Numéro de téléphone</label><br/>
                <input type="text" v-model="phonenumber" placeholder="0698765432" onFocus="this.placeholder=''" required>
            </p> 
            <p>
                <label>Adresse email</label><br/>
                <input type="text" v-model="email" placeholder="exemple@domaine.com" onFocus="this.placeholder=''" required>
            </p>    
            <p>
                <label>Adresse</label><br/>
                <input type="text" v-model="address" placeholder="23, rue des Acacias" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Ville</label><br/>
                <input type="text" v-model="town" placeholder="Mâcon" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Code postal</label></br>
                <input type="text" v-model="zip" placeholder="71000" onFocus="this.placeholder=''" required>
            </p>
             <p>
                <label>Pays</label></br>
                <input type="text" v-model="country" placeholder="France" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Mot de passe</label><br/>
                <input type="password" v-model="password"  required><br/>
                <span id="passwordMessage"></span>
            </p>
            
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>  

<script>

//import securityPassword from '~/plugins/securityPassword'

//import { mapMutations } from 'vuex'  
import gql from 'graphql-tag'

export default{
  name: 'Register',
  data() {
    return {
      lastname: '',
      firstname: '',
      pseudo: '',
      birthday: '',
      phonenumber: '',
      email: '',
      address: '',
      town: '',
      zip: '',
      country: '',
      password: '',
     // secondPassword: '',
      errors: [],
    }
  },

  methods: {
    register (event) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation (
              $lastname: String
              $firstname: String
              $pseudo: String!
              $birthday: DateTime
              $phonenumber: String
              $email: String
              $address: String
              $town: String
              $zip: String
              $country:String
              $password: String
            ){
                createMember(input: {
                    data: {
                        lastname: $lastname
                        firstname: $firstname
                        pseudo: $pseudo
                        birthday: $birthday
                        phonenumber: $phonenumber
                        email: $email
                        address: $address
                        town: $town
                        zip: $zip
                        country: $country
                        password: $password
                    }
                }) {
                    member{
                        id
                        lastname
                        firstname
                        pseudo
                        birthday
                        phonenumber
                        email
                        address
                        town
                        zip
                        password
                    }
                }
            }
          `,
          variables: {
            lastname: this.lastname,
            firstname: this.firstname,
            pseudo: this.pseudo,
            birthday: this.birthday,
            phonenumber: this.phonenumber,
            email: this.email,
            address: this.address,
            town: this.town,
            zip: this.zip,
            country: this.country,
            password: this.password
          }
        })
         .then((data) => {
          event.target.reset()
        })
        .catch((e) => {
          this.errors = e.graphQLErrors
        })
    }
  }
}
//  mounted: {
//    this.$securityPassword()
//  }
/*v-on:input="securityPassword"*/ 
</script>

<style>
.form-container { 
	  width: 800px;
    top:20px;
    color:rgb(89, 178, 200);
    position: absolute;
    margin-top:17%;
    margin-left:30%;
    padding:5px; 
	  text-align:left;	
	}
  </style>