// let loginbtn=document.querySelector(".log-btn");

// loginbtn.addEventListener("click",()=>{
//     console.log("Hello Everybody");
// });


// Register From
let form=document.querySelectorAll("form");
let submitbtn=document.querySelector("#register-btn");


submitbtn.addEventListener("click",async function(event){
    console.log("clicked");
    event.preventDefault(); // Prevent the default form submission behavior


    // Validate form fields
    const firstname=document.querySelector("#first-name").value.trim();
    const lastname=document.querySelector("#lastName").value.trim();
    const DOB=document.querySelector("#DOB").value.trim();
    const Gender=document.querySelector("#Gender").value.trim();
    const phone=document.querySelector("#Mobile-No").value.trim();
    const Email=document.querySelector("#Email").value.trim();
    const User=document.querySelector("#username").value.trim();
    const Pass=document.querySelector("#create-password").value.trim();
    const confirmPass=document.querySelector("#confirm-password").value.trim();
    const bio=document.querySelector("#bio").value.trim();
    const profession=document.querySelector("#profession").value.trim();
    
    // Checking all field is field or not 
    if(!firstname || !lastname || !DOB || !Gender || !phone || !Email || !User || !Pass || !confirmPass){
        alert("please fill all the required detail");
        return;
    }

    // Checking Email Pattern
    const emailRegx= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegx.test(Email)){
        // return res.status(400).send({message:"Invail email foemat.Please try again!"});
        alert("Invalid Email id.Please try again!");
        return;
    }

    // Matching password length
    if(Pass.length<8){
        alert("Password must be at least 8 character long.Please try again!");
        return;
    }

    //Matching password and confirm password 
    if(Pass!==confirmPass){
        alert("Password does not match.Please try again...");
        return;
    }


    try{
        // Checking email already exist.
        const checkEmailResponse= await fetch('http://localhost:3000/check-email',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:Email})
        });

        const emailCheckResult= await checkEmailResponse.json();

        if (checkEmailResponse.ok && emailCheckResult.exists){
            alert("This email is already registered.Please try different email!");
            return;
        }


        // Checking UserId already exist.
        const checkUserIdResponse= await fetch('http://localhost:3000/check-username',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username:User})
        });
        
        const UserIdResult=await checkUserIdResponse.json();

        if(checkUserIdResponse.ok && UserIdResult.exists){
            alert("This User Name is already registered.Please try different User Name!");
            return;
        }

    // // when all condition statisfy
    // alert("Registration successful! Redirecting to login page...")
    // window.location.href="login.html";
    // <script src="server.js"></script>
// });


    // Sending data to database
    const userData={
        firstName:firstname,
        lastName:lastname,
        dob:DOB,
        gender:Gender,
        mobile:phone,
        email:Email,
        username:User,
        password:Pass,
        bio:bio,
        profession:profession


    };
    // try{
        const response= await fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        alert(result.message);
        if(response.ok){
            window.location.href="login.html";
        }
    } catch(error){
        console.error('Error connecting to the server:',error);
        alert('Registration failed. Please try again later.');
    }
});




// --------------------------------------------------Login Page----------------------------------------------------------





