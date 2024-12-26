import { baseURL } from "./Base.js"


// to get login user data from login Page
let  loginData = JSON.parse(localStorage.getItem("loginData"))
// to check if user is logged in
if(loginData==null){
    //yes

    alert("Please Login to Continue")
    window.location.href = "Login.html"
}
else{
    //no
    console.log(loginData)


    document.getElementById("user-name").textContent = ` Welcome, ${loginData.username}`
}

// to logout and ggo to home page
document.getElementById("Logout").addEventListener("click", function(){
    localStorage.removeItem("loginData")
    alert("Redirecting to Home Page...")
    window.location.href = "index.html"
})

// to get todo task
let form = document.getElementById("form")
form.addEventListener("submit", function(){
    event.preventDefault();
    let Title = form.Title.value;
    let Deadline= form.Deadline.value;
   let Priority = form.Priority.value;
  console.log(Title , Deadline)
   let todoObj = { Title , Deadline, Priority, UserId: loginData.id}
    
   
   // push this to todo data in backend
   fetch(`${baseURL}/Todo`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(todoObj)
   }).then(()=>{
    alert("Todod added")
   }).catch((err)=>{
    alert("soething went wrong");
    console.log(err)
   })

})

// to display todo data
  getTodo()
async function getTodo() {
     try{
      let res = await fetch(`${baseURL}/Todo`);
      let data = await  res.json();
      return data;

     }catch(err){
        console.log(err)
        alert("something went wrong in displaying todo")
     }
}

function displayTodo(arr){
    let cont = document.getElementById("Todo-Cont")
     cont.innerHTML = "";

     arr.map((el, i )=>{
        let card = document.createElement("div")
        card.setAttribute("class", "todo-card")

        let Title  = document.createElement("h4");
        Title.textContent  = ` Title: ${el.Title}`

        let Deadline = document.createElement("h5");
        Deadline.textContent = `Deadline: ${el.Deadline}`

        let Priority = document.createElement("h5")
        Priority.textContent = `Priority: ${el.Priority}`

       let status  = document.createElement("h4")
       status.textContent = el.status==true? "Status- Completed":"Status- Pending";

       card.append(Title, Priority, Deadline, status)
       cont.append(card)
     }) 
}

window.onload = async () => {
     let arr = await getTodo();
     displayTodo(arr)
};