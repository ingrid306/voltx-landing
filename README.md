# VoltX — Landing + e-commerce (React)

Proyecto de e-commerce de tecnología hecho con React + Vite, React Router, Context API
(Cart + Auth), Formik/Yup para validación de formularios y EmailJS para el envío real
del formulario de contacto.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

Para generar el build de producción:

```bash
npm run build
npm run preview
```

## Envío real de mails (EmailJS)

El formulario de contacto valida todo con Formik + Yup y, **sin configuración adicional,
funciona en "modo demo"**: muestra el mensaje de envío correcto pero no manda nada a
ningún servidor (cumple el requisito de "no debe enviar nada").

Si querés que mande mails reales:

1. Creá una cuenta en emailjs.com.
2. Copiá `.env.example` como `.env`.
3. Completá `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y
   `VITE_EMAILJS_PUBLIC_KEY` con los valores de tu cuenta de EmailJS.
4. Reiniciá `npm run dev`.

Con las tres variables completas, el formulario llama a `emailjs.send(...)` de verdad.

## Login / Registro

Es un sistema simulado (no hay backend): los usuarios se guardan en `localStorage`
(`voltx_users_v1`) y la sesión activa en `voltx_session_v1`. Sirve para probar el flujo
completo de registro, login y sesión persistente, pero las contraseñas no están
hasheadas, así que no es apto para producción real.

## Carrito

El carrito persiste en `localStorage` (`voltx_cart_v1`) usando Context API + `useReducer`.
Soporta agregar, modificar cantidades, quitar productos individualmente, vaciar el
carrito completo y pasar a checkout. Todas las acciones destructivas o de compra piden
confirmación en un modal.

## Estructura

```
src/
  components/   Header, Footer, Layout, Modal, ProductCard
  context/      CartContext, AuthContext
  data/         products.js (catálogo mock)
  pages/        Home, About, Products, ProductDetail, Contact,
                Login, Register, Checkout, NotFound
```

## Rutas (React Router)

| Ruta               | Página               |
|---------------------|----------------------|
| `/`                 | Home                 |
| `/sobre-nosotros`   | About                |
| `/productos`        | Listado + carrito    |
| `/productos/:id`    | Detalle de producto  |
| `/contacto`         | Contacto (Formik)    |
| `/login`            | Login                |
| `/registro`         | Registro             |
| `/checkout`         | Checkout             |

## Checklist de la consigna

- [x] Header con navbar responsive (Context API para carrito/sesión)
- [x] Hero representativo + apartado "about" con botón a Sobre Nosotros
- [x] Sección de cards de productos destacados con botón a Productos
- [x] Footer
- [x] Página "Sobre Nosotros"
- [x] Página "Productos": render dinámico, filtros por categoría y orden,
      agregar al carrito, manejo de cantidades, vaciar carrito, borrar
      individualmente, realizar compra, todo con modal de confirmación
- [x] Página de contacto: nombre, apellido, email, asunto + validación Formik/Yup
      + mensaje de envío correcto
- [x] Todas las páginas vinculadas con React Router
- [x] Diseño responsive en todas las páginas
- [x] Carrito persistente (localStorage)
- [x] Login y registro (simulado, persistente)
- [x] Página de checkout
- [x] Página de producto individual
- [x] Envío real de mail desde el formulario de contacto vía EmailJS (opcional, con `.env`)
