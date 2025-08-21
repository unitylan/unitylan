
// Contact Form Validation
document.addEventListener("DOMContentLoaded", function() {
  const ctaForms = document.querySelectorAll(".cta-form");

  ctaForms.forEach(form => {
    const fields = form.querySelectorAll("input, textarea");

    // Create a message container
    let messageBox = document.createElement("div");
    messageBox.className = "text-center mt-4 text-sm";
    form.appendChild(messageBox);

    // Make all fields required
    fields.forEach(field => field.setAttribute("required", "true"));

    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Stop redirect
      let valid = true;

      fields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("border-red-500");
        } else {
          field.classList.remove("border-red-500");
        }
      });

      if (!valid) {
        messageBox.textContent = "Please fill out all fields.";
        messageBox.classList.add("text-red-500");
        return;
      }

      // Prepare form data
      const formData = new FormData(form);

      // Send via AJAX
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok || data.success) {
          messageBox.textContent = "Thank you! Your message has been sent.";
          messageBox.classList.remove("text-red-500");
          messageBox.classList.add("text-green-600");

          // Clear the form
          form.reset();

          // Fire FB Pixel after successful submit
          const eventName = form.dataset.fbevent || "Lead";
          if (typeof fbq === "function") fbq("track", eventName);
        } else {
          messageBox.textContent = "Oops! There was a problem. Please try again.";
          messageBox.classList.add("text-red-500");
        }
      })
      .catch(() => {
        messageBox.textContent = "Oops! Something went wrong. Please try again later.";
        messageBox.classList.add("text-red-500");
      });
    });
  });
});

//portfolio tab filter
function filterPortfolio(category) {
    let projects = document.querySelectorAll(".portfolio-item");
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.classList.remove("hidden");
        } else {
            project.classList.add("hidden");
        }
    });
    
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("bg-blue-600", "text-white", "scale-105"));
    document.getElementById(category + "-btn").classList.add("bg-blue-600", "text-white", "scale-105");
}

// Project data stored in JS
const projects = {
    hrConsulting: {
        title: "Fatsolelo HR Consulting – HR & Career Services",
        overview: "Fatsolelo HR Consulting is a clean, professional website built to give the business a strong online presence. The site showcases core services and makes it easy for clients to book appointments & showcase new career listings — ideal for busy professionals who need a simple, effective way to connect with their audience.",
        techStack: ["HTML & Tailwind CSS – for responsive, modern UI", "JavaScript – for interactivity", "Google Sheets – to allow easy content updates without touching code", "Social Media Integrations – allowing visitors to easily connect with the brand across social platforms"],
        keyFeatures: ["Service showcase with clear layout", "Easy appointment booking form", "Responsive design for mobile & desktop", "Enabling the client to update content directly without needing technical help", "Making it easy for users to connect with the business across platforms like Facebook, LinkedIn, and Twitter"],
        challenges: "One of the challenges was integrating a user-friendly booking form with real-time validation. We focused on ensuring that the form was easy to complete, mobile-friendly, and error-free. Plus, We learned a lot about making the site responsive across various devices to ensure a seamless experience for all users.",
        screenshots: [
            { src: "images/hr.webp", alt: "Fatsolelo Screenshot" }
        ],
        links: [
            { url: "https://fatsolelo.co.za", text: "View Live Demo" },
        ],
        //improvements: "Next, I'd add an automated email confirmation for bookings and improve accessibility features."
    }
};

// Open modal and populate content
function openPopup(projectId) {
    const project = projects[projectId];
    if (!project) return;

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">${project.title}</h2>
        <p class="text-gray-700 mb-4">${project.overview}</p>

        <h3 class="font-semibold text-xl mt-4">Behind the Scenes</h3>
        <ul class="list-disc list-inside text-left text-gray-700 mb-4">
            ${project.techStack.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h3 class="font-semibold text-xl mt-4">Key Features</h3>
        <ul class="list-disc list-inside text-gray-700 text-left mb-4">
            ${project.keyFeatures.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h3 class="font-semibold text-xl mt-4">Development Process / Challenges</h3>
        <p class="text-gray-700 text-left mb-4">${project.challenges}</p>

        <h3 class="font-semibold mt-4">Screenshots / Demo</h3>
        ${project.screenshots.map(img => `<img src="${img.src}" alt="${img.alt}" class="w-full h-auto rounded-lg mb-4">`).join("")}
        <p>
            ${project.links.map(link => `<a href="${link.url}" class="text-blue-600 hover:underline inline-flex items-center mr-4" target="_blank">
            ${link.text} 
            <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>`).join("")}
        </p>
        <button class="mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" onclick="closePopup()">Close</button>

    `;

    const modal = document.getElementById("projectModal");
    modal.classList.remove("hidden");

    // Close when clicking outside the modal content
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closePopup();
        }
    });
}

function closePopup() {
    document.getElementById("projectModal").classList.add("hidden");
}
// FAQ data for Web Development
const webDevFAQs = [
    { question: "How long does a project take?", answer: "Project timelines vary depending on complexity. A basic website may take 4–6 weeks, while larger, custom projects can take 8–12 weeks. We provide detailed timelines before starting." },
    { question: "Do you offer website redesign services?", answer: "Yes! If you already have a website but need improvements in design, speed, or SEO, we can revamp it while ensuring a seamless transition." },
    { question: "Do you provide ongoing maintenance?", answer: "Yes! We offer website maintenance plans to keep your site updated, secure, and running smoothly." },
    { question: "Can I request changes during the project?", answer: "Yes! We offer two major revision rounds during the design phase and another before launch. Additional changes outside the scope may require extra time and cost." },
    { question: "How do you handle content for the website?", answer: "You can provide the content, or we can assist with copywriting, images, and SEO-friendly content as an add-on service." },
    { question: "What happens after the website is launched?", answer: "We offer training on how to manage the site and optional maintenance plans for security updates, backups, and future improvements." },
];

// FAQ data for E-Commerce
const ecomFAQs = [
    { question: "How long does a project take?", answer: "Project timelines vary depending on complexity. A basic website may take 4–6 weeks, while larger, custom projects can take 8–12 weeks. We provide detailed timelines before starting." },
    { question: "What e-commerce platforms do you work with?", answer: "We work with Shopify, WordPress, and custom-built e-commerce solutions to provide the best platform for your business." },
    { question: "What payment gateways do you support?", answer: "We integrate popular payment gateways, including PayFast, Peach Payments, Ozow, Yoco, and more, based on your business needs." },
    { question: "Can you build a custom online store?", answer: "Yes! If you need a unique e-commerce experience, we build custom online stores with advanced features, tailored product pages, and personalized customer journeys." },
    { question: "What is included in an e-commerce project?", answer: "View our e-commerce page for more info." },
    { question: "Do you integrate third-party tools like email marketing and analytics?", answer: "Yes, we can integrate Facebook Pixel/MailChimp to help with marketing and sales tracking." },
    { question: "Can I manage my store easily after launch?", answer: "Absolutely! We provide an admin panel where you can update products, track orders, and manage customers without coding knowledge." },
];

// Function to dynamically render FAQs
function renderFAQs(faqs, containerId, prefix) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    faqs.forEach((faq, index) => {
        const faqId = `${prefix}-faq-answer-${index}`; // Unique ID

        const faqItem = document.createElement('div');
        faqItem.classList.add('mb-4', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md');

        // Create the FAQ question header
        const faqHeader = document.createElement('h3');
        faqHeader.classList.add('font-semibold', 'flex', 'justify-between', 'items-center', 'cursor-pointer');
        faqHeader.setAttribute("aria-expanded", "false"); // Accessibility attribute

        // Create the "+" icon
        const icon = document.createElement('span');
        icon.classList.add('text-blue-600', 'text-2xl');
        icon.innerHTML = "+"; // Default icon

        faqHeader.innerHTML = faq.question;
        faqHeader.appendChild(icon);
        faqHeader.onclick = () => toggleFAQ(faqId, icon);

        // Create the FAQ answer
        const faqAnswer = document.createElement('p');
        faqAnswer.id = faqId;
        faqAnswer.classList.add('text-gray-600', 'mt-2', 'hidden'); // Start hidden

        faqAnswer.innerText = faq.answer;

        // Append question and answer to the FAQ item
        faqItem.appendChild(faqHeader);
        faqItem.appendChild(faqAnswer);

        // Append the FAQ item to the container
        container.appendChild(faqItem);
    });
}

// Toggle the visibility of the FAQ answer and update the icon
function toggleFAQ(faqId, iconElement) {
    const faqElement = document.getElementById(faqId);
    const isHidden = faqElement.classList.toggle('hidden'); // Toggle visibility

    // Update icon and accessibility attribute
    iconElement.innerHTML = isHidden ? "+" : "−";
    iconElement.parentElement.setAttribute("aria-expanded", !isHidden);
}

// Function to show selected FAQ content and highlight active button
function showFAQContent(contentType, clickedButton) {
    // Hide all FAQ sections first
    document.querySelectorAll('.faq-content').forEach(content => content.classList.add('hidden'));

    // Show the selected FAQ content
    document.getElementById(contentType).classList.remove('hidden');

    // Remove active class from all buttons
    document.querySelectorAll('.faq-btn').forEach(button => {
        button.classList.remove('bg-blue-500', 'text-white');
        button.classList.add('text-gray-800'); // Reset to default color
    });

    // Highlight the clicked button
    clickedButton.classList.add('bg-blue-500', 'text-white'); // Active button style

    // Render FAQ content dynamically
    if (contentType === 'web-dev') {
        renderFAQs(webDevFAQs, 'web-dev-faqs', 'web-dev');
    } else if (contentType === 'ecom') {
        renderFAQs(ecomFAQs, 'ecom-faqs', 'ecom');
    }
}

// Ensure the DOM is loaded before initializing the FAQ section
document.addEventListener("DOMContentLoaded", () => {
    // Set initial state without transitions
    const webDevBtn = document.getElementById('web-dev-btn');
    const mobileWebDevBtn = document.getElementById('mobile-web-dev-btn');
    
    // Set initial active state
    webDevBtn.classList.add('bg-blue-500', 'text-white');
    mobileWebDevBtn.classList.add('bg-blue-500', 'text-white');
    
    // Hide all FAQ sections first
    document.querySelectorAll('.faq-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show the default FAQ content
    document.getElementById('web-dev').classList.remove('hidden');
    document.getElementById('mobile-web-dev-btn').classList.remove('hidden');
    
    // Render the initial FAQ content
    renderFAQs(webDevFAQs, 'web-dev-faqs', 'web-dev');
    
    // Now add event listeners
    document.getElementById('web-dev-btn').addEventListener('click', function() {
        showFAQContent('web-dev', this);
    });

    document.getElementById('ecom-btn').addEventListener('click', function() {
        showFAQContent('ecom', this);
    });
    
    // Mobile buttons
    document.getElementById('mobile-web-dev-btn').addEventListener('click', function() {
        showFAQContent('web-dev', this);
    });

    document.getElementById('mobile-ecom-btn').addEventListener('click', function() {
        showFAQContent('ecom', this);
    });
});

//service tab section
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".tab-button");
    const defaultTab = document.getElementById("services-btn");
    if (defaultTab) {
        activateTab(defaultTab);
        showTab("services");
    }
    
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            buttons.forEach(btn => deactivateTab(btn));
            activateTab(event.currentTarget);
            showTab(event.currentTarget.getAttribute("onclick").match(/'([^']+)'/)[1]);
        });
    });

    function showTab(tabId) {
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
        const activeTab = document.getElementById(tabId);
        activeTab.classList.remove("hidden");

        // Reset scroll position of carousel
        const carousel = activeTab.querySelector(".overflow-x-auto");
        if (carousel) {
            carousel.scrollLeft = 0;
        }
    }

    function activateTab(button) {
        button.classList.add("bg-blue-500", "text-white", "scale-105", "shadow-lg", "transition-all", "duration-300", "ease-in-out");
        button.classList.remove("bg-blue-300", "text-gray-800");
    }

    function deactivateTab(button) {
        button.classList.remove("bg-blue-500", "text-white", "scale-105", "shadow-lg", "transition-all", "duration-300", "ease-in-out");
        button.classList.add("bg-blue-300", "text-gray-800");
    }

    // Carousel Functionality
    document.querySelectorAll(".tab-content").forEach(tab => {
        const carousel = tab.querySelector(".overflow-x-auto");
        if (!carousel) return;

        //const nextBtn = document.createElement("button");
        //nextBtn.innerHTML = "›";
        //nextBtn.classList.add("absolute", "right-2", "top-1/2", "transform", "-translate-y-1/2", "bg-gray-800", "text-white", "p-2", "rounded-full", "shadow-md", "cursor-pointer", "z-10");
        
        //const prevBtn = document.createElement("button");
       // prevBtn.innerHTML = "‹";
       // prevBtn.classList.add("absolute", "left-2", "top-1/2", "transform", "-translate-y-1/2", "bg-gray-800", "text-white", "p-2", "rounded-full", "shadow-md", "cursor-pointer", "z-10");

        //tab.appendChild(nextBtn);
        //tab.appendChild(prevBtn);

        nextBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: 300, behavior: "smooth" });
        });

        prevBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -300, behavior: "smooth" });
        });

        // Optional: Keyboard Navigation
        carousel.addEventListener("keydown", (event) => {
             if (event.key === "ArrowRight") {
                //carousel.scrollBy({ left: 300, behavior: "smooth" });
            } else if (event.key === "ArrowLeft") {
                //carousel.scrollBy({ left: -300, behavior: "smooth" });
           }
       });
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuClose = document.getElementById("mobile-menu-close");

    const transitionDuration = 300; // ms, should match Tailwind's duration-300

    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-full", "opacity-0", "pointer-events-none");
            mobileMenu.classList.add("translate-x-0", "opacity-100", "pointer-events-auto");
        });

        mobileMenuClose.addEventListener("click", () => {
            // Start closing transition
            mobileMenu.classList.remove("translate-x-0", "opacity-100", "pointer-events-auto");
            mobileMenu.classList.add("translate-x-full");

            // Wait for the slide transition to finish, then hide it completely
            setTimeout(() => {
                mobileMenu.classList.add("opacity-0", "pointer-events-none");
            }, transitionDuration);
        });
    }

    // Accordion functionality
    const servicesHeading = document.getElementById("services-heading");
    const servicesSubheadings = document.getElementById("services-subheadings");

    if (servicesHeading && servicesSubheadings) {
        const servicesIcon = servicesHeading.querySelector("svg");

        servicesHeading.addEventListener('click', () => {
            servicesSubheadings.classList.toggle('hidden');

            if (servicesIcon) {
                servicesIcon.style.transform = servicesSubheadings.classList.contains('hidden')
                    ? "rotate(0deg)"
                    : "rotate(180deg)";
            }
        });
    }
});

// Header scroll effect
window.addEventListener("scroll", function () {
    const header = document.getElementById("site-header");
    const links = header.querySelectorAll(".nav-link");
    
    if (window.scrollY > 50) {
        header.classList.add("bg-white", "shadow-md");
        header.classList.remove("bg-transparent");
        
        links.forEach(link => {
            link.classList.add("text-gray-900");
            link.classList.remove("text-white");
        });
    } else {
        header.classList.remove("bg-white", "shadow-md");
        header.classList.add("bg-transparent");
        
        links.forEach(link => {
            link.classList.remove("text-gray-900");
            link.classList.add("text-white");
        });
    }
});

// Services dropdown hover effect
const servicesMenu = document.querySelector(".group");
const servicesDropdown = servicesMenu.querySelector("ul");

servicesMenu.addEventListener("mouseenter", () => {
    servicesDropdown.classList.remove("hidden");
});

servicesMenu.addEventListener("mouseleave", () => {
    servicesDropdown.classList.add("hidden");
});

// Contact Form Validation & Reset
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        
        let isValid = true;
        const formData = new FormData(form);

        // Validate required fields
        const requiredFields = [
            form.querySelector("input[name='first_name']"),
            form.querySelector("input[name='last_name']"),
            form.querySelector("input[name='email']"),
            form.querySelector("select[name='service']")
        ];

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add("border-red-500");
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains("error-text")) {
                    const errorText = document.createElement("p");
                    errorText.textContent = "This field is required";
                    errorText.classList.add("error-text", "text-red-500", "text-sm", "mt-1");
                    field.parentNode.appendChild(errorText);
                }
            } else {
                field.classList.remove("border-red-500");
                if (field.nextElementSibling && field.nextElementSibling.classList.contains("error-text")) {
                    field.nextElementSibling.remove();
                }
            }
        });

        if (!isValid) return;

        // Submit form via fetch API
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                
                // Redirect to a clean URL
                window.location.href = window.location.pathname + "?submitted=true";
            } else {
                alert("Something went wrong. Please try again.");
            }
        })
        .catch(error => console.error("Error:", error));
    });

    // Handle the clean URL redirection
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("submitted")) {
        alert("Thank you! Your message has been received.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Fade-in effect on scroll
const elements = document.querySelectorAll('.fade-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
      } else {
        entry.target.classList.remove('opacity-100');
      }
    });
  }, { threshold: 0.5 });

  elements.forEach(element => observer.observe(element));

  // Lazy load background images
  document.addEventListener("DOMContentLoaded", () => {
    const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.getAttribute("data-bg");
          el.style.backgroundImage = `url(${bg})`;
          el.classList.add("bg-loaded");
          obs.unobserve(el);
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px"
    });

    lazyBackgrounds.forEach(el => observer.observe(el));
  });

AOS.init({
    duration: 800,
    offset: 100,
    once: true, // ensures animation happens only once per element
  });

  //infographic animation
  module.exports = {
    theme: {
      extend: {
        keyframes: {
          fadeInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-40px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInRight: {
            '0%': { opacity: '0', transform: 'translateX(40px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
        },
        animation: {
          'fade-in-left': 'fadeInLeft 0.8s ease-out both',
          'fade-in-right': 'fadeInRight 0.8s ease-out both',
        },
      },
    },
    plugins: [],
  }