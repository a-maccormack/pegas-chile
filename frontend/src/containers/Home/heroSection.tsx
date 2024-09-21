export const HeroSection = () => {
  return (
    <header className="mt-16 flex flex-col items-center w-[60%] mx-auto">
      <div className="font-bold border border-gray-300 rounded-lg text-center px-4 py-2 w-fit text-sm">
        Última actualización: 18/09/24
      </div>
      <div className="mt-10 text-center font-extrabold lg:max-w-5xl">
        <h1 className="text-lg md:text-3xl lg:text-5xl">
          Más de <span className="text-green-600">1400</span> publicaciones de
          trabajos.
          <span className="text-green-600">
            ¿Que esperas para encontrar el tuyo?
          </span>
        </h1>
      </div>
    </header>
  );
};
