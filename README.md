Universidad: Organización y Método
 (O&M)
 
Materia: Inteligencia Artificial 

📝 	Título de Proyecto: Creación de Página de Web 

🙍 Estudiante: Esmeralda R. Guzmán Feliz

👨‍🏫 Maestro: Juancito Peña

INTRODUCCION


El presente estudio se concibe como un manual didáctico-conceptual destinado a establecer los fundamentos teóricos y prácticos del desarrollo de aplicaciones web de interfaz (Front-End). Se abordará inicialmente la diferenciación precisa entre las disciplinas complementarias de Desarrollo Web, Diseño Web y Maquetado Web, clarificando sus roles dentro del ciclo de producción digital. El análisis se centrará en la Programación Web y la presentación de las tecnologías básicas estructurales y funcionales: HTML, CSS, y JavaScript (JS), complementadas por frameworks de eficiencia y kit de íconos como Bootstrap y Font Awesome, definiendo su evolución y posición histórica en el stack tecnológico.
Posteriormente, se detalla la construcción de un proyecto real, utilizando una metodología de documentación paso a paso para la implementación del código. Finalmente, se guiará al usuario a través del despliegue profesional del proyecto, abarcando la configuración del entorno local (Visual Studio Code) y los procedimientos estandarizados de publicación y distribución global a través de plataformas de alojamiento como GitHub Pages y Vercel, asegurando la transferencia efectiva de la teoría a la aplicación práctica.









📚 Tutorial de Introducción al Desarrollo Web

1. Conceptos Fundamentales del Desarrollo Web
El desarrollo web es el proceso de crear y mantener sitios y aplicaciones en internet. Para entenderlo, es crucial diferenciar tres conceptos clave:
1.1. Desarrollo Web (Web Development)
Es el proceso general y la ingeniería detrás de un sitio web. Involucra la codificación, la infraestructura, la base de datos y la lógica que hace que un sitio funcione, maneje datos y responda a las acciones del usuario. Si un sitio web fuera un automóvil, el Desarrollo Web es la ingeniería del motor, la transmisión y la electrónica.
1.2. Diseño Web (Web Design)
Se enfoca en el aspecto visual y la experiencia de usuario (UX/UI) de un sitio web. El diseño web determina cómo se ve la interfaz (colores, tipografía, imágenes) y cómo interactúa el usuario con ella (navegación intuitiva, disposición de los elementos). Es la estética y la ergonomía del automóvil.
1.3. Maquetado Web (Web Layout/Markup)
Es la estructura fundamental que da forma al contenido. Consiste en utilizar HTML para definir los bloques, secciones, textos e imágenes de una página. El maquetado es la columna vertebral que sostiene la información. Es el chasis y la carrocería donde se montan todas las piezas del automóvil.

2. Programación Web y Tecnologías Básicas
La Programación Web se refiere a la creación de la lógica y la funcionalidad interactiva de un sitio. Se divide en dos partes:
1.	Front-End (Lado del Cliente): Lo que ve e interactúa el usuario directamente en su navegador.
2.	Back-End (Lado del Servidor): La lógica, la base de datos y la seguridad que se ejecuta en un servidor remoto.
Para empezar en el Front-End, estas son las tecnologías fundamentales:
Tecnología	Rol Histórico en el Desarrollo	Definición
1. HTML (HyperText Markup Language)	1991. Es la base del desarrollo web. Siempre es el primer paso.	Es un lenguaje de marcado que define la estructura y el contenido (textos, imágenes, enlaces, tablas) de una página web. Es el esqueleto de la aplicación.
2. CSS (Cascading Style Sheets)	1996. Nació para separar el estilo de la estructura HTML, simplificando el diseño.	Es un lenguaje de estilos que define la apariencia visual del contenido HTML (colores, fuentes, márgenes, distribución, animaciones). Es la "ropa" de la aplicación.
3. JavaScript (JS)	1995. Inicialmente para pequeñas interacciones, hoy es el motor del dinamismo web.	Es un lenguaje de programación que permite agregar interactividad y lógica a la página. Permite que las cosas se muevan, respondan a clics y manipulen datos. Es el músculo y cerebro de la aplicación.
4. Bootstrap	2011. Creado por Twitter. Democratizó el diseño responsivo (que se adapta a móviles).	Es un framework de CSS (con componentes de JS) que ofrece estilos predefinidos y componentes listos para usar (botones, barras de navegación, modales). Permite crear diseños profesionales de forma rápida y responsiva.
5. Font Awesome	2012. Resolvió la necesidad de íconos escalables y vectoriales para la interfaz de usuario.	Es una librería de íconos (fuentes vectoriales) que permite incluir fácilmente símbolos y pequeños gráficos escalables (como el carrito de compras o un ícono de teléfono) sin necesidad de usar imágenes.

3. Proyecto Práctico: Un Manual Documentado
3.1. Archivo index.html (Estructura y Contenido)
HTML
<!DOCTYPE html> 
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GZAutoStore</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <link rel="stylesheet" href="style.css" /> </head>

<body>

    <header class="header-bg">
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand fw-bold" href="#inicio">
                    <i class="fas fa-car me-2"></i>GZAutoStore
                </a>
                
                <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item"><a class="nav-link active" href="#inicio">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="#vehiculos">Vehículos</a></li>
                    </ul>

                    <form class="d-flex me-3" onsubmit="event.preventDefault()">
                        <input class="form-control me-2" id="searchInput" type="search" placeholder="Buscar..." aria-label="Buscar">
                    </form>

                    <button class="btn position-relative" data-bs-toggle="modal" data-bs-target="#cartModal">
                        <i class="fas fa-shopping-cart text-white"></i>
                        <span id="cartCount" class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">0</span>
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <main class="pt-5 mt-5">

        <section id="inicio" class="py-5 text-center bg-light">
            <div class="container">
                <h1 class="display-4 fw-bold">¡Bienvenido a GZAutoStore!</h1>
                <p class="lead">Donde el estilo se convierte en movimiento.</p>
            </div>
        </section>

        <section id="vehiculos" class="py-5">
            <div class="container">
                <h2 class="text-center mb-4">Nuestros Vehículos</h2>

                <div id="advancedFilters" class="row g-3 mb-4 align-items-end">
                    <div class="col-md-3">
                        <label class="form-label">Marca</label>
                        <select id="filterMarca" class="form-select"></select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Año</label>
                        <select id="filterYear" class="form-select"></select>
                    </div>
                    <div class="col-md-3">
                        <button id="clearFiltersBtn" class="btn btn-outline-secondary w-100">Limpiar filtros</button>
                    </div>
                </div>

                <div id="loadingSpinner" class="text-center my-5">
                    <div class="spinner-border text-primary"></div>
                </div>

                <div id="productsContainer" class="row g-4"></div>

                <nav aria-label="Page navigation" class="mt-4">
                    <ul id="paginationContainer" class="pagination justify-content-center"></ul>
                </nav>

            </div>
        </section>

    </main>

    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="cartModalLabel"><i class="fas fa-shopping-cart me-2"></i> Tu Carrito de Compras</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cartItems" class="mb-4"></div> <div class="d-flex justify-content-between align-items-center border-top pt-3">
                        <h4 class="mb-0">Total:</h4>
                        <h4 id="cartTotal" class="mb-0 fw-bold">$0</h4>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Seguir Comprando</button>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#paymentModal">
                        <i class="fas fa-credit-card me-1"></i> Ir a Pagar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        </div>

    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
        </div>

    <div class="modal fade" id="quantityModal" tabindex="-1" aria-labelledby="quantityModalLabel" aria-hidden="true">
        </div>

    <footer class="footer-custom text-white mt-5 pt-4 pb-3">
        </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="script.js" defer></script>

</body>
</html>
3.2. Archivo style.css (Estilos Visuales)
CSS
/* style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* ... Todos los estilos de tu proyecto ... */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #222;
    background-color: #EEF3FF; /* Estilo CSS */
}

/* ... Estilos para header, navbar, cards, filtros y footer ... */
/* Asegúrate de copiar el CSS completo que te envié en la respuesta anterior. */
3.3. Archivo script.js (Funcionalidad y Lógica)
JavaScript
// script.js 
document.addEventListener('DOMContentLoaded', async () => {

    // === 1. VARIABLES GLOBALES e Inicialización de Modales de Bootstrap ===
    let vehiclesData = [];
    let cart = JSON.parse(localStorage.getItem('garageCart')) || [];
    // ... Inicialización de los Modales con new bootstrap.Modal(...) ...
    
    // === 2. DECLARACIÓN DE ELEMENTOS DEL DOM (Conexión HTML-JS) ===
    const productsContainer = document.getElementById('productsContainer');
    // ... Elementos de filtros, búsqueda, carrito, etc. ...

    // === 3. FUNCIÓN PRINCIPAL: loadVehicles() ===
    // Carga los datos del JSON de vehículos mediante fetch.
    await loadVehicles();
    updateCartUI();

    // === 4. FUNCIÓN displayVehicles(list) ===
    // Renderiza las tarjetas de vehículos en productsContainer, aplica la lógica de paginación.

    // === 5. FUNCIÓN applyAdvancedFilters() ===
    // Contiene la lógica central que revisa el valor de 'searchInput' y de todos los 'selects'
    // para filtrar el array vehiclesData y llama a displayVehicles() con la lista filtrada.
    
    // === 6. MANEJO DE EVENTOS (Filtros y Búsqueda) ===
    // Se asegura que al cambiar un select (filterMarca, filterYear, etc.) o escribir en searchInput,
    // se llame a applyAdvancedFilters().
    
    // ... [El resto del código JavaScript de carrito y facturación va aquí] ...

}); // END DOMContentLoaded
/* Asegúrate de copiar el JavaScript completo que te envié en la respuesta anterior. */





4. Desarrollo del Proyecto en Visual Studio Code (VS Code)
4.1. Configuración Inicial y Creación de Archivos
1.	Instalar VS Code: Descarga e instala el editor desde el sitio web oficial.
2.	Crear una Carpeta: Crea una carpeta en tu escritorio o documentos (ej: ProyectoGZAutoStore). Esta será la raíz de tu proyecto.
3.	Abrir la Carpeta en VS Code: Abre VS Code, ve a Archivo > Abrir Carpeta... y selecciona la carpeta que acabas de crear.
4.	Crear los Archivos Base: Dentro de VS Code, en el panel lateral, haz clic en el ícono de "Nuevo archivo" (una hoja con un signo de más) y nombra los tres archivos esenciales:
o	index.html: Para el maquetado y la estructura.
o	style.css: Para el diseño y los estilos.
o	script.js: Para la programación y la lógica.
4.2. Visualización Local con Live Server
Para ver tu proyecto en el navegador de forma fácil y con actualizaciones automáticas, usarás una extensión de VS Code:
1.	Instalar Live Server:
o	En VS Code, haz clic en el ícono de Extensiones (el cuarto ícono en la barra lateral izquierda, parece un cuadrado con otro flotando).
o	En la barra de búsqueda, escribe "Live Server".
o	Selecciona la extensión de Ritwick Dey y haz clic en el botón Instalar.
2.	Ejecutar el Proyecto:
o	Vuelve al archivo index.html.
o	Haz clic derecho sobre el código o en la pestaña del archivo.
o	Selecciona "Open with Live Server".
o	Esto abrirá automáticamente tu página web en tu navegador predeterminado y la actualizará cada vez que guardes cambios en cualquiera de los archivos.

5. Despliegue del Proyecto en GitHub Pages
GitHub es la plataforma más popular para almacenar y gestionar código. GitHub Pages es el servicio gratuito para publicar sitios web estáticos (solo HTML, CSS y JS).
5.1. Creación de Cuenta y Repositorio (Manual)
1.	Crear Cuenta: Ve a github.com y haz clic en "Sign up" para crear tu cuenta.
2.	Crear Repositorio: Una vez iniciada la sesión, haz clic en el botón "New" (Nuevo Repositorio).
o	Repository name: Elige un nombre para tu proyecto (ej: gzautostore-ecommerce).
o	Description (Opcional): Agrega una descripción.
o	Public/Private: Selecciona "Public" (Público) para que GitHub Pages funcione sin problemas.
o	Inicialización: NO marques la casilla "Add a README file".
o	Haz clic en "Create repository" (Crear repositorio).
5.2. Subida Manual de Archivos (Arrastrar y Soltar)
1.	Abrir la Vista de Código: Una vez creado el repositorio, verás una página que te pide subir archivos.
2.	Arrastrar y Soltar:
o	Abre la carpeta de tu proyecto (ProyectoGZAutoStore) en tu explorador de archivos.
o	Selecciona los tres archivos: index.html, style.css, y script.js.
o	Arrastra los tres archivos y suéltalos directamente en la ventana de GitHub de tu repositorio.
3.	Confirmar la Subida (Commit):
o	Verás una lista de los archivos subidos.
o	En el campo "Commit changes" (Confirmar cambios), escribe un mensaje breve (ej: Initial project commit).
o	Haz clic en el botón verde "Commit changes" en la parte inferior.
5.3. Publicación en GitHub Pages (Activación)
1.	Ir a Configuración (Settings): En la barra de navegación superior de tu repositorio, haz clic en la pestaña "Settings" (Configuración).
2.	Seleccionar Pages: En el menú lateral izquierdo, haz clic en "Pages".
3.	Configurar Fuente (Source):
o	Bajo la sección "Build and deployment", en "Source", selecciona "Deploy from a branch".
o	En el desplegable de Branch, selecciona main (o master si ese es tu nombre de rama).
o	Haz clic en "Save" (Guardar).
El sitio web tardará uno o dos minutos en desplegarse. Una vez listo, la URL de tu sitio aparecerá justo encima (ej: https://[TuUsuario].github.io/gzautostore-ecommerce/).

6. Despliegue del Proyecto en Vercel
Vercel es una plataforma de despliegue moderna, ideal para proyectos front-end por su rapidez y simplicidad. El proceso requiere enlazar tu cuenta de GitHub.
6.1. Pasos para Publicar en Vercel
1.	Crear Cuenta Vercel: Ve a vercel.com y haz clic en "Sign Up". Elige la opción "Continue with GitHub" (Continuar con GitHub) para enlazar tus cuentas.
2.	Importar el Proyecto (Import Project):
o	Una vez dentro del panel de Vercel, haz clic en "Add New" y luego en "Project".
o	Vercel mostrará una lista de tus repositorios de GitHub.
o	Busca el repositorio que acabas de crear (gzautostore-ecommerce) y haz clic en "Import".
3.	Configuración del Proyecto:
o	Vercel detectará automáticamente que es un proyecto estático.
o	En "Root Directory" (Directorio Raíz), déjalo como está.
o	Haz clic en "Deploy" (Desplegar).
4.	Despliegue y URL Compartible:
o	Vercel tardará unos segundos en construir y desplegar tu sitio.
o	Una vez terminado, te mostrará un mensaje de "Congratulations!" (¡Felicidades!) con la URL de tu proyecto (ej: https://gzautostore-ecommerce-[codigo].vercel.app).
6.2. Visualización y Compartición
Tanto en GitHub Pages como en Vercel, la URL generada es pública y funcional. Puedes hacer clic en el enlace para ver tu proyecto en vivo y compartir esa dirección con quien desees.
•	Ver el Proyecto: Abre la URL generada en cualquier navegador, incluso desde un móvil.
•	Compartir: Copia la URL y envíala. Cualquier persona con el enlace podrá ver la versión publicada de tu trabajo.




CONCLUSION


La culminación de este tutorial marca la adquisición de un entendimiento integral sobre el proceso de creación y distribución de contenido web estático y dinámico. Se ha demostrado que la arquitectura de una aplicación de interfaz se sustenta en la coherencia entre la estructura semántica (HTML), la presentación visual (CSS) y la lógica interactiva (JS). La implementación práctica, validada mediante el uso de herramientas profesionales como Visual Studio Code y la adopción de frameworks consolidados como Bootstrap, subraya la importancia de la eficiencia y la adaptabilidad (diseño responsivo).
El éxito en el despliegue del proyecto en GitHub Pages y Vercel dota al aprendiz de una competencia fundamental en la gestión de repositorios y la distribución continua (CI/CD), habilidades esenciales en el entorno laboral contemporáneo. En definitiva, este estudio no solo ha transferido conocimiento técnico, sino que ha establecido la base metodológica necesaria para que el estudiante pueda evolucionar hacia arquitecturas más complejas y enfrentar los desafíos del desarrollo full-stack.











