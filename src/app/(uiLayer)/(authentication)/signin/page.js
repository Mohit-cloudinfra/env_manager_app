"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signin.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Import eye icons
import LoginDS from "../../../(dsLayer)/signindslayer"
import LoadingScreen from "../../../(uiLayer)/custom components/loading";

const Loginds = new LoginDS();


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter();
  // Validation logic
  const emailError = !/\S+@\S+\.\S+/.test(email);
  const passwordError = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/.test(password);

  const handleSignIn = async()=>{
    if (!email || !password) {
      return alert("Please fill all fields");
    }
    setIsLoading(true);
    const requestData = {
      employeeEmailAddress: email,
      employeePassword: password,
    };
    try{
      setIsLoading(true);
    await Loginds.Civil_Entry_Login(requestData, {
      onLogin: () => router.replace("/EnvelopeGroups"),
      showAlert: (msg) => alert(msg),
      
    });}
    catch{
      setIsLoading(false);
    }
    
  }

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
          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-4 signin-options">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input signin-checkbox"
                id="remember"
              />
              <label className="form-check-label text-muted signin-options" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <Link href="/ForgotPassword" className="signin-link">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button className=" w-100 signin-btn" onClick={handleSignIn}>Sign In</button>

          {/* Sign Up Link */}
          <p className="text-center text-muted mt-3 signin-signup">
            Don’t have an account?{" "}
            <Link href="/signup" className="signin-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  );
}