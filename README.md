# Portfolio Project

This repository contains the code for my personal portfolio website: https://tahabasri.com

## Quick Start

To run the website locally:

```bash
bundle install
gem install jekyll
jekyll build
jekyll serve
```

## 1. Portfolio Website

The portfolio website is built as a Jekyll-based static site that showcases my work, skills, and contact information.

### Structure

- **`_layouts/main.html`**: Main layout template for the portfolio homepage
- **`css/style.css`**: Custom stylesheet for the portfolio design
- **`img/`**: Images used throughout the portfolio
- **`scripts/index.js`**: JavaScript functionality for the portfolio
- **`_config.yml`**: Jekyll configuration file
- **`index.md`**: Entry point for the website using the main layout
- **`_site/`**: Generated static site (created by Jekyll build)

### Features

- **Responsive Design**: Adapts to different screen sizes for optimal viewing
- **Animated Elements**: Uses Animate.css for smooth animations and transitions
- **Social Media Integration**: Links to professional profiles and platforms
- **Interactive Sections**: About, Work, and Contact sections
- **Modern UI**: Clean, professional layout with intuitive navigation

## 2. Interactive Resume

The resume is implemented as an embedded sub-site within the portfolio with advanced features for professional presentation.

### Structure

- **`_layouts/cv.html`**: Layout template with language localization support
- **`resume/`**: Contains the resume implementation
  - `index.md`: Resume content in markdown format with bilingual support
  - `media/`: CSS files for different viewing contexts
    - `kjhealy-print.css`: Optimized styling for print/PDF output
    - `kjhealy-screen.css`: Styling for on-screen viewing

- **`_plugins/customers_injector.rb`**: Custom Jekyll plugin for dynamic content injection
- **`customers/`**: Contains modular HTML files with customer information (to be put locally, already ignored by Git in `.gitignore`)

### Features

1. **Dynamic Customer Injection**: 
   - Uses a custom Jekyll plugin that identifies elements with `data-id="customers"` and a `data-name` attribute
   - Automatically injects content from the corresponding file in the `customers/` directory
   - Enables modular, reusable customer lists that can be updated independently

2. **Multilingual Support**:
   - Full support for both English and French versions
   - Content is tagged with `lang="en"` or `lang="fr"` attributes
   - Automatic language detection based on browser settings
   - Manual language selection via URL parameter (`?lang=en` or `?lang=fr`)

3. **Print Optimization**:
   - Specially designed for professional printing with specific settings:
     - Paper Size: A4
     - Scale: 78
     - Custom margins: up [0.18°], right [0.21°], down [0.18°], left [0.18°]

## Technologies Used

### Common Technologies
- [Jekyll](https://jekyllrb.com): Static site generator that powers both portfolio and resume
- [GitHub Pages](https://pages.github.com): Hosting platform for the website
- [jQuery](https://jquery.com/): Used for DOM manipulation throughout the project

### Portfolio Technologies
- [Bootstrap](https://getbootstrap.com/): Frontend framework for responsive design
- [Font Awesome](https://fontawesome.com/): Icon library for social media and UI elements
- [Animate.css](https://animate.style/): Library for smooth animations and transitions

### Resume Technologies
- [Markdown CV](https://github.com/elipapa/markdown-cv): Base template for the resume
- [Markdown CSS Air](https://github.com/markdowncss/air): Clean styling for markdown content
- Custom Ruby plugin for dynamic content injection
