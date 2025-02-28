import { baseURL } from "./Base.js";

// to get login user data from login Page
let loginData = JSON.parse(localStorage.getItem("loginData"));
// to check if user is logged in
if (loginData == null) {
  //yes

  alert("Please Login to Continue");
  window.location.href = "Login.html";
} else {
  //no
  console.log(loginData);

  document.getElementById(
    "user-name"
  ).textContent = ` Welcome, ${loginData.username}`;
}

// to logout and go to home page
document.getElementById("Logout").addEventListener("click", function () {
  localStorage.removeItem("loginData");
  alert("Redirecting to Home Page...");
  window.location.href = "index.html";
});

// to get todo task from user and oput in backend
let form = document.getElementById("form");
form.addEventListener("submit", function () {
  event.preventDefault();
  let Title = form.Title.value;
  let Deadline = form.Deadline.value;
  let Priority = form.Priority.value;
  console.log(Title, Deadline);
  let todoObj = { Title, Deadline, Priority, UserId: loginData.id };

  // push this to todo data in backend
  fetch(`${baseURL}/Todo`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todoObj),
  })
    .then(() => {
      alert("Todod added, please refresh the screen to display it");
    })
    .catch((err) => {
      alert("soething went wrong");
      console.log(err);
    });
});





// to display todo data
getTodo();
async function getTodo() {
  try {
    let res = await fetch(`${baseURL}/Todo`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    alert("something went wrong in displaying todo");
  }
}

function displayTodo(arr) {
  let cont = document.getElementById("Todo-Cont");
  cont.innerHTML = "";

  arr.map((el, i) => {
    let card = document.createElement("div");
    card.setAttribute("class", "todo-card");

    let Title = document.createElement("h4");
    Title.textContent = ` Title: ${el.Title}`;

    let Deadline = document.createElement("h5");
    Deadline.textContent = `Deadline: ${el.Deadline}`;

    let Priority = document.createElement("h5");
    Priority.textContent = `Priority: ${el.Priority}`;

    let status = document.createElement("h4");
    status.textContent =
      el.status == true ? "Status - Completed" : "Status - Pending";
    console.log(el.status);

    let UpdateStatusBtn = document.createElement("button");
    UpdateStatusBtn.textContent = "Togle Satus";

    UpdateStatusBtn.addEventListener("click", function () {
      updateStatusfun(el, i);
    });

    //to delete todo
    let DeleteBtn = document.createElement("button");
    DeleteBtn.textContent = "Delete Todo";

    DeleteBtn.addEventListener("click", function () {
      DeleteTodofun(el, i);
    });

    card.append(Title, Priority, Deadline, status, UpdateStatusBtn, DeleteBtn);
    cont.append(card);
  });
}
window.onload = async () => {
  let arr = await getTodo();
  displayTodo(arr);
};

 //to change the status of todo
function updateStatusfun(el, i) {
  console.log("before", el);
  let updateTodo = { ...el, status: !el.status };
  console.log("after", updateTodo);

  // to add or update changes in backend
  let todoID = el.id;
  fetch(`${baseURL}/Todo/${todoID}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateTodo),
  })
    .then(() => {
      alert("Todo Status updated");
      window.location.reload();
    })
    .catch((err) => {
      alert("Something went wrong in updating todo status");
      console.log(err);
    });
}


// to delete todo
function DeleteTodofun(el, i) {
  let deleteID = el.id;
  fetch(`${baseURL}/Todo/${deleteID}`, {
    method: "DELETE",
  })
    .then(() => {
      alert("Todo Deleted");
      window.location.reload();
    })
    .catch((err) => {
      alert("Something went wrong in todo status");
      console.log(err);
    });
}
