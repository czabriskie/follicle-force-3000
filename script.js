// Infomercial JavaScript for extra silliness

document.addEventListener('DOMContentLoaded', function() {
    
    // Countdown timer that randomly changes
    const countdown = document.querySelector('.countdown');
    if (countdown) {
        setInterval(() => {
            const randomNum = Math.floor(Math.random() * 50) + 20;
            countdown.textContent = randomNum;
        }, 2000);
    }

    // Add click sound effects to buttons
    const orderButton = document.querySelector('.order-button');
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            // Create a silly alert
            alert('🎉 CONGRATULATIONS! 🎉\n\nYour order has been placed!\n\nYour hair will start growing in 3... 2... 1...\n\n*Hair growth not actually guaranteed*');
        });

        // Add more dramatic effects on hover
        orderButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.textContent = 'YES! GIVE ME HAIR!';
        });

        orderButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.textContent = 'ORDER NOW!';
        });
    }

    // Make testimonials wobble when clicked
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'wobble 0.5s ease-in-out';
            }, 10);
        });
    });

    // Add floating hair emojis
    function createFloatingHair() {
        const hair = document.createElement('div');
        hair.textContent = '💇‍♂️';
        hair.style.position = 'fixed';
        hair.style.left = Math.random() * window.innerWidth + 'px';
        hair.style.top = '-50px';
        hair.style.fontSize = '2rem';
        hair.style.zIndex = '1000';
        hair.style.pointerEvents = 'none';
        hair.style.animation = 'fall 5s linear';
        
        document.body.appendChild(hair);
        
        setTimeout(() => {
            if (hair.parentNode) {
                hair.parentNode.removeChild(hair);
            }
        }, 5000);
    }

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Create floating hair every 3 seconds
    setInterval(createFloatingHair, 3000);

    // Add random hair facts popup
    const hairFacts = [
        "🧠 Did you know? Hair grows faster when you're excited about it!",
        "🌙 Fun fact: Hair grows 50% faster during a full moon!",
        "🦁 Scientists say lions are just humans who used Follicle Force 3000!",
        "⚡ Shocking truth: Bald eagles are actually just jealous!",
        "🚀 NASA uses our formula to grow hair on astronauts in space!",
        "🧬 Your DNA is 99% hair follicles (probably)!",
        "🎭 Shakespeare was bald until he discovered our secret formula!",
        "🌟 Fun fact: Stars are just really distant hair follicles!"
    ];

    function showRandomFact() {
        const fact = hairFacts[Math.floor(Math.random() * hairFacts.length)];
        const popup = document.createElement('div');
        popup.textContent = fact;
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 1001;
            max-width: 300px;
            animation: slideIn 0.5s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500);
        }, 4000);
    }

    // Add slide animations
    const additionalStyle = document.createElement('style');
    additionalStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(additionalStyle);

    // Show random facts every 10 seconds
    setInterval(showRandomFact, 10000);

    // Add dramatic music button (just for fun)
    const musicButton = document.createElement('button');
    musicButton.textContent = '🎵 DRAMATIC MUSIC';
    musicButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(45deg, #ff6b6b, #ffff00);
        border: 3px solid #ff0000;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1001;
        animation: pulse 2s infinite;
    `;
    
    musicButton.addEventListener('click', function() {
        alert('🎵 *DRAMATIC INFOMERCIAL MUSIC PLAYS* 🎵\n\n"In a world... where baldness reigns supreme...\nOne product... will change everything..."\n\n*Music intensifies*');
    });
    
    document.body.appendChild(musicButton);

    // Make the product box interactive
    const productBox = document.querySelector('.product-box');
    if (productBox) {
        productBox.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.textContent = '💫🎁💫';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.textContent = '📦✨';
                this.style.animation = 'float 3s infinite ease-in-out';
            }, 1000);
        });
    }

    // Add screaming text effect on scroll
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            const bannerText = document.querySelector('.flashing-text');
            if (bannerText && Math.random() > 0.8) {
                const originalText = bannerText.textContent;
                bannerText.textContent = '🚨 SCROLLING DETECTED! HAIR EMERGENCY! 🚨';
                setTimeout(() => {
                    bannerText.textContent = originalText;
                }, 2000);
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        }
    });

    console.log('🎉 Welcome to the most ridiculous hair growth website ever created! 🎉');
    console.log('💡 Pro tip: Click around for hidden surprises!');
});

// Easter egg: Konami code for ultimate hair power
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbowBackground 0.1s ease infinite';
        alert('🌈 ULTIMATE HAIR POWER ACTIVATED! 🌈\n\nYou have unlocked the secret to INFINITE HAIR GROWTH!\n\n*Side effects may include becoming too fabulous for society*');
        
        // Make everything extra sparkly
        const sparkleEffect = document.createElement('style');
        sparkleEffect.textContent = `
            * {
                animation: sparkle 0.5s infinite !important;
            }
        `;
        document.head.appendChild(sparkleEffect);
        
        setTimeout(() => {
            document.head.removeChild(sparkleEffect);
            document.body.style.animation = 'rainbowBackground 5s ease infinite';
        }, 5000);
        
        konamiCode = [];
    }
});
