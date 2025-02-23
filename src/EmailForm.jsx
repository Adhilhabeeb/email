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
    // headers: { "Content-Type": "application/json; charset=utf-8" }, // ✅ Fixed here

    try {
        const response = await fetch("https://email-lcvx.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: formData.to,
                subject: formData.subject,
                message: formData.message,
            }),
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("Email sent successfully!");
        } else {
            alert("Failed to send email: " + data.error);
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
};





  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="to" placeholder="Recipient Email" onChange={handleChange}   required/>
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange}required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required ></textarea>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
