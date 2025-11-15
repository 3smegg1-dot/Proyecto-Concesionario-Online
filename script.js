// script.js 
document.addEventListener('DOMContentLoaded', async () => {

    // === VARIABLES GLOBALES ===
    let vehiclesData = [];
    let cart = JSON.parse(localStorage.getItem('garageCart')) || [];
    let currentVehicle = null;

    // Inicializar Modales de Bootstrap para asegurar que existan
    const detailModalElement = document.getElementById('detailModal');
    const quantityModalElement = document.getElementById('quantityModal');
    const cartModalElement = document.getElementById('cartModal');
    const paymentModalElement = document.getElementById('paymentModal');

    let detailModal = detailModalElement ? new bootstrap.Modal(detailModalElement) : null;
    let quantityModal = quantityModalElement ? new bootstrap.Modal(quantityModalElement) : null;
    let cartModal = cartModalElement ? new bootstrap.Modal(cartModalElement) : null;
    let paymentModal = paymentModalElement ? new bootstrap.Modal(paymentModalElement) : null;


    // === PAGINACIÓN ===
    let currentPage = 1;
    const itemsPerPage = 9;
    let lastRenderedList = [];

    // === ANIMACIÓN TEST DRIVE ===
    function testDriveAnimation(codigo) {
        const card =
            document.querySelector(`.card[aria-labelledby="vehicle-${codigo}"]`) ||
            document.getElementById(`vehicle-${codigo}`)?.closest('.card');

        if (!card) return;

        card.classList.add("test-drive");
        setTimeout(() => card.classList.remove("test-drive"), 700);
    }

    // === ELEMENTOS DEL DOM ===
    const productsContainer = document.getElementById('productsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const searchInput = document.getElementById('searchInput');
    const cartCountSpan = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const quantityInput = document.getElementById('quantityInput');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const processPaymentBtn = document.getElementById('processPaymentBtn');
    const currentYearFooterSpan = document.getElementById('currentYearFooter');
    const paginationContainer = document.getElementById('paginationContainer');

    // ELEMENTOS FILTROS
    const filterMarca = document.getElementById('filterMarca');
    const filterCategoria = document.getElementById('filterCategoria');
    const filterTipo = document.getElementById('filterTipo');
    const filterPrecio = document.getElementById('filterPrecio');
    const filterYear = document.getElementById('filterYear');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    if (currentYearFooterSpan)
        currentYearFooterSpan.textContent = new Date().getFullYear();

    // ===============================
    //        CARGAR VEHÍCULOS
    // ===============================
    await loadVehicles();
    updateCartUI();


    async function loadVehicles() {
        try {
            // Se usa un proxy para evitar problemas de CORS con raw.githubusercontent.com
            const response = await fetch('https://raw.githubusercontent.com/JUANCITOPENA/Pagina_Vehiculos_Ventas/refs/heads/main/vehiculos.json');

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            vehiclesData = await response.json();
            lastRenderedList = vehiclesData.slice();
            displayVehicles(lastRenderedList);

            loadFilterOptions();
        } catch (error) {
            console.error('Error cargando vehículos:', error);
            productsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="alert alert-danger">
                        Error al cargar los vehículos.
                    </div>
                </div>`;
        } finally {
            if (loadingSpinner) loadingSpinner.style.display = 'none';
        }
    }

    // ===============================
    //       MOSTRAR VEHÍCULOS + PÁGINAS
    // ===============================
    function displayVehicles(list) {
        const vehicles = Array.isArray(list) ? list : [];
        lastRenderedList = vehicles.slice();

        const totalPages = Math.max(1, Math.ceil(vehicles.length / itemsPerPage));
        if (currentPage > totalPages) currentPage = 1;

        productsContainer.innerHTML = '';

        if (vehicles.length === 0) {
            productsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted">No se encontraron vehículos.</p>
                </div>`;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const vehiclesToShow = vehicles.slice(start, end);

        vehiclesToShow.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6 mb-4';
            card.innerHTML = `
                <div class="card h-100" aria-labelledby="vehicle-${vehicle.codigo}">
                    <img src="${vehicle.imagen}" class="card-img-top" alt="${vehicle.modelo}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title" id="vehicle-${vehicle.codigo}">${vehicle.modelo}</h3>
                        <p class="card-text">${vehicle.categoria}</p>
                        <p class="card-text"><small class="text-muted">
                            ${vehicle.tipo.replace(/[\u{1F697}\u{1F698}\u{1F699}]/gu, '')}
                        </small></p>
                        <p class="card-price">$${Number(vehicle.precio_venta).toLocaleString('es-DO')}</p>
                        <button class="btn btn-primary mt-auto viewDetailsBtn" data-codigo="${vehicle.codigo}">
                            Ver Detalles
                        </button>
                    </div>
                </div>`;
            productsContainer.appendChild(card);
        });

        renderPagination(vehicles);
    }

    // ===============================
    //           PAGINACIÓN
    // ===============================
    function renderPagination(vehicles) {
        if (!paginationContainer) return;

        const totalPages = Math.ceil(vehicles.length / itemsPerPage);
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        const ul = document.createElement('ul');
        ul.className = 'pagination';

        // Prev
        const liPrev = document.createElement('li');
        liPrev.className = 'page-item ' + (currentPage === 1 ? 'disabled' : '');
        const btnPrev = document.createElement('button');
        btnPrev.className = 'page-link';
        btnPrev.textContent = 'Anterior';
        btnPrev.dataset.page = currentPage - 1;
        liPrev.appendChild(btnPrev);
        ul.appendChild(liPrev);

        // Page buttons
        const maxButtons = 7;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = 'page-item ' + (i === currentPage ? 'active' : '');
            const btn = document.createElement('button');
            btn.className = 'page-link';
            btn.dataset.page = i;
            btn.textContent = i;
            li.appendChild(btn);
            ul.appendChild(li);
        }

        // Next
        const liNext = document.createElement('li');
        liNext.className = 'page-item ' + (currentPage === totalPages ? 'disabled' : '');
        const btnNext = document.createElement('button');
        btnNext.className = 'page-link';
        btnNext.textContent = 'Siguiente';
        btnNext.dataset.page = currentPage + 1;
        liNext.appendChild(btnNext);
        ul.appendChild(liNext);

        paginationContainer.appendChild(ul);

        paginationContainer.querySelectorAll('.page-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const newPage = Number(btn.dataset.page);
                if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) { // Validación agregada
                    currentPage = newPage;
                    displayVehicles(lastRenderedList);
                    window.scrollTo({ top: 200, behavior: "smooth" });
                }
            });
        });
    }

    // ===============================
    //        EVENTO DETALLES + DRIVE
    // ===============================
    productsContainer.addEventListener('click', e => {
        const btn = e.target.closest('.viewDetailsBtn');
        if (!btn) return;

        const codigo = parseInt(btn.dataset.codigo);
        testDriveAnimation(codigo);

        const vehicle = vehiclesData.find(v => v.codigo === codigo);
        if (vehicle) showDetailModal(vehicle);
    });

    // ===============================
    //             MODALES
    // ===============================
    function showDetailModal(vehicle) {
        currentVehicle = vehicle;
        const modalBody = document.getElementById('detailModalBody');
        const detailAddToCartBtn = document.getElementById('detailAddToCartBtn'); // Obtener el botón aquí

        if (!modalBody || !detailModal) return;

        modalBody.innerHTML = `
            <img src="${vehicle.imagen}" class="img-fluid mb-3">
            <ul class="list-group">
                <li class="list-group-item"><strong>Marca:</strong> ${vehicle.marca}</li>
                <li class="list-group-item"><strong>Modelo:</strong> ${vehicle.modelo}</li>
                <li class="list-group-item"><strong>Categoría:</strong> ${vehicle.categoria}</li>
                <li class="list-group-item"><strong>Tipo:</strong> ${vehicle.tipo.replace(/[\u{1F697}\u{1F698}\u{1F699}]/gu, '')}</li>
                <li class="list-group-item"><strong>Año:</strong> ${vehicle.año}</li>
                <li class="list-group-item"><strong>Precio:</strong> $${Number(vehicle.precio_venta).toLocaleString('es-DO')}</li>
            </ul>
        `;

        detailModal.show();

        // El listener se asigna directamente al botón dentro de la función
        detailAddToCartBtn.onclick = () => {
            detailModal.hide();
            showQuantityModal(vehicle);
        };
    }

    function showQuantityModal(vehicle) {
        currentVehicle = vehicle;
        if (quantityInput) quantityInput.value = 1;

        if (!quantityModal || !addToCartBtn) return;

        quantityModal.show();

        addToCartBtn.onclick = () => {
            const qty = quantityInput ? parseInt(quantityInput.value) : 1;
            if (qty > 0) {
                addItemToCart(vehicle, qty);
                quantityModal.hide();
            }
        };
    }

    // ===============================
    //              CARRITO
    // ===============================
    function addItemToCart(vehicle, quantity) {
        const existing = cart.find(i => i.codigo === vehicle.codigo);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                codigo: vehicle.codigo,
                modelo: vehicle.modelo,
                precio: Number(vehicle.precio_venta),
                imagen: vehicle.imagen,
                quantity
            });
        }

        localStorage.setItem('garageCart', JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = totalItems;

        if (!cartItemsContainer || !cartTotalSpan) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-muted text-center">Carrito vacío.</p>`;
        } else {
            cart.forEach(item => {
                const subtotal = item.precio * item.quantity;
                total += subtotal;

                cartItemsContainer.innerHTML += `
                    <div class="d-flex align-items-center mb-3 border-bottom pb-3">
                        <img src="${item.imagen}" width="60" height="60" class="me-3 rounded">
                        <div class="flex-grow-1">
                            <h6>${item.modelo}</h6>
                            <small>Cantidad: ${item.quantity} | Precio unitario: $${item.precio.toLocaleString('es-DO')}</small>
                        </div>
                        <p class="fw-bold">$${subtotal.toLocaleString('es-DO')}</p>
                    </div>
                `;
            });
        }

        cartTotalSpan.textContent = `$${total.toLocaleString('es-DO')}`;
    }


    // ===============================
    //       FILTROS AVANZADOS y BÚSQUEDA (CORREGIDOS)
    // ===============================
    function loadFilterOptions() {
        const marcas = [...new Set(vehiclesData.map(v => v.marca))].sort();
        const categorias = [...new Set(vehiclesData.map(v => v.categoria))].sort();
        // Limpiando el tipo de emoji para la lista de filtros
        const tipos = [...new Set(vehiclesData.map(v => v.tipo.replace(/[\u{1F697}\u{1F698}\u{1F699}]/gu, '').trim()))].sort();
        const years = [...new Set(vehiclesData.map(v => v.año))].sort((a, b) => b - a);

        if (filterMarca)
            filterMarca.innerHTML = '<option value="">Todas</option>' + marcas.map(m => `<option>${m}</option>`).join('');
        if (filterCategoria)
            filterCategoria.innerHTML = '<option value="">Todas</option>' + categorias.map(c => `<option>${c}</option>`).join('');
        if (filterTipo)
            filterTipo.innerHTML = '<option value="">Todos</option>' + tipos.map(t => `<option>${t}</option>`).join('');
        if (filterYear)
            filterYear.innerHTML = '<option value="">Todos</option>' + years.map(y => `<option>${y}</option>`).join('');
    }

    function applyAdvancedFilters() {
        const marca = filterMarca.value;
        const categoria = filterCategoria.value;
        const tipo = filterTipo.value;
        const precio = filterPrecio.value;
        const year = filterYear.value;
        const query = searchInput.value.toLowerCase().trim();

        let filtered = vehiclesData.slice();

        // Aplicar filtros de SELECT
        if (marca) filtered = filtered.filter(v => v.marca === marca);
        if (categoria) filtered = filtered.filter(v => v.categoria === categoria);
        // La condición del tipo debe ser si el valor del select está contenido en la propiedad `tipo` del vehículo.
        if (tipo) filtered = filtered.filter(v => v.tipo.replace(/[\u{1F697}\u{1F698}\u{1F699}]/gu, '').trim() === tipo);
        if (year) filtered = filtered.filter(v => String(v.año) === String(year));

        // Filtro de precio
        if (precio) {
            filtered = filtered.filter(v => {
                const p = Number(v.precio_venta);
                if (precio === "1") return p < 1_000_000;
                if (precio === "2") return p >= 1_000_000 && p <= 2_000_000;
                if (precio === "3") return p >= 2_000_000 && p <= 3_000_000;
                if (precio === "4") return p > 3_000_000;
                return true;
            });
        }

        // Filtro de Búsqueda (Texto)
        if (query) {
            filtered = filtered.filter(v =>
                v.marca.toLowerCase().includes(query) ||
                v.modelo.toLowerCase().includes(query) ||
                v.categoria.toLowerCase().includes(query) ||
                v.tipo.toLowerCase().includes(query) // Incluimos tipo en la búsqueda por texto
            );
        }

        currentPage = 1;
        displayVehicles(filtered);
    }

    // Eventos de Filtro - Ahora deberían funcionar correctamente
    [filterMarca, filterCategoria, filterTipo, filterPrecio, filterYear].forEach(f => {
        if (f) f.addEventListener('change', applyAdvancedFilters);
    });

    // Evento de Búsqueda - Usa 'input' para filtrar mientras escribes
    if (searchInput) {
        searchInput.addEventListener('input', applyAdvancedFilters);
        // También aseguramos que al presionar Enter no envíe el formulario.
        searchInput.closest('form').addEventListener('submit', (e) => {
            e.preventDefault();
            applyAdvancedFilters();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (filterMarca) filterMarca.value = '';
            if (filterCategoria) filterCategoria.value = '';
            if (filterTipo) filterTipo.value = '';
            if (filterPrecio) filterPrecio.value = '';
            if (filterYear) filterYear.value = '';
            if (searchInput) searchInput.value = '';
            currentPage = 1;
            displayVehicles(vehiclesData);
        });
    }

    // ===============================
    //        PAGO Y FACTURA
    // ===============================
    if (processPaymentBtn) {
        processPaymentBtn.addEventListener('click', () => {
            const cardName = document.getElementById('cardName');
            const cardNumber = document.getElementById('cardNumber');
            const cardExpiry = document.getElementById('cardExpiry');
            const cardCvv = document.getElementById('cardCvv');

            // Validación simple para asegurar que los campos existan y no estén vacíos
            if (!cardName || !cardNumber || !cardExpiry || !cardCvv ||
                !cardName.value.trim() || !cardNumber.value.trim() ||
                !cardExpiry.value.trim() || !cardCvv.value.trim()) {
                alert('Por favor, completa todos los campos de pago.');
                return;
            }

            alert('Pago procesado exitosamente. Se generará su factura en PDF.');

            // Usamos una copia del carrito para la factura antes de limpiarlo
            const invoiceCart = cart.slice();

            // Cerrar modales y limpiar carrito
            if (paymentModal) paymentModal.hide();
            if (cartModal) cartModal.hide();

            // Generar factura con el carrito actual
            generateInvoice(cardName.value.trim(), invoiceCart);

            cart = [];
            localStorage.removeItem('garageCart');
            updateCartUI();
        });
    }

    function generateInvoice(customerName, invoiceCart) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Configuración de fuente base
        doc.setFont('Helvetica');

        doc.setFontSize(20);
        doc.text('FACTURA - GZAutoStore', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Cliente: ${customerName}`, 20, 40);
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-DO')}`, 20, 48);
        doc.text(`Hora: ${new Date().toLocaleTimeString('es-DO')}`, 20, 56);

        doc.line(20, 65, 190, 65);

        let y = 75;

        // Encabezados de tabla
        doc.setFontSize(10);
        doc.text('Producto', 20, y);
        doc.text('Cant.', 90, y);
        doc.text('Precio Unit.', 120, y);
        doc.text('Subtotal', 170, y);

        y += 10;
        doc.setFontSize(10); // Tamaño de fuente para el contenido de la tabla

        let total = 0;

        invoiceCart.forEach(item => {
            const subtotal = item.precio * item.quantity;
            total += subtotal;

            doc.text(item.modelo, 20, y, { maxWidth: 65 }); // Max width para evitar desbordamiento
            doc.text(String(item.quantity), 90, y);
            doc.text(`$${item.precio.toLocaleString('es-DO')}`, 120, y);
            doc.text(`$${subtotal.toLocaleString('es-DO')}`, 170, y);

            y += 7; // Espacio entre líneas más ajustado para tabla

            if (y > 270) { // Si alcanza el final de la página
                doc.addPage();
                y = 20; // Nueva posición
                doc.setFontSize(10);
                doc.text('Producto', 20, y);
                doc.text('Cant.', 90, y);
                doc.text('Precio Unit.', 120, y);
                doc.text('Subtotal', 170, y);
                y += 10;
                doc.setFontSize(10);
            }
        });

        // Línea de separación final
        doc.line(160, y, 190, y);
        y += 5;

        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.text(`TOTAL: $${total.toLocaleString('es-DO')}`, 190, y + 5, { align: 'right' });
        doc.setFont('Helvetica', 'normal');

        doc.save(`factura_GZAutoStore_${Date.now()}.pdf`);
    }

}); // END DOMContentLoaded