# Shetkari Vikas Backend

Shetkari Vikas Backend made using NodeJS, Express, and MongoDB.

## Description

This repository contains the backend API for the Shetkari Vikas application. It provides endpoints for managing foods, clothes, categories, users, admins, and orders. The application uses Mongoose for database modeling and interacting with MongoDB.

## Getting Started

### Dependencies

*   NodeJS 16+
*   MongoDB (Connection string is currently hardcoded for dev purposes, but should be environment variable in production)

### Installing

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Executing program

1.  Run the App:
    ```bash
    npm start
    # or
    yarn start
    ```
    The server will start on port `5000` (or the port defined in `process.env.PORT`).

### Environment Variables

Currently, some configurations (like DB connection string) are hardcoded or use the `config` module. Ensure you have the necessary configuration files or environment variables set up if you plan to change the defaults.

## API Endpoints Summary

### Foods
*   `GET /foods/`: Get all food items.
*   `GET /foods/:id`: Get a specific food item.
*   `POST /foods/`: Add a new food item.

### Clothes
*   `GET /clothes/`: Get all cloth items.
*   `GET /clothes/:id`: Get a specific cloth item.
*   `POST /clothes/`: Add a new cloth item.

### Food Categories
*   `GET /foodcategories/`: Get all food categories.
*   `GET /foodcategories/:id`: Get a specific category.
*   `POST /foodcategories/`: Add a new category.
*   `GET /foodcategories/foods/:catId`: Get foods in a category.

### Cloth Categories
*   `GET /clothcategories/`: Get all cloth categories.
*   `GET /clothcategories/:id`: Get a specific category.
*   `POST /clothcategories/`: Add a new category.

### Users
*   `POST /user/login`: User login.
*   `POST /user/`: Register a new user.
*   `GET /user/:id`: Get user details.
*   `GET /user/`: Get all users.

### Admins
*   `POST /admin/login`: Admin login.
*   `POST /admin/`: Create a new admin.
*   `GET /admin/:id`: Get admin details.
*   `GET /admin/`: Get all admins.

### Orders
*   `POST /order/`: Create a new order.
*   `GET /order/`: Get all orders.
*   `GET /order/:id`: Get a specific order (Note: current implementation retrieves a Food item).

## Project Structure

*   `index.js`: Main entry point.
*   `routes/`: API route definitions.
*   `models/`: Mongoose schemas and models.
*   `config/`: Configuration files.
*   `views/`: Handlebars templates for server-side rendering (e.g., superuser view).

## Documentation

The codebase is fully documented using JSDoc. You can inspect the source files for detailed information on functions, parameters, and return types.
