"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { signIn, useSession } from "next-auth/react";
export default function Hero() {
  const { data: session, status } = useSession();
  console.log({ session, status });
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Comunicarse con tus equipo nunca fue tan facil!!
          </h1>
          <p className="mb-8 leading-relaxed">
            Crea un espacio de trabajo y compartelo con tus colegas, compañeros
            o equipo de trabajo de forma sencilla. Una nueva plataforma de
            comunicación para tu empresa gratuita y segura. Groups es una nueva
            propuesta con un entorno amigable.
          </p>
          <div className="flex w-full pt-8 justify-center gap-x-8">
            <a
              href="/auth/register"
              className="bg-indigo-500 w-1/2 py-4 px-8 text-white rounded-[4px] lg:w-fit"
            >
              Registrate
            </a>
            <button
              onClick={() => {
                signIn();
              }}
              className="w-1/2 text-indigo-500 flex items-center justify-center gap-x-2 lg:w-fit"
            >
              Iniciar
              <span className="w-5">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="fa-solid fa-arrow-right"
                  style={{ color: "indigo-500" }}
                ></FontAwesomeIcon>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
