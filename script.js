(function() {
    const strengthMeter = document.getElementById("strength-meter");
    const passwordInput = document.getElementById("password-input");
    const reasonsContainer = document.getElementById("reasons");

    passwordInput.addEventListener("input", updateStrengthMeter);
    
    function updateStrengthMeter() {
        let password = passwordInput.value;

        const weaknesses = calculatePasswordStrength(password);
       
        
        let strength = 100;

        reasonsContainer.innerHTML = "";

        weaknesses.forEach(weakness => {
            console.log(weakness)
            if (weakness == null) return;
            strength -= weakness.deduction;
            
            const messageEl = document.createElement("div");
            messageEl.innerText = weakness.message;
            reasonsContainer.appendChild(messageEl);
        })

       

        strengthMeter.style.setProperty("--strength", strength);

        if (strength > 60) {
            strengthMeter.style.setProperty("--bg-color", "green");
        } else {
            strengthMeter.style.setProperty("--bg-color", "red");
        }
    }

    function calculatePasswordStrength(password) {
        const weaknesses = [];

        weaknesses.push(lengthWeakness(password));
        weaknesses.push(lowercaseWeakness(password));
        weaknesses.push(uppercaseWeakness(password));
        weaknesses.push(numberWeakness(password));
        weaknesses.push(specialCharactersWeakness(password));
        weaknesses.push(repeatCharacterWeakness(password));

        return weaknesses;
    }

    function lowercaseWeakness(password) {
        return characterTypeWeakness(password, /[a-z]/g, 'lowercase');
    }

    function uppercaseWeakness(password) {
        return characterTypeWeakness(password, /[A-Z]/g, 'uppercase');
    }

   

    function numberWeakness(password) {
        return characterTypeWeakness(password, /[0-9]/g, 'numbers');
    }

    function specialCharactersWeakness(password) {
        return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special');
    }

    function lengthWeakness(password) {
        const length = password.length;

        if (length <= 5) {
            return {
                message: "your password is too short",
                deduction: 40,
            }
        }

        if (length <= 10) {
            return {
                message: "your password could be longer",
                deduction: 15,
            }
        }
    }

    function repeatCharacterWeakness(password) {
        const matches = password.match(/(.)\1/g) || [];

        if (matches.length > 0) {
            return {
                message: "your password has repeated characters",
                deduction: matches.length * 10,
            }
        }
    }

    function characterTypeWeakness(password, regex, type) {
        const matches = password.match(regex) || [];

        if (matches.length === 0) {
            return {
                message: `your password should contain ${type} characters`,
                deduction: 20,
            }
        }

        if (matches.length <= 2) {
            return {
                message: `your password could use more of ${type} characters`,
                deduction: 5,
            }
        }
        
    }
})();