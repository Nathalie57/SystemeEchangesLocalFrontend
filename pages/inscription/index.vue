<template>  
  <div>
    <div class="form-container">
        <h2>Inscrivez-vous au SEL de Mâcon</h2>
        <form @submit.stop.prevent="handleSubmit">
            <p>
                <label>Nom</label><br/>
                <input type="text" v-model="memberName" required autofocus>
                <span id="errorName"></span>
            </p>
            <p>
                <label>Prénom</label><br/>
                <input type="text" v-model="memberFirstname" required>
            </p>
            <p>
                <label>Pseudo</label><br/>
                <input type="text" v-model="pseudo" required><br/>
            </p>
            <p>
                <label>Date de naissance</label><br/>
                <input type="date" v-model="memberBirthday" placeholder="14/01/1982" required>
            </p>    
            <p>
                <label>Numéro de téléphone</label><br/>
                <input type="text" v-model="memberPhoneNumber" placeholder="0698765432" onFocus="this.placeholder=''" required>
            </p> 
            <p>
                <label>Adresse email</label><br/>
                <input type="text" v-model="memberEmail" placeholder="exemple@domaine.com" onFocus="this.placeholder=''" required>
            </p>    
            <p>
                <label>Adresse</label><br/>
                <input type="text" v-model="memberAddress" placeholder="23, rue des Acacias" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Ville</label><br/>
                <input type="text" v-model="memberTown" placeholder="Mâcon" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Code postal</label></br>
                <input type="text" v-model="memberZip" placeholder="71000" onFocus="this.placeholder=''" required>
            </p>
            <p>
                <label>Mot de passe</label><br/>
                <input type="password" v-model="password"  required><br/>
                <span id="passwordMessage"></span>
            </p>
            <p>
                <label>Confirmation du mot de passe</label><br/>
                <input type="password" v-model="secondPassword" required> 
            </p>  
            <button :disabled="loading" type="submit">Valider</button>
        </form>  
      </div>
  </div>
</template>  

<script>

//import securityPassword from '~/plugins/securityPassword'

import { mapMutations } from 'vuex'  
import strapi from '~/utils/Strapi'

export default{
  data() {
    return {
      memberName: '',
      memberFirstname: '',
      pseudo: '',
      memberBirthday: '',
      memberPhoneNumber: '',
      memberEmail: '',
      memberAddress: '',
      memberTown: '',
      memberZip: '',
      password: '',
      secondPassword: '',
      loading: false
    }
  },
//  mounted: {
//    this.$securityPassword()
//  }
/*v-on:input="securityPassword"*/ 
methods: {
    // Method that will register your users
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.register(
          this.memberName,
          this.memberFirstname,
          this.pseudo,
          this.memberBirthday,
          this.memberPhoneNumber,
          this.memberEmail,
          this.memberAddress,
          this.memberTown,
          this.memberZip,
          this.password
        )
        this.loading = false
        // Call your setUser mutation from your auth.js store file
        this.setMember(response.member)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setMember: 'auth/setMember'
    })
  }
}


</script>

<style>
.form-container { 
	  width: 600px;
    top:20px;
    background: rgb(89, 178, 200, 0.2);
    color:rgb(89, 178, 200);
    position: absolute;
    margin-top:17%;
    margin-right:30%;
    margin-left:10%;
    padding:5px; 
	  text-align:left;	
	}
</style>