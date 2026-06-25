# InfoTrack - Frontend

Aplicacion web progresiva (PWA) para la plataforma InfoTrack, orientada a estudiantes universitarios de la Universidad Nacional del Oeste (UNO). Permite consultar materias, carreras y profesores, y gestionar el seguimiento personal del avance academico.

---

## Tecnologias utilizadas

- React 19 con Vite 8
- React Router DOM 7 (enrutamiento del lado del cliente)
- Apollo Client 4 (consumo de la API GraphQL)
- Material UI 9 con Emotion (componentes y estilos)
- MUI X Charts 9 (graficos de progreso)
- Tabler Icons React (iconografia)
- SweetAlert2 (alertas y modales)
- vite-plugin-pwa (soporte de Progressive Web App con Service Worker)
- ESLint (linting)

---

## Requisitos previos

- Node.js v18 o superior
- El backend de InfoTrack corriendo y accesible

---

## Instalacion

```bash
git clone <url-del-repositorio>
cd front-app-interfaces
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
VITE_GRAPHQL_URI="http://localhost:4000/"
```

Esta variable define la URL del endpoint GraphQL al que Apollo Client realiza todas las peticiones. En produccion debe apuntar a la URL del backend desplegado.

---

## Scripts disponibles

```bash
# Iniciar el servidor de desarrollo con hot reload
npm run dev

# Compilar la aplicacion para produccion (genera la carpeta dist/)
npm run build

# Previsualizar el build de produccion localmente
npm run preview

# Ejecutar el linter
npm run lint
```

---

## Estructura del proyecto

```
src/
  main.jsx                    # Punto de entrada: configura Apollo Client, BrowserRouter y AuthProvider
  index.css                   # Estilos globales
  pages/
    App.jsx                   # Componente raiz: define las rutas y el banner de instalacion PWA
    Home.jsx                  # Pagina de inicio publica (landing)
    Login.jsx                 # Formulario de inicio de sesion
    Register.jsx              # Formulario de registro de usuario
    Materias.jsx              # Listado de materias con busqueda
    Materia.jsx               # Detalle de una materia: comisiones, profesores, correlativas
    Profesores.jsx            # Listado de profesores
    Profesor.jsx              # Detalle de un profesor con reseñas
    Carreras.jsx              # Listado de carreras disponibles
    Carrera.jsx               # Detalle de una carrera con su plan de estudio
    Calendario.jsx            # Calendario de fechas importantes agrupadas por mes
    Dashboard.jsx             # Panel del usuario autenticado con estadisticas academicas
    MateriasUser.jsx          # Materias registradas por el usuario con filtros
    MisTareas.jsx             # Listado de tareas y vencimientos proximos
    Recursos.jsx              # Seccion de recursos y links utiles
  components/
    Header.jsx                # Barra de navegacion superior
    Footer.jsx                # Pie de pagina
    Sidebar.jsx               # Menu lateral para secciones privadas
    MainLayout.jsx            # Layout publico con Header y Footer
    PerfilLayout.jsx          # Layout privado con Header y Sidebar
    Inicio.jsx                # Seccion hero de la landing
    Features.jsx              # Seccion de caracteristicas de la landing
    HowItWorks.jsx            # Seccion de como funciona la landing
    CTAFinal.jsx              # Call to action final de la landing
    Novedades.jsx             # Seccion de novedades en la landing
    CarrerasArea.jsx          # Lista de carreras en la landing
    InfoResum.jsx             # Resumen informativo de la landing
    Reseña.jsx                # Componente de reseña de profesor
    CrearValoracionForm.jsx   # Formulario para puntuar a un profesor
    MiMateria.jsx             # Tarjeta de materia en el historial del usuario
    EstadoMateriaFormBase.jsx # Base compartida de formularios de estado de materia
    CrearEstadoMateriaForm.jsx # Formulario para registrar el estado de una materia
    EditarEstadoMateriaForm.jsx# Formulario para editar el estado de una materia
    MultiProgressBar.jsx      # Barra de progreso por estado de materia
    GraficoProgress.jsx       # Grafico circular de progreso academico
    GraficoMaterias.jsx       # Grafico de materias por estado
    MateriaBadge.jsx          # Badge de estado de materia
    SearchLayout.jsx          # Layout con buscador para materias
    BackButton.jsx            # Boton de regreso
    ScrollTopTop.jsx          # Componente que hace scroll al inicio en cada navegacion
    FormModel.jsx             # Componente modal reutilizable
    IconoBienvenida.jsx       # Icono animado de bienvenida en el dashboard
  providers/
    AuthProvider.jsx          # Proveedor de contexto de autenticacion
  contexts/
    AuthContext.jsx           # Definicion del contexto de autenticacion
  hooks/
    useAuthContext.jsx        # Acceso al contexto de autenticacion
    useLogin.jsx              # Logica de inicio de sesion
    useRegister.jsx           # Logica de registro de usuario
    useDashboard.jsx          # Logica y queries del panel del usuario
    useMaterias.jsx           # Query de listado de materias
    useMateria.jsx            # Query de detalle de materia
    useCarreras.jsx           # Query de listado de carreras
    useCarrera.jsx            # Query de detalle de carrera
    useProfesores.jsx         # Query de listado de profesores
    useProfesor.jsx           # Query de detalle y puntuacion de profesor
    useSearch.jsx             # Busqueda de materias con debounce
    useDebounce.jsx           # Hook de debounce generico
    useFiltroMisMaterias.jsx  # Filtros del historial de materias del usuario
    useEstadoMateriaForm.jsx  # Logica de formularios de estado de materia
  graphql/
    usuario.queries.js        # Queries GraphQL de usuario (ME)
    usuario.mutations.js      # Mutations GraphQL de usuario
    materia.queries.js        # Queries GraphQL de materias
    materia.mutations.js      # Mutations GraphQL de materias
    carrera.queries.js        # Queries GraphQL de carreras
    profesor.queries.js       # Queries GraphQL de profesores
    profesor.mutations.js     # Mutations GraphQL de profesores (puntuaciones)
    fechas.queries.js         # Queries GraphQL de fechas importantes
  skeletons/
    CarreraSkeleton.jsx       # Skeleton de carga para detalle de carrera
    CarrerasSkeleton.jsx      # Skeleton de carga para listado de carreras
    MateriaSkeleton.jsx       # Skeleton de carga para detalle de materia
    MateriasSkeleton.jsx      # Skeleton de carga para listado de materias
    ProfesorSkeleton.jsx      # Skeleton de carga para detalle de profesor
    ProfesoresSkeleton.jsx    # Skeleton de carga para listado de profesores
    CalendarioSkeleton.jsx    # Skeleton de carga para el calendario
  styles/
    dashboard.css             # Estilos del panel de usuario
    sidebar.css               # Estilos del menu lateral
    tareas.css                # Estilos de la seccion de tareas
    materia.css               # Estilos del detalle de materia
    materiasUser.css          # Estilos del historial de materias
    profesores.css            # Estilos de la seccion de profesores
    reseña.css                # Estilos de las reseñas de profesores
  data/                       # Datos estaticos JSON de referencia
  assets/                     # Imagenes, logos y fondos SVG
  routes/
    AppRoutes.jsx             # Archivo de rutas (actualmente vacio, las rutas estan en App.jsx)
```

---

## Dominio de la aplicacion

InfoTrack permite a los estudiantes:

- Consultar el catalogo completo de materias, carreras y profesores de la UNO sin necesidad de autenticacion.
- Registrarse e iniciar sesion para acceder a funcionalidades personalizadas.
- Mantener un historial personal de materias con los estados `CURSANDO`, `REGULARIZADA`, `APROBADA` y `PROMOCIONADA`.
- Visualizar estadisticas academicas por carrera: porcentaje completado, promedio general, cantidad de materias por estado.
- Consultar los proximos vencimientos de materias regularizadas y las materias disponibles para cursar el siguiente cuatrimestre segun correlativas.
- Puntuar y comentar profesores, y modificar o eliminar las propias puntuaciones.
- Ver el calendario academico con fechas importantes agrupadas por mes.
- Instalar la aplicacion como PWA en dispositivos moviles y de escritorio para uso sin navegador.

---

## Rutas de la aplicacion

### Rutas publicas (con Header y Footer)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/` | Home | Landing page de la plataforma |
| `/materias` | Materias | Listado de materias con busqueda |
| `/materia/:id` | Materia | Detalle de una materia |
| `/profesores` | Profesores | Listado de profesores |
| `/profesor/:id` | Profesor | Detalle de un profesor con reseñas |
| `/carreras` | Carreras | Listado de carreras |
| `/carrera/:id` | Carrera | Detalle de una carrera con plan de estudio |
| `/calendario` | Calendario | Calendario de fechas academicas |

### Rutas de autenticacion (sin layout)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/login` | Login | Inicio de sesion |
| `/register` | Register | Registro de nuevo usuario |

### Rutas privadas (con Header y Sidebar)

| Ruta | Componente | Descripcion |
|---|---|---|
| `/perfil` | Dashboard | Panel con estadisticas academicas del usuario |
| `/perfil/mis-materias` | MateriasUser | Historial de materias del usuario con filtros |
| `/perfil/mis-tareas` | MisTareas | Vencimientos proximos y tareas pendientes |
| `/recursos` | Recursos | Links y recursos utiles |

---

## Autenticacion

La autenticacion es gestionada por `AuthProvider` y `AuthContext`. Al iniciar la aplicacion, si existe un token en `localStorage` bajo la clave `accessToken`, se ejecuta automaticamente la query `me` para recuperar los datos del usuario autenticado.

El token se incluye en cada peticion a la API GraphQL a traves de un `SetContextLink` de Apollo Client, que lee el token de `localStorage` e inyecta el header `Authorization`.

Las funciones expuestas por el contexto son:

- `guardarToken(token)`: almacena el token y resetea la cache de Apollo.
- `eliminarToken()`: elimina el token y limpia la cache de Apollo.
- `userIdentity`: objeto con los datos del usuario autenticado o `null` si no hay sesion.
- `setMaterias(materias)`: actualiza localmente el listado de materias del usuario sin requerir una nueva query.

---

## Progressive Web App (PWA)

La aplicacion esta configurada como PWA mediante `vite-plugin-pwa`. Al acceder desde un navegador compatible, se muestra automaticamente un banner de instalacion en la parte inferior de la pantalla. En iOS, el banner indica los pasos manuales para agregar la aplicacion a la pantalla de inicio.

Una vez instalada, la aplicacion corre en modo `standalone`, sin barra de navegacion del navegador.

La configuracion del manifest incluye:

- Nombre: InfoTrack
- Color del tema: `#0f172a`
- Modo de display: `standalone`
- Iconos en 192x192 y 512x512 px

---

## Despliegue

El frontend esta configurado para desplegarse en Vercel. El archivo `vercel.json` incluido en la raiz del proyecto redirige todas las rutas al `index.html` para que React Router maneje la navegacion del lado del cliente:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Para desplegar manualmente:

```bash
npm run build
# El contenido de la carpeta dist/ es el que se sirve en produccion
```
