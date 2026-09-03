"use client";

import { useState, type FormEvent } from "react";
import FormField from "./FormField";

type FormData = {
  studentName: string;
  paternalLastName: string;
  maternalLastName: string;
  dni: string;
  previousSchool: string;
  modularCode: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  studentName: "",
  paternalLastName: "",
  maternalLastName: "",
  dni: "",
  previousSchool: "",
  modularCode: "",
  email: "",
  phone: "",
  message: "",
};

const step1Fields: (keyof FormData)[] = [
  "studentName",
  "paternalLastName",
  "maternalLastName",
  "dni",
  "previousSchool",
  "modularCode",
];

const step2Fields: (keyof FormData)[] = ["email", "phone"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DNI_REGEX = /^\d{8}$/;
const PHONE_REGEX = /^\d{9}$/;

function validateField(name: keyof FormData, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (name) {
    case "studentName":
      return value ? undefined : "Ingresa el nombre del estudiante.";
    case "paternalLastName":
      return value ? undefined : "Ingresa el apellido paterno.";
    case "maternalLastName":
      return value ? undefined : "Ingresa el apellido materno.";
    case "dni":
      if (!value) return "Ingresa el DNI del estudiante.";
      if (!DNI_REGEX.test(value)) return "El DNI debe tener 8 dígitos.";
      return undefined;
    case "previousSchool":
      return value ? undefined : "Ingresa el colegio de procedencia.";
    case "modularCode":
      return value ? undefined : "Ingresa el código modular.";
    case "email":
      if (!value) return "Ingresa un correo electrónico.";
      if (!EMAIL_REGEX.test(value)) return "Ingresa un correo electrónico válido.";
      return undefined;
    case "phone":
      if (!value) return "Ingresa un teléfono de contacto.";
      if (!PHONE_REGEX.test(value)) return "El teléfono debe tener 9 dígitos.";
      return undefined;
    default:
      return undefined;
  }
}

type Status = "idle" | "submitting" | "success" | "error";

export default function AdmisionForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(name: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function validateFields(fields: (keyof FormData)[]) {
    const nextErrors: FormErrors = {};
    for (const field of fields) {
      const error = validateField(field, data[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (validateFields(step1Fields)) {
      setStep(2);
    }
  }

  function handleBack() {
    setStep(1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateFields(step2Fields)) return;

    setStatus("submitting");
    try {
      // TODO: conectar con el backend de admisión cuando esté disponible.
      // await fetch("/api/admision", {
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
    setStep(1);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-institucional/10 text-institucional">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="text-xl font-bold text-institucional">
          ¡Registro enviado!
        </h3>
        <p className="max-w-md text-texto/80">
          Gracias por tu interés en el Colegio Euroamericano. Nuestro equipo
          de admisión revisará tus datos y se pondrá en contacto contigo
          pronto.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 rounded-full border border-institucional px-5 py-2.5 font-medium text-institucional transition-colors duration-200 hover:bg-institucional hover:text-hueso"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-medium text-texto/70">
          <span>Paso {step} de 2</span>
          <span>
            {step === 1 ? "Datos del estudiante" : "Contacto y mensaje"}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="h-1.5 flex-1 rounded-full bg-institucional" />
          <span
            className={`h-1.5 flex-1 rounded-full ${
              step === 2 ? "bg-institucional" : "bg-institucional/15"
            }`}
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Ocurrió un problema al enviar tu registro. Por favor, inténtalo
          nuevamente.
        </p>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <FormField
            id="studentName"
            name="studentName"
            label="Nombre del estudiante"
            value={data.studentName}
            onChange={(value) => handleChange("studentName", value)}
            error={errors.studentName}
            autoComplete="given-name"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              id="paternalLastName"
              name="paternalLastName"
              label="Apellido paterno"
              value={data.paternalLastName}
              onChange={(value) => handleChange("paternalLastName", value)}
              error={errors.paternalLastName}
              autoComplete="family-name"
            />
            <FormField
              id="maternalLastName"
              name="maternalLastName"
              label="Apellido materno"
              value={data.maternalLastName}
              onChange={(value) => handleChange("maternalLastName", value)}
              error={errors.maternalLastName}
              autoComplete="additional-name"
            />
          </div>
          <FormField
            id="dni"
            name="dni"
            label="DNI del estudiante"
            value={data.dni}
            onChange={(value) =>
              handleChange("dni", value.replace(/\D/g, ""))
            }
            error={errors.dni}
            inputMode="numeric"
            maxLength={8}
            placeholder="8 dígitos"
          />
          <FormField
            id="previousSchool"
            name="previousSchool"
            label="Colegio de procedencia"
            value={data.previousSchool}
            onChange={(value) => handleChange("previousSchool", value)}
            error={errors.previousSchool}
          />
          <FormField
            id="modularCode"
            name="modularCode"
            label="Código modular"
            value={data.modularCode}
            onChange={(value) => handleChange("modularCode", value)}
            error={errors.modularCode}
            inputMode="numeric"
          />

          <button
            type="button"
            onClick={handleNext}
            className="mt-2 rounded-full bg-institucional px-6 py-3 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-md"
          >
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <FormField
            id="email"
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
            id="phone"
            name="phone"
            label="Teléfono"
            type="tel"
            value={data.phone}
            onChange={(value) =>
              handleChange("phone", value.replace(/\D/g, ""))
            }
            error={errors.phone}
            inputMode="tel"
            maxLength={9}
            autoComplete="tel"
            placeholder="9 dígitos"
          />
          <FormField
            id="message"
            name="message"
            label="Mensaje"
            value={data.message}
            onChange={(value) => handleChange("message", value)}
            required={false}
            multiline
            placeholder="Cuéntanos si tienes alguna consulta adicional (opcional)"
          />

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleBack}
              disabled={status === "submitting"}
              className="rounded-full border border-institucional px-6 py-3 font-medium text-institucional transition-colors duration-200 hover:bg-institucional/5 disabled:opacity-50"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-institucional px-6 py-3 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-md disabled:pointer-events-none disabled:opacity-70"
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
              {status === "submitting" ? "Enviando..." : "Enviar registro"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
