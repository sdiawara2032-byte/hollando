// ========== VERSION ULTRA SIMPLE QUI MARCHE À COUP SÛR ==========

console.log('🚀 Hollando Ultra Simple démarré');

// Données de base
const products = [
    {
        id: 1,
        name: 'Smartphone Samsung Galaxy',
        price: 250000,
        image: '📱',
        category: 'electronics'
    },
    {
        id: 2,
        name: 'Chaussures Nike Air Max', 
        price: 85000,
        image: '👟',
        category: 'fashion'
    },
    {
        id: 3,
        name: 'Ordinateur Portable Dell',
        price: 450000,
        image: '💻',
        category: 'electronics'
    },
    {
        id: 4,
        name: 'Robe Africaine',
        price: 35000,
        image: '👗',
        category: 'fashion'
    }
];

let cart = [];
let favorites = [];
let currentPage = 'home';

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

// Afficher les produits (VERSION SIMPLE)
function displayProducts() {
    console.log('📦 Affichage des produits...');
    
    const container = document.getElementById('products-list');
    if (!container) {
        console.error('❌ Conteneur products-list non trouvé');
        alert('❌ Erreur: Conteneur des produits non trouvé dans le HTML');
        return;
    }
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <div class="product-image">
                ${product.image}
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
                    ${favorites.includes(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-rating">⭐ 4.5 (100+ avis)</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        container.appendChild(productDiv);
    });
    
    console.log('✅ Produits affichés:', products.length);
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    alert(`✅ ${product.name} ajouté au panier !`);
    console.log('🛒 Panier:', cart);
}

// Toggle favori
function toggleFavorite(productId) {
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }
    
    displayProducts(); // Rafraîchir pour mettre à jour les cœurs
    console.log('❤️ Favoris:', favorites);
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = total;
    }
}

// Navigation entre pages
function showPage(pageName) {
    console.log('📄 Navigation vers:', pageName);
    
    // Cacher toutes les pages
    const pages = document.querySelectorAll('.page');
    const sections = document.querySelectorAll('section');
    
    pages.forEach(page => page.classList.add('hidden'));
    sections.forEach(section => section.style.display = 'block');
    
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    currentPage = pageName;
    
    switch(pageName) {
        case 'home':
            displayProducts();
            break;
            
        case 'favorites':
            sections.forEach(section => section.style.display = 'none');
            showFavorites();
            break;
            
        case 'cart':
            sections.forEach(section => section.style.display = 'none');
            showCart();
            break;
            
        case 'seller':
            sections.forEach(section => section.style.display = 'none');
            showSeller();
            break;
    }
    
    // Activer le bon bouton de navigation
    const activeButton = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Afficher les favoris
function showFavorites() {
    const favoritePage = document.getElementById('favorites-page');
    if (favoritePage) {
        favoritePage.classList.remove('hidden');
        
        const container = document.getElementById('favorites-list');
        if (container) {
            container.innerHTML = '';
            
            const favoriteProducts = products.filter(p => favorites.includes(p.id));
            
            if (favoriteProducts.length === 0) {
                container.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Aucun produit en favoris</p>';
            } else {
                favoriteProducts.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product-card';
                    productDiv.innerHTML = `
                        <div class="product-image">${product.image}</div>
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">${formatPrice(product.price)}</div>
                            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
                        </div>
                    `;
                    container.appendChild(productDiv);
                });
            }
        }
    }
}

// Afficher le panier
function showCart() {
    const cartPage = document.getElementById('cart-page');
    if (cartPage) {
        cartPage.classList.remove('hidden');
        
        const container = document.getElementById('cart-items');
        const totalElement = document.getElementById('total-price');
        
        if (container) {
            container.innerHTML = '';
            let total = 0;
            
            if (cart.length === 0) {
                container.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Votre panier est vide</p>';
            } else {
                cart.forEach(item => {
                    const cartDiv = document.createElement('div');
                    cartDiv.className = 'cart-item';
                    cartDiv.innerHTML = `
                        <div class="cart-item-image">${item.image}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${formatPrice(item.price)}</div>
                        </div>
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity(${item.id})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                    `;
                    container.appendChild(cartDiv);
                    total += item.price * item.quantity;
                });
            }
            
            if (totalElement) {
                totalElement.textContent = formatPrice(total);
            }
        }
    }
}

// Augmenter quantité
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        showCart();
        updateCartCount();
    }
}

// Diminuer quantité
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(cartItem => cartItem.id !== productId);
        }
        showCart();
        updateCartCount();
    }
}

// Afficher l'espace vendeur
function showSeller() {
    const sellerPage = document.getElementById('seller-page');
    if (sellerPage) {
        sellerPage.classList.remove('hidden');
    }
}

// Ajouter un nouveau produit (vendeur)
function addNewProduct() {
    const name = document.getElementById('new-product-name')?.value;
    const price = parseInt(document.getElementById('new-product-price')?.value);
    const category = document.getElementById('new-product-category')?.value;
    const description = document.getElementById('new-product-description')?.value;
    
    if (!name || !price || !category || !description) {
        alert('❌ Veuillez remplir tous les champs');
        return;
    }
    
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        image: getRandomEmoji(category),
        description: description
    };
    
    products.push(newProduct);
    
    // Vider le formulaire
    if (document.getElementById('new-product-name')) document.getElementById('new-product-name').value = '';
    if (document.getElementById('new-product-price')) document.getElementById('new-product-price').value = '';
    if (document.getElementById('new-product-category')) document.getElementById('new-product-category').value = '';
    if (document.getElementById('new-product-description')) document.getElementById('new-product-description').value = '';
    
    alert('✅ Produit ajouté avec succès !');
    
    if (currentPage === 'home') {
        displayProducts();
    }
}

// Obtenir un emoji selon la catégorie
function getRandomEmoji(category) {
    const emojis = {
        electronics: ['📱', '💻', '📺', '🎧', '📷', '⌚'],
        fashion: ['👗', '👟', '👔', '👠', '🧥', '👜'],
        home: ['🛋️', '🪑', '🛏️', '🚿', '🍽️', '🕯️'],
        beauty: ['💄', '🧴', '🪞', '💅', '🧼'],
        sports: ['⚽', '🏀', '🎾', '🏋️', '🚴', '🏃'],
        books: ['📚', '📖', '📝', '📓', '📔', '📕']
    };
    
    const categoryEmojis = emojis[category] || ['📦'];
    return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
}

// Recherche de produits
function searchProducts(query) {
    if (!query.trim()) {
        displayProducts();
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProductsFiltered(filtered);
}

// Afficher produits filtrés
function displayProductsFiltered(filteredProducts) {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Aucun produit trouvé</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <div class="product-image">
                ${product.image}
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
                    ${favorites.includes(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

// Filtrer par catégorie
function filterByCategory(category) {
    if (category === 'all') {
        displayProducts();
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProductsFiltered(filtered);
    }
    
    // Mettre à jour l'apparence des boutons de catégorie
    document.querySelectorAll('.category').forEach(cat => {
        cat.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
}

// ========== INITIALISATION ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Hollando Ultra Simple chargé !');
    
    // Afficher les produits immédiatement
    setTimeout(() => {
        displayProducts();
        updateCartCount();
    }, 100);
    
    // Configurer la recherche
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchProducts(e.target.value);
        });
    }
    
    // Configurer les catégories
    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryType = this.getAttribute('data-category');
            filterByCategory(categoryType);
        });
    });
    
    // Configurer le bouton d'ajout de produit
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', addNewProduct);
    }
    
    // Configurer le bouton du panier
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            showPage('cart');
        });
    }
    
    console.log('✅ Tous les événements configurés');
    console.log('📦 Produits disponibles:', products.length);
});

// Message de status dans la console
console.log(`
🏪 HOLLANDO ULTRA SIMPLE
========================
✅ Version qui marche à coup sûr
📱 ${products.length} produits de démonstration
🛒 Panier fonctionnel
❤️ Favoris fonctionnels
📄 Navigation entre pages

⚠️  LIMITATION: Données locales uniquement
💡 Pour interactions entre utilisateurs → Backend requis
`);
// ========== SYSTÈME DE PROFILS VENDEURS COMPLET ==========

// Base de données des vendeurs
const vendors = [
    {
        id: 1,
        name: 'TechStore Pro',
        businessName: 'TechStore Pro Electronics',
        email: 'contact@techstore.com',
        phone: '+225 07 12 34 56 78',
        whatsapp: '+225 07 12 34 56 78',
        address: 'Cocody, Riviera Golf',
        city: 'Abidjan',
        country: 'Côte d\'Ivoire',
        description: 'Spécialiste en électronique depuis 2015. Produits authentiques avec garantie.',
        categories: ['electronics', 'accessories'],
        profileImage: '👨‍💼',
        coverImage: '🏪',
        verified: true,
        rating: 4.8,
        totalReviews: 245,
        totalSales: 1500,
        joinDate: '2020-01-15',
        languages: ['Français', 'English'],
        responseTime: '2 heures',
        socialMedia: {
            facebook: 'techstore.ci',
            instagram: '@techstore_abidjan',
            website: 'www.techstore.ci'
        },
        businessHours: {
            monday: '8h00 - 18h00',
            tuesday: '8h00 - 18h00',
            wednesday: '8h00 - 18h00',
            thursday: '8h00 - 18h00',
            friday: '8h00 - 18h00',
            saturday: '9h00 - 17h00',
            sunday: 'Fermé'
        },
        policies: {
            returnPolicy: '7 jours pour retour',
            warranty: '1 an garantie constructeur',
            shipping: 'Livraison 24-48h Abidjan'
        },
        achievements: ['Top Vendeur 2023', 'Service Client Excellence', 'Livraison Rapide']
    },
    {
        id: 2,
        name: 'African Style Boutique',
        businessName: 'African Style Traditional Wear',
        email: 'info@africanstyle.com',
        phone: '+225 05 67 89 12 34',
        whatsapp: '+225 05 67 89 12 34',
        address: 'Adjamé, Marché Central',
        city: 'Abidjan',
        country: 'Côte d\'Ivoire',
        description: 'Créateur de mode africaine authentique. Tissu wax, bogolan, kente de qualité supérieure.',
        categories: ['fashion', 'traditional'],
        profileImage: '👩‍🎨',
        coverImage: '🌍',
        verified: true,
        rating: 4.9,
        totalReviews: 189,
        totalSales: 850,
        joinDate: '2019-03-20',
        languages: ['Français', 'Dioula', 'English'],
        responseTime: '1 heure',
        socialMedia: {
            facebook: 'africanstyle.boutique',
            instagram: '@african_style_ci',
            website: null
        },
        businessHours: {
            monday: '9h00 - 19h00',
            tuesday: '9h00 - 19h00',
            wednesday: '9h00 - 19h00',
            thursday: '9h00 - 19h00',
            friday: '9h00 - 19h00',
            saturday: '9h00 - 20h00',
            sunday: '12h00 - 18h00'
        },
        policies: {
            returnPolicy: '14 jours échange/remboursement',
            warranty: 'Garantie qualité tissu',
            shipping: 'Livraison partout en CI'
        },
        achievements: ['Artisan Certifié', 'Mode Africaine Excellence', 'Éco-responsable']
    },
    {
        id: 3,
        name: 'Fashion Hub Dakar',
        businessName: 'Fashion Hub International',
        email: 'contact@fashionhub.sn',
        phone: '+221 77 123 45 67',
        whatsapp: '+221 77 123 45 67',
        address: 'Plateau, Avenue Pompidou',
        city: 'Dakar',
        country: 'Sénégal',
        description: 'Mode internationale et locale. Marques premium et créateurs émergents.',
        categories: ['fashion', 'accessories', 'shoes'],
        profileImage: '👨‍💼',
        coverImage: '🏢',
        verified: true,
        rating: 4.6,
        totalReviews: 312,
        totalSales: 2100,
        joinDate: '2018-07-10',
        languages: ['Français', 'Wolof', 'English'],
        responseTime: '30 minutes',
        socialMedia: {
            facebook: 'fashionhub.dakar',
            instagram: '@fashionhub_dkr',
            website: 'www.fashionhub.sn'
        },
        businessHours: {
            monday: '8h30 - 20h00',
            tuesday: '8h30 - 20h00',
            wednesday: '8h30 - 20h00',
            thursday: '8h30 - 20h00',
            friday: '8h30 - 20h00',
            saturday: '9h00 - 21h00',
            sunday: '10h00 - 19h00'
        },
        policies: {
            returnPolicy: '30 jours retour gratuit',
            warranty: 'Garantie fabricant',
            shipping: 'Livraison express Dakar'
        },
        achievements: ['Vendeur Premium', 'Service 5 étoiles', 'Livraison Express']
    }
];

// Avis clients pour les vendeurs
const vendorReviews = [
    {
        vendorId: 1,
        customerName: 'Aminata K.',
        rating: 5,
        comment: 'Service excellent ! Produits authentiques et livraison rapide.',
        date: '2024-01-15',
        verified: true,
        productBought: 'Samsung Galaxy S24'
    },
    {
        vendorId: 1,
        customerName: 'Jean-Claude D.',
        rating: 5,
        comment: 'Très professionnel, je recommande vivement !',
        date: '2024-01-10',
        verified: true,
        productBought: 'iPhone 15 Pro'
    },
    {
        vendorId: 2,
        customerName: 'Fatoumata S.',
        rating: 5,
        comment: 'Magnifiques tissus wax, qualité exceptionnelle !',
        date: '2024-01-12',
        verified: true,
        productBought: 'Robe Wax Traditionnelle'
    },
    {
        vendorId: 3,
        customerName: 'Omar M.',
        rating: 4,
        comment: 'Bon service, quelques délais de livraison.',
        date: '2024-01-08',
        verified: true,
        productBought: 'Baskets Nike'
    }
];

// ========== FONCTIONS DE GESTION DES PROFILS VENDEURS ==========

// Obtenir un vendeur par ID
function getVendorById(vendorId) {
    return vendors.find(vendor => vendor.id === vendorId);
}

// Obtenir tous les produits d'un vendeur
function getVendorProducts(vendorId) {
    return products.filter(product => product.sellerId === vendorId);
}

// Obtenir les avis d'un vendeur
function getVendorReviews(vendorId) {
    return vendorReviews.filter(review => review.vendorId === vendorId);
}

// Afficher le profil complet d'un vendeur
function showVendorProfile(vendorId) {
    const vendor = getVendorById(vendorId);
    if (!vendor) {
        alert('Vendeur non trouvé');
        return;
    }

    // Cacher les autres sections
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));

    // Créer ou afficher la page du profil vendeur
    let vendorProfilePage = document.getElementById('vendor-profile-page');
    
    if (!vendorProfilePage) {
        vendorProfilePage = document.createElement('div');
        vendorProfilePage.id = 'vendor-profile-page';
        vendorProfilePage.className = 'page';
        document.querySelector('.main-content').appendChild(vendorProfilePage);
    }

    vendorProfilePage.classList.remove('hidden');
    vendorProfilePage.innerHTML = generateVendorProfileHTML(vendor);

    // Charger les produits du vendeur
    displayVendorProducts(vendorId);
    
    // Charger les avis
    displayVendorReviews(vendorId);

    // Mettre à jour la navigation
    currentPage = 'vendor-profile';
}

// Générer le HTML du profil vendeur
function generateVendorProfileHTML(vendor) {
    const joinYear = new Date(vendor.joinDate).getFullYear();
    const achievementsBadges = vendor.achievements.map(achievement => 
        `<span class="achievement-badge">🏆 ${achievement}</span>`
    ).join('');

    return `
        <div class="vendor-profile-container">
            <!-- En-tête du profil -->
            <div class="vendor-header">
                <button onclick="showPage('home')" class="back-button">← Retour</button>
                <div class="vendor-cover">${vendor.coverImage}</div>
                <div class="vendor-main-info">
                    <div class="vendor-avatar">${vendor.profileImage}</div>
                    <div class="vendor-details">
                        <h1 class="vendor-business-name">
                            ${vendor.businessName}
                            ${vendor.verified ? '<span class="verified-badge">✅ Vérifié</span>' : ''}
                        </h1>
                        <p class="vendor-description">${vendor.description}</p>
                        <div class="vendor-stats">
                            <div class="stat">
                                <span class="stat-number">${vendor.rating}</span>
                                <span class="stat-label">⭐ Note</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${vendor.totalReviews}</span>
                                <span class="stat-label">📝 Avis</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${vendor.totalSales}</span>
                                <span class="stat-label">🛒 Ventes</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${joinYear}</span>
                                <span class="stat-label">📅 Depuis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions rapides -->
            <div class="vendor-actions">
                <button onclick="startChatWithVendor(${vendor.id})" class="action-button primary">
                    💬 Contacter
                </button>
                <button onclick="callVendor('${vendor.phone}')" class="action-button secondary">
                    📞 Appeler
                </button>
                <button onclick="openWhatsApp('${vendor.whatsapp}')" class="action-button whatsapp">
                    📱 WhatsApp
                </button>
                <button onclick="toggleFollowVendor(${vendor.id})" class="action-button follow">
                    ➕ Suivre
                </button>
            </div>

            <!-- Badges et récompenses -->
            <div class="vendor-achievements">
                <h3>🏆 Récompenses</h3>
                <div class="achievements-list">
                    ${achievementsBadges}
                </div>
            </div>

            <!-- Onglets de navigation -->
            <div class="vendor-tabs">
                <button class="tab-button active" onclick="showVendorTab('products', ${vendor.id})">
                    📦 Produits
                </button>
                <button class="tab-button" onclick="showVendorTab('reviews', ${vendor.id})">
                    ⭐ Avis (${vendor.totalReviews})
                </button>
                <button class="tab-button" onclick="showVendorTab('info', ${vendor.id})">
                    ℹ️ Informations
                </button>
                <button class="tab-button" onclick="showVendorTab('policies', ${vendor.id})">
                    📋 Politiques
                </button>
            </div>

            <!-- Contenu des onglets -->
            <div id="vendor-tab-content" class="vendor-tab-content">
                <!-- Le contenu sera chargé dynamiquement -->
            </div>
        </div>
    `;
}

// Afficher un onglet spécifique du profil vendeur
function showVendorTab(tabName, vendorId) {
    const vendor = getVendorById(vendorId);
    if (!vendor) return;

    // Mettre à jour les boutons d'onglets
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const tabContent = document.getElementById('vendor-tab-content');
    
    switch(tabName) {
        case 'products':
            tabContent.innerHTML = '<div id="vendor-products-grid" class="products-grid"></div>';
            displayVendorProducts(vendorId);
            break;
            
        case 'reviews':
            displayVendorReviewsTab(vendorId);
            break;
            
        case 'info':
            displayVendorInfoTab(vendor);
            break;
            
        case 'policies':
            displayVendorPoliciesTab(vendor);
            break;
    }
}

// Afficher les produits du vendeur
function displayVendorProducts(vendorId) {
    const vendorProducts = getVendorProducts(vendorId);
    const container = document.getElementById('vendor-products-grid');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (vendorProducts.length === 0) {
        container.innerHTML = '<p class="no-products">Ce vendeur n\'a pas encore de produits.</p>';
        return;
    }
    
    vendorProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
                <button class="favorite-btn ${favorites.includes(product.id) ? 'active' : ''}" 
                        onclick="toggleFavorite(${product.id})">
                    ${favorites.includes(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-rating">⭐ ${product.rating || 4.5} (${product.reviews || 50} avis)</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Afficher l'onglet des avis
function displayVendorReviewsTab(vendorId) {
    const reviews = getVendorReviews(vendorId);
    const vendor = getVendorById(vendorId);
    
    const tabContent = document.getElementById('vendor-tab-content');
    
    let reviewsHTML = `
        <div class="reviews-summary">
            <div class="rating-overview">
                <div class="overall-rating">
                    <span class="rating-number">${vendor.rating}</span>
                    <div class="rating-stars">⭐⭐⭐⭐⭐</div>
                    <span class="rating-text">Basé sur ${vendor.totalReviews} avis</span>
                </div>
            </div>
        </div>
        <div class="reviews-list">
    `;
    
    if (reviews.length === 0) {
        reviewsHTML += '<p class="no-reviews">Aucun avis pour le moment.</p>';
    } else {
        reviews.forEach(review => {
            const stars = '⭐'.repeat(review.rating);
            reviewsHTML += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="reviewer-name">${review.customerName}</span>
                        <span class="review-rating">${stars}</span>
                        <span class="review-date">${formatDate(review.date)}</span>
                        ${review.verified ? '<span class="verified-purchase">✅ Achat vérifié</span>' : ''}
                    </div>
                    <p class="review-comment">${review.comment}</p>
                    <span class="product-bought">Produit acheté: ${review.productBought}</span>
                </div>
            `;
        });
    }
    
    reviewsHTML += '</div>';
    tabContent.innerHTML = reviewsHTML;
}

// Afficher l'onglet des informations
function displayVendorInfoTab(vendor) {
    const tabContent = document.getElementById('vendor-tab-content');
    
    const socialMediaHTML = Object.entries(vendor.socialMedia)
        .filter(([platform, handle]) => handle)
        .map(([platform, handle]) => `
            <div class="social-item">
                <span class="social-platform">${platform}:</span>
                <span class="social-handle">${handle}</span>
            </div>
        `).join('');
    
    const businessHoursHTML = Object.entries(vendor.businessHours)
        .map(([day, hours]) => `
            <div class="hours-item">
                <span class="day">${day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                <span class="hours">${hours}</span>
            </div>
        `).join('');
    
    tabContent.innerHTML = `
        <div class="vendor-info-sections">
            <section class="info-section">
                <h3>📍 Localisation</h3>
                <p><strong>Adresse:</strong> ${vendor.address}</p>
                <p><strong>Ville:</strong> ${vendor.city}</p>
                <p><strong>Pays:</strong> ${vendor.country}</p>
            </section>
            
            <section class="info-section">
                <h3>📞 Contact</h3>
                <p><strong>Email:</strong> ${vendor.email}</p>
                <p><strong>Téléphone:</strong> ${vendor.phone}</p>
                <p><strong>WhatsApp:</strong> ${vendor.whatsapp}</p>
                <p><strong>Temps de réponse:</strong> ${vendor.responseTime}</p>
            </section>
            
            <section class="info-section">
                <h3>🗣️ Langues parlées</h3>
                <p>${vendor.languages.join(', ')}</p>
            </section>
            
            <section class="info-section">
                <h3>🕒 Horaires d'ouverture</h3>
                <div class="business-hours">
                    ${businessHoursHTML}
                </div>
            </section>
            
            <section class="info-section">
                <h3>🌐 Réseaux sociaux</h3>
                <div class="social-media">
                    ${socialMediaHTML}
                </div>
            </section>
            
            <section class="info-section">
                <h3>📦 Catégories</h3>
                <p>${vendor.categories.join(', ')}</p>
            </section>
        </div>
    `;
}

// Afficher l'onglet des politiques
function displayVendorPoliciesTab(vendor) {
    const tabContent = document.getElementById('vendor-tab-content');
    
    tabContent.innerHTML = `
        <div class="vendor-policies">
            <section class="policy-section">
                <h3>🔄 Politique de retour</h3>
                <p>${vendor.policies.returnPolicy}</p>
            </section>
            
            <section class="policy-section">
                <h3>🛡️ Garantie</h3>
                <p>${vendor.policies.warranty}</p>
            </section>
            
            <section class="policy-section">
                <h3>🚚 Livraison</h3>
                <p>${vendor.policies.shipping}</p>
            </section>
            
            <section class="policy-section">
                <h3>💳 Paiement accepté</h3>
                <div class="payment-methods">
                    <span class="payment-method">💳 Carte bancaire</span>
                    <span class="payment-method">📱 Mobile Money</span>
                    <span class="payment-method">💰 Espèces à la livraison</span>
                    <span class="payment-method">🏦 Virement bancaire</span>
                </div>
            </section>
        </div>
    `;
}

// ========== FONCTIONS D'INTERACTION ==========

// Démarrer un chat avec le vendeur
function startChatWithVendor(vendorId) {
    const vendor = getVendorById(vendorId);
    if (!vendor) return;
    
    alert(`💬 Chat avec ${vendor.name} - Fonctionnalité en cours de développement`);
    // Ici on intégrerait le système de chat
}

// Appeler le vendeur
function callVendor(phoneNumber) {
    if (confirm(`Appeler ${phoneNumber} ?`)) {
        window.open(`tel:${phoneNumber}`);
    }
}

// Ouvrir WhatsApp
function openWhatsApp(whatsappNumber) {
    const message = encodeURIComponent('Bonjour, je suis intéressé par vos produits sur Hollando.');
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`);
}

// Suivre un vendeur
function toggleFollowVendor(vendorId) {
    const followedVendors = JSON.parse(localStorage.getItem('hollando_followed_vendors') || '[]');
    
    if (followedVendors.includes(vendorId)) {
        const index = followedVendors.indexOf(vendorId);
        followedVendors.splice(index, 1);
        alert('Vous ne suivez plus ce vendeur');
    } else {
        followedVendors.push(vendorId);
        alert('Vous suivez maintenant ce vendeur');
    }
    
    localStorage.setItem('hollando_followed_vendors', JSON.stringify(followedVendors));
}

// ========== FONCTIONS UTILITAIRES ==========

// Formater une date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Mettre à jour les produits existants avec des vendeurs
function assignVendorsToProducts() {
    products.forEach((product, index) => {
        if (!product.sellerId) {
            // Assigner un vendeur selon la catégorie
            if (product.category === 'electronics') {
                product.sellerId = 1; // TechStore Pro
            } else if (product.category === 'fashion') {
                product.sellerId = index % 2 === 0 ? 2 : 3; // African Style ou Fashion Hub
            } else {
                product.sellerId = (index % 3) + 1; // Distribution équitable
            }
        }
    });
}

// Ajouter le lien vers le profil vendeur dans l'affichage des produits
function addVendorLinkToProducts() {
    // Cette fonction sera appelée après l'affichage des produits
    const originalDisplayProducts = window.displayProducts;
    
    window.displayProducts = function(productsToShow = products) {
        assignVendorsToProducts(); // S'assurer que tous les produits ont un vendeur
        
        const container = document.getElementById('products-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        productsToShow.forEach(product => {
            const vendor = getVendorById(product.sellerId);
            const productDiv = document.createElement('div');
            productDiv.className = 'product-card';
            productDiv.innerHTML = `
                <div class="product-image">
                    ${product.image}
                    <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
                        ${favorites.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="product-rating">⭐ ${product.rating || 4.5} (${product.reviews || 50} avis)</div>
                    ${vendor ? `
                        <div class="vendor-info-mini">
                            <span onclick="showVendorProfile(${vendor.id})" class="vendor-link">
                                🏪 ${vendor.name} ${vendor.verified ? '✅' : ''}
                            </span>
                        </div>
                    ` : ''}
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            Ajouter au panier
                        </button>
                        ${vendor ? `
                            <button class="vendor-profile-btn" onclick="showVendorProfile(${vendor.id})">
                                👁️ Voir vendeur
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            container.appendChild(productDiv);
        });
    };
}

// Initialiser le système de profils vendeurs
function initVendorProfiles() {
    console.log('🏪 Système de profils vendeurs initialisé');
    console.log(`👥 ${vendors.length} vendeurs disponibles`);
    
    // Assigner des vendeurs aux produits existants
    assignVendorsToProducts();
    
    // Remplacer la fonction d'affichage des produits
    addVendorLinkToProducts();
    
    // Ajouter les styles CSS nécessaires
    addVendorProfileStyles();
}

// Ajouter les styles CSS pour les profils vendeurs
function addVendorProfileStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .vendor-link {
            color: #2563eb;
            cursor: pointer;
            text-decoration: underline;
            font-size: 12px;
        }
        
        .vendor-link:hover {
            color: #1d4ed8;
        }
        
        .vendor-info-mini {
            margin: 5px 0;
        }
        
        .vendor-profile-btn {
            background: #f0f0f0;
            border: none;
            padding: 5px 8px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 11px;
            margin-left: 5px;
        }
        
        .vendor-profile-container {
            padding: 20px;
        }
        
        .vendor-header {
            position: relative;
            margin-bottom: 20px;
        }
        
        .back-button {
            background: #f0f0f0;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 15px;
        }
        
        .vendor-cover {
            height: 120px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .vendor-main-info {
            display: flex;
            gap: 15px;
            align-items: flex-start;
        }
        
        .vendor-avatar {
            font-size: 60px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .vendor-business-name {
            margin: 0 0 10px 0;
            font-size: 20px;
            color: #333;
        }
        
        .verified-badge {
            font-size: 14px;
            margin-left: 5px;
        }
        
        .vendor-description {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.4;
        }
        
        .vendor-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            display: block;
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
        }
        
        .stat-label {
            font-size: 12px;
            color: #666;
        }
        
        .vendor-actions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 20px 0;
        }
        
        .action-button {
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
        }
        
        .action-button.primary {
            background: #2563eb;
            color: white;
        }
        
        .action-button.secondary {
            background: #10b981;
            color: white;
        }
        
        .action-button.whatsapp {
            background: #25d366;
            color: white;
        }
        
        .action-button.follow {
            background: #f0f0f0;
            color: #333;
        }
        
        .vendor-achievements {
            margin: 20px 0;
        }
        
        .achievements-list {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        
        .achievement-badge {
            background: #fef3c7;
            color: #d97706;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .vendor-tabs {
            display: flex;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 20px;
        }
        
        .tab-button {
            background: none;
            border: none;
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            color: #666;
        }
        
        .tab-button.active {
            color: #2563eb;
            border-bottom-color: #2563eb;
        }
        
        .vendor-tab-content {
            min-height: 300px;
        }
        
        .info-section, .policy-section {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
        }
        
        .info-section h3, .policy-section h3 {
            margin: 0 0 10px 0;
            color: #333;
        }
        
        .business-hours, .social-media {
            display: grid;
            gap: 8px;
        }
        
        .hours-item, .social-item {
            display: flex;
            justify-content: space-between;
        }
        
        .payment-methods {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .payment-method {
            background: #e5e7eb;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }
        
        .review-item {
            border-bottom: 1px solid #e5e5e5;
            padding: 15px 0;
        }
        
        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .reviewer-name {
            font-weight: bold;
        }
        
        .verified-purchase {
            font-size: 11px;
            color: #10b981;
        }
        
        .review-comment {
            margin: 8px 0;
            color: #333;
        }
        
        .product-bought {
            font-size: 12px;
            color: #666;
        }
        
        .reviews-summary {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .overall-rating {
            text-align: center;
        }
        
        .rating-number {
            font-size: 36px;
            font-weight: bold;
            color: #fbbf24;
        }
        
        .rating-stars {
            font-size: 20px;
            margin: 5px 0;
        }
        
        @media (max-width: 480px) {
            .vendor-stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .vendor-actions {
                grid-template-columns: 1fr;
            }
            
            .vendor-main-info {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .vendor-tabs {
                overflow-x: auto;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialiser automatiquement
setTimeout(() => {
    initVendorProfiles();
}, 500);

console.log('✅ Système de profils vendeurs chargé !');
console.log('🏪 Fonctionnalités disponibles:');
console.log('   - Profils vendeurs complets');
console.log('   - Pages dédiées par vendeur');
console.log('   - Avis et évaluations');
console.log('   - Contact direct (tel, WhatsApp)');
console.log('   - Informations commerciales');