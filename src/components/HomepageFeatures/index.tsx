<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلة - متجر العبايات الفاخرة</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --gold: #c9a961;
            --black: #0a0a0a;
            --dark: #151515;
            --light: #f5f5f5;
            --white: #ffffff;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--white);
            color: var(--black);
            line-height: 1.6;
        }

        /* ==================== Header ==================== */
        header {
            background: var(--black);
            color: var(--white);
            padding: 1rem 2rem;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            letter-spacing: 3px;
            color: var(--gold);
        }

        .header-icons {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }

        .icon-btn {
            background: none;
            border: none;
            color: var(--gold);
            font-size: 1.5rem;
            cursor: pointer;
            transition: transform 0.3s;
            padding: 0.5rem;
        }

        .icon-btn:hover {
            transform: scale(1.1);
        }

        .cart-btn {
            position: relative;
            background: none;
            border: none;
            color: var(--gold);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .cart-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: var(--gold);
            color: var(--black);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
        }

        /* ==================== Navigation ==================== */
        nav {
            background: var(--dark);
            padding: 0 2rem;
            display: flex;
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .nav-link {
            color: var(--white);
            text-decoration: none;
            padding: 1rem 0;
            border-bottom: 3px solid transparent;
            transition: border-color 0.3s;
            cursor: pointer;
        }

        .nav-link:hover,
        .nav-link.active {
            border-bottom-color: var(--gold);
        }

        .nav-badge {
            background: var(--gold);
            color: var(--black);
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            font-size: 0.75rem;
            margin-right: 0.5rem;
        }

        /* ==================== Hero Section ==================== */
        .hero {
            background: linear-gradient(135deg, var(--black) 0%, var(--dark) 100%);
            color: var(--white);
            padding: 4rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(201, 169, 97, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            top: -100px;
            right: -100px;
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 600px;
            margin: 0 auto;
        }

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            letter-spacing: 2px;
            color: var(--gold);
        }

        .hero p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            color: #ccc;
        }

        .btn {
            padding: 0.8rem 2rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
            font-weight: bold;
        }

        .btn-primary {
            background: var(--gold);
            color: var(--black);
        }

        .btn-primary:hover {
            background: #dab86a;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: transparent;
            color: var(--gold);
            border: 2px solid var(--gold);
        }

        .btn-secondary:hover {
            background: var(--gold);
            color: var(--black);
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* ==================== Products Section ==================== */
        .products-section {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .products-section h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: var(--black);
            letter-spacing: 2px;
        }

        .filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            background: var(--light);
            color: var(--black);
            border: 2px solid var(--light);
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filter-btn:hover,
        .filter-btn.active {
            background: var(--gold);
            color: var(--black);
            border-color: var(--gold);
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2rem;
        }

        .product-card {
            background: var(--white);
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s;
            cursor: pointer;
        }

        .product-card:hover {
            box-shadow: 0 5px 15px rgba(201, 169, 97, 0.3);
            transform: translateY(-5px);
        }

        .product-image {
            width: 100%;
            height: 250px;
            background: var(--light);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-info {
            padding: 1.5rem;
        }

        .product-title {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: var(--black);
        }

        .product-rating {
            color: var(--gold);
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        .product-price {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 1rem;
        }

        .current-price {
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--gold);
        }

        .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 0.95rem;
        }

        .product-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
            width: 100%;
        }

        .add-to-cart-btn {
            padding: 1rem;
            background: var(--gold);
            color: var(--black);
            border: 2px solid var(--gold);
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: all 0.3s;
        }

        .add-to-cart-btn:hover {
            background: #dab86a;
            border-color: #dab86a;
            transform: translateY(-2px);
        }

        .buy-now-btn {
            padding: 1rem;
            background: var(--black);
            color: var(--gold);
            border: 2px solid var(--black);
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: all 0.3s;
        }

        .buy-now-btn:hover {
            background: var(--gold);
            color: var(--black);
            border-color: var(--gold);
            transform: translateY(-2px);
        }

        /* ==================== Cart Panel ==================== */
        .cart-panel {
            position: fixed;
            right: -400px;
            top: 0;
            width: 400px;
            height: 100vh;
            background: var(--white);
            box-shadow: -5px 0 20px rgba(0,0,0,0.3);
            overflow-y: auto;
            transition: right 0.3s;
            z-index: 999;
        }

        .cart-panel.active {
            right: 0;
        }

        .cart-header {
            background: var(--black);
            color: var(--white);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .cart-header h3 {
            font-size: 1.3rem;
        }

        .cart-close-btn {
            background: none;
            border: none;
            color: var(--white);
            font-size: 1.5rem;
            cursor: pointer;
        }

        .cart-items {
            padding: 1.5rem;
        }

        .cart-item {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }

        .cart-item-image {
            width: 80px;
            height: 80px;
            background: var(--light);
            border-radius: 4px;
            overflow: hidden;
        }

        .cart-item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .cart-item-price {
            color: var(--gold);
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .cart-item-quantity {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .qty-btn {
            background: var(--light);
            border: none;
            width: 25px;
            height: 25px;
            cursor: pointer;
            border-radius: 3px;
            font-weight: bold;
        }

        .qty-btn:hover {
            background: var(--gold);
        }

        .cart-summary {
            padding: 1.5rem;
            border-top: 2px solid #e0e0e0;
            background: var(--light);
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            font-size: 0.95rem;
        }

        .summary-row.total {
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--gold);
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #ddd;
        }

        .checkout-btn {
            width: 100%;
            padding: 1rem;
            background: var(--gold);
            color: var(--black);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: background 0.3s;
        }

        .checkout-btn:hover {
            background: #dab86a;
        }

        /* ==================== Toast Notification ==================== */
        .toast {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: var(--gold);
            color: var(--black);
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            z-index: 10000;
        }

        @keyframes slideIn {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* ==================== Footer ==================== */
        footer {
            background: var(--black);
            color: var(--white);
            padding: 3rem 2rem;
            text-align: center;
        }

        footer p {
            margin-bottom: 0.5rem;
        }

        /* ==================== Responsive ==================== */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }

            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: 1rem;
            }

            .cart-panel {
                width: 100%;
                right: -100%;
            }

            .hero-buttons {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>

<!-- ==================== HEADER ==================== -->
<header>
    <div class="header-top">
        <div class="logo">طلة</div>
        <div class="header-icons">
            <button class="icon-btn" title="بحث" id="searchBtn">🔍</button>
            <button class="icon-btn" title="إشعارات">🔔</button>
            <button class="icon-btn" title="المفضلة">❤️</button>
            <button class="cart-btn" id="cartBtn" title="السلة">
                🛒
                <span class="cart-badge" id="cartCountBadge">0</span>
            </button>
        </div>
    </div>
</header>

<!-- ==================== NAVIGATION ==================== -->
<nav>
    <a class="nav-link active" data-page="home">الرئيسية</a>
    <a class="nav-link" data-page="products">العبايات <span class="nav-badge">جديد</span></a>
    <a class="nav-link" data-page="orders">الطلبات</a>
    <a class="nav-link" data-page="about">عن طلة</a>
</nav>

<!-- ==================== HERO SECTION ==================== -->
<section class="hero" id="heroSection">
    <div class="hero-content">
        <h1>أرقى العبايات الفاخرة</h1>
        <p>تصاميم حصرية مستوحاة من الفن الإسلامي التقليدي بلمسة عصرية</p>
        <div class="hero-buttons">
            <button class="btn btn-primary" id="shopNowBtn">تصفحي الآن</button>
            <button class="btn btn-secondary">التصنيفات</button>
        </div>
    </div>
</section>

<!-- ==================== PRODUCTS SECTION ==================== -->
<section class="products-section" id="productsSection">
    <h2>مجموعتنا الحصرية</h2>
    
    <div class="filters">
        <button class="filter-btn active" data-filter="all">الكل</button>
        <button class="filter-btn" data-filter="classic">كلاسيكي</button>
        <button class="filter-btn" data-filter="modern">عصري</button>
        <button class="filter-btn" data-filter="luxury">فاخر</button>
    </div>

    <div class="products-grid" id="productsGrid">
        <!-- يتم ملء المنتجات من JavaScript -->
    </div>
</section>

<!-- ==================== CART PANEL ==================== -->
<div class="cart-panel" id="cartPanel">
    <div class="cart-header">
        <h3>سلة التسوق</h3>
        <button class="cart-close-btn" id="cartCloseBtn">✕</button>
    </div>
    <div class="cart-items" id="cartItemsContainer">
        <!-- يتم ملء المنتجات من JavaScript -->
    </div>
    <div class="cart-summary">
        <div class="summary-row">
            <span>السعر:</span>
            <span id="subtotalPrice">0 ر.س</span>
        </div>
        <div class="summary-row">
            <span>الشحن:</span>
            <span id="shippingPrice">مجاني</span>
        </div>
        <div class="summary-row">
            <span>الضريبة:</span>
            <span id="taxPrice">0 ر.س</span>
        </div>
        <div class="summary-row total">
            <span>الإجمالي:</span>
            <span id="totalPrice">0 ر.س</span>
        </div>
        <button class="checkout-btn" id="checkoutBtn">تسديد الآن</button>
    </div>
</div>

<!-- ==================== FOOTER ==================== -->
<footer>
    <p>&copy; 2026 طلة - متجر العبايات الفاخرة</p>
    <p>للتواصل: support@tallah.com | ☎️ +966-XX-XXXX-XXXX</p>
</footer>

<script>
// ==================== CONFIG ====================
const CONFIG = {
    apiBase: 'https://api.easy-orders.net/api/v1',
    storeId: 'tallah-abaya',
    productsEndpoint: 'https://api.easy-orders.net/api/v1/external-apps/products',
    apiKey: 'YOUR_API_KEY_HERE'
};

// ==================== APP STATE ====================
const appState = {
    products: [],
    cart: JSON.parse(localStorage.getItem('tallahCart')) || [],
    currentPage: 'home',
    currentFilter: 'all'
};

// ==================== DOM ELEMENTS ====================
const elements = {
    navLinks: document.querySelectorAll('.nav-link'),
    heroSection: document.getElementById('heroSection'),
    productsSection: document.getElementById('productsSection'),
    productsGrid: document.getElementById('productsGrid'),
    cartBtn: document.getElementById('cartBtn'),
    cartPanel: document.getElementById('cartPanel'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartItemsContainer: document.getElementById('cartItemsContainer'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    shopNowBtn: document.getElementById('shopNowBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    filterBtns: document.querySelectorAll('.filter-btn')
};

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateCartDisplay();
    console.log('✓ تم تحميل التطبيق بنجاح');
});

// ==================== SETUP EVENT LISTENERS ====================
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Cart
    elements.cartBtn.addEventListener('click', toggleCart);
    elements.cartCloseBtn.addEventListener('click', toggleCart);

    // Shop Now
    elements.shopNowBtn.addEventListener('click', () => {
        navigateTo('products');
    });

    // Filters
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.filter);
        });
    });

    // Checkout
    elements.checkoutBtn.addEventListener('click', () => {
        if(appState.cart.length === 0) {
            showNotification('السلة فارغة! أضيفي منتجات أولاً');
            return;
        }
        // Save cart and go to checkout
        saveCart();
        setTimeout(() => {
            window.location.href = 'tallah_checkout.html';
        }, 300);
    });
}

// ==================== INITIALIZE APP ====================
function initializeApp() {
    fetchProducts();
}

// ==================== NAVIGATION ====================
function navigateTo(page) {
    appState.currentPage = page;
    
    // Update active nav link
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Show/hide sections
    elements.heroSection.style.display = page === 'home' ? 'flex' : 'none';
    elements.productsSection.style.display = page === 'products' ? 'block' : 'none';

    // Load page content
    if(page === 'products') {
        fetchProducts();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// ==================== PRODUCTS ====================
async function fetchProducts() {
    try {
        console.log('جاري تحميل المنتجات...');
        
        // Mock data (يتم استبدالها بـ API الحقيقي لاحقاً)
        const mockProducts = [
            {
                id: 1,
                title: 'عباية سوداء فاخرة',
                description: 'عباية سوداء بتطريز ذهبي أنيق',
                price: 299,
                originalPrice: 399,
                image: 'https://via.placeholder.com/250x300?text=عباية+سوداء',
                category: 'luxury',
                rating: 5,
                reviews: 48
            },
            {
                id: 2,
                title: 'عباية كلاسيكية',
                description: 'عباية تقليدية بتصميم عصري',
                price: 199,
                originalPrice: 249,
                image: 'https://via.placeholder.com/250x300?text=عباية+كلاسيكية',
                category: 'classic',
                rating: 4.5,
                reviews: 32
            },
            {
                id: 3,
                title: 'عباية عصرية',
                description: 'عباية بتصميم عصري مستوحى من الفن الحديث',
                price: 249,
                originalPrice: 349,
                image: 'https://via.placeholder.com/250x300?text=عباية+عصرية',
                category: 'modern',
                rating: 4.8,
                reviews: 41
            },
            {
                id: 4,
                title: 'عباية الفخامة',
                description: 'عباية فاخرة بأفخر المواد والتطريزات',
                price: 399,
                originalPrice: 499,
                image: 'https://via.placeholder.com/250x300?text=عباية+فخمة',
                category: 'luxury',
                rating: 5,
                reviews: 35
            },
            {
                id: 5,
                title: 'عباية الأناقة',
                description: 'عباية بسيطة وأنيقة تناسب جميع المناسبات',
                price: 179,
                originalPrice: 229,
                image: 'https://via.placeholder.com/250x300?text=عباية+أنيقة',
                category: 'classic',
                rating: 4.7,
                reviews: 28
            },
            {
                id: 6,
                title: 'عباية الحداثة',
                description: 'عباية بقصة حديثة مع لمسات تراثية',
                price: 279,
                originalPrice: 379,
                image: 'https://via.placeholder.com/250x300?text=عباية+حديثة',
                category: 'modern',
                rating: 4.6,
                reviews: 22
            }
        ];

        appState.products = mockProducts;
        displayProducts(mockProducts);
        console.log('✓ تم تحميل ' + mockProducts.length + ' منتج');
        
    } catch(error) {
        console.error('❌ خطأ في تحميل المنتجات:', error);
        showNotification('خطأ في تحميل المنتجات');
    }
}

function displayProducts(products) {
    if(products.length === 0) {
        elements.productsGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">لا توجد منتجات</p>';
        return;
    }

    elements.productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/250x300?text=صورة'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} (${product.reviews})
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price} ر.س</span>
                    <span class="original-price">${product.originalPrice} ر.س</span>
                </div>
                <div class="product-buttons">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒 أضيفي للسلة</button>
                    <button class="buy-now-btn" onclick="buyNow(${product.id})">⚡ اشتري الآن</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    appState.currentFilter = category;
    const filtered = category === 'all' 
        ? appState.products 
        : appState.products.filter(p => p.category === category);
    displayProducts(filtered);
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId) {
    console.log('🛒 إضافة المنتج رقم:', productId);
    
    const product = appState.products.find(p => p.id === productId);
    if(!product) {
        console.error('❌ لم يتم العثور على المنتج');
        return;
    }

    const existingItem = appState.cart.find(item => item.id === productId);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showNotification('✓ تم إضافة المنتج إلى السلة');
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showNotification('تم الحذف من السلة');
}

function updateCartQuantity(productId, delta) {
    const item = appState.cart.find(item => item.id === productId);
    if(item) {
        item.quantity += delta;
        if(item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function saveCart() {
    localStorage.setItem('tallahCart', JSON.stringify(appState.cart));
}

function updateCartDisplay() {
    // Update badge
    elements.cartCountBadge.textContent = appState.cart.length;

    // Update items
    if(appState.cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<p style="text-align:center; padding:2rem;">السلة فارغة</p>';
    } else {
        elements.cartItemsContainer.innerHTML = appState.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/80?text=صورة'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} ر.س</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        <button class="qty-btn" onclick="removeFromCart(${item.id})" style="background:#ff6b6b; color:white; margin-left:auto;">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update summary
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    document.getElementById('subtotalPrice').textContent = subtotal + ' ر.س';
    document.getElementById('taxPrice').textContent = Math.round(tax) + ' ر.س';
    document.getElementById('totalPrice').textContent = Math.round(total) + ' ر.س';
}

function toggleCart() {
    elements.cartPanel.classList.toggle('active');
}



// ==================== NOTIFICATIONS ====================
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ==================== BUY NOW ====================
function buyNow(productId) {
    console.log('🛍️ اشتري الآن للمنتج:', productId);
    
    const product = appState.products.find(p => p.id === productId);
    if(!product) {
        console.error('❌ لم يتم العثور على المنتج');
        return;
    }

    // إضافة المنتج للسلة
    appState.cart = [];
    appState.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
    });

    saveCart();
    updateCartDisplay();
    showNotification('✓ تم إضافة المنتج! جاري الانتقال للدفع...');

    // الانتقال لصفحة الدفع بعد ثانية
    setTimeout(() => {
        window.location.href = 'tallah_checkout.html';
    }, 1000);
}

// ==================== MAKE FUNCTIONS GLOBAL ====================
// حتى يمكن استدعاؤها من onclick في الـ HTML
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.buyNow = buyNow;

</script>

</body>
</html>
