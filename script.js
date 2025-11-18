// Mobil Menü Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Hamburger animasyonu
    hamburger.classList.toggle('active');
});

// Menü öğelerine tıklandığında menüyü kapat
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll efekti - Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Sepete Ekle Butonu
const cartButtons = document.querySelectorAll('.btn-cart');
let cartCount = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Animasyon efekti
        button.innerHTML = '<i class="fas fa-check"></i> Eklendi!';
        button.style.background = '#27ae60';
        button.style.color = '#fff';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Sepete Ekle';
            button.style.background = '';
            button.style.color = '';
        }, 2000);
        
        // Alert göster
        showNotification(`${productName} sepete eklendi!`);
        
        cartCount++;
        console.log('Sepetteki ürün sayısı:', cartCount);
    });
});

// Bildirim Gösterme Fonksiyonu
function showNotification(message) {
    // Eski bildirimi kaldır
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // CSS ekle
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
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
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// İletişim Formu
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        contactForm.reset();
    });
}

// Bülten Formu
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Bültenimize başarıyla abone oldunuz!');
        newsletterForm.reset();
    });
}

// Scroll Animasyonları
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animasyon eklenecek elementleri seç
document.querySelectorAll('.feature-card, .product-card, .timeline-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Sayfa yüklendiğinde
window.addEventListener('load', () => {
    console.log('Sesa Yağ websitesine hoş geldiniz!');
});

// Ürün Sayacı (Sepet Simülasyonu)
function updateCartDisplay() {
    // Gelecekte sepet simgesi eklendiğinde kullanılacak
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        if (cartCount > 0) {
            cartBadge.style.display = 'flex';
        }
    }
}

// Parallax Efekti (Hero Bölümü)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});