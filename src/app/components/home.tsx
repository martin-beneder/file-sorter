import Image from "next/image"


export default function Home() {
    return(
    <div className="items-start flex flex-col">
    <div className="items-center self-stretch bg-slate-100 flex w-full flex-col justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
      <div className="w-full max-w-6xl my-12 max-md:max-w-full max-md:my-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[63%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col my-auto items-start max-md:max-w-full max-md:mt-10">
              <div className="self-stretch text-black text-6xl font-semibold leading-[76px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
                Wo Ordnung auf{" "}
                <span className="text-blue-400">Intelligenz trifft</span>
              </div>
              <div className="self-stretch text-neutral-500 text-base leading-6 mt-4 max-md:max-w-full">
                Könnte Ihr Arbeitsalltag einfacher sein, wenn Ihre Dateien
                sich selbst organisieren würden?
              </div>
              <div className="text-white text-center text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch rounded bg-blue-400 mt-8 px-8 py-3.5 max-md:px-5">
                Register
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[37%] ml-5 max-md:w-full max-md:ml-0">
            <Image
              alt="Image"
              loading="lazy"
              src="/home.svg"
              className="aspect-[0.96] object-contain object-center w-full overflow-hidden grow max-md:mt-10"
              width={400} height={384}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="text-neutral-600 text-center text-4xl font-semibold leading-10 self-center max-w-[542px] mt-10 max-md:max-w-full">
      Revolutioniert Ihr Datenmanagement mit einem Klick
    </div>
    <div className="self-stretch text-neutral-500 text-center text-base leading-6 w-full mt-2 max-md:max-w-full">
      Who is Nextcent suitable for?
    </div>
    <div className="justify-center items-center self-stretch flex w-full flex-col mt-4 px-16 max-md:max-w-full max-md:px-5">
      <div className="w-full max-w-6xl max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[34%] max-md:w-full max-md:ml-0">
            <div className="items-center shadow-sm bg-white flex grow flex-col w-full px-4 py-6 rounded-lg max-md:mt-10">
              <Image
                alt="Image"
                loading="lazy"
                src="/brain.svg"
                className="aspect-[1.16] object-contain object-center w-[65px] overflow-hidden max-w-full"
                width={87} height={75}
              />
              <div className="self-stretch text-neutral-600 text-center text-3xl font-bold leading-9 mt-4">
                Automatische Kategorisierung
              </div>
              <div className="text-neutral-500 text-center text-sm leading-5 self-stretch mt-2">
                {" "}
                SortAI erkennt und kategorisiert Dateien automatisch basierend
                auf ihrem Inhalt und Typ
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-center shadow-sm bg-white flex flex-col w-full my-auto px-4 py-6 rounded-lg max-md:mt-10">
              <Image
                alt="Image"
                loading="lazy"
                src="/brain-loop.svg"
                className="aspect-[1.16] object-contain object-center w-[87px] overflow-hidden max-w-full"
                width={87} height={75}
              />
              <div className="self-stretch text-neutral-600 text-center text-3xl font-bold leading-9 whitespace-nowrap mt-4">
                Intelligente Suche
              </div>
              <div className="text-neutral-500 text-center text-sm leading-5 self-stretch mt-2">
                Mit tiefgehender Lernfähigkeit versteht SortAI den Kontext
                Ihrer Suchanfragen und findet schnell die relevantesten
                Dateien
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[31%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch shadow-sm bg-white flex grow flex-col w-full px-4 py-6 rounded-lg max-md:mt-10">
              <div className="items-center flex flex-col px-5">
                <Image
                    alt="Image"
                    loading="lazy"
                    src="/datei.svg"
                    className="aspect-[1.16] object-contain object-center w-[65px] overflow-hidden max-w-full"
                    width={87} height={75}
                />
                <div className="text-neutral-600 text-center text-3xl font-bold leading-9 self-stretch mt-4">
                  Sicherheitspriorisierung
                </div>
              </div>
              <div className="text-neutral-500 text-center text-sm leading-5 mt-2">
                Das Tool gewährleistet die Sicherheit Ihrer Daten durch
                verschlüsselte Verarbeitung und Speicherung
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}