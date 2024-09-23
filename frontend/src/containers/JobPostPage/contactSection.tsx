import { JobPost } from "@/app/types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

interface ContactSectionProps {
  jobPost: JobPost | null | undefined;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ jobPost }) => {
  if (!jobPost) {
    return <>JobPost was not found</>;
  }

  const { contact_email, contact_phone, sender } = jobPost;

  return (
    <div className="my-6">
      {sender && (
        <div className="flex items-center">
          <FontAwesomeIcon icon={faTelegram} className="mr-2" />
          <a
            href={`https://t.me/${sender}`}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {sender}
          </a>
        </div>
      )}

      {contact_email && contact_email.length > 0 && (
        <div className="flex-row items-center">
          {contact_email.map((email, index) => (
            <div key={index}>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <a href={`mailto:${email}`} className="text-blue-600">
                {email}
              </a>
            </div>
          ))}
        </div>
      )}

      {contact_phone && contact_phone.length > 0 && (
        <div className="flex-row items-center">
          {contact_phone.map((phone, index) => (
            <div key={index}>
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <a href={`tel:${phone}`} className="text-blue-600">
                {phone}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
