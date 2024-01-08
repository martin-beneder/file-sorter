import Image from "next/image";

export default function Body() {
    return(
    <>
       <header className="justify-center items-stretch flex flex-col py-12" >
        <div className="justify-center items-center flex w-full flex-col mt-32 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="w-full max-w-6xl max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-2/5 max-md:w-full max-md:ml-0">
                <Image
                  loading="lazy"
                  src="/handy.svg"
                  className="aspect-[1.02] object-contain object-center w-full justify-center items-center overflow-hidden grow max-md:max-w-full max-md:mt-10"
                  alt="Image 1"
                  width={400}
                    height={384}
                />
              </div>
              <div className="flex flex-col items-stretch w-3/5 ml-5 max-md:w-full max-md:ml-0">
                <div className="flex flex-col my-auto pr-16 items-start max-md:max-w-full max-md:mt-10 max-md:pr-5">
                  <h1
                    className="self-stretch text-neutral-600 text-4xl font-semibold leading-10 max-md:max-w-full"
                    aria-label="Kontinuierliche Innovation"
                  >
                    Kontinuierliche Innovation
                  </h1>
                  <div
                    className="self-stretch text-neutral-500 text-sm leading-5 mt-4 max-md:max-w-full"
                    aria-label="Beschreibung"
                  >
                    Wir bei SortAI verpflichten uns zur ständigen Verbesserung. Mit jedem Update bringen wir die neuesten technologischen Fortschritte direkt zu Ihnen, damit Sie immer die fortschrittlichste Lösung nutzen. <br /><br />
                  </div>
                  <a
                    href="#"
                    className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch rounded bg-blue-400 mt-8 px-8 py-3.5 max-md:px-5"
                    aria-label="Probiere selbst!"
                  >
                    Probiere selbst!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="justify-center items-center flex w-full flex-col mt-12 mb-24 px-16 max-md:max-w-full max-md:my-10 max-md:px-5">
        <div className="w-full max-w-6xl max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-2/5 max-md:w-full max-md:ml-0">
              <Image
                loading="lazy"
                src="/secure-handy.svg"
                className="aspect-[1.02] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
                alt="Image 2"
                width={400}
                height={384}
              />
            </div>
            <div className="flex flex-col items-stretch w-3/5 ml-5 max-md:w-full max-md:ml-0">
              <div className="flex flex-col my-auto pr-16 items-start max-md:max-w-full max-md:mt-10 max-md:pr-5">
                <h1
                  className="self-stretch text-neutral-600 text-4xl font-semibold leading-10 max-md:max-w-full"
                  aria-label="Sicherheit und Vertrauen mit SortAI"
                >
                  Sicherheit und Vertrauen mit SortAI
                </h1>
                <div
                  className="self-stretch text-neutral-500 text-sm leading-5 mt-4 max-md:max-w-full"
                  aria-label="Beschreibung"
                >
                  In der digitalen Ära sind Daten nicht nur Ressourcen, sondern auch Vertrauensbeweise, die Sie uns anvertrauen. Bei SortAI verstehen wir die immense Verantwortung, die mit der Verarbeitung und Organisation Ihrer Daten einhergeht. Deshalb setzen wir uns für höchste Sicherheitsstandards und transparente Prozesse ein. <br /><br />
                </div>
                <a
                  href="#"
                  className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch rounded bg-blue-400 mt-8 px-8 py-3.5 max-md:px-5"
                  aria-label="Melde dich an"
                >
                  Melde dich an
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 