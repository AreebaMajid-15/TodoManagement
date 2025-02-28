 
 const navbar = () => {
     let card = `<div id="nav-container"> 
     <a id=" logo" href="">Personal Todo app</a>  </div>
    <div id="nav-lisnks" >
        <a href="signup.html">Signup</a>
        <a href="Login.html">Login</a>
        <a href="Todos.html">Todos</a>
    </div>

</div>`

let Nav= document.getElementById("Nav")
Nav.innerHTML = card;


 }

 navbar()
