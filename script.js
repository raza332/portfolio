// script.js
$(document).ready(function() {
    
    // --- Navbar Scroll Effect ---
    const $navbar = $('.navbar');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const $hamburger = $('.hamburger');
    const $navLinks = $('.nav-links');
    
    $hamburger.on('click', function() {
        $(this).toggleClass('active');
        $navLinks.toggleClass('active');
    });

    // Close mobile menu when a link is clicked
    $('.nav-links a').on('click', function() {
        $hamburger.removeClass('active');
        $navLinks.removeClass('active');
    });

    // --- Scroll Reveal Animations ---
    const revealElements = $('.reveal').get(); // Convert to array for IntersectionObserver

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                const $target = $(entry.target);
                $target.addClass('active');
                
                // If the target contains charts, animate them
                $target.find('.chart-fill').each(function() {
                    const width = $(this).attr('data-width');
                    $(this).css('width', width);
                });

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Theme Toggle Logic ---
    const $themeToggle = $('#theme-toggle');
    if ($themeToggle.length) {
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            $('body').addClass('dark-mode');
        }

        $themeToggle.on('click', function() {
            $('body').toggleClass('dark-mode');
            const isDarkMode = $('body').hasClass('dark-mode');
            
            // Save preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // --- Form Handling ---
    const $contactForm = $('#contact-form');
    if ($contactForm.length) {
        $contactForm.on('submit', function(e) {
            // Provide visual feedback after clicking send
            const $btn = $(this).find('button[type="submit"]');
            const originalText = $btn.text();
            $btn.text('Opening Mail Client...');
            
            setTimeout(function() {
                $btn.text(originalText);
            }, 3000);
        });
    }
});
