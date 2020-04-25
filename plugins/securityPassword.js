import Vue from 'vue'

function securityPassword(){
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
}