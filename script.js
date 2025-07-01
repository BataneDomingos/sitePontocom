// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
            animateCounter(counter, target);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

// Set up counters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set counter targets
    const yearsCounter = document.getElementById('years-counter');
    const clientsCounter = document.getElementById('clients-counter');
    const projectsCounter = document.getElementById('projects-counter');
    const solutionsCounter = document.getElementById('solutions-counter');
    
    if (yearsCounter) {
        yearsCounter.setAttribute('data-target', '3');
        observer.observe(yearsCounter);
    }
    
    if (clientsCounter) {
        clientsCounter.setAttribute('data-target', '50');
        observer.observe(clientsCounter);
    }
    
    if (projectsCounter) {
        projectsCounter.setAttribute('data-target', '100');
        observer.observe(projectsCounter);
    }
    
    if (solutionsCounter) {
        solutionsCounter.setAttribute('data-target', '75');
        observer.observe(solutionsCounter);
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Floating elements animation
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.width = (Math.random() * 100 + 50) + 'px';
        element.style.height = element.style.width;
        element.style.animationDelay = Math.random() * 20 + 's';
        element.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(element);
    }
}

// Mouse follower effect
function initMouseFollower() {
    const follower = document.getElementById('mouse-follower');
    if (!follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 192 + 'px'; // 192 = 24rem / 2
        follower.style.top = followerY - 192 + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    
    updateFollower();
}

// Code animation
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length === 0) return;
    
    let currentLine = 0;
    
    function highlightNextLine() {
        // Remove active class from all lines
        codeLines.forEach(line => line.classList.remove('active'));
        
        // Add active class to current line
        if (codeLines[currentLine]) {
            codeLines[currentLine].classList.add('active');
        }
        
        // Move to next line
        currentLine = (currentLine + 1) % codeLines.length;
        
        // Schedule next highlight
        setTimeout(highlightNextLine, 1500);
    }
    
    // Start animation after a delay
    setTimeout(highlightNextLine, 2000);
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span>Enviando...</span><span>⏳</span>';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    initMouseFollower();
    initCodeAnimation();
    initContactForm();
});

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}