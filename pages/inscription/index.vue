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
                <input type="text" v-model="username" required><br/>
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
                <input type="email" v-model="email" placeholder="exemple@domaine.com" onFocus="this.placeholder=''" required>
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
                <label>Mot de passe</label><br/>
                <input type="password" v-model="password" required><br/>
                <span id="passwordMessage"></span>
            </p>
            
            <button type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>  

<script>

import gql from 'graphql-tag'

import axios from 'axios';

export default { 
    data() {
    return {
      lastname:'',
      firstname:'',
      username: '',
      birthday:'',
      phonenumber:'',
      email:'',
      address:'',
      town:'',
      zip:'',
      password:'',
      token:'',
      errors: []
    }
  },

methods: {
    register() {
      axios.post('http://localhost:1337/auth/local/register',{
            lastname: this.lastname,
            firstname: this.firstname,
            username: this.username,
            birthday: this.birthday,
            phonenumber: this.phonenumber,
            email: this.email,
            address: this.address,
            town: this.town,
            zip: this.zip,
            password: this.password,
            token: this.token
            //jwt: this.jwt
      })
        .then((Response) => {
            axios.post('http://localhost:1337/tokens',{
                token: this.jwt
            })
            
           .then(response => {
                // Handle success.
                this.$router.push({path: '/connexion'}),
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
            });
        })
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>
/*export default{
  name: 'Register',
  data() {
    return {
      lastname: '',
      firstname: '',
      username: '',
      birthday: '',
      phonenumber: '',
      email: '',
      address: '',
      town: '',
      zip: '',
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
              $username: String!
              $birthday: DateTime
              $phonenumber: String
              $email: String!
              $address: String
              $town: String
              $zip: String
              $password: String
            ){
                createUser(input: {
                    data: {
                        lastname: $lastname
                        firstname: $firstname
                        username: $username
                        birthday: $birthday
                        phonenumber: $phonenumber
                        email: $email
                        address: $address
                        town: $town
                        zip: $zip
                        password: $password
                        confirmed: true
                    }
                }) {
                    user{
                        id
                        lastname
                        firstname
                        username
                        birthday
                        phonenumber
                        email
                        address
                        town
                        zip
                        confirmed
                        
                    }
                }
            }
          `,
          variables: {
            lastname: this.lastname,
            firstname: this.firstname,
            username: this.username,
            birthday: this.birthday,
            phonenumber: this.phonenumber,
            email: this.email,
            address: this.address,
            town: this.town,
            zip: this.zip,
            password: this.password
          }
        })
        .then((data) => {
          event.target.reset(),
          this.$router.push({path: '/connexion'}),
          window.alert('Votre inscription a bien été prise en compte !');
        })
        .catch((e) => {
          if (!this.validPhonenumber(this.phonenumber)) {
          this.errors.push('Entrez un numéro de téléphone valide');
          this.errors = e.graphQLErrors;
      }
        })
    },
    validPhonenumber(phonenumber) {
      var regex = /[0-9]{10}/;
      return regex.test(phonenumber);
    }
  }
}*/
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