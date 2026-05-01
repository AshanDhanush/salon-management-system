✂️ Elite Salon Management System
A high-end, full-stack booking platform designed for modern salon operations. This project features a robust architecture to handle real-time reservations and an AI-driven assistant to enhance customer experience.

🚀 Tech Stack
Frontend

Framework: Next.js 16 (App Router)

Library: React 19

Styling: Tailwind CSS v4

Animations: Framer Motion

Icons: Lucide React

Backend

Framework: Java Spring Boot

Database: MongoDB Atlas

Security: Spring Security & JWT

AI Engine: Python (FastAPI/Flask)

📂 Project Structure
Plaintext
elite-salon-pro/
├── salon-booking-frontend/  # Next.js Web Interface
├── chatbot-backend/         # RAG-based AI Service
└── salon-booking-backend/   # Spring Boot REST API
🤖 Intelligent Chatbot Integration
The heart of the customer interaction is a specialized AI assistant designed to bridge the gap between users and salon services:

RAG-Based Architecture: The chatbot utilizes Retrieval-Augmented Generation (RAG), allowing it to provide accurate answers based on specific salon services, pricing, and availability rather than general AI knowledge.

Context-Aware Booking: Designed to assist users through the reservation flow, answering questions about stylist expertise and service details in real-time.

Research-Driven AI: Leveraging my background in Computer Science research and Teacher-Student distillation frameworks, the chatbot backend is optimized for efficient processing and intelligent response generation.

Seamless Handover: Integrated via a Python-based backend that communicates with the Java Spring Boot core to ensure data consistency.

🛠️ Key Features
Dynamic Scheduling: A streamlined booking system that prevents double-bookings and manages stylist rosters efficiently.

Responsive Admin Dashboard: A dedicated interface for salon owners to manage appointments, view analytics, and update service listings.

Secure Data Management: Implements JWT for secure session management and MongoDB Atlas for scalable, cloud-based data storage.

🚀 Getting Started
Clone the repository:

Bash
git clone https://github.com/AshanDhanush/salon-management-system.git
Environment Configuration:

Configure your MongoDB Atlas URI and JWT Secret in the backend .properties or .env file.

Set up your Python virtual environment for the chatbot-backend.

Execution:

Frontend: npm run dev

Backend: Run as a Spring Boot App.

Chatbot: python main.py
