type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  inputMode?: "text" | "numeric" | "email" | "tel";
  maxLength?: number;
  autoComplete?: string;
};

export default function FormField({
  id,
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = true,
  multiline = false,
  inputMode,
  maxLength,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const sharedClassName = `w-full rounded-xl border bg-white px-4 py-2.5 text-texto placeholder:text-texto/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-institucional/40 ${
    error
      ? "border-red-400"
      : "border-institucional/15 focus:border-institucional"
  }`;

  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-sm font-medium text-texto">
        {label}
        {required && (
          <span className="text-dorado" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${sharedClassName} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClassName}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
