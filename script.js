document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. ANIMATION ON SCROLL
    // --------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing after it's visible once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements that should be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // --------------------------------------------------
    // 2. ANIMATED NUMBER COUNTER
    // --------------------------------------------------
    const numbersSection = document.querySelector('.numbers');

    const animateNumbers = (entries, observer) => {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        const statNumbers = document.querySelectorAll('.stat__number');

        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 200; // Adjust for speed

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target > 1000000) {
                        counter.innerText = (current / 1000000).toFixed(1) + 'M';
                    } else if (target > 1000) {
                        counter.innerText = (current / 1000).toFixed(0) + 'K';
                    } else {
                        counter.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                     if (target > 1000000) {
                        counter.innerText = (target / 1000000).toFixed(0) + 'M';
                    } else if (target > 1000) {
                        counter.innerText = (target / 1000).toFixed(0) + 'K';
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            
            updateCounter();
        });

        // Stop observing the numbers section after animation
        observer.unobserve(numbersSection);
    };

    const numberObserver = new IntersectionObserver(animateNumbers, {
        threshold: 0.5
    });

    if (numbersSection) {
        numberObserver.observe(numbersSection);
    }
});
