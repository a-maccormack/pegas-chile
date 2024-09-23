import ApiService from "@/services/apiService";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faJs,
  faReact,
  faNodeJs,
  faPython,
  faDocker,
  faJava,
  faFigma,
  faLinux,
  faAws,
  faCloudflare,
  faBitbucket,
  faGit,
  faGithub,
  faGitlab,
  faDigitalOcean,
  faVuejs,
  faNode,
  faRaspberryPi,
  faRust,
  faCentos,
  faUbuntu,
  faDebian,
  faGolang,
  faLaravel,
  faPhp,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";

interface TechnologiesContainerProps {
  jobId?: number;
  companyName: string;
}

export const TechnologiesContainer: React.FC<TechnologiesContainerProps> = ({
  companyName,
  jobId,
}) => {
  const apiService = new ApiService();
  const [companyTechnologies, setCompanyTechnologies] = useState<string[]>([]);

  useEffect(() => {
    if (companyName) {
      if (jobId) {
        apiService
          .getTechnologiesByPostId(jobId.toString())
          .then((response) => {
            setCompanyTechnologies(response.data);
          });
      } else {
        apiService
          .getTechnologiesByCompanyName(companyName)
          .then((response) => {
            setCompanyTechnologies(response.data.technologies);
          });
      }
    }
  }, [companyName, jobId]);

  const technologyIconMap: { [key: string]: any } = {
    javascript: faJs,
    react: faReact,
    reactjs: faReact,
    "react.js": faReact,
    nodejs: faNodeJs,
    python: faPython,
    docker: faDocker,
    java: faJava,
    sql: faDatabase,
    database: faDatabase,
    figma: faFigma,
    linux: faLinux,
    aws: faAws,
    cloudflare: faCloudflare,
    bitbucket: faBitbucket,
    git: faGit,
    github: faGithub,
    gitlab: faGitlab,
    digitalocean: faDigitalOcean,
    vuejs: faVuejs,
    node: faNode,
    "raspberry pi": faRaspberryPi,
    rust: faRust,
    centos: faCentos,
    ubuntu: faUbuntu,
    debian: faDebian,
    golang: faGolang,
    laravel: faLaravel,
    php: faPhp,
    programming: faCode,
  };

  if (companyTechnologies.length === 0) {
    return <></>;
  } else {
    return (
      <div className="rounded-md border border-gray-200">
        <h1 className="mt-2 text-center text-2xl font-bold">Stack</h1>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 pb-4">
          {companyTechnologies.map((technology, index) => {
            const techLowerCase = technology.toLowerCase();

            const googleSearchUrl = `https://www.duckduckgo.com?q=${encodeURIComponent(technology)}`;

            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md bg-carrousel-gray px-2"
              >
                <Link
                  href={googleSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center">
                    {technologyIconMap[techLowerCase] ? (
                      <FontAwesomeIcon
                        className="h-6 w-6"
                        icon={technologyIconMap[techLowerCase]}
                      />
                    ) : (
                      <span>{technology}</span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
