"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons

export default function SignIn() {
  const [username,setUsername] = useState("");
 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [usernameBlurred,setUsernameBlurred] = useState(false);
  const router=useRouter();

  // Validation logic

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
            Check your email for the verification code and enter it here
          </p>

          {/* Username Input */}
          <div className="mb-3 position-relative">
            <input
              type="text"
              className={`form-control signin-input ${usernameBlurred ? (username ? "is-valid" : "is-invalid") : ""}`}
              placeholder="Verification Code"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setUsernameBlurred(true)}
            />
            <div
              className="invalid-feedback signin-feedback"
              style={{ display: usernameBlurred && !username ? "block" : "none" }}
            >
              Enter the Verification Code.
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
              Password must contain atleast 8 characters including numbers, symbols, uppercase and lowercase letters.
            </div>
          </div>

          {/* Sign In Button */}
          <button className=" w-100 signin-btn" onClick={()=>router.push("./VerifyEmail")}>Submit</button>

          {/* Sign Up Link */}
          <p className="text-right text-muted mt-3 signin-signup">
            <Link href="/ForgotPassword" className="signin-link">
              Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}