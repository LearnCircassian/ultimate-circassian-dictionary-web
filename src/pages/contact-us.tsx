import React from "react";
import ContainerDiv from "~/components/containerDiv";

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
    </ContainerDiv>
  );
}
