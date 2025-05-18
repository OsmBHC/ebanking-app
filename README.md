# E-Banking Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
  - [Backend (`ebanking-backend`)](#backend-ebanking-backend)
  - [Frontend (`ebanking-frontend`)](#frontend-ebanking-frontend)
- [Technologies](#technologies)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend (`ebanking-backend`)](#backend-ebanking-backend-1)
  - [Frontend (`ebanking-frontend`)](#frontend-ebanking-frontend-1)
- [Usage](#usage)
- [Project Structure](#project-structure)
  - [Backend (`ebanking-backend`)](#backend-ebanking-backend-2)
  - [Frontend (`ebanking-frontend`)](#frontend-ebanking-frontend-2)
- [Development Journey](#development-journey)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)

## Overview
The E-Banking Application is a full-stack web application designed to manage customers and their bank accounts. It provides functionalities for viewing customer details, managing account operations (debit, credit, transfer), and secure authentication using JWT. The backend is built with Spring Boot, and the frontend is developed using Angular 19 with a responsive Bootstrap-based UI.

## Features
### Backend (`ebanking-backend`)
- **Customer Management**: Create, retrieve, search, and delete customers via RESTful APIs.
- **Account Management**: Retrieve account details, view transaction history, and perform debit, credit, and transfer operations.
- **Security**: JWT-based authentication with role-based access control (USER, ADMIN roles). CORS configured to allow frontend communication.
- **Endpoints**:
  - `POST /auth/login`: Authenticate users and issue JWT tokens.
  - `GET /customers`: List all customers.
  - `GET /customers/search?keyword={kw}`: Search customers by keyword.
  - `POST /customers`: Create a new customer.
  - `DELETE /customers/{id}`: Delete a customer.
  - `GET /accounts/{accountId}/history?page={p}&size={s}`: Retrieve account history with pagination.
  - `POST /accounts/debit`: Debit an account.
  - `POST /accounts/credit`: Credit an account.
  - `POST /accounts/transfer`: Transfer funds between accounts.

### Frontend (`ebanking-frontend`)
- **Customer Management**:
  - View a list of customers with their ID, name, and email.
  - Search customers by keyword.
  - Add new customers with form validation (name, email).
  - Delete customers with confirmation prompts.
- **Account Management**:
  - Search accounts by ID to view balance and transaction history.
  - Perform debit, credit, and transfer operations with form inputs for amount, description, and destination account (for transfers).
  - Paginated transaction history display.
- **Authentication**:
  - Login page to authenticate users and obtain JWT tokens.
  - Logout functionality to clear tokens and redirect to login.
  - Not-authorized page for restricted access attempts.
  - HTTP interceptor to attach JWT tokens to API requests.
  - Route guards to protect authenticated routes.
- **UI Components**:
  - Responsive navbar for navigation.
  - Admin template for layout consistency.
  - Bootstrap 5 for styling, with Bootstrap Icons for visual elements.

## Technologies
### Backend
- **Java 17+**: Programming language.
- **Spring Boot 3.x**: Framework for REST API development.
- **Spring Security**: JWT-based authentication and authorization.
- **Nimbus JOSE JWT**: For JWT encoding and decoding.
- **In-Memory User Store**: Temporary user management (user1:12345, admin:12345).
- **Maven**: Dependency management.

### Frontend
- **Angular 19**: Framework for building the SPA.
- **TypeScript**: For type-safe JavaScript.
- **Bootstrap 5**: For responsive UI design.
- **RxJS**: For handling asynchronous operations (e.g., HTTP requests).
- **Angular Reactive Forms**: For form validation and submission.
- **Node.js 18+ & npm**: For package management and build tools.

## Prerequisites
- **Java 17+**: Install JDK (e.g., OpenJDK or Oracle JDK).
- **Maven**: For building the backend.
- **Node.js 18+ & npm**: For the frontend.
- **Git**: For cloning the repository.
- **MySQL/PostgreSQL (optional)**: If replacing the in-memory store with a database.
- **IDE**: IntelliJ IDEA, VS Code, or similar for development.

## Setup Instructions
### Backend (`ebanking-backend`)
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/OsmBHC/ebanking-app.git
   cd ebanking-backend
   ```
2. **Configure Application Properties**:
   - Edit `src/main/resources/application.properties`:
     ```properties
     server.port=8085
     jwt.secret=your-secure-secret-key
     ```
   - Replace `your-secure-secret-key` with a strong secret for JWT signing (e.g., a 256-bit key).
3. **Build and Run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8085`.

### Frontend (`ebanking-frontend`)
1. **Navigate to Frontend Directory**:
   ```bash
   cd ebanking-frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   - Edit `src/environments/environment.ts`:
     ```typescript
     export const environment = {
       production: false,
       backendHost: 'http://localhost:8085'
     };
     ```
4. **Run the Application**:
   ```bash
   ng serve
   ```
   The frontend will run on `http://localhost:4200`.

## Usage
1. **Access the Application**:
   - Open `http://localhost:4200` in your browser.
2. **Login**:
   - Use credentials:
     - Username: `user1`, Password: `12345` (USER role)
     - Username: `admin`, Password: `12345` (USER, ADMIN roles)
   - Successful login redirects to the main dashboard.
3. **Navigate Features**:
   - **Customers**: View, search, add, or delete customers.
   - **Accounts**: Search accounts by ID, view transaction history, and perform operations (debit, credit, transfer).
   - **Logout**: Clears the JWT token and redirects to the login page.
4. **Handle Unauthorized Access**:
   - Attempting to access protected routes without a valid token redirects to the not-authorized page.

## Project Structure
### Backend (`ebanking-backend`)
```
ebanking-backend/
├── src/
│   ├── main/
│   │   ├── java/ma/enset/ebankingbackend/
│   │   │   ├── EbankingBackendApplication.java       # Main application entry point
│   │   │   ├── dtos/                                # Data Transfer Objects
│   │   │   │   ├── AccountHistoryDTO.java
│   │   │   │   ├── AccountOperationDTO.java
│   │   │   │   ├── BankAccountDTO.java
│   │   │   │   ├── CreditDTO.java
│   │   │   │   ├── CurrentBankAccountDTO.java
│   │   │   │   ├── CustomerDTO.java
│   │   │   │   ├── DebitDTO.java
│   │   │   │   ├── SavingBankAccountDTO.java
│   │   │   │   └── TransferRequestDTO.java
│   │   │   ├── entities/                            # JPA entities
│   │   │   │   ├── AccountOperation.java
│   │   │   │   ├── BankAccount.java
│   │   │   │   ├── CurrentAccount.java
│   │   │   │   ├── Customer.java
│   │   │   │   └── SavingAccount.java
│   │   │   ├── enums/                               # Enum definitions
│   │   │   │   ├── AccountStatus.java
│   │   │   │   └── OperationType.java
│   │   │   ├── exceptions/                          # Custom exceptions
│   │   │   │   ├── BalanceNotSufficientException.java
│   │   │   │   ├── BankAccountNotFoundException.java
│   │   │   │   └── CustomerNotFoundException.java
│   │   │   ├── mappers/                             # Data mapping
│   │   │   │   └── BankAccountMapperImpl.java
│   │   │   ├── repositories/                        # JPA repositories
│   │   │   │   ├── AccountOperationRepository.java
│   │   │   │   ├── BankAccountRepository.java
│   │   │   │   └── CustomerRepository.java
│   │   │   ├── security/                            # Security configuration
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── SecurityController.java
│   │   │   ├── services/                            # Business logic
│   │   │   │   ├── BankAccountService.java
│   │   │   │   └── BankAccountServiceImpl.java
│   │   │   └── web/                                 # REST controllers
│   │   │       ├── BankAccountController.java
│   │   │       └── CustomerRestController.java
│   │   └── resources/
│   │       ├── application.properties               # Configuration (e.g., JWT secret)
│   │       ├── static/                              # Static resources (empty)
│   │       └── templates/                           # Templates (empty)
│   └── test/
│       └── java/ma/enset/ebankingbackend/
│           └── EbankingBackendApplicationTests.java # Unit tests
├── pom.xml                                          # Maven configuration
├── mvnw                                             # Maven wrapper
├── mvnw.cmd                                         # Maven wrapper for Windows
└── HELP.md                                          # Maven help file
```

### Frontend (`ebanking-frontend`)
```
ebanking-frontend/
├── src/
│   ├── app/
│   │   ├── accounts/                            # Account management component
│   │   │   ├── accounts.component.css
│   │   │   ├── accounts.component.html
│   │   │   ├── accounts.component.spec.ts
│   │   │   └── accounts.component.ts
│   │   ├── admin-template/                      # Admin layout component
│   │   │   ├── admin-template.component.css
│   │   │   ├── admin-template.component.html
│   │   │   ├── admin-template.component.spec.ts
│   │   │   └── admin-template.component.ts
│   │   ├── customer-accounts/                   # Customer accounts component
│   │   │   ├── customer-accounts.component.css
│   │   │   ├── customer-accounts.component.html
│   │   │   ├── customer-accounts.component.spec.ts
│   │   │   └── customer-accounts.component.ts
│   │   ├── customers/                           # Customer management component
│   │   │   ├── customers.component.css
│   │   │   ├── customers.component.html
│   │   │   ├── customers.component.spec.ts
│   │   │   └── customers.component.ts
│   │   ├── guards/                              # Authentication and authorization guards
│   │   │   ├── authentication.guard.spec.ts
│   │   │   ├── authentication.guard.ts
│   │   │   ├── authorization.guard.spec.ts
│   │   │   └── authorization.guard.ts
│   │   ├── interceptors/                        # HTTP interceptors
│   │   │   ├── app-http.interceptor.spec.ts
│   │   │   └── app-http.interceptor.ts
│   │   ├── login/                               # Login component
│   │   │   ├── login.component.css
│   │   │   ├── login.component.html
│   │   │   ├── login.component.spec.ts
│   │   │   └── login.component.ts
│   │   ├── models/                              # Data models
│   │   │   ├── account.model.ts
│   │   │   └── customer.model.ts
│   │   ├── navbar/                              # Navigation bar component
│   │   │   ├── navbar.component.css
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.spec.ts
│   │   │   └── navbar.component.ts
│   │   ├── new-customer/                        # New customer form component
│   │   │   ├── new-customer.component.css
│   │   │   ├── new-customer.component.html
│   │   │   ├── new-customer.component.spec.ts
│   │   │   └── new-customer.component.ts
│   │   ├── not-authorized/                      # Unauthorized access component
│   │   │   ├── not-authorized.component.css
│   │   │   ├── not-authorized.component.html
│   │   │   ├── not-authorized.component.spec.ts
│   │   │   └── not-authorized.component.ts
│   │   ├── services/                            # Services for API communication
│   │   │   ├── account.service.spec.ts
│   │   │   ├── account.service.ts
│   │   │   ├── auth.service.spec.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── customer.service.spec.ts
│   │   │   └── customer.service.ts
│   │   ├── app.component.css                    # Root component styles
│   │   ├── app.component.html                   # Root component template
│   │   ├── app.component.spec.ts                # Root component tests
│   │   ├── app.component.ts                     # Root component logic
│   │   ├── app.config.ts                        # Application configuration
│   │   └── app.routes.ts                        # Routing configuration
│   ├── environments/                            # Environment configuration
│   │   └── environment.ts
│   ├── index.html                               # Main HTML file
│   ├── main.ts                                  # Application bootstrap
│   └── styles.css                               # Global styles
├── public/
│   └── favicon.ico                              # Favicon
├── angular.json                                 # Angular configuration
├── package.json                                 # Node.js dependencies
├── package-lock.json                            # Dependency lock file
├── tsconfig.app.json                            # TypeScript app config
├── tsconfig.json                                # TypeScript config
└── tsconfig.spec.json                           # TypeScript test config
```

## Development Journey
1. **Initialized Project**:
   - Created `ebanking-backend` with Spring Boot for REST APIs.
   - Initialized `ebanking-frontend` with Angular 19 (`ng new ebanking-frontend`).
2. **Customer Management**:
   - Implemented backend APIs for CRUD operations on customers.
   - Built frontend components to list, search, add, and delete customers.
3. **Account Management**:
   - Added backend APIs for account history and operations (debit, credit, transfer).
   - Created frontend components to search accounts, display transactions, and perform operations with pagination.
4. **Security**:
   - Configured JWT authentication in the backend with `SecurityConfig` and `SecurityController`.
   - Added frontend authentication with login, logout, interceptors, guards, and not-authorized handling.
5. **UI Enhancements**:
   - Integrated Bootstrap for responsive design.
   - Added navbar and admin template for consistent navigation.
6. **Documentation**:
   - Added a comprehensive README with setup, usage, and project details.
7. **Commits**:
   - Regularly committed changes to GitHub with clear messages (e.g., initial setup, component additions, security implementation).

## Future Improvements
- **Enhanced Customer Management**:
  - Add input, edit, and advanced search functionalities for customers to improve usability and data management.
- **Enhanced Account Management**:
  - Implement account creation, detailed search, and comprehensive account administration features.
- **Operation Tracking**:
  - Record the authenticated user’s identifier for every customer, account, and operation creation or modification to ensure traceability.
- **User Account and Password Management**:
  - Enable user account management, including password change functionality, to enhance security and user control.
- **Dashboard with ChartJS**:
  - Develop a dashboard using ChartJS (ng2-charts) to display graphs and statistics (e.g., account balances, transaction trends) for informed decision-making.
- **Additional Features**:
  - Explore other functionalities, such as transaction categorization, multi-currency support, or email notifications for operations.
- **Database Integration**:
  - Replace the in-memory user store with a persistent database (e.g., MySQL) for robust user and data management.
- **UI/UX Enhancements**:
  - Implement role-based UI restrictions (e.g., admin-only views) and user feedback mechanisms (e.g., toast notifications).
- **Deployment**:
  - Deploy the application to a cloud platform (e.g., AWS, Heroku) for production use.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.