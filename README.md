# Jewelora - Microservices-Based E-Commerce Platform

## Project Overview

Jewelora is a scalable e-commerce platform built using a microservices architecture. It provides a robust system for customers and admins with modular features, ensuring seamless management of products, orders, and users.

## Features

### Customer Module

* Browse available products.
* Manage shopping cart: add/remove products and update product quantities.
* Place orders for the selected items in your cart.
* Access detailed information about the current and past orders.

### Inventory Manager Module

* Manage products and product categories (add/update/delete).
* Update product inventory and manage stock levels.
* View and manage orders placed by customers.
* Update order statuses in real time.
* Assign delivery personnel to orders for timely deliveries.

### Future Extensions

* Delivery personnel module with secure order access and real-time delivery tracking.
  
## Security

* **Auth Service →** Authenticates users, validates passwords, and issues JWT tokens.
* **API Gateway →** Verifies incoming JWTs and forwards only valid authenticated requests to downstream services.
* **Resource Microservices →** Each service independently validates JWTs and enforces role-based access control using Spring Security and @PreAuthorize.

## Microservices & Communication

* RESTful APIs for all CRUD operations.
* Inter-service communication using Spring Cloud Feign clients.
* Service registry with Eureka Server.
* API Gateway for routing requests.

## Technologies Used

* **Frontend:** React, Vite
* **Backend:** Spring Boot, Microservices Architecture
* **Database:** MySQL
* **Microservices Tools:** Spring Cloud Gateway, Eureka Server
* **Authentication:** JWT

