"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons

export default function SignIn() {
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [usernameBlurred,setUsernameBlurred] = useState(false);
  const router=useRouter();

  // Validation logic
  const emailError = !/\S+@\S+\.\S+/.test(email);
  const passwordError = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/.test(password);


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100 signin-container">
      <div className="card signin-card">
        <div className="card-body p-4">
          {/* Header */}
          <h1 className="card-title text-center mb-2 signin-title">
            Envelope Manager
          </h1>
          <p className="text-center text-muted mb-3 signin-subtitle">
            Welcome to Envelope Manager Platform. Please sign in to your account.
          </p>

          {/* Username Input */}
          <div className="mb-3 position-relative">
            <input
              type="text"
              className={`form-control signin-input ${usernameBlurred ? (username ? "is-valid" : "is-invalid") : ""}`}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setUsernameBlurred(true)}
            />
            <div
              className="invalid-feedback signin-feedback"
              style={{ display: usernameBlurred && !username ? "block" : "none" }}
            >
              Enter your full name.
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-3 position-relative">
            <input
              type="email"
              className={`form-control signin-input ${email ? (emailError ? "is-invalid" : "is-valid") : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className="invalid-feedback signin-feedback"
              style={{ display: email && emailError ? "block" : "none" }}
            >
              Please enter a valid email address.
            </div>
          </div>

          {/* Password Input with Eye Icon */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control signin-input password-input ${password ? (passwordError ? "is-invalid" : "is-valid") : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
             
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
            <div
              className="invalid-feedback signin-feedback"
              style={{ display: password && passwordError ? "block" : "none" }}
            >
              Password must be 6+ characters with uppercase, lowercase, number, and special character.
            </div>
          </div>

          {/* Sign In Button */}
          <button className=" w-100 signin-btn" onClick={()=>router.push("./VerifyEmail")}>Create Account</button>

          {/* Sign Up Link */}
          <p className="text-center text-muted mt-3 signin-signup">
            Already have an account?{" "}
            <Link href="/" className="signin-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}