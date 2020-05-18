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
      
      .then((response) => {
        
        sessionStorage.setItem("sel_id", response.data.user.id);
        sessionStorage.setItem("sel_token", response.data.jwt);
        /*console.clear();
        console.log("kjlkjlkj", response.data.user.id);*/
        this.$router.push({name: 'member-id-echanges', params: {id:response.data.user.id}});
          
        /*console.log('Well done!');
          console.log('User profile', response);
          console.log('User token', response.data.jwt);*/
      })
      .catch((err) => {
        this.errors.push(err)
      })
    }
  }
}
</script>

