# Jewelora - Microservices-Based E-Commerce Platform

## Project Overview

Jewelora is a scalable e-commerce platform built using a microservices architecture. It provides a robust system for customers and admins with modular features, ensuring seamless management of products, orders, and users.

## Features

### Customer

* Browse available products.
* Manage shopping cart
  * Add/remove products
  * Update product quantities
* Place orders for the selected items in the cart.
* View detailed information on current and previous orders.

### Inventory Manager

* Manage products and product categories (add/update/delete).
* Update product inventory and manage stock levels.
* View and manage orders placed by customers.
* Update order statuses in real time.
* Assign delivery personnel to orders for timely deliveries.

### Admin

The Admin has full system access and can:
* Perform everything the Inventory Manager can do.
* Create and manage Inventory Managers.
* Create and manage Delivery Personnel.
* View dashboard analytics.
* Generate reports (to be developed).
  
### Delivery Person

* View all assigned orders.
* Update order status during delivery workflow.
* Access list of previously delivered orders.
  
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
* **Cloud/Microservices Tools:** Spring Cloud Gateway, Eureka Server, Feign Clients
* **Authentication:** JWT

## Future Extensions

* Real-time delivery tracking.
* Notification microservice for email/SMS updates.
