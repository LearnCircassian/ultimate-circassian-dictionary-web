import React, { useState } from "react";
import ContainerDiv from "~/components/containerDiv";

//NOTE(artur): This is only a temporary front end component which is not to be used in production.
//TODO(artur): Implement a proper contact form with a backend service.
function ContactForm() {
  enum EmailFormState {
    NotSentYet,
    Sending,
    SuccessfullySent,
    FailedToSend,
  }
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState(EmailFormState.NotSentYet);
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const resPromise: Promise<Response> = fetch("/api/sendEmail", {
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

    setState(EmailFormState.Sending);

    const res: Response = await resPromise;

    if (res.ok) {
      setState(EmailFormState.SuccessfullySent);
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setState(EmailFormState.FailedToSend);
    }
  }
  async function handleSubmitFakeSimulation(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setState(EmailFormState.Sending);
    setTimeout(() => {
      setState(EmailFormState.SuccessfullySent);
      setEmail("");
      setSubject("");
      setMessage("");
    }, 2000);
  }
  let borderColor = "";
  switch (state) {
    case EmailFormState.FailedToSend:
      borderColor = "border-red-500";
      break;
    case EmailFormState.SuccessfullySent:
      borderColor = "border-green-500";
      break;
    case EmailFormState.Sending:
      borderColor = "border-blue-500";
      // What might be a better color than blue?

      break;
    case EmailFormState.NotSentYet:
      borderColor = "";
      break;
    default: {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
    } // This line is needed to make TypeScript understand that the switch is exhaustive
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmitFakeSimulation} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState(EmailFormState.NotSentYet);
          }}
          placeholder="Your email"
          className={`${borderColor} border p-2`}
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setState(EmailFormState.NotSentYet);
          }}
          placeholder="Subject"
          className={`${borderColor} border p-2`}
          required
        />
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setState(EmailFormState.NotSentYet);
          }}
          placeholder="Message"
          className={`${borderColor} border p-2`}
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
      <ContactForm />
    </ContainerDiv>
  );
}
