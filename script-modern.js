// Modern Sci-Fi UI JavaScript with Enhanced Interactions

class TableTopicsApp {
    constructor() {
        this.currentSector = '';
        this.selectedQuestion = '';
        this.selectedQuestions = new Set(); // Track all selected questions
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.setupQuestions();
        this.setupEventListeners();
        this.initParticles();
        this.initMouseTracking();
        this.createGridOverlay();
        this.addKeyboardNavigation();
        this.initSoundEffects();
        this.initCyberpunkTerminal();
        this.initStarMap();
        this.initNeuralNetwork();
    }

    setupQuestions() {
        this.questions = {
            anime: [
                "Which anime character would definitely get debarred for low attendance?",
                "If your life was an anime, what would your current episode title be?",
                "Which anime character would cry first after seeing CAT-1 results?",
                "If you had to shout one overdramatic anime dialogue before exams, what would it be?"
            ],
            superheroes: [
                "If you had one superhero power only during exams, what would you choose?",
                "Which superhero would fail miserably in a group project?",
                "If villains had LinkedIn, what would they list under \"Experience\"?",
                "If you were Spider-Man, what extremely stupid but realistic situation would make you lose a fight?"
            ],
            gaming: [
                "If your life had a skill tree like a game, which skill are you currently upgrading?",
                "If life had cheat codes, what code would you secretly use?",
                "Imagine your teammate keeps messing up in a ranked match. How do you react?",
                "If you had unlimited lives in real life, what risky thing would you try?"
            ],
            fantasy: [
                "If magic existed in VIT for one day, what rule would students break first?",
                "Would you rather have a dragon as a pet or an invisibility cloak — and what trouble would you cause?",
                "If you were sorted into a fantasy kingdom, would you be royalty or a random villager who disappears early but does something great?",
                "If you had a magic wand during placements, what would you fix first?"
            ],
            sitcoms: [
                "Which TV or sitcom character would turn a simple problem into way too much drama?",
                "Which TV character would completely ignore the Table Topics timer and keep talking confidently?",
                "If your life had a laugh track, which everyday moment would trigger it the most?",
                "If your life was a sitcom narrator, which slightly embarrassing moment would they describe?"
            ]
        };
    }

    setupEventListeners() {
        // Sector card click events
        document.querySelectorAll('.sector-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const sector = card.dataset.sector;
                this.selectSector(sector, card, e);
            });

            // Add hover sound effect
            card.addEventListener('mouseenter', () => {
                this.playHoverSound();
                this.createHoverParticles(card);
            });
        });

        // Back button
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.showSectorsPage());
        }
    }

    selectSector(sector, cardElement, event) {
        // Create ripple effect
        this.createRippleEffect(event, cardElement);

        // Add animation class to the clicked card
        cardElement.classList.add('selected');
        
        // Set current sector
        this.currentSector = sector;
        
        // Play selection sound
        this.playSelectSound();
        
        // Create explosion effect
        this.createSectorExplosion(cardElement);
        
        // Wait for animation to complete, then show questions
        setTimeout(() => {
            this.showQuestionsPage(sector);
        }, 1500);
    }

    showQuestionsPage(sector) {
        // Hide sectors page and show questions page
        document.getElementById('sectorsPage').classList.remove('active');
        document.getElementById('questionsPage').classList.add('active');
        
        // Set sector name with icon
        const sectorNames = {
            anime: '� ANIME',
            superheroes: '🦸 SUPERHEROES',
            gaming: '🎮 GAMING',
            fantasy: '🐉 FANTASY',
            sitcoms: '� SITCOMS / TV SHOWS'
        };
        document.getElementById('sectorName').textContent = sectorNames[sector];
        
        // Clear previous questions
        const questionsGrid = document.getElementById('questionsGrid');
        questionsGrid.innerHTML = '';
        
        // Add question cards with staggered animation
        this.questions[sector].forEach((question, index) => {
            setTimeout(() => {
                const questionCard = this.createQuestionCard(question, index, sector);
                questionsGrid.appendChild(questionCard);
                this.animateQuestionEntry(questionCard);
            }, index * 150);
        });
        
        // Add massive animation to questions container
        setTimeout(() => {
            questionsGrid.classList.add('massive-animation');
        }, 100);
    }

    createQuestionCard(question, index, sector) {
        const questionCard = document.createElement('div');
        const questionId = `${sector}-${index}`; // Create unique identifier
        questionCard.className = 'question-card';
        questionCard.dataset.questionId = questionId;
        questionCard.dataset.questionText = question;
        
        // Add holographic layers
        questionCard.innerHTML = `
            <div class="holographic-grid"></div>
            <div class="depth-layer-1"></div>
            <div class="depth-layer-2"></div>
            <div class="holographic-glitch"></div>
            <div class="question-content">
                <div class="question-number">Query ${index + 1}</div>
                <div class="question-text">Question hidden - click to reveal</div>
            </div>
        `;
        
        // Check if this question was previously selected
        if (this.selectedQuestions.has(questionId)) {
            questionCard.classList.add('blocked-question');
            const questionContent = questionCard.querySelector('.question-content');
            questionContent.innerHTML = `
                <div class="question-number">Query ${index + 1}</div>
                <div class="blocked-overlay">
                    <div class="lock-container">
                        <div class="blocked-icon">🔒</div>
                        <div class="lock-ring"></div>
                        <div class="lock-particles"></div>
                    </div>
                    <div class="blocked-text">ACCESS DENIED</div>
                </div>
            `;
        }
        
        questionCard.addEventListener('click', (e) => {
            this.selectQuestion(question, questionCard, sector, e);
        });

        // Add hover effects only for non-blocked questions
        if (!this.selectedQuestions.has(questionId)) {
            questionCard.addEventListener('mouseenter', () => {
                this.playHoverSound();
                this.createQuestionHover(questionCard);
            });
        }

        return questionCard;
    }

    animateQuestionEntry(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-20deg) scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0) scale(1)';
        }, 50);
    }

    selectQuestion(question, cardElement, sector, event) {
        const questionId = cardElement.dataset.questionId;
        
        // Prevent selection if question is already selected
        if (this.selectedQuestions.has(questionId)) {
            this.createBlockedEffect(cardElement);
            this.playBlockedSound();
            return;
        }
        
        // Create time portal effect before revealing question
        this.createTimePortalEffect(cardElement);
        
        // Create ripple effect
        this.createRippleEffect(event, cardElement);

        // Reveal the actual question after portal animation
        setTimeout(() => {
            const questionText = cardElement.querySelector('.question-text');
            questionText.textContent = question;
            
            // Add to selected questions set
            this.selectedQuestions.add(questionId);
            
            // Remove previous selections
            document.querySelectorAll('.question-card').forEach(card => {
                card.classList.remove('selected-question');
            });
            
            // Add selection to clicked card
            cardElement.classList.add('selected-question');
            
            // Set selected question
            this.selectedQuestion = question;
            
            // Play selection sound
            this.playSelectSound();
            
            // Create selection effect
            this.createQuestionSelection(cardElement);
            
            // Block all other questions with sci-fi effects
            this.blockOtherQuestions(cardElement);
            
            // Show final question after a delay
            setTimeout(() => {
                this.showFinalQuestion(question, sector);
            }, 800);
        }, 1500); // Wait for time portal animation
    }

    showFinalQuestion(question, sector) {
        // Hide questions grid with animation
        const questionsGrid = document.getElementById('questionsGrid');
        questionsGrid.style.transition = 'all 0.6s ease-out';
        questionsGrid.style.opacity = '0';
        questionsGrid.style.transform = 'scale(0.8) rotateY(20deg)';
        
        setTimeout(() => {
            questionsGrid.style.display = 'none';
            
            // Show final question
            document.getElementById('selectedQuestionText').textContent = question;
            const finalQuestionDiv = document.getElementById('finalQuestion');
            finalQuestionDiv.style.display = 'block';
            
            // Add sector-specific animation to final question
            const finalQuestionContent = finalQuestionDiv.querySelector('.final-question');
            finalQuestionContent.classList.add('massive-animation');
            
            // Create celebration effect
            this.createCelebrationEffect();
        }, 600);
    }

    showSectorsPage() {
        // Reset states
        this.currentSector = '';
        this.selectedQuestion = '';
        
        // Remove all animation classes
        document.querySelectorAll('.sector-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Show sectors page and hide questions page
        document.getElementById('questionsPage').classList.remove('active');
        document.getElementById('sectorsPage').classList.add('active');
        
        // Reset questions page
        const questionsGrid = document.getElementById('questionsGrid');
        questionsGrid.style.display = 'grid';
        questionsGrid.style.opacity = '1';
        questionsGrid.style.transform = 'scale(1) rotateY(0deg)';
        questionsGrid.classList.remove('massive-animation');
        
        document.getElementById('finalQuestion').style.display = 'none';
    }

    // Particle System
    initParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create particles
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
        
        this.animateParticles(ctx, canvas);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    animateParticles(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Draw connections
            this.particles.forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = (1 - distance / 100) * 0.2;
                    ctx.stroke();
                }
            });
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animateParticles(ctx, canvas));
    }

    getRandomColor() {
        const colors = ['#8a2be2', '#00ffff', '#ff00ff', '#ffbf00', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Mouse tracking for parallax effects
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth - 0.5;
            this.mouseY = e.clientY / window.innerHeight - 0.5;
            
            // Apply parallax to sector cards
            document.querySelectorAll('.sector-card').forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                const moveX = this.mouseX * depth;
                const moveY = this.mouseY * depth;
                card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            });
        });
    }

    // Create grid overlay
    createGridOverlay() {
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'grid-overlay';
        document.body.appendChild(gridOverlay);
    }

    // Keyboard navigation
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.currentSector) {
                    this.showSectorsPage();
                }
            }
            
            // Number keys for sector selection
            if (!this.currentSector && e.key >= '1' && e.key <= '5') {
                const sectors = ['anime', 'superheroes', 'gaming', 'fantasy', 'sitcoms'];
                const sectorIndex = parseInt(e.key) - 1;
                const card = document.querySelector(`[data-sector="${sectors[sectorIndex]}"]`);
                if (card) {
                    this.selectSector(sectors[sectorIndex], card, { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
                }
            }
        });
    }

    // Visual Effects
    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        const rect = element.getBoundingClientRect();
        ripple.style.left = (event.clientX - rect.left) + 'px';
        ripple.style.top = (event.clientY - rect.top) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createHoverParticles(element) {
        // Reduce particle count and use CSS animations for better performance
        const particleCount = 4; // Reduced from 10
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 80 + Math.random() * 30;
            const endX = Math.cos(angle) * velocity;
            const endY = Math.sin(angle) * velocity;
            
            const particle = document.createElement('div');
            particle.className = 'hover-particle';
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: ${this.getRandomColor()};
                border-radius: 50%;
                pointer-events: none;
                left: ${centerX}px;
                top: ${centerY}px;
                z-index: 1000;
                animation: hoverParticleExpand 0.4s ease-out forwards;
                --end-x: ${endX}px;
                --end-y: ${endY}px;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 400);
        }
    }

    createSectorExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = this.getRandomColor();
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.zIndex = '1000';
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 150 + Math.random() * 100;
            
            document.body.appendChild(particle);
            
            let progress = 0;
            const animate = () => {
                progress += 0.015;
                particle.style.left = (centerX + Math.cos(angle) * velocity * progress) + 'px';
                particle.style.top = (centerY + Math.sin(angle) * velocity * progress) + 'px';
                particle.style.opacity = 1 - progress;
                particle.style.transform = `scale(${1 + progress})`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    createQuestionSelection(element) {
        const rect = element.getBoundingClientRect();
        
        // Create glowing border effect
        element.style.boxShadow = `
            0 0 30px rgba(255, 0, 255, 0.8),
            0 0 60px rgba(255, 0, 255, 0.6),
            0 0 90px rgba(255, 0, 255, 0.4),
            inset 0 0 30px rgba(255, 0, 255, 0.2)
        `;
    }

    createQuestionHover(element) {
        // Use CSS transitions instead of direct style manipulation for better performance
        element.style.transform = 'translateY(-3px) scale(1.01)'; // Reduced effect
        element.style.boxShadow = `
            0 8px 20px rgba(0, 255, 255, 0.3),
            0 0 15px rgba(0, 255, 255, 0.2)
        `;
        element.style.transition = 'all 0.2s ease'; // Faster transition
    }

    createCelebrationEffect() {
        // Reduce particle count and use CSS animations
        const particleCount = 20; // Reduced from 50
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'celebration-particle';
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${this.getRandomColor()};
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight}px;
                    z-index: 1000;
                    box-shadow: 0 0 8px ${particle.style.background};
                    --sway: ${(Math.random() - 0.5) * 60}px;
                    animation: celebrationFloat 1.2s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1200);
            }, i * 30); // Reduced delay
        }
    }

    // Block other questions with sci-fi effects
    blockOtherQuestions(selectedCard) {
        const allCards = document.querySelectorAll('.question-card');
        allCards.forEach(card => {
            if (card !== selectedCard && !card.classList.contains('blocked-question')) {
                setTimeout(() => {
                    card.classList.add('blocking');
                    this.createBlockingEffect(card);
                    
                    setTimeout(() => {
                        card.classList.add('blocked-question');
                        card.classList.remove('blocking');
                        this.createBlockedOverlay(card);
                    }, 1000);
                }, Math.random() * 500);
            }
        });
    }

    // Create blocking animation effect
    createBlockingEffect(card) {
        const rect = card.getBoundingClientRect();
        
        // Create energy field around card
        const energyField = document.createElement('div');
        energyField.style.cssText = `
            position: fixed;
            top: ${rect.top - 10}px;
            left: ${rect.left - 10}px;
            width: ${rect.width + 20}px;
            height: ${rect.height + 20}px;
            border: 3px solid rgba(255, 0, 0, 0.8);
            border-radius: 15px;
            pointer-events: none;
            z-index: 1000;
            animation: energyFieldCollapse 1s ease-out forwards;
        `;
        
        document.body.appendChild(energyField);
        
        // Create scanning lines
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const scanLine = document.createElement('div');
                scanLine.style.cssText = `
                    position: fixed;
                    top: ${rect.top}px;
                    left: ${rect.left}px;
                    width: ${rect.width}px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.8), transparent);
                    pointer-events: none;
                    z-index: 1001;
                    animation: scanLineMove 0.5s ease-out forwards;
                `;
                
                document.body.appendChild(scanLine);
                
                setTimeout(() => scanLine.remove(), 500);
            }, i * 150);
        }
        
        setTimeout(() => energyField.remove(), 1000);
    }

    // Create blocked overlay for question cards
    createBlockedOverlay(card) {
        const existingOverlay = card.querySelector('.blocked-overlay');
        if (existingOverlay) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'blocked-overlay';
        overlay.innerHTML = `
            <div class="lock-container">
                <div class="blocked-icon">🔒</div>
                <div class="lock-ring"></div>
                <div class="lock-particles"></div>
            </div>
            <div class="blocked-text">ACCESS DENIED</div>
            <div class="blocked-scanner"></div>
        `;
        
        card.appendChild(overlay);
        
        // Create animated particles around the lock
        this.createLockParticles(overlay.querySelector('.lock-particles'));
        
        // Remove hover effects
        card.style.pointerEvents = 'none';
    }

    // Create innovative lock particle effects
    createLockParticles(container) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'lock-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: radial-gradient(circle, rgba(255, 0, 0, 1), rgba(255, 100, 0, 0.8));
                border-radius: 50%;
                pointer-events: none;
                animation: lockParticleOrbit ${2 + i * 0.2}s linear infinite;
                animation-delay: ${i * 0.1}s;
            `;
            
            const angle = (i * 45) * Math.PI / 180;
            const radius = 25;
            particle.style.left = `${Math.cos(angle) * radius}px`;
            particle.style.top = `${Math.sin(angle) * radius}px`;
            
            container.appendChild(particle);
        }
    }

    // Create effect when trying to click blocked question
    createBlockedEffect(card) {
        // Create shockwave effect
        const shockwave = document.createElement('div');
        shockwave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(255, 0, 0, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1002;
            animation: shockwaveExpand 0.6s ease-out forwards;
        `;
        
        card.appendChild(shockwave);
        
        // Create error text
        const errorText = document.createElement('div');
        errorText.textContent = 'ACCESS DENIED';
        errorText.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 0, 0, 0.9);
            font-weight: bold;
            font-size: 14px;
            letter-spacing: 2px;
            pointer-events: none;
            z-index: 1003;
            animation: errorTextPulse 0.6s ease-out forwards;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
            white-space: nowrap;
        `;
        
        card.appendChild(errorText);
        
        setTimeout(() => {
            shockwave.remove();
            errorText.remove();
        }, 600);
    }

    // Play blocked sound effect
    playBlockedSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }

    // Cyberpunk Terminal System
    initCyberpunkTerminal() {
        this.terminalHistory = [];
        this.terminalCommands = {
            'help': this.showTerminalHelp.bind(this),
            'clear': this.clearTerminal.bind(this),
            'status': this.showSystemStatus.bind(this),
            'random': this.selectRandomQuestion.bind(this),
            'sectors': this.showSectors.bind(this),
            'quantum': this.quantumMode.bind(this),
            'matrix': this.enterMatrix.bind(this),
            'scan': this.scanForQuestions.bind(this),
            'hack': this.hackSystem.bind(this),
            'analyze': this.analyzeSector.bind(this),
            'warp': this.warpToSector.bind(this)
        };
        
        this.setupTerminalControls();
        this.setupTerminalInput();
    }

    setupTerminalControls() {
        const terminal = document.getElementById('cyberpunkTerminal');
        if (!terminal) return;

        // Minimize button
        terminal.querySelector('.minimize')?.addEventListener('click', () => {
            terminal.classList.toggle('minimized');
            this.addTerminalOutput('> TERMINAL MINIMIZED', 'warning');
        });

        // Maximize button
        terminal.querySelector('.maximize')?.addEventListener('click', () => {
            terminal.classList.toggle('maximized');
            this.addTerminalOutput('> TERMINAL MAXIMIZED', 'success');
        });

        // Close button
        terminal.querySelector('.close')?.addEventListener('click', () => {
            terminal.style.display = 'none';
            this.addTerminalOutput('> TERMINAL CLOSED', 'error');
        });
    }

    setupTerminalInput() {
        const input = document.getElementById('terminalInput');
        if (!input) return;

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processTerminalCommand(input.value.trim());
                input.value = '';
            }
        });
    }

    processTerminalCommand(command) {
        if (!command) return;

        this.addTerminalOutput(`> ${command}`, 'normal');
        this.terminalHistory.push(command);

        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        if (this.terminalCommands[cmd]) {
            this.terminalCommands[cmd](args);
        } else {
            this.addTerminalOutput(`> COMMAND NOT RECOGNIZED: ${cmd}`, 'error');
            this.addTerminalOutput('> TYPE "HELP" FOR AVAILABLE COMMANDS', 'warning');
        }
    }

    addTerminalOutput(text, type = 'normal') {
        const output = document.getElementById('terminalOutput');
        if (!output) return;

        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    showTerminalHelp() {
        const commands = [
            'HELP - Show this help message',
            'CLEAR - Clear terminal output',
            'STATUS - Show system status',
            'RANDOM - Select random question',
            'SECTORS - List available sectors',
            'QUANTUM - Enable quantum mode',
            'MATRIX - Enter the matrix',
            'SCAN - Scan for available questions',
            'HACK - Attempt system hack',
            'ANALYZE [sector] - Analyze sector data',
            'WARP [sector] - Warp to sector'
        ];

        this.addTerminalOutput('> AVAILABLE COMMANDS:', 'success');
        commands.forEach(cmd => {
            this.addTerminalOutput(`  ${cmd}`, 'normal');
        });
    }

    clearTerminal() {
        const output = document.getElementById('terminalOutput');
        if (output) {
            output.innerHTML = '';
            this.addTerminalOutput('> TERMINAL CLEARED', 'success');
        }
    }

    showSystemStatus() {
        this.addTerminalOutput('> SYSTEM STATUS:', 'success');
        this.addTerminalOutput(`  QUANTUM CORE: ONLINE`, 'normal');
        this.addTerminalOutput(`  NEURAL LINK: ACTIVE`, 'normal');
        this.addTerminalOutput(`  SECTOR SCAN: ${this.currentSector || 'NONE'}`, 'normal');
        this.addTerminalOutput(`  QUESTIONS LOCKED: ${this.selectedQuestions.size}`, 'normal');
        this.addTerminalOutput(`  TIME DILATION: STABLE`, 'normal');
    }

    selectRandomQuestion() {
        if (!this.currentSector) {
            this.addTerminalOutput('> ERROR: NO SECTOR SELECTED', 'error');
            return;
        }

        const questions = this.questions[this.currentSector];
        const availableQuestions = questions.filter((q, index) => 
            !this.selectedQuestions.has(`${this.currentSector}-${index}`)
        );

        if (availableQuestions.length === 0) {
            this.addTerminalOutput('> ERROR: ALL QUESTIONS LOCKED', 'error');
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const randomQuestion = availableQuestions[randomIndex];
        
        this.addTerminalOutput('> QUANTUM SELECTION INITIATED...', 'warning');
        this.addTerminalOutput(`> SELECTED: ${randomQuestion}`, 'success');
        
        // Find and click the corresponding question card
        const cards = document.querySelectorAll('.question-card');
        cards.forEach(card => {
            if (card.dataset.questionText === randomQuestion && !card.classList.contains('blocked-question')) {
                setTimeout(() => card.click(), 500);
            }
        });
    }

    showSectors() {
        this.addTerminalOutput('> AVAILABLE SECTORS:', 'success');
        Object.keys(this.questions).forEach(sector => {
            const count = this.questions[sector].length;
            const locked = Array.from(this.selectedQuestions).filter(q => q.startsWith(sector)).length;
            this.addTerminalOutput(`  ${sector.toUpperCase()}: ${count - locked}/${count} AVAILABLE`, 'normal');
        });
    }

    quantumMode() {
        document.body.classList.toggle('quantum-mode');
        this.addTerminalOutput('> QUANTUM MODE ' + (document.body.classList.contains('quantum-mode') ? 'ENABLED' : 'DISABLED'), 'success');
    }

    enterMatrix() {
        this.addTerminalOutput('> ENTERING MATRIX...', 'warning');
        document.body.style.animation = 'matrixRain 2s ease-out';
        setTimeout(() => {
            document.body.style.animation = '';
            this.addTerminalOutput('> MATRIX ACTIVATED', 'success');
        }, 2000);
    }

    scanForQuestions() {
        this.addTerminalOutput('> INITIATING QUANTUM SCAN...', 'warning');
        setTimeout(() => {
            this.addTerminalOutput('> SCAN COMPLETE', 'success');
            this.showSectors();
        }, 1500);
    }

    hackSystem() {
        this.addTerminalOutput('> INITIATING SYSTEM HACK...', 'error');
        setTimeout(() => {
            this.addTerminalOutput('> ACCESS DENIED - FIREWALL ACTIVE', 'error');
            this.addTerminalOutput('> SECURITY PROTOCOLS ENGAGED', 'warning');
        }, 1000);
    }

    analyzeSector(args) {
        const sector = args[0];
        if (!sector) {
            this.addTerminalOutput('> ERROR: SECTOR SPECIFICATION REQUIRED', 'error');
            return;
        }

        if (!this.questions[sector]) {
            this.addTerminalOutput(`> ERROR: SECTOR "${sector}" NOT FOUND`, 'error');
            return;
        }

        this.addTerminalOutput(`> ANALYZING SECTOR: ${sector.toUpperCase()}`, 'warning');
        const questions = this.questions[sector];
        const locked = Array.from(this.selectedQuestions).filter(q => q.startsWith(sector)).length;
        
        setTimeout(() => {
            this.addTerminalOutput(`  TOTAL QUESTIONS: ${questions.length}`, 'normal');
            this.addTerminalOutput(`  AVAILABLE: ${questions.length - locked}`, 'normal');
            this.addTerminalOutput(`  LOCKED: ${locked}`, 'normal');
            this.addTerminalOutput(`  SECURITY LEVEL: ${locked > 0 ? 'ELEVATED' : 'NORMAL'}`, 'normal');
        }, 1000);
    }

    warpToSector(args) {
        const sector = args[0];
        if (!sector) {
            this.addTerminalOutput('> ERROR: DESTINATION SECTOR REQUIRED', 'error');
            return;
        }

        if (!this.questions[sector]) {
            this.addTerminalOutput(`> ERROR: SECTOR "${sector}" NOT FOUND`, 'error');
            return;
        }

        this.addTerminalOutput(`> INITIATING WARP TO ${sector.toUpperCase()}...`, 'warning');
        
        // Navigate to the sector
        const card = document.querySelector(`[data-sector="${sector}"]`);
        if (card) {
            setTimeout(() => {
                this.showSectorsPage();
                setTimeout(() => card.click(), 500);
            }, 1000);
        }
    }

    // Star Map Navigation System
    initStarMap() {
        this.starMapZoom = 1;
        this.starMapOffset = { x: 0, y: 0 };
        this.sectorStars = [];
        this.backgroundStars = [];
        
        this.setupStarMapCanvas();
        this.createSectorStars();
        this.createBackgroundStars();
        this.animateStarMap();
    }

    setupStarMapCanvas() {
        const canvas = document.getElementById('starMapCanvas');
        if (!canvas) return;
        
        this.starMapCtx = canvas.getContext('2d');
        
        // Mouse tracking for coordinates
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = Math.round(e.clientX - rect.left);
            const y = Math.round(e.clientY - rect.top);
            document.getElementById('coordinates').textContent = `X: ${x} Y: ${y}`;
        });

        // Click on sector stars
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.sectorStars.forEach(star => {
                const distance = Math.sqrt(Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2));
                if (distance < 30) {
                    this.warpToSectorFromStarMap(star.sector);
                }
            });
        });
    }

    createSectorStars() {
        const sectors = ['anime', 'superheroes', 'gaming', 'fantasy', 'sitcoms'];
        const centerX = 400;
        const centerY = 300;
        const radius = 200;
        
        sectors.forEach((sector, index) => {
            const angle = (index * 72 - 90) * Math.PI / 180; // 72 degrees apart, starting from top
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.sectorStars.push({
                sector: sector,
                x: x,
                y: y,
                radius: 15,
                color: this.getSectorColor(sector),
                pulsePhase: Math.random() * Math.PI * 2,
                orbitRadius: 5 + Math.random() * 10,
                orbitSpeed: 0.02 + Math.random() * 0.03
            });
        });
    }

    createBackgroundStars() {
        for (let i = 0; i < 200; i++) {
            this.backgroundStars.push({
                x: Math.random() * 800,
                y: Math.random() * 600,
                radius: Math.random() * 2,
                opacity: 0.3 + Math.random() * 0.7,
                twinkleSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }

    getSectorColor(sector) {
        const colors = {
            anime: 'rgba(255, 107, 157, 1)',
            superheroes: 'rgba(55, 66, 250, 1)',
            gaming: 'rgba(0, 210, 211, 1)',
            fantasy: 'rgba(162, 155, 254, 1)',
            sitcoms: 'rgba(255, 159, 243, 1)'
        };
        return colors[sector] || 'rgba(255, 255, 255, 1)';
    }

    animateStarMap() {
        const canvas = document.getElementById('starMapCanvas');
        if (!canvas) return;
        
        const ctx = this.starMapCtx;
        let animationTime = 0;
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Apply zoom and offset
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(this.starMapZoom, this.starMapZoom);
            ctx.translate(-canvas.width / 2 + this.starMapOffset.x, -canvas.height / 2 + this.starMapOffset.y);
            
            // Draw background stars
            this.backgroundStars.forEach(star => {
                const twinkle = Math.sin(animationTime * star.twinkleSpeed) * 0.5 + 0.5;
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw constellation lines
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 10]);
            
            for (let i = 0; i < this.sectorStars.length; i++) {
                const star1 = this.sectorStars[i];
                const star2 = this.sectorStars[(i + 1) % this.sectorStars.length];
                
                ctx.beginPath();
                ctx.moveTo(star1.x, star1.y);
                ctx.lineTo(star2.x, star2.y);
                ctx.stroke();
            }
            
            ctx.setLineDash([]);
            
            // Draw sector stars
            this.sectorStars.forEach(star => {
                const pulse = Math.sin(animationTime * 0.03 + star.pulsePhase) * 0.3 + 0.7;
                const orbitX = Math.cos(animationTime * star.orbitSpeed) * star.orbitRadius;
                const orbitY = Math.sin(animationTime * star.orbitSpeed) * star.orbitRadius;
                
                // Draw orbit ring
                ctx.strokeStyle = `${star.color.replace('1', '0.3')}`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.orbitRadius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw orbiting particle
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x + orbitX, star.y + orbitY, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw main star
                const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * pulse);
                gradient.addColorStop(0, star.color);
                gradient.addColorStop(0.5, star.color.replace('1', '0.8'));
                gradient.addColorStop(1, star.color.replace('1', '0.2'));
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * pulse, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw star glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = star.color;
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 0.5 * pulse, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                // Draw sector label
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '12px Orbitron';
                ctx.textAlign = 'center';
                ctx.fillText(star.sector.toUpperCase(), star.x, star.y + star.radius + 20);
            });
            
            ctx.restore();
            
            animationTime += 1;
            requestAnimationFrame(render);
        };
        
        render();
    }

    warpToSectorFromStarMap(sector) {
        this.addTerminalOutput(`> WARPING TO ${sector.toUpperCase()} SECTOR...`, 'warning');
        
        // Close star map
        document.getElementById('starMapNav').classList.remove('active');
        
        // Navigate to sector
        setTimeout(() => {
            this.showSectorsPage();
            const card = document.querySelector(`[data-sector="${sector}"]`);
            if (card) {
                setTimeout(() => card.click(), 500);
            }
        }, 1000);
    }

    // Neural Network Background System
    initNeuralNetwork() {
        const canvas = document.getElementById('neuralNetworkCanvas');
        if (!canvas) return;
        
        this.neuralCtx = canvas.getContext('2d');
        this.neuralNodes = [];
        this.neuralConnections = [];
        
        // Resize canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create neural nodes
        this.createNeuralNodes();
        
        // Create connections between nodes
        this.createNeuralConnections();
        
        // Start animation
        this.animateNeuralNetwork();
        
        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createNeuralNodes() {
        const nodeCount = 50;
        
        for (let i = 0; i < nodeCount; i++) {
            this.neuralNodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 2 + Math.random() * 3,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
                color: this.getNeuralColor(),
                connections: []
            });
        }
    }

    createNeuralConnections() {
        // Connect nearby nodes
        for (let i = 0; i < this.neuralNodes.length; i++) {
            const node1 = this.neuralNodes[i];
            
            for (let j = i + 1; j < this.neuralNodes.length; j++) {
                const node2 = this.neuralNodes[j];
                const distance = Math.sqrt(
                    Math.pow(node1.x - node2.x, 2) + 
                    Math.pow(node1.y - node2.y, 2)
                );
                
                // Connect nodes that are close enough
                if (distance < 200 && Math.random() > 0.7) {
                    node1.connections.push(j);
                    node2.connections.push(i);
                    
                    this.neuralConnections.push({
                        from: i,
                        to: j,
                        strength: Math.random() * 0.5 + 0.5,
                        pulsePhase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.01 + Math.random() * 0.02
                    });
                }
            }
        }
    }

    getNeuralColor() {
        const colors = [
            'rgba(0, 255, 255, 0.8)',  // Cyan
            'rgba(255, 0, 255, 0.8)',  // Magenta
            'rgba(138, 43, 226, 0.8)', // Purple
            'rgba(0, 255, 0, 0.8)',    // Green
            'rgba(255, 255, 0, 0.8)'   // Yellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateNeuralNetwork() {
        const canvas = document.getElementById('neuralNetworkCanvas');
        if (!canvas) return;
        
        const ctx = this.neuralCtx;
        let animationTime = 0;
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update node positions
            this.neuralNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                
                // Keep nodes in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });
            
            // Draw connections
            this.neuralConnections.forEach(connection => {
                const node1 = this.neuralNodes[connection.from];
                const node2 = this.neuralNodes[connection.to];
                
                if (node1 && node2) {
                    const pulse = Math.sin(animationTime * connection.pulseSpeed + connection.pulsePhase) * 0.5 + 0.5;
                    
                    // Create gradient for connection
                    const gradient = ctx.createLinearGradient(
                        node1.x, node1.y, node2.x, node2.y
                    );
                    gradient.addColorStop(0, node1.color.replace('0.8', String(connection.strength * pulse * 0.6)));
                    gradient.addColorStop(0.5, node1.color.replace('0.8', String(connection.strength * pulse)));
                    gradient.addColorStop(1, node2.color.replace('0.8', String(connection.strength * pulse * 0.6)));
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.stroke();
                    
                    // Draw data pulse traveling along connection
                    const t = (animationTime * 0.01) % 1;
                    const pulseX = node1.x + (node2.x - node1.x) * t;
                    const pulseY = node1.y + (node2.y - node1.y) * t;
                    
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            // Draw nodes
            this.neuralNodes.forEach(node => {
                const pulse = Math.sin(animationTime * node.pulseSpeed + node.pulsePhase) * 0.3 + 0.7;
                
                // Node glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = node.color;
                
                // Outer glow
                ctx.fillStyle = node.color.replace('0.8', String(0.3 * pulse));
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Inner node
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
                ctx.fill();
                
                // Core
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 0.3 * pulse, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 0;
            });
            
            animationTime += 1;
            requestAnimationFrame(render);
        };
        
        render();
    }

    // Time Portal Question Reveal Effect
    createTimePortalEffect(cardElement) {
        const rect = cardElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create time portal container
        const portal = document.createElement('div');
        portal.className = 'time-portal';
        portal.style.cssText = `
            position: fixed;
            top: ${centerY}px;
            left: ${centerX}px;
            width: 200px;
            height: 200px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Create multiple portal rings
        for (let i = 0; i < 5; i++) {
            const ring = document.createElement('div');
            ring.className = 'portal-ring';
            ring.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${100 + i * 30}px;
                height: ${100 + i * 30}px;
                border: 2px solid rgba(138, 43, 226, ${0.8 - i * 0.15});
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: portalRingExpand ${1.5 + i * 0.2}s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            portal.appendChild(ring);
        }
        
        // Create swirling particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'portal-particle';
            
            const angle = (i * 18) * Math.PI / 180;
            const radius = 80 + Math.random() * 40;
            const duration = 1 + Math.random() * 1;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(138, 43, 226, 1), rgba(0, 255, 255, 0.8));
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform-origin: center;
                animation: portalParticleOrbit ${duration}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particle.style.setProperty('--orbit-radius', `${radius}px`);
            particle.style.setProperty('--start-angle', `${angle}rad`);
            
            portal.appendChild(particle);
        }
        
        // Create energy vortex
        const vortex = document.createElement('div');
        vortex.className = 'portal-vortex';
        vortex.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            background: conic-gradient(from 0deg, 
                rgba(138, 43, 226, 0.8), 
                rgba(0, 255, 255, 0.6), 
                rgba(255, 0, 255, 0.8), 
                rgba(138, 43, 226, 0.8));
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: portalVortexSpin 2s linear infinite;
            filter: blur(2px);
        `;
        
        portal.appendChild(vortex);
        
        // Create temporal distortion effect
        const distortion = document.createElement('div');
        distortion.className = 'portal-distortion';
        distortion.style.cssText = `
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            background: radial-gradient(circle, 
                transparent 30%, 
                rgba(138, 43, 226, 0.1) 50%, 
                transparent 70%);
            animation: portalDistortionPulse 1s ease-in-out infinite;
        `;
        
        portal.appendChild(distortion);
        
        document.body.appendChild(portal);
        
        // Play portal sound
        this.playPortalSound();
        
        // Remove portal after animation
        setTimeout(() => {
            portal.style.animation = 'portalCollapse 0.8s ease-out forwards';
            setTimeout(() => portal.remove(), 800);
        }, 2000);
    }

    playPortalSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Create whoosh sound with frequency sweep
        oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    // End Table Topic Session Function - Navigate to Sign Off Page
    endTableTopicSession() {
        // Hide all pages
        document.getElementById('sectorsPage').classList.remove('active');
        document.getElementById('questionsPage').classList.remove('active');
        
        // Show sign off page
        document.getElementById('signOffPage').classList.add('active');
        
        // Create massive visual effects
        this.createSignOffEffects();
        
        // Auto-return after 8 seconds
        setTimeout(() => {
            this.returnToSectors();
        }, 8000);
    }
    
    createSignOffEffects() {
        // Create multiple energy waves
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createSingleEnergyWave();
            }, i * 300);
        }
        
        // Create massive particle explosion
        this.createSignOffExplosion();
        
        // Create floating particles
        this.createFloatingParticles();
        
        // Create additional effects
        this.createAdditionalEffects();
    }
    
    createAdditionalEffects() {
        // Create lightning bolts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createLightningBolt();
            }, i * 600);
        }
        
        // Create spiral particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createSpiralParticle();
            }, i * 200);
        }
    }
    
    createLightningBolt() {
        const bolt = document.createElement('div');
        bolt.style.position = 'fixed';
        bolt.style.width = '2px';
        bolt.style.height = Math.random() * 200 + 100 + 'px';
        bolt.style.background = 'linear-gradient(to bottom, transparent, #ff00ff, #00ffff)';
        bolt.style.left = Math.random() * window.innerWidth + 'px';
        bolt.style.top = '0px';
        bolt.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        bolt.style.opacity = '0';
        bolt.style.transition = 'opacity 0.3s ease-in-out';
        bolt.style.zIndex = '9997';
        bolt.style.boxShadow = '0 0 20px #ff00ff';
        
        document.body.appendChild(bolt);
        
        // Flash effect
        setTimeout(() => {
            bolt.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            bolt.style.opacity = '0';
        }, 300);
        
        setTimeout(() => bolt.remove(), 600);
    }
    
    createSpiralParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = this.getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9996';
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 100 + Math.random() * 200;
        
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        let angle = 0;
        let progress = 0;
        
        const animate = () => {
            progress += 0.01;
            angle += 0.05;
            
            const x = centerX + Math.cos(angle) * radius * (1 - progress);
            const y = centerY + Math.sin(angle) * radius * (1 - progress);
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 + progress}) rotate(${angle * 180 / Math.PI}deg)`;
            particle.style.boxShadow = `0 0 ${10 + progress * 20}px ${particle.style.background}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    returnToSectors() {
        // Hide sign off page
        document.getElementById('signOffPage').classList.remove('active');
        
        // Show sectors page
        document.getElementById('sectorsPage').classList.add('active');
        
        // Clean up all effects
        this.cleanupSignOffEffects();
    }
    
    cleanupSignOffEffects() {
        // Remove all particles and effects
        document.querySelectorAll('.sign-off-particle').forEach(p => p.remove());
        document.querySelectorAll('.energy-wave').forEach(w => w.remove());
        document.querySelectorAll('.lightning-bolt').forEach(l => l.remove());
        document.querySelectorAll('.spiral-particle').forEach(s => s.remove());
    }

    createSuperheroTransition() {
        // Create superhero burst effect with performance optimization
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Create energy wave first (most impactful)
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 3px solid rgba(255, 0, 255, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 9997;
            transition: all 1s ease-out;
        `;
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.style.width = '600px';
            wave.style.height = '600px';
            wave.style.opacity = '0';
        }, 100);
        
        setTimeout(() => wave.remove(), 1100);
        
        // Create fewer particles for better performance
        const particleCount = Math.min(25, window.innerWidth < 768 ? 15 : 25);
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 150 + Math.random() * 200;
                const color = this.getRandomColor();
                
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    z-index: 9999;
                    box-shadow: 0 0 15px ${color};
                    will-change: transform, opacity;
                `;
                
                document.body.appendChild(particle);
                
                let progress = 0;
                const animate = () => {
                    progress += 0.03;
                    const x = centerX + Math.cos(angle) * velocity * progress;
                    const y = centerY + Math.sin(angle) * velocity * progress;
                    const opacity = Math.max(0, 1 - progress);
                    const scale = 1 + progress * 1.5;
                    
                    particle.style.transform = `translate(${x - centerX}px, ${y - centerY}px) scale(${scale})`;
                    particle.style.opacity = opacity;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                requestAnimationFrame(animate);
            }, i * 30);
        }
        
        // Create lightning effect (reduced for performance)
        const lightningCount = Math.min(5, window.innerWidth < 768 ? 3 : 5);
        
        for (let i = 0; i < lightningCount; i++) {
            setTimeout(() => {
                const lightning = document.createElement('div');
                const height = Math.random() * 80 + 40;
                const left = Math.random() * window.innerWidth;
                const rotation = Math.random() * 60 - 30;
                
                lightning.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: ${height}px;
                    background: linear-gradient(to bottom, transparent, #00ffff, #ff00ff);
                    left: ${left}px;
                    top: 0px;
                    transform: rotate(${rotation}deg);
                    opacity: 0;
                    transition: opacity 0.2s ease-in-out;
                    z-index: 9998;
                    box-shadow: 0 0 20px #00ffff;
                    will-change: opacity;
                `;
                
                document.body.appendChild(lightning);
                
                // Flash effect
                requestAnimationFrame(() => {
                    lightning.style.opacity = '1';
                });
                
                setTimeout(() => {
                    lightning.style.opacity = '0';
                }, 150);
                
                setTimeout(() => lightning.remove(), 350);
            }, i * 150);
        }
    }

    // Sound Effects (using Web Audio API)
    initSoundEffects() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playHoverSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playSelectSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
}

// Add ripple effect animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new TableTopicsApp();
    
    // Make function globally accessible for HTML onclick
    window.endTableTopicSession = () => {
        app.endTableTopicSession();
    };
    
    // Also make other functions globally accessible
    window.showSectorsPage = () => {
        app.showSectorsPage();
    };
    
    // Add welcome page navigation
    window.goToMainPage = () => {
        // Hide welcome page
        document.getElementById('welcomePage').classList.remove('active');
        // Show main page
        document.getElementById('mainPage').classList.add('active');
        
        // Create superhero animation effect
        app.createSuperheroTransition();
    };
    
    // Add back to welcome function
    window.backToWelcome = () => {
        // Hide main page
        document.getElementById('mainPage').classList.remove('active');
        // Show welcome page
        document.getElementById('welcomePage').classList.add('active');
    };
    
    // Star Map Controls
    window.toggleStarMap = () => {
        const starMap = document.getElementById('starMapNav');
        starMap.classList.toggle('active');
    };
    
    window.zoomIn = () => {
        if (app.starMapZoom < 3) {
            app.starMapZoom *= 1.2;
        }
    };
    
    window.zoomOut = () => {
        if (app.starMapZoom > 0.5) {
            app.starMapZoom /= 1.2;
        }
    };
    
    window.resetZoom = () => {
        app.starMapZoom = 1;
        app.starMapOffset = { x: 0, y: 0 };
    };
});
