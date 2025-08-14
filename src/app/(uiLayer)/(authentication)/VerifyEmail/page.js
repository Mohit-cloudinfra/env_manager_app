"use client";
import { useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons

export default function SignIn() {
  const [username,setUsername] = useState("");
  const [usernameBlurred,setUsernameBlurred] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100 signin-container">
      <div className="card signin-card">
        <div className="card-body p-4">
          {/* Header */}
          <h1 className="card-title text-center mb-2 signin-title">
            Envelope Manager
          </h1>
          <p className="text-center text-muted mb-3 signin-subtitle">
            Enter the verification code sent to your email
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
          </div>


          {/* Sign In Button */}
          <button className=" w-100 signin-btn">Verify</button>

          {/* Sign Up Link */}
          <p className="text-right text-muted mt-3 signin-signup">
            <Link href="/" className="signin-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}