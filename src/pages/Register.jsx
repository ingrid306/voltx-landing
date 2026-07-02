import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().trim().min(2, "Mínimo 2 caracteres.").required("El nombre es obligatorio."),
  lastName: Yup.string().trim().min(2, "Mínimo 2 caracteres.").required("El apellido es obligatorio."),
  email: Yup.string().trim().email("Ingresá un email válido.").required("El email es obligatorio."),
  password: Yup.string().min(6, "Mínimo 6 caracteres.").required("La contraseña es obligatoria."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
    .required("Confirmá tu contraseña."),
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  return (
    <section className="container-x flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md card-surface p-8">
        <p className="eyebrow mb-3">Nueva cuenta</p>
        <h1 className="font-display text-2xl font-bold text-white">Creá tu cuenta VoltX</h1>
        <p className="mt-2 text-sm text-slate-500">
          Guardamos tu sesión localmente para que puedas volver a entrar.
        </p>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            setFormError("");
            const result = register(values);
            if (result.ok) {
              navigate("/", { replace: true });
            } else {
              setFormError(result.error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="field-label">Nombre</label>
                  <Field id="firstName" name="firstName" type="text" placeholder="Ada" className="field-input" />
                  <ErrorMessage name="firstName" component="p" className="field-error" />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label">Apellido</label>
                  <Field id="lastName" name="lastName" type="text" placeholder="Lovelace" className="field-input" />
                  <ErrorMessage name="lastName" component="p" className="field-error" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="field-label">Email</label>
                <Field id="email" name="email" type="email" placeholder="ada@email.com" className="field-input" />
                <ErrorMessage name="email" component="p" className="field-error" />
              </div>

              <div>
                <label htmlFor="password" className="field-label">Contraseña</label>
                <Field id="password" name="password" type="password" placeholder="••••••••" className="field-input" />
                <ErrorMessage name="password" component="p" className="field-error" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="field-label">Confirmar contraseña</label>
                <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className="field-input" />
                <ErrorMessage name="confirmPassword" component="p" className="field-error" />
              </div>

              {formError && <p className="field-error !mt-0">{formError}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-volt w-full disabled:opacity-60">
                Crear cuenta
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-volt hover:underline">
            Ingresá
          </Link>
        </p>
      </div>
    </section>
  );
}
