export const HeroSection = () => {
  return (
    <header className="mx-auto mt-10 flex w-[60%] flex-col items-center md:mt-32">
      <div className="w-fit rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-bold">
        Última actualización: 23/09/24
      </div>
      <div className="mt-10 text-center font-extrabold lg:max-w-5xl">
        <h1 className="text-2xl md:text-3xl lg:text-5xl">
          Más de <span className="text-green-600">1400</span> publicaciones de
          trabajos.
          <span className="text-green-600">
            ¿Que esperas para encontrar el tuyo?
          </span>
        </h1>
      </div>
      <div className="mt-8 text-slate-500">
        <p>Encuentra tu trabajo de software soñado.</p>
      </div>
    </header>
  );
};
