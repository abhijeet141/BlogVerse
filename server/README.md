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

