// FormComponent.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Footer.css';

// const FormComponent = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setSubmitting(true);

//     try {
//       const response = await axios.post(
//         '/.netlify/functions/sendEmail',
//         { email, message }
//       );

//       console.log('Response:', response);

//       if (response.status === 200) {
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Failed to send email.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'message') {
//       setMessage(value);
//     }
//   };

//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Enter your message"
//           value={message}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button type="submit" disabled={submitting}>
//           {submitting ? 'Submitting...' : 'Submit'}
//         </button>
//         {error && <div>{error}</div>}
//         {success && <div>Message sent successfully!</div>}
//       </form>
//     </div>
//   );
// };

// export default FormComponent;

// import React, { useState } from 'react';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://your-php-backend/contact.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Name"
//       />
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//       />
//       <textarea
//         name="message"
//         value={formData.message}
//         onChange={handleChange}
//         placeholder="Message"
//       ></textarea>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ContactForm;






import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/contact-form/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      // const response = await fetch("http://your-server.com/contact.php", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      const result = await response.text();
      setStatus(result);
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to send the message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
};

export default ContactForm;
