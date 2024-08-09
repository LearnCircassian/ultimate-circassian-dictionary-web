import React, { useState } from "react";
import ContainerDiv from "~/components/containerDiv";

//NOTE(artur): This is only a temporary front end component which is not to be used in production.
//TODO(artur): Implement a proper contact form with a backend service.
function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject,
        message,
      }),
    });

    if (res.ok) {
      alert("Email sent successfully!");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      alert("Failed to send the email.");
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="border p-2"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border p-2"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="border p-2"
          rows={5}
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Send Email
        </button>
      </form>
    </div>
  );
}

export default function ContactUsPage() {
  return (
    <ContainerDiv className="m-8 p-4">
      <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
      <p className="mb-2">
        We would love to hear from you! Whether you have a question about our website, need
        assistance, or just want to share your thoughts, feel free to reach out.
      </p>
      <p>
        Email us at:{" "}
        <a href="mailto:learncircassian@gmail.com" className="text-blue-500 underline">
          learncircassian@gmail.com
        </a>
      </p>
      {/* <ContactForm /> */}
    </ContainerDiv>
  );
}
