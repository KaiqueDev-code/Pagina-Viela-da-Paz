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

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const closeBtn = modal.querySelector('.close');
let lastFocusedElement = null;

const projectDetails = {
    1: {
        title: 'Programa de Recreação',
        description: 'Espaço de recreação que transforma vidas através do brincar! Oferecemos atividades lúdicas, esportivas e culturais que estimulam o desenvolvimento integral das crianças. Brinquedoteca, jogos educativos, oficinas de arte e música fazem parte do nosso dia a dia, criando um ambiente onde as crianças podem aprender, crescer e ser felizes.',
        image: './/img/crianca-estudando.jpeg'
    },
    2: {
        title: 'Projeto Educação',
        description: 'Aulas sobre a Bíblia e seus princípios, ensinando valores cristãos e formando crianças com base na palavra de Deus.',
        image: './/img/matriculas.jpeg'
    },
    3: {
        title: 'Projeto de Apadrinhamento',
        description: 'Campanha anual onde padrinhos doam brinquedos para crianças carentes. Uma vez por ano, você pode levar alegria e fazer o Natal de uma criança mais especial.',
        image: './/img/crianca-estudando2.jpeg'
    }
};

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.parentElement.getAttribute('data-project');
        const details = projectDetails[projectId];
        
        if (details) {
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalImage.src = details.image;
            modalImage.alt = `Imagem do ${details.title}`;
            lastFocusedElement = document.activeElement;
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');

            const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) focusable.focus();
        }
    });
});

function closeModalFunction() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeModalFunction);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModalFunction();
    }
});

const contactForm = document.querySelector('form[action*="formsubmit"]');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const button = this.querySelector('button[type="submit"]');
        const originalText = button ? button.textContent : '';

        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const messageEl = document.getElementById('message');
        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const message = messageEl ? messageEl.value.trim() : '';

        if (!name || !email || !message) {
            showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            showAlert('Por favor, insira um email válido.', 'error');
            return;
        }

        if (button) {
            button.textContent = 'Enviando...';
            button.disabled = true;
            button.style.opacity = '0.7';
        }

        const formData = new FormData(this);

        try {
            await fetch(this.action, { method: 'POST', body: formData, mode: 'no-cors' });
            showAlert('Mensagem enviada — obrigado!', 'success');
            this.reset();
        } catch (err) {
            showAlert('Erro ao enviar. Tente novamente.', 'error');
        } finally {
            if (button) {
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '1';
            }
        }
    });
}

function showAlert(message, type) {
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;

    const backgroundColor = type === 'success' ? '#00a859' : '#e53e3e';
    const icon = type === 'success' ? '✓' : '⚠';

    alert.innerHTML = `
        <span style="flex: 1;">${icon} ${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 10px;">&times;</button>
    `;

    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        background: ${backgroundColor};
        font-family: 'Open Sans', sans-serif;
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.project-card, .help-card, .stat');

    const scrollReveal = function() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };

    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease";
    });

    window.addEventListener('scroll', scrollReveal);

    scrollReveal();
}

document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
});

if (!document.querySelector('#alert-animations')) {
    const style = document.createElement('style');
    style.id = 'alert-animations';
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
        
        .form-alert {
            animation: slideInRight 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}