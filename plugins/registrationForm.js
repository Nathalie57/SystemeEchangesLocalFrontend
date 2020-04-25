class RegistrationForm{
    constructor(target){
        let registrationForm = document.createElement("section");
        let buttonName = "Valider l'inscription";
        registrationForm.innerHTML = `
        <h2>Inscrivez-vous au SEL de Mâcon</h2>
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
            <input type="password" v-model="password" required><br/>
            <span id="passwordMessage"></span>
        </p>
        <p>
            <label>Confirmation du mot de passe</label><br/>
            <input type="password" v-model="secondPassword" required> 
        </p> 
        `;
        
        new SubmitButton(registrationForm, buttonName, target.firstChild);
        target.insertBefore(registrationForm, target.firstChild);

        //Vérification sécurité password
        document.getElementById("password").addEventListener("input", function(e) {
            let password = e.target.value;
            let highRegex = /^(?=.{12,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
            let midRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
            let passwordSecurity = "faible";
            let messageColor = "red";
            
            if (highRegex.test(password)) {
                passwordSecurity = "excellente";
                messageColor = "green";
            } 
            else if (midRegex.test(password)) {
                passwordSecurity = "moyenne";
                messageColor = "orange";
            }

        let passwordMessage = document.getElementById("passwordMessage");
        passwordMessage.textContent = "Sécurité : " + passwordSecurity;
        passwordMessage.style.color = messageColor;
        });

        this.submitButton.onclick = this.validateForm();
    }

    validateForm(){
        //Vérification numéro de téléphone principal
        document.getElementById("userPhoneNumber").addEventListener("input", function(e) {
            let userPhoneNumber = e.target.value;
            let regex = /[0-9]{10}/;
            
            if (!regex.test(userPhoneNumber)){
                alert("Le numéro entré n\'est pas au bon format");
                userPhoneNumber.focus();
            }
        });
  
        //Vérification email
        document.getElementById("userEmail").addEventListener("input", function(e) {
            let userEmail = e.target.value;
            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
            
            if (!regex.test(userEmail)){
            alert("L'email n\'est pas au bon format");
            userEmail.focus();
            }
        });
  
        //Vérification de la ville
        //Vérification du code postal
        
        //Vérification confirmation password
        document.getElementById("secondPassword").addEventListener("input", function(e) {
            let secondPassword = e.target.value;
            let password = document.getElementById("password");
            let validated = false;
  
            if(password==''){
                alert("Veuillez entrer un mot de passe")
                password.focus()
            }
  
            else if(secondPassword==''){
                alert("Veuillez confirmer votre mot de passe");
                secondPassword.focus();
            }
                
            else if(password.value!=secondPassword.value){
                alert("Les mots de passe ne sont pas identiques")
                secondPassword.focus()
            }
  
            else validated=true;
            return validated;
       });
    }
} 