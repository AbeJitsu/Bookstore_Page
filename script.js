// ===================================
// XYZ Bookstore - Shopping Cart System
// Demonstrates: DOM Manipulation, Events, Local Storage, Array Methods
// ===================================

class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    // Initialize the application
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateCartUI();
        this.animateOnScroll();
    }

    // Cache DOM elements for better performance
    cacheDOM() {
        this.cartCountElement = document.getElementById('cart-count');
        this.cartToggle = document.getElementById('cart-toggle');
        this.cartModal = document.getElementById('cart-modal');
        this.cartItemsContainer = document.getElementById('cart-items');
        this.cartTotalElement = document.getElementById('cart-total-amount');
        this.viewCartBtn = document.getElementById('view-cart-btn');
        this.checkoutBtn = document.getElementById('checkout-btn');
        this.modalCheckoutBtn = document.getElementById('modal-checkout-btn');
        this.addToCartButtons = document.querySelectorAll('.add-to-cart');
        this.modalCloseButtons = document.querySelectorAll('.modal-close');
    }

    // Bind event listeners
    bindEvents() {
        // Add to cart buttons
        this.addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleAddToCart(e));
        });

        // View cart buttons
        this.cartToggle.addEventListener('click', () => this.openCart());
        this.viewCartBtn.addEventListener('click', () => this.openCart());

        // Close modal buttons
        this.modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => this.closeCart());
        });

        // Close modal on backdrop click
        this.cartModal.addEventListener('click', (e) => {
            if (e.target === this.cartModal) {
                this.closeCart();
            }
        });

        // Checkout buttons
        this.checkoutBtn.addEventListener('click', () => this.handleCheckout());
        this.modalCheckoutBtn.addEventListener('click', () => this.handleCheckout());

        // Success modal close button
        const successCloseBtn = document.getElementById('success-close-btn');
        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', () => this.closeSuccessModal());
        }

        // Close success modal on backdrop click
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    this.closeSuccessModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.cartModal.classList.contains('active')) {
                    this.closeCart();
                }
                const successModal = document.getElementById('success-modal');
                if (successModal && successModal.classList.contains('active')) {
                    this.closeSuccessModal();
                }
            }
        });
    }

    // Handle adding items to cart
    handleAddToCart(event) {
        const button = event.currentTarget;
        const bookId = button.dataset.bookId;
        const bookTitle = button.dataset.bookTitle;
        const bookPrice = parseFloat(button.dataset.bookPrice);

        const item = {
            id: bookId,
            title: bookTitle,
            price: bookPrice
        };

        this.addItem(item);
        this.showNotification(`"${bookTitle}" added to cart!`);
        this.animateButton(button);
    }

    // Add item to cart
    addItem(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }

        this.saveCart();
        this.updateCartUI();
    }

    // Remove item from cart
    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }

    // Calculate total price
    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    }

    // Update cart UI (count and badge)
    updateCartUI() {
        const totalItems = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.cartCountElement.textContent = totalItems;

        if (totalItems > 0) {
            this.cartCountElement.classList.add('pulse');
            setTimeout(() => {
                this.cartCountElement.classList.remove('pulse');
            }, 300);
        }
    }

    // Render cart items in modal
    renderCartItems() {
        if (this.cart.length === 0) {
            this.cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <p>Your cart is empty</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some books to get started!</p>
                </div>
            `;
            this.cartTotalElement.textContent = '$0.00';
            return;
        }

        this.cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} ${item.quantity > 1 ? `x ${item.quantity}` : ''}</div>
                </div>
                <button class="cart-item-remove" data-item-id="${item.id}" aria-label="Remove ${item.title} from cart">
                    Remove
                </button>
            </div>
        `).join('');

        // Bind remove buttons
        const removeButtons = this.cartItemsContainer.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.itemId;
                this.removeItem(itemId);
                this.showNotification('Item removed from cart');
            });
        });

        // Update total
        const total = this.calculateTotal();
        this.cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Open cart modal
    openCart() {
        this.renderCartItems();
        this.cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap - focus first button
        const firstButton = this.cartModal.querySelector('button');
        if (firstButton) {
            setTimeout(() => firstButton.focus(), 100);
        }
    }

    // Close cart modal
    closeCart() {
        this.cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Handle checkout
    handleCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }

        // Simulate checkout process
        this.showNotification('Processing checkout...', 'info');

        setTimeout(() => {
            this.showSuccessModal();
            this.closeCart();
        }, 800);
    }

    // Show success modal
    showSuccessModal() {
        const successModal = document.getElementById('success-modal');
        const orderSummary = document.getElementById('order-summary');
        const total = this.calculateTotal();
        const itemCount = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

        // Build order summary
        let summaryHTML = '<div class="order-summary-items">';
        this.cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            summaryHTML += `
                <div class="order-summary-item">
                    <span>${item.title} ${item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });
        summaryHTML += '</div>';
        summaryHTML += `
            <div class="order-summary-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;

        orderSummary.innerHTML = summaryHTML;

        // Show modal
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    }

    // Close success modal
    closeSuccessModal() {
        const successModal = document.getElementById('success-modal');
        successModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Show notification toast
    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: type === 'error' ? '#C62828' : type === 'info' ? '#1976D2' : '#2E7D32',
            color: '#FFFFFF',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease-out',
            fontWeight: '500',
            maxWidth: '300px'
        });

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Animate button on click
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Animate elements on scroll
    animateOnScroll() {
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

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('bookstore_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('bookstore_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }
}

// ===================================
// Additional Interactive Features
// ===================================

// Smooth scroll for internal links
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

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Initialize Application
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();

    // Add welcome message
    console.log('%c🎉 Welcome to XYZ Bookstore!', 'font-size: 20px; color: #1976D2; font-weight: bold;');
    console.log('%cThis is a demo showcasing HTML, CSS, and JavaScript skills.', 'font-size: 14px; color: #666;');

    // Log cart status
    console.log(`📚 Cart items: ${cart.cart.length}`);
});

// ===================================
// Service Worker Registration (Optional)
// ===================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js');
}
