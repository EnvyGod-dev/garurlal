async function handleLogin(event) {
    event.preventDefault(); // Prevents form submission from reloading the page

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Бүх талбарыг бөглөнө үү!");
        return;
    }

    // Prepare login data
    const data = {
        username: username,
        password: password,
    };

    try {
        // Make the POST request to the login endpoint
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Check for server response
        if (!response.ok) {
            const error = await response.json();
            alert(`Нэвтрэх амжилтгүй: ${error.message}`);
            return;
        }

        const result = await response.json();
        console.log(result)

        // Handle success
        alert(`Нэвтрэх амжилттай!\nТавтай морил, ${result.username}`);
        // Redirect to the homepage or dashboard
        window.location.href = "/frontend/screens/productscreen.html";
    } catch (error) {
        alert("Сервертэй холбогдох үед алдаа гарлаа!");
        console.error("Error:", error);
    }
}

function redirectToRegister() {
    // Redirect to the registration page
    window.location.href = "/frontend/screens/signupscreen.html";
}
