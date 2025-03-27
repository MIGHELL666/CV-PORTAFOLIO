document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle")
  const mobileNav = document.querySelector(".mobile-nav")
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-nav-link")

  // Create overlay element
  const overlay = document.createElement("div")
  overlay.classList.add("overlay")
  document.body.appendChild(overlay)

  // Set initial active section
  let activeSection = "about"
  if (window.location.hash) {
    activeSection = window.location.hash.substring(1)
  }
  document.getElementById(activeSection).classList.add("active-section")
  document.querySelectorAll(`a[href="#${activeSection}"]`).forEach((link) => {
    link.classList.add("active")
  })

  // Toggle mobile menu
  mobileNavToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileNav.classList.toggle("active")
    overlay.classList.toggle("active")
    document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : ""
  })

  // Close mobile menu when clicking overlay
  overlay.addEventListener("click", () => {
    mobileNavToggle.classList.remove("active")
    mobileNav.classList.remove("active")
    overlay.classList.remove("active")
    document.body.style.overflow = ""

    // Also close modal if open
    const modal = document.getElementById("certificate-modal")
    if (modal.classList.contains("active")) {
      modal.classList.remove("active")
    }
  })

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the section id from the href
      const targetId = this.getAttribute("href").substring(1)

      // Remove active class from all sections and links
      sections.forEach((section) => section.classList.remove("active-section"))
      navLinks.forEach((link) => link.classList.remove("active"))

      // Add active class to target section and clicked link
      document.getElementById(targetId).classList.add("active-section")
      document.querySelectorAll(`a[href="#${targetId}"]`).forEach((link) => {
        link.classList.add("active")
      })

      // Close mobile menu if open
      mobileNavToggle.classList.remove("active")
      mobileNav.classList.remove("active")
      overlay.classList.remove("active")
      document.body.style.overflow = ""

      // Update URL hash
      window.location.hash = targetId

      // Scroll to top of the section
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  })

  // Check for hash in URL on page load
  if (window.location.hash) {
    const hash = window.location.hash

    // Remove active class from all sections and links
    sections.forEach((section) => section.classList.remove("active-section"))
    navLinks.forEach((link) => link.classList.remove("active"))

    // Add active class to target section and corresponding links
    document.querySelector(hash).classList.add("active-section")
    document.querySelectorAll(`a[href="${hash}"]`).forEach((link) => {
      link.classList.add("active")
    })
  }

  // Initialize skill progress bars
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent
    bar.style.setProperty("--progress-width", width)
  })

  // Initialize maintenance progress bars
  const maintenanceBars = document.querySelectorAll(".maintenance-card .progress")
  maintenanceBars.forEach((bar) => {
    bar.style.setProperty("--progress-width", "100%")
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  const successMessage = document.querySelector(".success-message")
  const submitBtn = contactForm.querySelector(".submit-btn")
  const submitText = contactForm.querySelector(".submit-text")
  const loadingSpinner = contactForm.querySelector(".loading-spinner")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      submitText.style.display = "none"
      loadingSpinner.style.display = "inline-flex"
      submitBtn.disabled = true

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value || "Mensaje desde el portafolio"
      const message = document.getElementById("message").value

      // Create mailto URL
      const mailtoUrl = `mailto:jmiguelfloresdavila@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`

      // Simulate form submission delay
      setTimeout(() => {
        // Open default email client
        window.location.href = mailtoUrl

        // Show success message
        contactForm.style.display = "none"
        successMessage.style.display = "block"

        // Reset form after 5 seconds
        setTimeout(() => {
          contactForm.reset()
          contactForm.style.display = "block"
          successMessage.style.display = "none"
          submitText.style.display = "inline"
          loadingSpinner.style.display = "none"
          submitBtn.disabled = false
        }, 5000)
      }, 1500)
    })
  }

  // Download CV button
  const downloadBtn = document.querySelector(".download-btn")

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      // Path to CV file
      const cvPath = "cv/CV - JoseMiguelFloresDavila.pdf"

      // Create temporary link element
      const link = document.createElement("a")
      link.href = cvPath
      link.download = "CV - JoseMiguelFloresDavila.pdf"
      document.body.appendChild(link)

      // Trigger download
      link.click()

      // Clean up
      document.body.removeChild(link)
    })
  }

  // Certificate viewer functionality
  const certButtons = document.querySelectorAll(".view-cert-btn")
  const certModal = document.getElementById("certificate-modal")
  const modalTitle = document.getElementById("modal-title")
  const certIframe = document.getElementById("certificate-iframe")
  const closeModal = document.querySelector(".close-modal")

  certButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const certTitle = this.closest(".certification-card").querySelector("h4").textContent
      const certFile = this.getAttribute("data-cert")

      // Set modal content
      modalTitle.textContent = certTitle
      certIframe.src = `/certificates/${certFile}`

      // Show modal
      certModal.classList.add("active")
      overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  })

  closeModal.addEventListener("click", () => {
    certModal.classList.remove("active")
    overlay.classList.remove("active")
    document.body.style.overflow = ""

    // Reset iframe src to prevent continued loading
    setTimeout(() => {
      certIframe.src = ""
    }, 300)
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("active")) {
      closeModal.click()
    }
  })

  // Social media links
  const socialLinks = document.querySelectorAll(".social-btn")

  socialLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // The href and target attributes are already set in the HTML
      // This will open the link in a new tab
      // No additional JavaScript needed for basic functionality

      // You could add analytics tracking here if needed
      console.log(`Clicked on ${this.textContent.trim()} link`)

      // Add a subtle animation when clicked
      this.classList.add("clicked")
      setTimeout(() => {
        this.classList.remove("clicked")
      }, 300)

      // You could add analytics tracking here if needed
      console.log(`Clicked on ${this.textContent.trim()} link`)
    })
  })

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".skill-item, .maintenance-card, .project-card, .certification-card, .soft-skill",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  // Initial check for elements in view
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)
})

