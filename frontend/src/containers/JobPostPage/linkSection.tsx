import { JobPost } from "@/app/types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface LinkSectionProps {
  links: Partial<JobPost["links"]> | undefined;
}

export const LinkSection: React.FC<LinkSectionProps> = ({ links }) => {
  return (
    <div className="mt-4">
      {links && links.length > 0 ? (
        links.map((url, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-blue-500 visited:text-blue-500 visited:no-underline"
          >
            <FontAwesomeIcon icon={faLink} />
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url.length > 30 ? `${url.slice(0, 30)}...` : url}
              </a>
            ) : (
              <></>
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
