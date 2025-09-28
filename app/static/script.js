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
        orderButton.addEventListener('click', function(e) {
            // Show alert that we're taking them to order form
            alert('🚀 TAKING YOU TO THE ORDER FORM! 🚀\n\nGet ready to transform your life!\n\nClick OK to continue to checkout!');
            // Let the default link behavior continue after alert
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

// Social sharing functions for thank you page
window.shareOnSocial = function(platform) {
    const messages = {
        facebook: "I just ordered the FOLLICLE FORCE 3000™! My baldness days are numbered! 🦁💇‍♂️",
        twitter: "Just ordered FOLLICLE FORCE 3000™! From chrome dome to magnificent mane in 30 days! #HairGoals #FollicleForce3000",
        instagram: "🚨 HAIR EMERGENCY SOLVED! 🚨 FOLLICLE FORCE 3000™ is coming to save my scalp! 💇‍♂️✨"
    };
    
    alert(`📱 Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}:\n\n"${messages[platform]}"\n\n📸 Don't forget to tag us @FollicleForce3000!`);
};

// Auto-hide flash messages after 5 seconds
const flashMessages = document.querySelectorAll('.flash');
flashMessages.forEach(flash => {
    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transform = 'translateX(100%)';
        setTimeout(() => {
            flash.remove();
        }, 500);
    }, 5000);
});

// Form validation for order page
const orderForm = document.querySelector('form[action*="/order"]');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        const requiredFields = ['first_name', 'last_name', 'email'];
        let hasError = false;
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                field.style.borderColor = '#dc3545';
                field.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.3)';
                hasError = true;
            } else if (field) {
                field.style.borderColor = '#4ecdc4';
                field.style.boxShadow = '0 0 10px rgba(78, 205, 196, 0.3)';
            }
        });
        
        if (hasError) {
            e.preventDefault();
            alert('🚨 HAIR EMERGENCY! 🚨\n\nPlease fill in all required fields to continue your hair transformation journey!');
        }
    });
}

// Hair countdown timer for thank you page
const hairCountdown = document.querySelector('.hair-countdown');
if (hairCountdown) {
    let hours = 72;
    setInterval(() => {
        hours -= Math.random() * 0.1; // Slowly decrease
        if (hours <= 0) hours = 72; // Reset when it reaches 0
        hairCountdown.textContent = `${Math.floor(hours)} hours`;
    }, 5000);
}

// Customer table row highlighting
const customerRows = document.querySelectorAll('.customer-row');
customerRows.forEach(row => {
    row.addEventListener('click', function() {
        // Remove previous highlights
        customerRows.forEach(r => r.classList.remove('highlighted'));
        // Add highlight to clicked row
        this.classList.add('highlighted');
        
        // Show customer details in an alert (for demo purposes)
        const name = this.querySelector('.customer-name').textContent;
        const email = this.children[1].textContent;
        alert(`👤 Customer Details:\n\nName: ${name}\nEmail: ${email}\n\n🎉 This customer is on their way to MAGNIFICENT HAIR! 🎉`);
    });
});

// Add CSS for highlighted customer row
const style = document.createElement('style');
style.textContent = `
    .customer-row.highlighted {
        background: rgba(255, 107, 107, 0.2) !important;
        transform: scale(1.02);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Animate stats on customers page
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    if (finalValue !== '∞') {
        const numValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        if (!isNaN(numValue)) {
            let currentValue = 0;
            const increment = Math.ceil(numValue / 50);
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numValue) {
                    currentValue = numValue;
                    clearInterval(timer);
                }
                stat.textContent = finalValue.replace(/[0-9]+/, currentValue.toString());
            }, 50);
        }
    }
});

// Add pulsing effect to order buttons
const orderButtons = document.querySelectorAll('.order-button, .order-submit-button');
orderButtons.forEach(button => {
    setInterval(() => {
        button.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
        setTimeout(() => {
            button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        }, 500);
    }, 2000);
});

// Form field animations
const formInputs = document.querySelectorAll('input, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add floating success emojis on thank you page
if (window.location.pathname.includes('thank-you')) {
    function createFloatingEmoji() {
        const emojis = ['🎉', '💇‍♂️', '💇‍♀️', '✨', '🦁', '🌟', '💫'];
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = '100vh';
        emoji.style.fontSize = '2em';
        emoji.style.zIndex = '1000';
        emoji.style.pointerEvents = 'none';
        emoji.style.transition = 'all 3s ease-out';
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.style.top = '-100px';
            emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
            emoji.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }
    
    // Create floating emojis every 2 seconds
    setInterval(createFloatingEmoji, 2000);
}
