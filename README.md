# Find-your-recipie
# Global Recipe Finder 🍲

A high-performance, browser-based web application for discovering culinary inspiration from around the world. This project utilizes a hybrid data approach, combining a public REST API with a custom-implemented local mock API to ensure a diverse and inclusive user experience.

## 📝 Project Overview
This application solves the problem of limited representation in mainstream recipe databases [cite: 1.2]. While many public APIs focus on Western cuisines, this app implements a custom data handling layer to include traditional dishes from Finland, Nepal, Turkey, and Italy that are often missing or incomplete in third-party datasets [cite: Project Theme, Backend (Minimum Level)].

## 🛠 Features
- **Dual Search Modes:** Toggle between searching by specific ingredients or by country (Area) [cite: 3.4].
- **Hybrid Data Engine:** Seamlessly merges results from the *TheMealDB* API with a local mock dataset [cite: Technical Requirements].
- **Interactive Recipe Modals:** View detailed instructions, images, and video tutorials [cite: 3.4].
- **Dynamic Ingredients List:** Automatically parses and displays precise measurements for every recipe [cite: 3.4].
- **Responsive Design:** Fully functional on mobile, tablet, and desktop devices [cite: Technical Requirements].

## 🏗 Architecture & Technologies
- **Frontend:** Semantic HTML5, CSS3 (with custom brand identity), and Vanilla JavaScript [cite: Technical Requirements].
- **Data Handling:** - **Asynchronous Communication:** JavaScript `fetch()` API with basic error handling [cite: Technical Requirements].
  - **Mock API:** An internal JSON-structured database representing 11 custom dishes [cite: Backend (Minimum Level)].
- **Deployment:** GitHub Pages for public hosting [cite: Deployment & Publishing].

## 🤖 AI Usage Disclosure [cite: AI Usage Policy]
- **Tools:** ChatGPT / Gemini.
- **Generated:** Initial fetch logic templates and HTML structure.
- **Modified:** - Manually implemented the logic to bridge the local mock data with API results.
  - Crafted the specific data entries for Finnish and Nepalese cuisines.
  - Developed the custom logic to iterate through and clean the API's ingredient data.

## ⚙️ Setup Instructions
No local installation is required.
1. Visit the [Live Demo Link](https://ShiroiYuki111.github.io/Find-your-recipie/).
2. Select your search type (Ingredient or Country) from the dropdown.
3. Type your query (e.g., "Finland" or "Chicken") and hit the search icon.

##Members-Regan,amrit,ahad,ratul.

---
*Developed for the Semester Project - Submitted April 2026*
