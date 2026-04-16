// Frontend API helper to communicate with the Express Backend
const BACKEND_URL = "http://localhost:5000/api";

export async function fetchProducts() {
  try {
    const response = await fetch(`${BACKEND_URL}/items`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching connecting to backend:", error);
    return [];
  }
}

export async function registerUser(userData) {
  try {
    const response = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to register user");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Save user info to localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", data.username);
    localStorage.setItem("email", data.email);

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
}
