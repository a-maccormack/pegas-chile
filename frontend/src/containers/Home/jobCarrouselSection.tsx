"use client";

import React, { useState } from "react";
import Container from "@/components/container";
import fintualLogo from "@/assets/job-carrousel/fintual-logo.png";
import cornerShopLogo from "@/assets/job-carrousel/cornershop-logo.png";
import machLogo from "@/assets/job-carrousel/mach-logo.png";
import mercadolibreLogo from "@/assets/job-carrousel/mercadolibre-logo.png";
import { CompanyCard } from "@/components/companyCard";

const logoData = [
  { src: fintualLogo, alt: "fintual logo", salary: "+$ 1M" },
  { src: cornerShopLogo, alt: "cornershop logo", salary: "+$ 2M" },
  { src: machLogo, alt: "mach logo", salary: "+$ 2M" },
  { src: mercadolibreLogo, alt: "mercadolibre logo", salary: "+$ 1M" },
];

function JobCarrousel() {
  return (
    <div className="mt-12 hidden bg-carrousel-gray py-8 sm:block">
      <Container className="flex-row items-center overflow-hidden md:flex lg:max-w-5xl">
        <div>
          <h2 className="font-extrabold">Están esperandote!</h2>
          <p className="text-gray-500">Negocia tu sueldo</p>
        </div>

        <div className="group relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-24 bg-gradient-to-r from-carrousel-gray to-transparent md:block"></div>
          <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-24 bg-gradient-to-l from-carrousel-gray to-transparent md:block"></div>
          <div className="w-full">
            <div className="group-hover:paused inline-flex animate-none items-center whitespace-nowrap md:animate-loop-scroll md:gap-10">
              {[...logoData, ...logoData, ...logoData].map((logo, index) => (
                <CompanyCard
                  className={index > 1 ? "hidden" : ""}
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  salary={logo.salary}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default JobCarrousel;
