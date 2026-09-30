# ✈️ Travora — Travel & Tour Website

<p align="center">
  <strong>A Responsive Multi-Page Travel & Tourism Website</strong>
</p>

<p align="center">
  Final Project — NTI Web Design Training Program
</p>

<p align="center">
  <strong>120 Hours Web Design & Freelancing Training</strong>
</p>

---

## 🌍 About The Project

**Travora** is a complete multi-page **Travel & Tourism Website** developed as the **Final Project of the NTI Web Design Training Program**.

The project was developed collaboratively by a team of web designers and focuses on creating a complete travel website experience rather than a single landing page.

Travora allows users to explore destinations, discover tours, search for travel options, browse accommodation, compare prices, read travel-related content, view galleries, and interact with different forms and website components.

The project was designed with a strong focus on:

* 🎨 Modern and consistent UI design
* 📱 Responsive Web Design
* 🧭 Clear website navigation
* ⚡ Interactive user interfaces
* 🧩 Reusable components and styling
* 🔎 Search and filtering interfaces
* 💱 Currency switching
* 📝 Client-side form validation
* 🎠 Interactive carousels
* ✨ Hover effects and transitions
* 🤝 Team collaboration
* 🧪 Testing and debugging

The project demonstrates how the concepts learned during the NTI Web Design training can be combined to build a complete, structured, responsive frontend project.

---

# 🎯 Project Concept

Travora was designed around the idea of creating a **digital travel platform** where users can explore different aspects of a trip from one website.

Instead of limiting the website to destinations only, the project brings together several parts of the travel experience:

```text
                    TRAVORA
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   Destinations      Tours          Rooms
        │              │              │
   Explore Places   Search Tours   Search Rooms
        │              │              │
        └──────────────┼──────────────┘
                       │
                 Pricing & Booking
                       │
              ┌────────┴────────┐
              │                 │
            Blog             Gallery
              │                 │
              └────────┬────────┘
                       │
                 Contact & Support
```

This structure gives the website a more complete travel-platform feel and allows different sections of the site to work together as one consistent experience.

---

# 🧭 Website Experience

The website is organized into several interconnected areas.

## 🏠 Home Page

The Home Page acts as the main entry point to Travora.

It introduces the travel experience and provides access to the major sections of the website.

The homepage includes travel-focused visual content, navigation, featured sections, destination cards, tour-related content, and interactive components.

The design uses visual hierarchy to guide visitors from the main introduction toward the different travel services available throughout the website.

---

# 🌎 Destinations

Travora includes a dedicated destination section where users can explore different parts of the world.

### Available Destination Pages

* 🌍 Destinations
* 🇪🇬 Egypt
* 🌎 America
* 🌏 Asia
* ❄️ Scandinavia
* 🌍 South Africa
* 🇪🇺 Western Europe

Each destination area provides a dedicated page rather than placing all destinations into a single long section.

This structure makes the website easier to navigate and provides a foundation for expanding the project with additional destinations in the future.

---

# ✈️ Tours

The Tours section is one of the main components of Travora.

Users can browse and search for available tours through multiple interfaces.

### Tour Pages

* Tour List
* Tour Grid
* Tour Search
* Tour Details
* Date & Pricing

### Tour Grid

The Tour Grid presents tours using visual cards that allow users to scan available travel options quickly.

The cards are designed with:

* Destination imagery
* Tour information
* Pricing
* Ratings
* Discount information
* Interactive hover effects

The custom stylesheet defines reusable tour-card behavior, including image sizing, hover transitions, pricing styles, discount badges, and star ratings.

---

# 🔎 Tour Search

The Tour Search page provides a dedicated interface for searching through travel options.

This separates the **discovery experience** from the general Tour Grid and gives the website a more complete travel-platform structure.

The search-oriented pages also demonstrate how forms and input components can be integrated into a responsive Bootstrap layout.

---

# 📋 Tour Details

The Tour Details page provides a more detailed view of an individual tour.

Instead of showing only a card-level summary, the user can access a dedicated page containing more information about the selected travel experience.

This creates a natural user journey:

```text
Tour Grid
    ↓
Discover a Tour
    ↓
Tour Details
    ↓
Date & Pricing
    ↓
Booking / Interaction
```

---

# 🏨 Accommodation & Rooms

Travora also includes a dedicated accommodation section.

### Room Pages

* Room Grid
* Room Search
* Room Cart
* Standard Room
* Standard Deluxe
* Penthouse

The room section was designed to give users a separate experience for exploring accommodation options.

---

## 🛏️ Room Grid

The Room Grid displays accommodation options in a structured card-based layout.

Room cards use the same visual principles as the tour cards, including:

* Consistent image dimensions
* Rounded corners
* Hover elevation
* Responsive layout
* Clean typography
* Clear information hierarchy

The custom CSS defines reusable room-card components and hover interactions.

---

## 🔎 Room Search

The Room Search page provides a dedicated interface for finding accommodation.

This keeps room discovery separate from the general tour experience and demonstrates how a multi-purpose travel website can organize different types of user journeys.

---

## 🛒 Room Cart

The Room Cart represents the next step after discovering an accommodation option.

The presence of a dedicated cart page creates a more complete booking-oriented user flow:

```text
Room Search
     ↓
Room Grid
     ↓
Room Details
     ↓
Room Cart
```

---

## 🏨 Room Categories

Travora also includes dedicated accommodation pages such as:

* Standard Room
* Standard Deluxe
* Penthouse

This allows different room types to have their own dedicated presentation.

---

# 💰 Pricing System

Pricing is an important part of the Travora experience.

The website includes:

* Price Table
* Tour Pricing
* Room Pricing
* Discounted Prices
* Old/New Price Display
* Currency Selection

The custom styling provides dedicated visual treatment for pricing elements, including primary-color pricing and discount badges.

---

# 💱 Currency Switcher

One of the interactive features implemented with JavaScript is the currency switcher.

Users can select between:

* USD
* EUR
* GBP
* EGP

The selected currency is stored in `localStorage`, allowing the preference to remain available while navigating through the website.

The JavaScript also handles the conversion and visual updating of elements that contain USD-based prices.

This feature demonstrates practical usage of:

* JavaScript objects
* DOM manipulation
* `localStorage`
* Event listeners
* Dynamic content updates

---

# 📝 Blog

Travora includes a dedicated Blog section designed for travel-related content.

The Blog provides a different type of content experience from the destination and tour pages.

The project also includes a **Blog Comment Form**, allowing users to interact with the content through a validated form.

The comment form checks:

* Name
* Email
* Comment

and provides user feedback through the project's toast notification system.

---

# 📸 Gallery

The Gallery provides a visual showcase of travel destinations and experiences.

Rather than relying entirely on text-based content, the gallery allows the website to communicate the travel concept visually.

This is especially important for a travel website because imagery is a major part of how users explore destinations and accommodation.

---

# 📩 Contact

Travora includes a dedicated Contact page that allows users to interact with the website through a contact form.

The form includes client-side validation for required information such as:

* First Name
* Last Name
* Email
* Subject
* Message
* Terms agreement

Invalid fields receive visual validation feedback, while successful submissions trigger a success notification.

---

# 🔐 Authentication Interface

The project also contains Login and Registration interfaces.

### Login Validation

The login form checks:

* Email availability
* Email format
* Password availability
* Minimum password length

### Registration Validation

The registration form checks:

* Name
* Email
* Email format
* Password
* Password confirmation

These interactions are implemented on the frontend using JavaScript validation and Bootstrap components.

---

# 📬 Newsletter

Newsletter forms are included as part of the website's communication experience.

Users can submit their email address, and the JavaScript validates the email before displaying a success or error notification.

---

# ⚡ Interactive Features

Travora is not a collection of static HTML pages. JavaScript was used to add interaction across the website.

## 🔔 Toast Notifications

A reusable toast notification helper was implemented to display success and error messages.

The system dynamically creates Bootstrap toast elements and removes them after they disappear.

This allows different forms and actions to use the same notification mechanism.

---

## 📝 Form Validation

Client-side validation is implemented for multiple forms throughout the project.

Supported forms include:

* Login
* Registration
* Contact
* Booking
* Newsletter
* Blog Comments

The validation system checks user input before allowing the interaction to continue.

This creates immediate feedback instead of leaving the user without an explanation of what went wrong.

---

## 🎠 Responsive Multi-Card Carousel

Travora includes custom multi-card carousels.

The number of visible cards changes according to the screen width:

```text
Mobile       → 1 card
Tablet       → 2 cards
Desktop      → 3 cards
Large Desktop → 4 cards
```

The JavaScript calculates the visible number of items and updates the carousel position dynamically.

This is an example of combining JavaScript behavior with responsive design principles.

---

# 📌 Navbar & Navigation

Navigation is a major part of the project because Travora contains many pages.

The shared navigation provides access to major sections including:

* Home
* Pages
* Destinations
* Tours
* Rooms
* Search
* Blog
* Currency

The navbar also includes a scroll interaction that adds a shadow after the user scrolls down the page.

This provides visual separation between the navigation and the page content.

---

# ⬆️ Back To Top

A Back-to-Top interaction is included for longer pages.

When the user scrolls beyond a specific point, the button becomes visible.

Clicking the button smoothly scrolls the user back to the top of the page.

This improves navigation on pages containing large amounts of content.

---

# 🎨 Design System

Travora uses a consistent visual language throughout the website.

The custom stylesheet defines reusable design variables for:

* Primary colors
* Typography
* Text colors
* Borders
* Footer colors
* Hover states

### 🎨 Main Color Palette

```text
Primary Blue   #5c98f2
Hover Blue     #4a85e0
Light Blue     #e8f0fe
Dark           #1e2d3d
Text           #333333
Muted Text     #555b6d
```

These variables are centralized in the stylesheet, making the design system easier to maintain and modify.

---

# ✍️ Typography

Travora uses two main font families:

### Neuton

Used primarily for:

* Headings
* Section titles
* Major visual text
* Card headings

### Roboto

Used primarily for:

* Body text
* Navigation
* Forms
* Interface elements

The combination creates a visual distinction between headings and supporting content.

---

# 🖱️ Hover & Motion Design

The website uses subtle animations and transitions to make the interface more interactive.

Examples include:

### Destination Cards

* Image zoom
* Card elevation
* Overlay appearance
* Hover content

### Tour Cards

* Card elevation
* Smooth transform
* Image presentation

### Room Cards

* Hover elevation
* Smooth transitions

### Navigation

* Color transitions
* Dropdown interactions
* Scroll shadow

The goal of these effects is to provide visual feedback without making the interface unnecessarily complicated.

---

# 📱 Responsive Web Design

Responsive design was one of the core objectives of the technical training.

Travora was built to adapt its layout across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

Bootstrap's grid system provides the main responsive structure, while custom CSS and JavaScript handle additional responsive behavior.

The carousel functionality, for example, changes the number of visible cards according to the viewport width.

---

# 🧩 Technology Stack

| Technology          | Purpose                             |
| ------------------- | ----------------------------------- |
| **HTML5**           | Page structure and semantic content |
| **CSS3**            | Custom styling and visual design    |
| **Bootstrap 5.3.8** | Responsive layout and UI components |
| **JavaScript**      | Interactions and dynamic behavior   |
| **Bootstrap Icons** | Interface icons                     |
| **Google Fonts**    | Typography                          |

## Bootstrap 5.3.8 is used as the project's primary frontend framework, while `Style.css` provides the Travora-specific visual system and components.

# 🏗️ Project Architecture

The website follows a **multi-page frontend architecture**.

Instead of putting the entire website into one HTML file, functionality and content are divided into dedicated pages.

The general structure can be viewed as:

```text
Travora
│
├── Core Pages
│   ├── Home
│   ├── About
│   ├── Services
│   ├── Contact
│   ├── Blog
│   └── Gallery
│
├── Destinations
│   ├── Destinations
│   ├── Egypt
│   ├── America
│   ├── Asia
│   ├── Scandinavia
│   ├── South Africa
│   └── Western Europe
│
├── Tours
│   ├── Tour List
│   ├── Tour Grid
│   ├── Tour Search
│   ├── Tour Details
│   └── Date & Pricing
│
├── Rooms
│   ├── Room Grid
│   ├── Room Search
│   ├── Room Cart
│   ├── Standard Room
│   ├── Standard Deluxe
│   └── Penthouse
│
└── Pricing
    └── Price Table
```

This organization makes each major feature independently accessible while keeping the overall website connected through the navigation system.

---

# 📂 Project Structure

```text
Travora/
│
├── assets/
│   │
│   ├── CSS/
│   │   ├── bootstrap.min.css
│   │   └── Style.css
│   │
│   ├── JS/
│   │   ├── bootstrap.bundle.min.js
│   │   └── script.js
│   │
│   └── Images/
│       └── ...
│
├── index.html
│
├── about-us.html
├── our-service.html
├── contact.html
├── blog.html
├── gallery.html
│
├── destinations.html
├── egypt.html
├── america.html
├── asia.html
├── scandinavia.html
├── south-africa.html
└── western-europe.html
│
├── tour-grid.html
├── tour-search.html
├── tour-details.html
└── data-pricing.html
│
├── room-grid.html
├── room-search.html
├── room-cart.html
├── standard-room.html
├── standard-deluxe.html
└── penthouse.html
│
└── price-table.html
```

---

# 👥 KO Squad — Project Team

Travora was developed as a collaborative project.

The website was divided into different sections so that each team member could work on specific pages while maintaining the same overall visual language.

## 👩‍💻 Noura Maher

### Team Leader — Web Designer

Responsibilities:

* Website Architecture
* Home Page
* Contact
* Blog
* Destinations
* Tour Search
* Room Search
* UI consistency
* Responsive implementation
* JavaScript interactions
* Team coordination
###### 🤝 Team Leadership
###### As Team Leader, I also helped coordinate the work between the different team members and maintain consistency across the project.
###### This required thinking about the project as one complete website rather than a collection of unrelated pages.


---

## 👨‍💻 Ahmed Salah

Responsibilities:

* About Us
* Our Service
* Gallery

---

## 👩‍💻 Lana Amr

Responsibilities:

* Room Grid
* Room Cart
* Price Table

---

## 👩‍💻 Mariam Gamal

Responsibilities:

* Tour List
* Tour Grid
* Date & Pricing

---

## 👩‍💻 Nada Saad

Responsibilities included:

* Basic project organization
* Team coordination support
* Participated as a member of KO Squad during the project

---

# 🎓 NTI Web Design Training

Travora was developed as the final project of a **120-hour NTI Web Design Training Program**.

The training was divided into two major parts:

```text
                    NTI Training
                         │
              ┌──────────┴──────────┐
              │                     │
       Technical Training       Freelancing
            90 Hours              30 Hours
              │                     │
       Web Design Skills       Freelance Skills
              │                     │
       Final Project          Personal Branding
```

---

# 🧑‍💻 Part 1 — Technical Web Designer

### 90 Hours

The technical training focused on building a strong foundation in frontend web design and development.

The training covered:

* HTML
* CSS
* Bootstrap
* JavaScript
* Responsive Design
* DOM Manipulation
* UI Development
* Animations
* Transitions
* Project Planning
* Testing
* Debugging

---

# 📚 Technical Training Modules

## Module 1 — Introduction to Web Design

Covered:

* Web Design fundamentals
* Internet and Web concepts
* Evolution of Web Design
* Modern Web Design principles
* HTML fundamentals
* HTML document structure
* Common HTML elements
* Forms
* Semantic HTML
* HTML5 elements

---

## Module 2 — CSS & Responsive Design

Covered:

* CSS syntax
* Selectors
* Combinators
* Attribute selectors
* Pseudo-classes
* Pseudo-elements
* Typography
* Text styling
* Backgrounds
* Gradients
* Box Model
* Positioning
* Display
* Flexbox
* Shadows
* Transitions
* Animations
* 2D / 3D transforms
* Media queries
* Mobile-first design
* Responsive layouts

### Bootstrap

Practical experience included:

* Grid System
* Containers
* Rows
* Columns
* Typography
* Components
* Utilities
* Responsive layouts

---

# ⚙️ Module 3 — JavaScript

The JavaScript training covered:

### Fundamentals

* Variables
* Data Types
* Operators
* Conditions
* Loops
* Functions

### DOM

* DOM concepts
* Selecting elements
* Modifying elements
* Creating elements
* Removing elements
* Event handling

### Objects

* Object literals
* Properties
* Methods
* Constructor functions
* `this`

### Arrays

* Array creation
* Accessing elements
* Array methods
* Iteration
* `forEach`
* `map`
* `filter`

### Modern JavaScript

* Arrow Functions
* Destructuring
* Spread / Rest
* Modules
* Classes

---

# 🧪 Project-Based Learning

The final technical stage focused on applying the learned concepts to a complete project.

The project workflow included:

```text
Project Idea
     ↓
Requirements
     ↓
Planning
     ↓
Website Architecture
     ↓
Page Development
     ↓
Responsive Design
     ↓
JavaScript Interactions
     ↓
Testing
     ↓
Debugging
     ↓
Final Project
```

Travora served as the practical application of these concepts.

---

# 💼 Part 2 — Landing Your Freelance Job

### 30 Hours

The second part of the NTI program focused on freelancing and professional development.

Topics included:

* Introduction to Freelancing
* Service Identification
* Service Offering
* Pricing Structure
* Project Management
* Portfolio Development
* Personal Branding
* Client Communication
* Proposal Writing
* Freelance Platforms

The training also included creating a landing page for a freelance platform such as **Upwork**.

---

# 🎯 Skills Demonstrated Through The Project

Travora demonstrates practical experience with:

### Frontend Development

* HTML5
* CSS3
* Bootstrap
* JavaScript
* DOM Manipulation

### UI / UX Implementation

* Visual hierarchy
* Responsive layouts
* Navigation systems
* Cards
* Forms
* Interactive states
* Hover effects
* Transitions

### Responsive Design

* Mobile layouts
* Tablet layouts
* Desktop layouts
* Responsive grids
* Responsive carousels

### JavaScript

* Event listeners
* DOM manipulation
* Form validation
* Local storage
* Dynamic price updates
* Toast notifications
* Carousel logic

### Teamwork

* Task distribution
* Page ownership
* Team coordination
* Shared design system
* Project integration

---

# 🚀 How To Run

Travora is a frontend project and does not require a backend, database, or package installation to run the current version.

### Clone the repository

```bash
git clone https://github.com/your-username/Travora.git
```

### Open the project

```bash
cd Travora
```

### Run

Open:

```text
index.html
```

in a web browser.

For development, **Visual Studio Code + Live Server** can be used.

---

# 🔮 Future Improvements

The current version focuses on the frontend experience and client-side functionality.

Possible future development could include:

* Backend integration
* Real user authentication
* Database integration
* Real booking management
* Real-time room availability
* Online payment
* User accounts
* Booking history
* Admin dashboard
* Dynamic destination management
* Dynamic tour management
* API integration
* Server-side form processing

---

# 📌 Project Status

### ✅ Completed

**Final NTI Web Design Project**

| Category             | Details                          |
| -------------------- | -------------------------------- |
| Training             | NTI Web Design                   |
| Total Duration       | 120 Hours                        |
| Technical Training   | 90 Hours                         |
| Freelancing Training | 30 Hours                         |
| Project Type         | Multi-Page Travel Website        |
| Development          | Team Project                     |
| Frontend             | HTML, CSS, Bootstrap, JavaScript |
| Status               | Completed                        |

---

# 🏆 Project Outcome

Travora represents the practical outcome of the NTI Web Design training.

The project brought together the technical concepts learned throughout the program into one complete frontend experience, including:

* Website architecture
* Multi-page development
* Responsive design
* Bootstrap layouts
* Custom CSS
* JavaScript interactions
* Form validation
* Dynamic UI behavior
* Team collaboration
* Testing and debugging

More importantly, the project provided practical experience in working as part of a team, dividing responsibilities, maintaining a shared design direction, and integrating individually developed sections into one complete website.

---

# 👩‍💻 Team

| Name             | Role                                        |
| ---------------- | ------------------------------------------- |
| **Noura Maher**  | Team Leader & Web Designer                  |
| **Ahmed Salah**  | Web Designer                                |
| **Lana Amr**     | Web Designer                                |
| **Mariam Gamal** | Web Designer                                |
| **Nada Saad**    | Web Designer |

---

# ⭐ Acknowledgment

This project was developed as the **Final Project of the NTI Web Design Training Program**.

Special thanks to **NTI** for providing the technical and freelancing training that supported the development of this project.

---

<p align="center">
  <strong>Travora — Explore. Discover. Travel.</strong>
</p>

<p align="center">
  Made with ❤️ using HTML, CSS, Bootstrap & JavaScript
</p>
