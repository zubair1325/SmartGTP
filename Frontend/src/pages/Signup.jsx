import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext.jsx";
import "./Auth.css";
import blacklogo from "../assets/blacklogo.png";

function Signup() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
      } else {
        localStorage.setItem("smartgtp_token", data.token);
        localStorage.setItem("smartgtp_user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Cannot reach server. Make sure the backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authLogo">
         <img src={blacklogo} alt="SmartGTP" />
          <h1>SmartGTP</h1>
        </div>

        <h2 className="authTitle">Create account</h2>
        <p className="authSubtitle">Start chatting for free</p>

        {error && (
          <div className="authError">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form className="authForm" onSubmit={handleSubmit}>
          <div className="authField">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Zubair Rahman"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

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
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <div className="authField">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="authBtn" disabled={loading}>
            {loading ? <span className="authSpinner"></span> : "Create account"}
          </button>
        </form>

        <p className="authSwitch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
