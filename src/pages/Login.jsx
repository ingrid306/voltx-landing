import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Ingresá un email válido.").required("El email es obligatorio."),
  password: Yup.string().required("La contraseña es obligatoria."),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState("");

  const redirectTo = location.state?.from || "/";

  return (
    <section className="container-x flex min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md card-surface p-8">
        <p className="eyebrow mb-3">Acceso</p>
        <h1 className="font-display text-2xl font-bold text-white">Ingresá a tu cuenta</h1>
        <p className="mt-2 text-sm text-slate-500">
          Usá el email y contraseña con los que te registraste en VoltX.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setFormError("");
            const result = login(values);
            if (result.ok) {
              navigate(redirectTo, { replace: true });
            } else {
              setFormError(result.error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-5" noValidate>
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

              {formError && <p className="field-error !mt-0">{formError}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-volt w-full disabled:opacity-60">
                Ingresar
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Todavía no tenés cuenta?{" "}
          <Link to="/registro" className="text-volt hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </section>
  );
}
