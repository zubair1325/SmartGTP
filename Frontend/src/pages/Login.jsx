import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext.jsx";
import "./Auth.css";

function Login() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        localStorage.setItem("smartgtp_token", data.token);
        localStorage.setItem("smartgtp_user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      setError("Cannot reach server. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authLogo">
          <img src="/src/assets/blacklogo.png" alt="SmartGTP" />
          <h1>SmartGTP</h1>
        </div>

        <h2 className="authTitle">Welcome back</h2>
        <p className="authSubtitle">Sign in to your account</p>

        {error && (
          <div className="authError">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="authField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="authField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="authBtn" disabled={loading}>
            {loading ? <span className="authSpinner"></span> : "Sign in"}
          </button>
        </form>

        <p className="authSwitch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
