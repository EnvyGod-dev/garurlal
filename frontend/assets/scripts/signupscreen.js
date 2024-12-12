document.getElementById("login-form").addEventListener("submit", handleSignup);

async function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmpassword").value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert("Бүх талбарыг бөглөнө үү!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Зөв и-мэйл хаяг оруулна уу!");
        return;
    }

    if (password.length < 6) {
        alert("Нууц үг хамгийн багадаа 6 тэмдэгттэй байх ёстой!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Нууц үг давхцахгүй байна!");
        return;
    }

    // Backend API Call
    const data = {
        username: username,
        email: email,
        password: password,
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(`Бүртгэл амжилтгүй: ${error.message}`);
            return;
        }

        const result = await response.json();
        alert(`Бүртгэл амжилттай: ${result.message}`);
        window.location.href = "/frontend/screens/loginscreen.html";
    } catch (error) {
        alert("Сервертэй холбогдох үед алдаа гарлаа!");
        console.error("Error:", error);
    }
}

function redirectToLogin() {
    // Redirect to the registration page
    window.location.href = "/frontend/screens/loginscreen.html";
}