# React Category Sidebar with Dropdown and Checkbox Selection

## Project Overview
This project is a **React.js web application** that displays a **sidebar with hierarchical categories**. Each main category can be expanded to show child categories (dropdown style). Users can **select categories using checkboxes**, and the selected categories are displayed in the main content area with **distinct colors**:

- **Main category:** Red button
- **Child category:** Skyblue button

The sidebar is **mobile responsive** and the main layout adjusts based on screen size.

---

## Features
- **Sidebar with collapsible categories:** Click on a main category to expand or collapse child categories.
- **Hierarchical selection:** Selecting a child category automatically selects its parent category(s).
- **Checkbox selection:** Users can select multiple categories.
- **Display selected categories:** Selected categories are shown in the main content area with color-coded badges.
- **Responsive design:** Works well on mobile and desktop screens.
- **Icons:** Uses `react-icons` for folder and dropdown indicators.

---

## Technologies Used
- **React.js** (functional components with hooks)
- **Tailwind CSS** for styling
- **React Icons** (`FaFolder`, `FaChevronDown`, `FaChevronRight`)