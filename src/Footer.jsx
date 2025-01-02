import React, { useState } from 'react';
import { FiMail, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi';
import emailjs from "emailjs-com";
import './Footer.css';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [buttonState, setButtonState] = useState("send"); // Button state tracking (send, sending, sent)

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Send email using Email.js
    const handleSubmit = (e) => {
        e.preventDefault();

        // Change button state to "sending"
        setButtonState("sending");

        // Email.js service setup
        emailjs
            .sendForm("service_h0u8zqp", "template_lcl6gf8", e.target, "2biPObTZPzec_inXl")
            .then(
                (result) => {
                    setButtonState("sent");  // Change button state to "sent"

                    // Reset button state back to "send" after 3 seconds
                    setTimeout(() => {
                        setButtonState("send");
                    }, 3000);
                },
                (error) => {
                    setButtonState("send");  // Reset button state to "send" on error
                }
            );

        // Reset form fields
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    // Define dynamic button styles based on the state
    const getButtonStyles = () => {
        switch (buttonState) {
            case "sending":
                return { backgroundColor: "#f0ad4e", color: "#fff" }; // Orange for sending
            case "sent":
                return { backgroundColor: "#5cb85c", color: "#fff" }; // Green for sent
            default:
        }
    };

    // Define button text based on the state
    const getButtonText = () => {
        switch (buttonState) {
            case "sending":
                return "Sending...";
            case "sent":
                return "Sent!";
            default:
                return "Send";
        }
    };

    return (
        <footer id='contact' className="footer">
            <div className="footer-container">
                <div className="contact-info">
                    <h2>Contact Me</h2>
                    <p>Phone: +27728627957</p>
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
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Type your message here"
                            required
                        />
                        <button
                            type="submit"
                            style={getButtonStyles()} // Apply dynamic styles
                        >
                            {getButtonText()} {/* Dynamic button text */}
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
