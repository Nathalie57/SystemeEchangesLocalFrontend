<template>  
  <div>
    <div class="table-container">
        <h2>Inscrivez-vous au SEL de Mâcon</h2>
        <form method="POST" @submit.prevent="register">
            <p>
                <label>Nom</label><br/>
                <input type="text" v-model="lastname" required>
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
          this.$router.push({path: '/connexion'})
        })
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>