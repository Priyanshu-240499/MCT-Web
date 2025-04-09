// Signup Logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) return alert("All fields required!");

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}
