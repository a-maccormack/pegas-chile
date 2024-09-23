import Link from "next/link";
import React from "react";

export const CallToActionSection = () => {
  return (
    <div className="mx-auto my-8 w-fit">
      <Link href="/jobs" className="rounded-lg bg-green-600 p-4 text-white">
        Ver Pegas
      </Link>
    </div>
  );
};
