import React, { useState } from 'react';
import { FiMail, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState("Send");
    const [buttonColor, setButtonColor] = useState("#333");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setButtonColor("#00b300"); // Change color to green while submitting
        setButtonText("Sending...");

        try {
            const response = await fetch("http://localhost:8080/my-portfolio/backend/contact.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setButtonText("Sent!");
                setButtonColor("#4CAF50"); // Change button color to green on success
                
                // Reset the form
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });

                // Reset after 3 seconds
                setTimeout(() => {
                    setButtonText("Send");
                    setButtonColor("#333"); // Revert button color back to original
                }, 3000);
            } else {
                setButtonText("Failed");
                setButtonColor("#FF6347"); // Change color to red on failure
                
                setTimeout(() => {
                    setButtonText("Send");
                    setButtonColor("#333"); // Revert button color back to original
                }, 3000);
            }
        } catch (error) {
            setButtonText("Error");
            setButtonColor("#FF6347"); // Change color to red on error
            setStatus("Error connecting to server.");
            
            setTimeout(() => {
                setButtonText("Send");
                setButtonColor("#333"); // Revert button color back to original
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="contact-info">
                    <h2>Contact Me</h2>
                    <p>Email: w.macmavis83@gmail.com</p>
                </div>
                <div className="social-links">
                    <h2>Social Media</h2>
                    <div className="icons">
                        <a href="mailto:w.macmavis83@gmail.com"><FiMail /></a>
                        <a href="https://twitter.com/example"><FiTwitter /></a>
                        <a href="https://linkedin.com/in/example"><FiLinkedin /></a>
                        <a href="https://github.com/example"><FiGithub /></a>
                        <a href="https://facebook.com/example"><FiFacebook /></a>
                    </div>
                </div>
                <div className="email-form">
                    <h2>Send me a message</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            style={{ backgroundColor: buttonColor }}
                        >
                            {buttonText}
                        </button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
