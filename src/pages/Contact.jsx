import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const ContactSchema = Yup.object().shape({
  nombre: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(40, "El nombre es demasiado largo.")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "El nombre solo puede contener letras.")
    .required("El nombre es obligatorio."),
  apellido: Yup.string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(40, "El apellido es demasiado largo.")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "El apellido solo puede contener letras.")
    .required("El apellido es obligatorio."),
  email: Yup.string()
    .trim()
    .email("Ingresá un email válido.")
    .required("El email es obligatorio."),
  asunto: Yup.string()
    .trim()
    .min(5, "Contanos un poco más: al menos 5 caracteres.")
    .max(500, "El mensaje es demasiado largo (máx. 500 caracteres)."),
});

export default function Contact() {
  const [sendError, setSendError] = useState("");

  return (
    <section className="border-b border-line bg-grid bg-[length:32px_32px]">
      <div className="container-x py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-3">Contacto</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Escribinos, te leemos.
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Consultas sobre stock, garantías o pedidos a medida. Respondemos en menos de 48hs hábiles.
          </p>

          <Formik
            initialValues={{ nombre: "", apellido: "", email: "", asunto: "" }}
            validationSchema={ContactSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
              setSendError("");
              try {
                if (emailjsConfigured) {
                  await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    {
                      from_name: `${values.nombre} ${values.apellido}`,
                      from_email: values.email,
                      subject: values.asunto,
                      message: values.asunto,
                    },
                    { publicKey: PUBLIC_KEY }
                  );
                }
                // No se envía nada a un backend propio: solo se confirma la validación
                // (y, si hay claves de EmailJS configuradas, el envío real del mail).
                setStatus("success");
                resetForm();
              } catch (err) {
                console.error("EmailJS send error:", err);
                setSendError(
                  "No pudimos enviar el mensaje por un error de conexión con el servicio de mail. Intentá nuevamente."
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, setStatus }) => (
              <Form className="mt-10 space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="field-label">Nombre</label>
                    <Field
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Ada"
                      className="field-input"
                      onFocus={() => setStatus(undefined)}
                    />
                    <ErrorMessage name="nombre" component="p" className="field-error" />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="field-label">Apellido</label>
                    <Field
                      id="apellido"
                      name="apellido"
                      type="text"
                      placeholder="Lovelace"
                      className="field-input"
                      onFocus={() => setStatus(undefined)}
                    />
                    <ErrorMessage name="apellido" component="p" className="field-error" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="field-label">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ada@email.com"
                    className="field-input"
                    onFocus={() => setStatus(undefined)}
                  />
                  <ErrorMessage name="email" component="p" className="field-error" />
                </div>

                <div>
                  <label htmlFor="asunto" className="field-label">Asunto</label>
                  <Field
                    id="asunto"
                    as="textarea"
                    rows={5}
                    name="asunto"
                    placeholder="Contanos en qué podemos ayudarte"
                    className="field-input resize-none"
                    onFocus={() => setStatus(undefined)}
                  />
                  <ErrorMessage name="asunto" component="p" className="field-error" />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-volt w-full sm:w-auto disabled:opacity-60">
                  {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                </button>

                {status === "success" && (
                  <div className="flex items-start gap-3 rounded-sm border border-circuit/40 bg-circuit/10 p-4">
                    <span className="badge-dot mt-1.5" />
                    <p className="text-sm text-circuit">
                      ¡Mensaje enviado correctamente! Te vamos a responder a la brevedad
                      {!emailjsConfigured && " (modo demo: no se realizó un envío real de mail)"}.
                    </p>
                  </div>
                )}

                {sendError && (
                  <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-4">
                    <p className="text-sm text-red-400">{sendError}</p>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
