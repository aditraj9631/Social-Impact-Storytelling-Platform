let loginform=document.querySelectorAll(".Login-form");
let logbtn=document.querySelector("#log-btn");


logbtn.addEventListener("click", async function(event) {
        console.log("clicked");
        event.preventDefault();
    
        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();
    
        // Validate inputs
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
    
        try {
            // Example fetch request to authenticate
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert("Login successful!");
                window.location.href = "realhero.html"; // Redirect on success
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    });
