import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Home.css";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    setMsg(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowNav(true);
    setMenuOpen(false);
  };

useEffect(() => {
  const setVH = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };
  setVH();
  window.addEventListener("resize", setVH);
  return () => window.removeEventListener("resize", setVH);
}, []);


  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setShowNav(true);
    setMenuOpen(false);
  };

  const logout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_b04r9vn",
      "template_ihmbwq9",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "Mbo7j_HGyJufqm3wG"
    ).then(() => {
      toast.success("Message sent");
      setForm({ name: "", email: "", message: "" });
    }).catch(() => toast.error("Failed to send"));
  };

  return (
    <div className="home">
      {showNav && (
        <div className="navBar">
          <h1>NotesHub</h1>

          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>

          <div className={`navLinks ${menuOpen ? "active" : ""}`}>
            <ul>
              <li><a onClick={scrollTop}>Home</a></li>
              <li><a onClick={() => scrollTo("second-page")}>Notes</a></li>
              <li><a onClick={() => scrollTo("contact")}>Contact</a></li>
            </ul>
            <div className="navButtons">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <section className="content">
        <p>Hi, <b>{msg}</b></p>
        <h1>Welcome to Notes App</h1>
        <p>Organize your thoughts efficiently and securely.</p>
      </section>

      <section id="second-page" className="second-page">
        <div className="about-section">
          <h2>About This App</h2>
          <p>
            A secure note-management system built using React and Firebase with
            authentication, privacy, search, and real-time updates.
          </p>
        </div>

        <div className="notes-section">
          <h2>Your Notes</h2>
          <p>Access, create, and manage your notes seamlessly.</p>
          <button onClick={() => navigate("/add")}>Add Notes</button>
          <button onClick={() => navigate("/view")}>View Notes</button>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Me</h2>
        <form onSubmit={sendEmail}>
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
          <button type="submit" className="send">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2026 NotesHub</p>
        <div className="socials">
          <a href="https://github.com/Karthik-a39" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/karthik-patil-213b5431a" target="_blank">LinkedIn</a>
          <a href="" target="_blank">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
