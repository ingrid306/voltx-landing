import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatPrice } from "../components/ProductCard.jsx";
import Modal from "../components/Modal.jsx";
import { createOrder } from "../services/orderService.js";

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().trim().min(3, "Ingresá tu nombre completo.").required("Campo obligatorio."),
  address: Yup.string().trim().min(5, "Ingresá una dirección válida.").required("Campo obligatorio."),
  city: Yup.string().trim().required("Campo obligatorio."),
  postalCode: Yup.string().trim().matches(/^[0-9A-Za-z\s-]{3,10}$/, "Código postal inválido.").required("Campo obligatorio."),
  paymentMethod: Yup.string().required("Elegí un método de pago."),
});

const SHIPPING = 4999;

export default function Checkout() {
  const { items, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState(null);
  const [pendingSubmitHelpers, setPendingSubmitHelpers] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [apiError, setApiError] = useState("");

  const total = subtotal + SHIPPING;

  if (orderId) {
    return (
      <section className="container-x flex min-h-[70vh] items-center justify-center py-20 text-center">
        <div className="max-w-md">
          <span className="badge-dot inline-block mb-4" />
          <p className="eyebrow mb-3">Compra confirmada</p>
          <h1 className="font-display text-3xl font-bold text-white mb-4">¡Gracias por tu compra!</h1>
          <p className="text-sm text-slate-400 mb-2">
            Tu número de orden es <span className="font-mono text-circuit">{orderId}</span>.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Recibirás un email de confirmación a la brevedad.
          </p>
          <Link to="/productos" className="btn-volt inline-flex">Seguir comprando</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-x flex min-h-[60vh] items-center justify-center text-center py-20">
        <div>
          <p className="eyebrow mb-3">Checkout</p>
          <h1 className="font-display text-2xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <p className="text-sm text-slate-500 mb-6">Agregá productos antes de pasar al checkout.</p>
          <Link to="/productos" className="btn-volt inline-flex">Ver productos</Link>
        </div>
      </section>
    );
  }

  const handleConfirmOrder = async () => {
    setApiError("");
    setConfirmOpen(false);
    const { values, setSubmitting, resetForm } = pendingSubmitHelpers;
    try {
      const order = await createOrder({
        items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        shipping: {
          fullName: values.fullName,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
        },
        paymentMethod: values.paymentMethod,
      });
      resetForm();
      setOrderId(order.orderNumber);
    } catch (err) {
      setApiError(err.message || "No se pudo procesar la compra. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="border-b border-line bg-grid bg-[length:32px_32px]">
        <div className="container-x py-12">
          <p className="eyebrow mb-3">Paso final</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Checkout</h1>
          {!isAuthenticated && (
            <p className="mt-3 text-sm text-amber-400/80">
              Estás comprando como invitado.{" "}
              <Link to="/login" className="underline hover:text-amber-400">
                Ingresá
              </Link>{" "}
              para guardar tu historial de compras.
            </p>
          )}
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <Formik
            initialValues={{ fullName: "", address: "", city: "", postalCode: "", paymentMethod: "" }}
            validationSchema={CheckoutSchema}
            onSubmit={(values, helpers) => {
              setPendingValues(values);
              setPendingSubmitHelpers(helpers);
              setConfirmOpen(true);
            }}
          >
            {() => (
              <Form className="card-surface p-6 space-y-6" noValidate>
                <div>
                  <p className="eyebrow mb-4">Datos de envío</p>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="fullName" className="field-label">Nombre completo</label>
                      <Field id="fullName" name="fullName" className="field-input" placeholder="Ada Lovelace"/>
                      <ErrorMessage name="fullName" component="p" className="field-error"/>
                    </div>
                    <div>
                      <label htmlFor="address" className="field-label">Dirección</label>
                      <Field id="address" name="address" className="field-input" placeholder="Av. Siempre Viva 742"/>
                      <ErrorMessage name="address" component="p" className="field-error"/>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city" className="field-label">Ciudad</label>
                        <Field id="city" name="city" className="field-input" placeholder="Buenos Aires"/>
                        <ErrorMessage name="city" component="p" className="field-error"/>
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="field-label">Código postal</label>
                        <Field id="postalCode" name="postalCode" className="field-input" placeholder="C1414"/>
                        <ErrorMessage name="postalCode" component="p" className="field-error"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="trace-divider"/>

                <div>
                  <p className="eyebrow mb-4">Método de pago</p>
                  <div className="space-y-3">
                    {[{ id:"credit",label:"Tarjeta de crédito"},{ id:"debit",label:"Tarjeta de débito"},{ id:"transfer",label:"Transferencia bancaria"}].map((m) => (
                      <label key={m.id} className="flex items-center gap-3 rounded-sm border border-line px-4 py-3 text-sm text-slate-300 cursor-pointer hover:border-volt/50">
                        <Field type="radio" name="paymentMethod" value={m.id} className="accent-[#F4C430]"/>
                        {m.label}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="paymentMethod" component="p" className="field-error"/>
                </div>

                {apiError && (
                  <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-4">
                    <p className="text-sm text-red-400">{apiError}</p>
                  </div>
                )}

                <button type="submit" className="btn-volt w-full">Revisar y confirmar compra</button>
              </Form>
            )}
          </Formik>

          <aside className="lg:sticky lg:top-24 h-fit card-surface p-6">
            <p className="eyebrow mb-4">Resumen del pedido</p>
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-400 truncate pr-2">{item.name} <span className="text-slate-600">×{item.quantity}</span></span>
                  <span className="font-mono text-slate-200 shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="trace-divider mb-4"/>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Envío</span><span className="font-mono">{formatPrice(SHIPPING)}</span>
              </div>
            </div>
            <div className="trace-divider my-4"/>
            <div className="flex justify-between">
              <span className="font-display font-semibold text-white">Total</span>
              <span className="font-mono text-lg font-semibold text-circuit">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </section>

      <Modal
        open={confirmOpen}
        title="Confirmar compra"
        onClose={() => { setConfirmOpen(false); pendingSubmitHelpers?.setSubmitting(false); }}
        onCancel={() => { setConfirmOpen(false); pendingSubmitHelpers?.setSubmitting(false); }}
        confirmLabel="Confirmar pago"
        onConfirm={handleConfirmOrder}
      >
        Vas a confirmar la compra por un total de{" "}
        <span className="text-white">{formatPrice(total)}</span>, enviada a{" "}
        <span className="text-white">{pendingValues?.address}, {pendingValues?.city}</span>.
      </Modal>
    </>
  );
}
