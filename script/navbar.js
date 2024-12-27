 
 const navbar = () => {
     let card = `<div id="nav-container"> 
     <a id=" logo" href="">May Personal app</a>
    <div id="nav-lisnks" >
        <a href="signup.html">Signup</a>
        <a href="Login.html">Login</a>
        <a href="Todos.html">Todos</a>
        <a href="Expenses.html">Expenses</a>
    </div>

</div>`

let Nav= document.getElementById("Nav")
Nav.innerHTML = card;


 }

 navbar()
