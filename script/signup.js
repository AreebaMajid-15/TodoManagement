import { baseURL } from "./Base.js";
// to fetch user data from form
 let form = document.getElementById("form")
 form.addEventListener("submit", function(){
    event.preventDefault()
    let username = form.username.value ;
    let email = form.email.value ;
    let password = form.password.value;
    let gender = form.gender.value;
    let mobile = form.number.value;
    alert("signup success")
    let Userobj ={username,email,password,gender,mobile}

    // to check existing user from data 
  fetch(`${baseURL}/users`)
  .then((res)=> res.json())
  .then((data)=>{
    let user = data.filter((el,i)=> el.email==email)
    if(user.length>0){
        //user present
        alert("User already exit, Please login")
        window.location.href = "Login.html"

    }
    else{
     // user not present
          fetch(`${baseURL}/users`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(Userobj)
          }).then(()=>{
            alert("Sinup succesfull")
            window.location.href = "Login.html"
          });
    }
  }).catch((err)=>{
    console.log(err)
    alert("Something went wrong, please try again")
  })
 })

  
