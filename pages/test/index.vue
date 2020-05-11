<template>
    <div>
    <div class="table-container">
      <div class="form-container">
        <form @submit.prevent="addUser">
            <p>
              <label>Votre identifiant</label>
              <input type="text" v-model="email" required>
            </p>
            <p>
              <label>Votre pseudo</label>
              <input type="text" v-model="username" required>
            </p>
            </p>
              <label>Votre mot de passe</label>
              <input type="password" v-model="password" required>
            </p>
    
            
            <button type="submit">Submit</button>
        </form>
       </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default { 
    data() {
    return {
      username: '',
      email:'',
      password:'',
      jwt:'',
      errors: []
    }
  },

methods: {
    addUser() {
      axios.post('http://localhost:1337/auth/local/register',{
            username: this.username,
            email: this.email,
            password: this.password,
      })
        .then((Response) => {
            axios.post('http://localhost:1337/tokens',{
                token: this.jwt
            })
            
           .then(response => {
                // Handle success.
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