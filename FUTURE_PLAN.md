# Future Plan - Phase 2

This document outlines the planned improvements and features for the next phase of the Shetkari Vikas Backend project. Phase 1 focused on establishing the core functionality and documentation. Phase 2 will focus on security, scalability, and code quality.

## Security Improvements

*   **Environment Variables**: Move sensitive information (database connection strings, JWT secrets) from code and config files to `.env` files using `dotenv`.
*   **Input Validation**: Enhance validation logic for all endpoints, ensuring strict checking of request bodies.
*   **Rate Limiting**: Implement rate limiting to prevent abuse of the API.
*   **Helmet**: Use `helmet` middleware to secure Express apps by setting various HTTP headers.

## Code Quality & Testing

*   **Unit Tests**: Implement a comprehensive suite of unit tests using a framework like `Jest` or `Mocha` + `Chai`.
*   **Integration Tests**: Add integration tests to verify the interaction between API endpoints and the database.
*   **Linting & Formatting**: Set up `ESLint` and `Prettier` to enforce code style and catch errors early.
*   **Refactoring**:
    *   Separate controllers from routes to improve code organization.
    *   Address the bug in `routes/Order.js` where `GET /order/:id` queries the `Food` model instead of `Order`.

## Feature Enhancements

*   **Pagination**: Implement pagination for `GET` endpoints that return lists (Foods, Clothes, Orders, etc.) to handle large datasets efficiently.
*   **Search & Filtering**: Add query parameters to filter items by price, category name, etc.
*   **Image Upload**: Integrate a cloud storage solution (like AWS S3 or Cloudinary) for handling image uploads instead of storing strings/URLs manually.
*   **Order Management**: Implement status updates for orders (e.g., from "Pending" to "Shipped" to "Delivered").

## Documentation

*   **API Documentation Generator**: Set up Swagger/OpenAPI to automatically generate interactive API documentation from the JSDoc comments.

## CI/CD

*   **Pipeline**: Set up a CI/CD pipeline (e.g., GitHub Actions) to run tests and linting on every push.
