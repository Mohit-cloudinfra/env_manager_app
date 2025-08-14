"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router=useRouter();
  

  // Validation logic
  const emailError = !/\S+@\S+\.\S+/.test(email);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100 signin-container">
      <div className="card signin-card">
        <div className="card-body p-4">
          {/* Header */}
          <h1 className="card-title text-center mb-2 signin-title">
            Envelope Manager
          </h1>
          <p className="text-center text-muted mb-3 signin-subtitle">
            Enter the email addressyou used when you joined and we'll send you a code to reset your password
          </p>

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

          
          {/* Sign In Button */}
          <button className=" w-100 signin-btn" onClick={()=>router.push("./ValidateCode")}>Send Reset Code</button>

          {/* Sign Up Link */}
          <p className="text-start text-muted mt-3 signin-signup" onClick={()=>router.back()}>
            
            <span href="./ForgotPassword" className="signin-link">
              Back
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}