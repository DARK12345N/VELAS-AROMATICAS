// Product Data
const products = [
    {
        id: 1,
        name: "Vela Lavanda Relajante",
        category: "floral",
        price: 25.99,
        description: "Fragancia suave de lavanda que ayuda a relajar y crear un ambiente tranquilo.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.29.jpeg",
        features: ["Cera de soja natural", "Duración 50 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 2,
        name: "Vela Cítricos Energizantes",
        category: "citrus",
        price: 22.99,
        description: "Mezcla vibrante de limón, naranja y pomelo para energizar tu espacio.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.30.jpeg",
        features: ["Cera de soja natural", "Duración 45 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 3,
        name: "Vela Vainilla Cálida",
        category: "vanilla",
        price: 28.99,
        description: "Fragancia dulce y cálida de vainilla que crea un ambiente acogedor.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.28.jpeg",
        features: ["Cera de soja natural", "Duración 55 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 4,
        name: "Vela Sándalo Exótico",
        category: "woody",
        price: 32.99,
        description: "Fragancia exótica de sándalo que aporta elegancia y sofisticación.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.27.jpeg",
        features: ["Cera de soja natural", "Duración 60 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 5,
        name: "Vela Rosa Romántica",
        category: "floral",
        price: 26.99,
        description: "Fragancia romántica de rosas que crea un ambiente íntimo y elegante.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.29%20(1).jpeg",
        features: ["Cera de soja natural", "Duración 48 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 6,
        name: "Vela Eucalipto Fresco",
        category: "citrus",
        price: 24.99,
        description: "Fragancia fresca de eucalipto que purifica el aire y revitaliza.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.28%20(1).jpeg",
        features: ["Cera de soja natural", "Duración 42 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 7,
        name: "Vela Cedro Noble",
        category: "woody",
        price: 30.99,
        description: "Fragancia noble de cedro que aporta calidez y estabilidad.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.27.jpeg",
        features: ["Cera de soja natural", "Duración 58 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    },
    {
        id: 8,
        name: "Vela Vainilla Bourbon",
        category: "vanilla",
        price: 35.99,
        description: "Fragancia premium de vainilla bourbon con notas cremosas y sofisticadas.",
        image: "imagenes/WhatsApp%20Image%202026-10-13%20at%2014.30.28.jpeg",
        features: ["Cera de soja natural", "Duración 65 horas", "Aceites esenciales puros", "Envase de vidrio reciclable"]
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const productModal = document.getElementById('product-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.querySelector('.contact-form');

function formatPrice(price) {
    return `Bs ${Number(price).toFixed(2)}`;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
    setupSmoothScrolling();
});

// Display Products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Agregar al Carrito
            </button>
        </div>
    `;
    
    // Add click event to show product details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart')) {
            showProductDetail(product);
        }
    });
    
    return card;
}

// Show Product Detail Modal
function showProductDetail(product) {
    const modalContent = document.getElementById('product-detail');
    
    modalContent.innerHTML = `
        <div class="product-detail-image"><img src="${product.image}" alt="${product.name}"></div>
        <div class="product-detail-info">
            <div class="product-detail-category">${product.category}</div>
            <h2>${product.name}</h2>
            <div class="product-detail-price">${formatPrice(product.price)}</div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-features">
                <h4>Características:</h4>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id}); closeModal('product-modal')">
                <i class="fas fa-shopping-cart"></i> Agregar al Carrito
            </button>
        </div>
    `;
    
    productModal.style.display = 'block';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showSuccessMessage('Producto agregado al carrito');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCartItems();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            saveCart();
            displayCartItems();
        }
    }
}

// Display Cart Items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Filter Products
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Show Cart Modal
function showCartModal() {
    displayCartItems();
    cartModal.style.display = 'block';
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartCount();
    saveCart();
    displayCartItems();
    showSuccessMessage('Carrito vaciado');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showErrorMessage('Tu carrito está vacío');
        return;
    }
    
    if (!window.jspdf || !window.jspdf.jsPDF) {
        showErrorMessage('No se pudo cargar el generador de PDF. Revisa tu conexión.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const documentPdf = new jsPDF();
    const orderNumber = `VA-${Date.now().toString().slice(-6)}`;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    documentPdf.setFillColor(139, 69, 19);
    documentPdf.rect(0, 0, 210, 58, 'F');
    documentPdf.setFillColor(255, 255, 255);
    documentPdf.circle(28, 23, 13, 'F');
    documentPdf.setFillColor(139, 69, 19);
    documentPdf.roundedRect(23, 20, 10, 12, 2, 2, 'F');
    documentPdf.setFillColor(255, 107, 53);
    documentPdf.ellipse(28, 16, 3, 5, 'F');
    documentPdf.setTextColor(255, 255, 255);
    documentPdf.setFont(undefined, 'bold');
    documentPdf.setFontSize(25);
    documentPdf.text('AROMA TECH', 50, 25);
    documentPdf.setFontSize(16);
    documentPdf.text('RECIBO', 50, 45);
    documentPdf.setFont(undefined, 'normal');
    documentPdf.setTextColor(51, 51, 51);
    documentPdf.setFontSize(11);
    documentPdf.text(`Comprobante de pedido: ${orderNumber}`, 20, 73);
    documentPdf.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 80);

    let yPosition = 98;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        documentPdf.setFontSize(12);
        documentPdf.text(item.name, 20, yPosition);
        documentPdf.setFontSize(10);
        documentPdf.text(`${item.quantity} x Bs ${item.price.toFixed(2)}`, 20, yPosition + 7);
        documentPdf.text(`Bs ${subtotal.toFixed(2)}`, 170, yPosition + 4);
        yPosition += 20;
    });

    documentPdf.setDrawColor(139, 69, 19);
    documentPdf.line(20, yPosition, 190, yPosition);
    documentPdf.setFontSize(15);
    documentPdf.setFont(undefined, 'bold');
    documentPdf.text(`Total: Bs ${total.toFixed(2)}`, 135, yPosition + 14);
    documentPdf.setFont(undefined, 'normal');
    documentPdf.setFontSize(10);
    documentPdf.text('Gracias por su compra', 20, yPosition + 30);
    documentPdf.autoPrint();
    const receiptWindow = window.open(documentPdf.output('bloburl'), '_blank');
    if (!receiptWindow) {
        showErrorMessage('Permite las ventanas emergentes para imprimir el recibo.');
        return;
    }

    showSuccessMessage('Recibo listo para imprimir. ¡Gracias por tu compra!');
    clearCart();
    closeModal('cart-modal');
}

// Show Success Message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Show Error Message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProducts(button.dataset.filter);
        });
    });
    
    // Cart link
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            showCartModal();
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Cart modal buttons
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout');
    if (clearCartButton) clearCartButton.addEventListener('click', clearCart);
    if (checkoutButton) checkoutButton.addEventListener('click', checkout);
    
    // Mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showSuccessMessage('¡Mensaje enviado! Te contactaremos pronto.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    // Add smooth scrolling behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class to header
    const header = document.querySelector('.header');
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add loading animation for better UX
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// Search functionality (can be extended)
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filteredProducts);
}

// Add search input if needed
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar productos...';
    searchInput.className = 'search-input';
    
    const productsSection = document.querySelector('.products-section .container');
    const sectionTitle = productsSection.querySelector('.section-title');
    
    sectionTitle.insertAdjacentElement('afterend', searchInput);
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query === '') {
            displayProducts(products);
        } else {
            searchProducts(query);
        }
    });
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate product cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
        } else {
            // Swipe down - could be used for navigation
        }
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
