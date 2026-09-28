import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

// A plain function (not React.FC) so the API route can call it directly.
export const EmailTemplate = ({
  fullName,
  email,
  message,
}: Readonly<EmailTemplateProps>) => (
  <div>
    <h1>from: {fullName}!</h1>
    <div className="text-red-500">{email} sent you a message</div>
    <blockquote>{message}</blockquote>
  </div>
);
