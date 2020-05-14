<template>
    <div>
    <div class="table-container">
      <div class="form-container">
        <form @submit.prevent="login">
            <p>
              <label>Votre identifiant</label>
              <input type="text" v-model="email" required>
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

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
export default { 
    data() {
    return {
      email:'',
      password:'',
      token : '',
      id: '',
      errors: []
    }
  },

methods: {
    login() {
      axios.post('http://localhost:1337/auth/local',{
          identifier: this.email,
          password: this.password,
      })
      
        .then((Response) => {
          
        sessionStorage.setItem("id", 2)
        sessionStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg5NDYzMzc1LCJleHAiOjE1OTIwNTUzNzV9.9S0ZdfXh3JFaYYGt0gaHiL6fQLWN5FK-r_2A9i4CPrw')
        //  this.$router.push({name: 'member-id-echanges', params: {id:response.data.user.id}}),
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>

