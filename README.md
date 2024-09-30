# BlogVerse

Blogverse is a comprehensive blogging platform consisting of a frontend React application, a backend API powered by Cloudflare Workers, and shared functionality for data validation and type safety. This documentation covers the installation, features, and usage for each part of the application.

### TechStack

- **Frontend:** React.js, TypeScript, Tailwind CSS, shadcn (for UI components)
- **Backend:**  Hono (for backend logic), Cloudflare Workers (for serverless architecture)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod (for schema validation)

## Blogverse FrontEnd

This project is a React application built with Vite, Tailwind CSS, and TypeScript, providing a user interface for interacting with the Blogverse platform.

### Project Overview

Blogverse is a front-end application designed to offer a seamless and engaging experience for users within the Blogverse ecosystem. It provides features for creating, publishing, and reading blog posts. Additionally, when users click on an author's link, they are redirected to a dedicated page where all blog posts by that specific author are listed.

### Features

- **User Authentication:** Securely manages user logins and registrations, allowing users to access their accounts and personalized features.
- **Blog Post Creation and Management:** Enables authors to create and publish blog posts with a user-friendly interface.
- **Reading Time Calculation:** Automatically calculates the estimated reading time for blog posts.
- **Email Validation:** Ensures the validity of email addresses used for user accounts and interactions.
- **UI Components:** Utilizes shadcn to provide reusable UI components like buttons, inputs, textareas, and skeletons, ensuring a consistent and visually appealing design across the application.
- **Protected Routes:**  Implements protected routes for secure access to author-specific functionalities, such as the dashboard.
- **Author-Specific Pages:** Redirects users to a dedicated page listing all blog posts by a specific author when they click on the author’s link.

### Installation

1. **Install Node.js:**  The project requires Node.js and npm. You can download and install the latest version from [https://nodejs.org/](https://nodejs.org/).
2. **Clone the Repository:**  Clone this repository to your local machine using:
   ```bash
   git clone <repository_url>
   ```
3. **Install Dependencies:** Navigate to the project directory and install the dependencies using:
   ```bash
   npm install
   ```

### Usage

1. **Start Development Server:**  Run the following command to start the development server:
   ```bash
   npm run dev
   ```
2. **Access the Application:**  Open [http://localhost:5173](http://localhost:5173) in your web browser.
3. **Explore Features:**  Interact with the application's features to experience the Blogverse Client.

## BlogVerse Backend

The Blogverse project is a server application built for Cloudflare Workers. It serves as the backend API for a blogging platform, enabling seamless user interactions and content management. This application leverages Prisma ORM for efficient database operations and Hono for streamlined request routing, ensuring high performance and scalability.

### Project Overview

The Blogverse backend provides a robust API for various functionalities related to user management, blog post handling, and secure data operations. It is designed to be lightweight, fast, and easy to integrate with front-end applications.

### Features

* **User API:** Provides endpoints for user authentication and management.
* **Blog API:** Provides endpoints for managing blog posts and other content.
* **Crypto:** Includes functionality for secure handling of sensitive data.

### Installation

1. **Prerequisites:**
   * Node.js (v16 or higher)
   * Cloudflare Workers CLI (wrangler)

2. **Installation:**
   ```bash
   npm install
   ```

### Usage

1. **Start the development server:**
   ```bash
   wrangler dev
   ```

2. **Deploy to Cloudflare Workers:**
   ```bash
   wrangler publish
   ```

3. **Access the API:**
   Once deployed, the API endpoints can be accessed at the deployed Workers URL.

# Blogverse Common

## Project Overview

This project provides common functionality for the Blogverse application. It utilizes TypeScript and Zod for type safety and data validation.

## Features

- **Data Validation:** Provides data validation using Zod library for robust data integrity.

## Installation

1. **Install Node.js and npm:** [https://nodejs.org/](https://nodejs.org/)
2. **Navigate to the project directory:**
   ```bash
   cd blogverse-common
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### Contact Information

For any inquiries or assistance, please contact the project maintainers at:

- **Email:** abhijeetsinha.smith@gmail.com
- **Website:** https://blogverse-drab.vercel.app/ 

