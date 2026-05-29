// SCROLL TO ABOUT SECTION
function scrollToSection() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}

// TYPING ANIMATION
var typed = new Typed("#typing", {
    strings: [
        "Web Developer",
        "AI Enthusiast",
        "Frontend Designer",
        "Student"
    ],
    typeSpeed: 70,
    backSpeed: 40,
    loop: true
});

// AOS ANIMATIONS
AOS.init({
    duration: 1000,
    once: false
});

// DARK MODE / LIGHT MODE
function toggleMode() {
    document.body.classList.toggle("light-mode");
    const modeBtn = document.querySelector(".mode-btn");
    if (document.body.classList.contains("light-mode")) {
        modeBtn.textContent = "☀️";
    } else {
        modeBtn.textContent = "🌙";
    }
}

// PARTICLES BACKGROUND
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 50
        },
        "color": {
            "value": "#38bdf8"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5
        },
        "size": {
            "value": 3
        },
        "line_linked": {
            "enable": true,
            "distance": 110,
            "color": "#38bdf8",
            "opacity": 0.45,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 180,
                "line_linked": {
                    "opacity": 0.7
                }
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
});

// CUSTOM CURSOR & AMBIENT GLOW
const cursorDot = document.querySelector(".custom-cursor-dot");
const cursorRing = document.querySelector(".custom-cursor-ring");
const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Ambient cursor glow position
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";
    
    // Dot instantly follows
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
});

// Ring follows with damping (inertia lag)
function updateCursorRing() {
    const delay = 6; // Inertia division factor
    
    ringX += (mouseX - ringX) / delay;
    ringY += (mouseY - ringY) / delay;
    
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    
    requestAnimationFrame(updateCursorRing);
}
updateCursorRing();

// Ring scale-up hover trigger
const hoverables = document.querySelectorAll("a, button, input, textarea, .overlay-project-card, .stat-card, .skill-card, .service-card, .timeline-box");
hoverables.forEach(item => {
    item.addEventListener("mouseenter", () => {
        cursorRing.classList.add("active");
    });
    item.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("active");
    });
});

// SCROLL PROGRESS BAR & NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
    // Progress Bar Width
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
    
    // Navbar glass tint addition
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-scrolled", window.scrollY > 50);
});

// ACTIVE SECTION HIGHLIGHTING IN NAVBAR
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // triggers when section dominates the viewport
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${activeId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// MOBILE MENU TOGGLE
function toggleMobileMenu() {
    const navLinksList = document.querySelector(".nav-links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    navLinksList.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const navLinksList = document.querySelector(".nav-links");
        const hamburgerBtn = document.querySelector(".hamburger-btn");
        navLinksList.classList.remove("active");
        hamburgerBtn.classList.remove("active");
    });
});

// STATS COUNTERS ANIMATION ON SCROLL
const statsSection = document.querySelector(".about-info-card");
const counters = document.querySelectorAll(".counter-number");
let countersStarted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const speed = 200; // time duration factor
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            startCounters();
            countersStarted = true;
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// SKILLS PROGRESS BARS FILL ON SCROLL
const skillsSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skill-progress-bar");
let skillsAnimated = false;

const animateSkills = () => {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = progress + "%";
    });
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });
}, { threshold: 0.1 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// TESTIMONIALS CAROUSEL
const testimonials = document.querySelectorAll(".testimonial-card");
const dotsContainer = document.getElementById("carousel-dots");
let currentTestimonialIndex = 0;
let testimonialInterval;

// Generate carousel dots dynamically
testimonials.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showTestimonial(idx));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dots .dot");

function showTestimonial(index) {
    clearInterval(testimonialInterval); // Reset auto-timer on click
    
    testimonials.forEach((card, idx) => {
        card.classList.remove("active", "prev");
        dots[idx].classList.remove("active");
        
        if (idx === index) {
            card.classList.add("active");
            dots[idx].classList.add("active");
        } else if (idx === (index - 1 + testimonials.length) % testimonials.length) {
            card.classList.add("prev");
        }
    });
    
    currentTestimonialIndex = index;
    startAutoSlide();
}

function moveTestimonial(direction) {
    let targetIdx = (currentTestimonialIndex + direction + testimonials.length) % testimonials.length;
    showTestimonial(targetIdx);
}

function startAutoSlide() {
    testimonialInterval = setInterval(() => {
        let targetIdx = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(targetIdx);
    }, 6000); // cycle every 6 seconds
}
startAutoSlide();

// INITIALIZE VANILLA TILT
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02
    });
}

// PROJECTS DETAILS MODAL LOGIC
const projectData = {
    foodapp: {
        title: "Food Delivery App (QuickBite)",
        image: "images/quickbite.png",
        desc: "QuickBite is an ultra-modern, high-fidelity fast food delivery web application built with clean semantic markup and custom CSS layouts. It features an interactive food catalog, categorized listings, instant cart processing, checkout sliders, and custom animation hooks that streamline food logistics interface.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        live: "https://quickbite-143137062800.asia-southeast1.run.app",
        github: "https://github.com"
    },
    spiceempire: {
        title: "SpiceEmpire Restaurant Portal",
        image: "images/spiceempire.png",
        desc: "SpiceEmpire is an immersive restaurant portal and culinary discovery website. Built to highlight rich Indian cuisine, it integrates state-of-the-art interactive layouts, virtual menus, review slider animations, and Google AI Studio assistants to elevate restaurant booking interfaces into premium visual spaces.",
        tags: ["HTML5", "CSS3", "JavaScript", "Google AI Studio", "Vanilla Tilt"],
        live: "https://spiceempire-143137062800.asia-southeast1.run.app",
        github: "https://github.com"
    }
};

const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTagsContainer = document.getElementById("modal-tags");
const modalLiveLink = document.getElementById("modal-live-link");
const modalGithubLink = document.getElementById("modal-github-link");

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    
    modalImg.src = data.image;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    // Load tags
    modalTagsContainer.innerHTML = "";
    data.tags.forEach(tag => {
        const tagSpan = document.createElement("span");
        tagSpan.classList.add("modal-tag");
        tagSpan.textContent = tag;
        modalTagsContainer.appendChild(tagSpan);
    });
    
    modalLiveLink.href = data.live;
    modalGithubLink.href = data.github;
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // disable scroll
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
}

// Close modal when clicking outside the card
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// HIDE LOADER ON PAGE LOAD
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("fade-out");
});

// CONTACT FORM SUBMISSION WITH AJAX (FormSubmit)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const btn = contactForm.querySelector(".send-message-btn");
        const btnText = btn.querySelector(".btn-text");
        const btnIcon = btn.querySelector("i");
        
        // Disable form and show loader state
        btn.disabled = true;
        const originalText = btnText.textContent;
        btnText.textContent = "Sending...";
        btnIcon.className = "fa-solid fa-spinner fa-spin";
        
        const formData = new FormData(contactForm);
        
        // Formspree API endpoint
        // Please replace "YOUR_FORMSPREE_ID" with your actual Formspree form ID
        fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
            method: "POST",
            headers: { 
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showToast("Message sent successfully! I'll get back to you soon.", "success");
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        showToast(data["errors"].map(error => error["message"]).join(", "), "error");
                    } else {
                        showToast("Oops! Something went wrong. Please try again.", "error");
                    }
                })
            }
        })
        .catch(error => {
            showToast("Oops! Connection error. Please try again.", "error");
        })
        .finally(() => {
            // Restore button state
            btn.disabled = false;
            btnText.textContent = originalText;
            btnIcon.className = "fa-solid fa-paper-plane";
        });
    });
}

// TOAST NOTIFICATION FUNCTION
function showToast(message, type) {
    // Remove existing toast if present
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    
    const icon = document.createElement("i");
    if (type === "success") {
        icon.className = "fa-solid fa-circle-check toast-icon";
        toast.style.borderColor = "var(--primary)";
        toast.style.boxShadow = "0 10px 30px rgba(56, 189, 248, 0.25)";
    } else {
        icon.className = "fa-solid fa-circle-xmark toast-icon";
        icon.style.color = "#ef4444";
        toast.style.borderColor = "#ef4444";
        toast.style.boxShadow = "0 10px 30px rgba(239, 68, 68, 0.25)";
    }
    
    const text = document.createElement("span");
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    
    // Trigger animation slide-in
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}