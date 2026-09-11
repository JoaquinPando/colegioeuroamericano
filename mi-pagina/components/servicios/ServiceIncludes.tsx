export default function ServiceIncludes({ includes }: { includes: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-5 text-xl font-semibold text-institucional">
        ¿Qué incluye?
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-institucional/10 text-institucional">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm leading-6 text-texto/85">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
