'use client';

import React, { useState } from 'react';
import Container from '@/components/container';
import fintualLogo from '@/assets/job-carrousel/fintual-logo.png';
import cornerShopLogo from '@/assets/job-carrousel/cornershop-logo.png';
import machLogo from '@/assets/job-carrousel/mach-logo.png';
import mercadolibreLogo from '@/assets/job-carrousel/mercadolibre-logo.png';
import { CompanyCard } from '@/components/companyCard';

const logoData = [
  { src: fintualLogo, alt: 'fintual logo', salary: '+$ 1M' },
  { src: cornerShopLogo, alt: 'cornershop logo', salary: '+$ 2M' },
  { src: machLogo, alt: 'mach logo', salary: '+$ 2M' },
  { src: mercadolibreLogo, alt: 'mercadolibre logo', salary: '+$ 1M' },
];

function JobCarrousel() {
  return (
    <div className="bg-carrousel-gray mt-12 py-8">
      <Container className="md:flex items-center lg:max-w-5xl flex-row overflow-hidden">
        <div>
          <h2 className="font-extrabold">Están esperandote!</h2>
          <p className="text-gray-500">Negocia tu sueldo</p>
        </div>

        <div className="relative overflow-hidden w-full group">
          <div className="hidden md:block absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-carrousel-gray to-transparent pointer-events-none z-10"></div>
          <div className="hidden md:block absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-carrousel-gray to-transparent pointer-events-none z-10"></div>
          <div className="w-full">
            <div className="inline-flex whitespace-nowrap items-center md:gap-10 animate-none md:animate-loop-scroll group-hover:paused">
              {[...logoData, ...logoData, ...logoData].map((logo, index) => (
                <CompanyCard
                  className={index > 1 ? 'hidden' : ''}
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
