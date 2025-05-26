document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real app, this would come from a database
    const categories = [
        { id: 1, name: 'Guitars', description: 'Acoustic and electric guitars' },
        { id: 2, name: 'Keyboards', description: 'Pianos and synthesizers' },
        { id: 3, name: 'Drums', description: 'Drum sets and percussion' },
        { id: 4, name: 'Brass', description: 'Trumpets, trombones, and more' },
        { id: 5, name: 'Woodwinds', description: 'Flutes, clarinets, and saxophones' }
    ];

    const products = [
        {
            id: 1,
            name: 'Fender Stratocaster',
            description: 'The Fender Stratocaster is one of the most iconic electric guitars ever made, known for its bright, crisp tone and comfortable playability.',
            price: 799.99,
            image_path: 'https://images.unsplash.com/photo-1550985616-1081020a975c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 1,
            is_new: true,
            is_best_seller: false,
            is_promo: false
        },
        {
            id: 2,
            name: 'Yamaha P-125 Digital Piano',
            description: 'The Yamaha P-125 is a compact digital piano that delivers outstanding piano performance in a stylish and portable design.',
            price: 999.99,
            image_path: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 2,
            is_new: false,
            is_best_seller: true,
            is_promo: false
        },
        {
            id: 3,
            name: 'Ludwig Classic Maple Drum Set',
            description: 'The Ludwig Classic Maple delivers the legendary sound that has made Ludwig the most recorded drum set in history.',
            price: 2499.99,
            image_path: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 3,
            is_new: false,
            is_best_seller: false,
            is_promo: true,
            promo_price: 1999.99
        },
        {
            id: 4,
            name: 'Bach Stradivarius Trumpet',
            description: 'The Bach Stradivarius trumpet is the standard by which all other professional trumpets are measured.',
            price: 2499.99,
            image_path: 'https://images.unsplash.com/photo-1576473305720-8e9b7df1a1e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 4,
            is_new: true,
            is_best_seller: true,
            is_promo: false
        },
        {
            id: 5,
            name: 'Selmer Paris Saxophone',
            description: 'The Selmer Paris saxophones are the choice of professionals worldwide, known for their rich tone and precise intonation.',
            price: 3499.99,
            image_path: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 5,
            is_new: false,
            is_best_seller: false,
            is_promo: true,
            promo_price: 2999.99
        },
        {
            id: 6,
            name: 'Martin D-28 Acoustic Guitar',
            description: 'The Martin D-28 is one of the most sought-after acoustic guitars, known for its powerful projection and balanced tone.',
            price: 2799.99,
            image_path: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 1,
            is_new: false,
            is_best_seller: true,
            is_promo: false
        },
        {
            id: 7,
            name: 'Roland Juno-DS Synthesizer',
            description: 'The Roland Juno-DS delivers professional synth performance with intuitive controls and a lightweight design.',
            price: 899.99,
            image_path: 'https://images.unsplash.com/photo-1571974599782-87624638275e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 2,
            is_new: true,
            is_best_seller: false,
            is_promo: true,
            promo_price: 799.99
        },
        {
            id: 8,
            name: 'Pearl Export Drum Set',
            description: 'The Pearl Export series offers exceptional quality and value, making it one of the most popular drum sets worldwide.',
            price: 899.99,
            image_path: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            category_id: 3,
            is_new: false,
            is_best_seller: false,
            is_promo: false
        }
    ];

    // DOM elements
    const productsGrid = document.getElementById('products-grid');
    const productsTitle = document.getElementById('products-title');
    const allProductsLink = document.getElementById('all-products');
    const newArrivalsLink = document.getElementById('new-arrivals');
    const bestSellersLink = document.getElementById('best-sellers');
    const promoLink = document.getElementById('promo');
    const categoriesMenu = document.getElementById('categories-menu');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Load categories into dropdown menu
    function loadCategories() {
        categoriesMenu.innerHTML = '';
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.href = '#';
            categoryLink.textContent = category.name;
            categoryLink.dataset.categoryId = category.id;
            categoryLink.addEventListener('click', (e) => {
                e.preventDefault();
                filterByCategory(category.id);
            });
            categoriesMenu.appendChild(categoryLink);
        });
    }

    // Display products
    function displayProducts(productsToDisplay) {
        productsGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsGrid.innerHTML = '<p>No products found.</p>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = product.id;
            
            // Determine price display
            const currentPrice = product.is_promo ? product.promo_price : product.price;
            const priceDisplay = product.is_promo 
                ? `<span class="current-price">$${currentPrice.toFixed(2)}</span>
                   <span class="original-price">$${product.price.toFixed(2)}</span>`
                : `<span class="current-price">$${currentPrice.toFixed(2)}</span>`;
            
            // Create badges
            let badges = '';
            if (product.is_new) badges += '<span class="badge badge-new">New</span>';
            if (product.is_best_seller) badges += '<span class="badge badge-best">Best Seller</span>';
            if (product.is_promo) badges += '<span class="badge badge-promo">Promo</span>';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image_path}" alt="${product.name}">
                </div>
                <div class="product-info">
                    ${badges ? `<div class="product-badges">${badges}</div>` : ''}
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        ${priceDisplay}
                    </div>
                    <a href="#" class="view-details" data-product-id="${product.id}">View Details</a>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = parseInt(button.dataset.productId);
                showProductDetails(productId);
            });
        });
    }

    // Filter by category
    function filterByCategory(categoryId) {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        
        productsTitle.textContent = category.name;
        const filteredProducts = products.filter(p => p.category_id === categoryId);
        displayProducts(filteredProducts);
        
        // Update active link
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        categoriesDropdown.textContent = category.name;
    }

    // Filter by selling type
    function filterBySellingType(type) {
        let filteredProducts = [];
        let title = 'All Products';
        
        switch(type) {
            case 'new':
                filteredProducts = products.filter(p => p.is_new);
                title = 'New Arrivals';
                break;
            case 'best':
                filteredProducts = products.filter(p => p.is_best_seller);
                title = 'Best Sellers';
                break;
            case 'promo':
                filteredProducts = products.filter(p => p.is_promo);
                title = 'Promo Products';
                break;
            default:
                filteredProducts = products;
        }
        
        productsTitle.textContent = title;
        displayProducts(filteredProducts);
        
        // Update active link
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        if (type === 'all') {
            allProductsLink.classList.add('active');
        } else {
            document.getElementById(`${type}-arrivals` || `${type}-sellers` || 'promo').classList.add('active');
        }
    }

    // Show product details in modal
    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const category = categories.find(c => c.id === product.category_id);
        
        // Determine price display
        const currentPrice = product.is_promo ? product.promo_price : product.price;
        const priceDisplay = product.is_promo 
            ? `<span class="modal-price">$${currentPrice.toFixed(2)}</span>
               <span class="modal-original-price">$${product.price.toFixed(2)}</span>`
            : `<span class="modal-price">$${currentPrice.toFixed(2)}</span>`;
        
        // Create badges
        let badges = '';
        if (product.is_new) badges += '<span class="badge badge-new">New</span>';
        if (product.is_best_seller) badges += '<span class="badge badge-best">Best Seller</span>';
        if (product.is_promo) badges += '<span class="badge badge-promo">Promo</span>';
        
        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="${product.image_path}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <h2>${product.name}</h2>
                ${category ? `<p><strong>Category:</strong> ${category.name}</p>` : ''}
                ${badges ? `<div class="modal-badges">${badges}</div>` : ''}
                <div class="modal-price-container">
                    ${priceDisplay}
                </div>
                <p class="modal-description">${product.description}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // Close modal
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    // Event listeners
    allProductsLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterBySellingType('all');
    });

    newArrivalsLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterBySellingType('new');
    });

    bestSellersLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterBySellingType('best');
    });

    promoLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterBySellingType('promo');
    });

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Initialize
    loadCategories();
    filterBySellingType('all');
});