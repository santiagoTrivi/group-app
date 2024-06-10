export default function Announce() {
  return (
    <div className="grid grid-cols-1">
      <div
        id="sticky-banner"
        className="flex justify-between w-full p-4 border-b border-indigo-500 bg-indigo-500 dark:bg-indigo-500"
      >
        <div className="flex items-center mx-auto">
          <p className="flex items-center text-sm font-normal text-gray-50 dark:text-gray-400">
            <span>
              Cambia hoy mismo a Groups para ampliar tu empresa y conseguir más
              juntos.
              <a
                href="https://www.nextiva.com/blog/communication-platforms.html"
                className="inline font-medium text-gray-100 underline  underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline"
              >
                {" "}
                Aprende mas.
              </a>
            </span>
          </p>
        </div>
      </div>
      <div className="bg-black"></div>
    </div>
  );
}
