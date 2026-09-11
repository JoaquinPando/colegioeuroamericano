"use client";

import { useState, type FormEvent } from "react";
import FormField from "@/components/admision/FormField";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: keyof FormData, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (name) {
    case "name":
      return value ? undefined : "Ingresa tu nombre.";
    case "email":
      if (!value) return "Ingresa un correo electrónico.";
      if (!EMAIL_REGEX.test(value)) return "Ingresa un correo electrónico válido.";
      return undefined;
    case "subject":
      return value ? undefined : "Ingresa el asunto de tu mensaje.";
    case "message":
      return value ? undefined : "Escribe tu mensaje.";
    default:
      return undefined;
  }
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(name: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function validateFields() {
    const nextErrors: FormErrors = {};
    for (const field of Object.keys(data) as (keyof FormData)[]) {
      const error = validateField(field, data[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateFields()) return;

    setStatus("submitting");
    try {
      // TODO: conectar con el backend de contacto cuando esté disponible.
      // await fetch("/api/contacto", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleReset() {
    setData(initialData);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex w-full flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-institucional/10 text-institucional">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="text-xl font-bold text-institucional">
          ¡Mensaje enviado!
        </h3>
        <p className="max-w-md text-texto/80">
          Gracias por escribirnos. Nuestro equipo revisará tu mensaje y te
          responderá a la brevedad.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 rounded-full border border-institucional px-5 py-2.5 font-medium text-institucional transition-colors duration-200 hover:bg-institucional hover:text-hueso"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm sm:p-10"
    >
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Ocurrió un problema al enviar tu mensaje. Por favor, inténtalo
          nuevamente.
        </p>
      )}

      <FormField
        id="contact-name"
        name="name"
        label="Nombre"
        value={data.name}
        onChange={(value) => handleChange("name", value)}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        id="contact-email"
        name="email"
        label="Correo electrónico"
        type="email"
        value={data.email}
        onChange={(value) => handleChange("email", value)}
        error={errors.email}
        autoComplete="email"
        placeholder="nombre@correo.com"
      />
      <FormField
        id="contact-subject"
        name="subject"
        label="Asunto"
        value={data.subject}
        onChange={(value) => handleChange("subject", value)}
        error={errors.subject}
      />
      <FormField
        id="contact-message"
        name="message"
        label="Mensaje"
        value={data.message}
        onChange={(value) => handleChange("message", value)}
        error={errors.message}
        multiline
        placeholder="Cuéntanos en qué podemos ayudarte"
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-institucional px-6 py-3 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-md disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 animate-spin"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth={3}
              className="opacity-25"
            />
            <path
              d="M21 12a9 9 0 00-9-9"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              className="opacity-90"
            />
          </svg>
        )}
        {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
