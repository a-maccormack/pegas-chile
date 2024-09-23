import { faBriefcase, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export const CallToActionSection = () => {
  return (
    <div className="mx-auto my-8 flex w-fit flex-col items-center gap-4 sm:flex-row">
      <Link href="/jobs" className="rounded-lg bg-green-600 p-4 text-white">
        <FontAwesomeIcon icon={faBriefcase} />
        <span className="ml-2">Ver Trabajos</span>
      </Link>
      <Link
        href="/companies"
        className="rounded-lg bg-green-600 p-4 text-white"
      >
        <FontAwesomeIcon icon={faBuilding} />
        <span className="ml-2">Ver Empresas</span>
      </Link>
    </div>
  );
};
