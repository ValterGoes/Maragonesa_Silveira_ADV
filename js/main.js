// exibe o whatsapp quando a seção de serviços entra na tela

document.addEventListener("scroll", () => {
    const servicesSection = document.getElementById("services");
    const body = document.body;
    const rect = servicesSection.getBoundingClientRect();

    // Quando a seção de serviços entra na tela
    if (rect.top <= window.innerHeight * 0.4) {
        body.classList.add("show-whatsapp");
    } else {
        body.classList.remove("show-whatsapp");
    }
});



/* FLIP CARDS DE SERVIÇOS */

// JS
const services = [
    { icon: "request_quote", titleCard: "Aposentadorias", description: "Aposentadoria por tempo de contribuição, por idade, com tempo rural e especial. Concessão do benefício e revisão do valor." },
    { icon: "personal_injury", titleCard: "Auxílio-Doença", description: "Impossibilitado de trabalhar em razão da doença, pode ter direito ao auxílio por incapacidade temporária ou permanente." },
    { icon: "accessible_forward", titleCard: "Auxílio-Acidente", description: "Benefício pago ao segurado que sofreu um acidente e ficou com sequelas que reduzem sua capacidade de trabalho." },
    { icon: "paid", titleCard: "Isenção do Imposto de Renda", description: "Isenção de imposto de renda por doenças graves, como neoplasia maligna, cardipoatia grave, alienação mental e outros." },
    { icon: "elderly_woman", titleCard: "LOAS (Deficiente e Idoso)", description: "Benefício assistencial para deficiente ou idoso em situação de baixa renda." },
    { icon: "home_work", titleCard: "Quitação do Imóvel por Invalidez", description: "Análise do contrato para possibilidade de quitação do imóvel diante da invalidez ou morte do contratante." },
    { icon: "group", titleCard: "Pensão por Morte", description: "Benefício pago aos dependentes do segurado falecido. Revisão de valores e cotas." },
    { icon: "add_circle", titleCard: "Adicional de 25% na Aposentadoria", description: "Valor adicional para aposentados por invalidez que necessitam de cuidados de outra pessoa." },
];

function generateServiceCards(servicesArray) {
    const container = document.getElementById("services-container");
    container.innerHTML = '';

    servicesArray.forEach(service => {
        const card = document.createElement("div");
        card.classList.add("service__card");
        card.innerHTML = `
            <div class="service__icon">
                <i class="material-icons-outlined">${service.icon}</i>
            </div>
            <h4 class="service__title">${service.titleCard}</h4>
            <p class="service__description">${service.description}</p>
        `;
        container.appendChild(card);
    });
}

// Navegação com setas
function setupArrowNavigation() {
    const container = document.getElementById("services-container");
    const leftBtn = document.querySelector(".service-arrow.left");
    const rightBtn = document.querySelector(".service-arrow.right");

    // calcula a largura de um card + gap
    const card = container.querySelector(".service__card");
    const gap = parseInt(getComputedStyle(container).gap) || 16; // fallback
    const scrollAmount = card.offsetWidth + gap;

    leftBtn.addEventListener("click", () => {
        container.scrollLeft -= scrollAmount; // move à esquerda
    });

    rightBtn.addEventListener("click", () => {
        container.scrollLeft += scrollAmount; // move à direita
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    generateServiceCards(services);
    setupArrowNavigation();
});



/* SCROLL REVEAL ANIMATION */
const sr = {
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
}


/*FORMULÁRIO PARA WHATSAPP */
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pega os dados do formulário
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        // Monta a mensagem para WhatsApp
        const whatsappMessage = `Olá! Gostaria de agendar uma consulta.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Serviço:* ${service}\n*Mensagem:* ${message}`;

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Link para abrir o WhatsApp instalado
        const whatsappAppURL = `whatsapp://send?phone=555196839890&text=${encodedMessage}`;

        // Abre o WhatsApp (tenta abrir app instalado primeiro)
        window.location.href = whatsappAppURL;

        // Notificação de sucesso
        showNotification('Mensagem enviada! Verifique o WhatsApp.', 'success');

        // Limpa formulário
        contactForm.reset();
    });
}

/* SISTEMA DE NOTIFICAÇÃO */
function showNotification(message, type = 'info') {
    // Remove notificações antigas
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());

    // Cria notificação
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Estilo inline
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Botão fechar
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Remove automático após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* INICIALIZAÇÃO*/
document.addEventListener('DOMContentLoaded', () => {
    initFormHandling();
});

/* INICIALIZAÇÃO */
document.addEventListener('DOMContentLoaded', () => {
    initFormHandling();
});
/* PARALLAX EFFECT */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.home__image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

/* BUTTON HOVER EFFECTS */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

/* LOADING ANIMATION */
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        // Hide loading screen if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
        
        // Start animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
}

/* INITIALIZE ALL FUNCTIONS */
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    animateCounters();
    initSmoothScrolling();
    initFormHandling();
    initParallaxEffect();
    initTypingAnimation();
    initButtonEffects();
    initCardTiltEffect();
    initLoadingAnimation();
    initHeaderScrollEffect();
});

/* CSS ANIMATIONS */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification__close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
    }
    
    .notification__close:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .scroll-header {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .loaded .fade-in,
    .loaded .slide-in-left,
    .loaded .slide-in-right,
    .loaded .scale-in {
        transition-delay: 0s;
    }
`;
document.head.appendChild(style);