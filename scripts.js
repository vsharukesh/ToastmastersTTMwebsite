// Modern Sci-Fi UI/UX Enhancements

class SciFiUI {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.enhanceSectorCards();
        this.enhanceQuestionCards();
        this.addKeyboardNavigation();
        this.addSoundEffects();
        this.initMouseTrail();
    }

    // Create floating particles for background
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const duration = Math.random() * 20 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.animation = `floatParticle ${duration}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Enhance sector cards with sci-fi effects
    enhanceSectorCards() {
        const sectorCards = document.querySelectorAll('.sector-card');
        
        sectorCards.forEach(card => {
            // Add energy field effect
            const energyField = document.createElement('div');
            energyField.className = 'energy-field';
            card.appendChild(energyField);

            // Add hover sound effect
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.createEnergyBurst(card);
            });

            // Add click ripple effect
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
                this.playSound('click');
            });
        });
    }

    // Enhance question cards with sci-fi effects
    enhanceQuestionCards() {
        const questionCards = document.querySelectorAll('.question-card');
        
        questionCards.forEach(card => {
            // Add holographic effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
                card.style.boxShadow = `
                    0 20px 40px rgba(138, 43, 226, 0.4),
                    0 0 60px rgba(30, 144, 255, 0.3),
                    inset 0 0 20px rgba(255, 255, 255, 0.1)
                `;
                this.createHolographicEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });

            // Add selection effect
            card.addEventListener('click', () => {
                this.createSelectionEffect(card);
                this.playSound('select');
            });
        });
    }

    // Create energy burst effect
    createEnergyBurst(element) {
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.width = '100%';
        burst.style.height = '100%';
        burst.style.top = '0';
        burst.style.left = '0';
        burst.style.pointerEvents = 'none';
        burst.style.borderRadius = '20px';
        burst.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)';
        burst.style.transform = 'scale(0)';
        burst.style.transition = 'transform 0.6s ease-out';
        
        element.appendChild(burst);
        
        setTimeout(() => {
            burst.style.transform = 'scale(1.5)';
        }, 10);
        
        setTimeout(() => {
            burst.remove();
        }, 600);
    }

    // Create ripple effect
    createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Create holographic effect
    createHolographicEffect(element) {
        const hologram = document.createElement('div');
        hologram.style.position = 'absolute';
        hologram.style.width = '100%';
        hologram.style.height = '100%';
        hologram.style.top = '0';
        hologram.style.left = '0';
        hologram.style.pointerEvents = 'none';
        hologram.style.borderRadius = '15px';
        hologram.style.background = `
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(138, 43, 226, 0.1) 2px,
                rgba(138, 43, 226, 0.1) 4px
            )
        `;
        hologram.style.animation = 'holographicScan 2s linear infinite';
        
        element.appendChild(hologram);
        
        element.addEventListener('mouseleave', () => {
            hologram.remove();
        }, { once: true });
    }

    // Create selection effect
    createSelectionEffect(element) {
        const effect = document.createElement('div');
        effect.style.position = 'absolute';
        effect.style.width = '100%';
        effect.style.height = '100%';
        effect.style.top = '0';
        effect.style.left = '0';
        effect.style.pointerEvents = 'none';
        effect.style.borderRadius = '15px';
        effect.style.border = '3px solid rgba(138, 43, 226, 0.8)';
        effect.style.animation = 'selectionPulse 1s ease-out';
        
        element.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    // Add keyboard navigation
    addKeyboardNavigation() {
        let currentIndex = 0;
        const sectors = document.querySelectorAll('.sector-card');
        
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('sectorsPage').classList.contains('active')) {
                switch(e.key) {
                    case 'ArrowRight':
                        currentIndex = (currentIndex + 1) % sectors.length;
                        sectors[currentIndex].focus();
                        break;
                    case 'ArrowLeft':
                        currentIndex = (currentIndex - 1 + sectors.length) % sectors.length;
                        sectors[currentIndex].focus();
                        break;
                    case 'Enter':
                        sectors[currentIndex].click();
                        break;
                }
            }
        });

        // Make sector cards focusable
        sectors.forEach((sector, index) => {
            sector.tabIndex = 0;
            sector.addEventListener('focus', () => {
                currentIndex = index;
                this.createEnergyBurst(sector);
            });
        });
    }

    // Add sound effects (using Web Audio API)
    addSoundEffects() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSound(type) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        switch(type) {
            case 'hover':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
            case 'click':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.15;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.15);
                break;
            case 'select':
                oscillator.frequency.value = 1000;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
                break;
        }
    }

    // Initialize mouse trail effect
    initMouseTrail() {
        let mouseTrail = [];
        const maxTrailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.borderRadius = '50%';
            trail.style.background = 'rgba(138, 43, 226, 0.6)';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transition = 'all 0.5s ease-out';
            
            document.body.appendChild(trail);
            mouseTrail.push(trail);
            
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0)';
            }, 10);
            
            setTimeout(() => {
                trail.remove();
                mouseTrail.shift();
            }, 500);
            
            if (mouseTrail.length > maxTrailLength) {
                const oldTrail = mouseTrail.shift();
                oldTrail.remove();
            }
        });
    }
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }

    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }

    @keyframes holographicScan {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(100%);
        }
    }

    @keyframes selectionPulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.5;
        }
        100% {
            transform: scale(1.1);
            opacity: 0;
        }
    }

    .energy-field {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 25px;
        background: radial-gradient(circle, transparent 30%, rgba(138, 43, 226, 0.1) 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .sector-card:hover .energy-field {
        opacity: 1;
        animation: energyPulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Initialize the Sci-Fi UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SciFiUI();
});
