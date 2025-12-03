import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWLvg-ytvMa6Rxllc9PKXVo1A9_4fT25g",
    authDomain: "aishu-boutique.firebaseapp.com",
    projectId: "aishu-boutique",
    storageBucket: "aishu-boutique.firebasestorage.app",
    messagingSenderId: "76306176416",
    appId: "1:76306176416:web:c94f6ef1db6ee06c92acc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  const loginEmail = document.getElementById("loginEmail");
  const loginPass = document.getElementById("loginPass");
  const loginSubmit = document.getElementById("loginSubmit");
  const loginMsg = document.getElementById("loginMsg");

  const signupName = document.getElementById("signupName");
  const signupEmail = document.getElementById("signupEmail");
  const signupPass = document.getElementById("signupPass");
  const signupSubmit = document.getElementById("signupSubmit");
  const signupMsg = document.getElementById("signupMsg");

  // Show login modal
  loginBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginMsg.textContent = "";
    signupMsg.textContent = "";
  });

  // Show signup modal
  signupBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    loginMsg.textContent = "";
    signupMsg.textContent = "";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Toggle forms
  showSignup.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    loginMsg.textContent = "";
  });

  showLogin.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    signupMsg.textContent = "";
  });

  // -----------------------------
  // Login
  // -----------------------------
  loginSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!loginEmail.value || !loginPass.value) {
      loginMsg.textContent = "Please fill all fields!";
      loginMsg.classList.add("text-red-500");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value);
      const user = userCredential.user;

      loginMsg.textContent = `Login successful! Welcome, ${user.displayName || "User"}`;
      loginMsg.classList.remove("text-red-500");
      loginMsg.classList.add("text-green-500");

      setTimeout(() => modal.classList.add("hidden"), 1000);
    } catch (error) {
      loginMsg.textContent = error.message;
      loginMsg.classList.add("text-red-500");
    }
  });

  // -----------------------------
  // Signup
  // -----------------------------
  signupSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!signupName.value || !signupEmail.value || !signupPass.value) {
      signupMsg.textContent = "Please fill all fields!";
      signupMsg.classList.add("text-red-500");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPass.value);
      const user = userCredential.user;

      // Update displayName
      await updateProfile(user, {
        displayName: signupName.value
      });

      signupMsg.textContent = "Signup successful! You can now login.";
      signupMsg.classList.remove("text-red-500");
      signupMsg.classList.add("text-green-500");

      setTimeout(() => {
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        signupMsg.textContent = "";
        signupName.value = "";
        signupEmail.value = "";
        signupPass.value = "";
      }, 1000);
    } catch (error) {
      signupMsg.textContent = error.message;
      signupMsg.classList.add("text-red-500");
    }
  });
});
