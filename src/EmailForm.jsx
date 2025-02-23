import { useState } from "react";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://email-lcvx.onrender.com/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to: "alfinhabeeb123@gmail.com", 
                subject: "Test Email from React",
                message: "Hello from React!",
            }),
        });

        const data = await response.json();
        console.log("Response:", data);
        alert(data.message);
    } catch (error) {
        console.log("Error:", error);
        alert("Failed to send email");
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="to" placeholder="Recipient Email" onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
