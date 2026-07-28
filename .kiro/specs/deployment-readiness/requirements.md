# Requirements Document

## Introduction

This document defines the requirements for making the React Capstone project (a Vite-based React inventory management application built on the AdventureWorks data model) deployment-ready. The application currently has a hardcoded API base URL, no environment configuration, no CI/CD pipeline, unconditional Redux DevTools exposure, and no deployment platform configuration. The backend API (`api.bootcampcentral.com`) may be unavailable, so a mock API layer is required for standalone demo functionality. These requirements cover the changes needed to produce a reliable, secure, production-grade deployment on AWS Amplify.

## Glossary

- **Build_System**: The Vite build toolchain responsible for bundling, optimizing, and outputting the production-ready application artifacts
- **Environment_Config**: The mechanism (`.env` files and `import.meta.env`) used to supply runtime configuration values that differ between development and production
- **CI_CD_Pipeline**: The automated workflow (GitHub Actions) that runs linting, builds, and deploys the application on each push or pull request
- **Deployment_Platform**: AWS Amplify Hosting, the managed hosting service that builds and serves the production application via a global CDN
- **SPA_Router**: The BrowserRouter-based client-side routing that requires server-side fallback configuration to handle direct URL access
- **Redux_Store**: The Redux Toolkit store that manages application state, including the DevTools extension integration
- **API_Client**: The Axios instance configured in `src/api/axios.js` that makes HTTP requests to the backend API
- **Mock_API**: A Mock Service Worker (MSW) layer that intercepts HTTP requests and returns realistic sample data shaped to the AdventureWorks schema, enabling the application to function without the real backend

## Requirements

### Requirement 1: Environment-Based API Configuration

**User Story:** As a developer, I want the API base URL to be driven by environment variables, so that I can point the application at different backends for development, staging, and production without code changes.

#### Acceptance Criteria

1. THE Environment_Config SHALL provide a `VITE_API_BASE_URL` variable that the API_Client uses as its base URL
2. WHEN no `VITE_API_BASE_URL` variable is defined, THE API_Client SHALL fall back to `https://api.bootcampcentral.com/api`
3. THE Build_System SHALL include a `.env.development` file with the development API URL and a `.env.production` file with the production API URL
4. WHEN the application is built for production, THE Build_System SHALL embed the production `VITE_API_BASE_URL` value into the bundle

### Requirement 2: Production Build Verification

**User Story:** As a developer, I want the production build to complete without errors or warnings, so that I can confidently deploy the compiled output.

#### Acceptance Criteria

1. WHEN `npm run build` is executed, THE Build_System SHALL produce a `dist` folder containing the optimized production bundle
2. WHEN `npm run build` is executed, THE Build_System SHALL complete with zero errors
3. WHEN `npm run lint` is executed, THE Build_System SHALL report zero lint errors for all source files
4. THE Build_System SHALL generate hashed filenames for JavaScript and CSS assets to enable cache busting

### Requirement 3: Redux DevTools Production Guard

**User Story:** As a developer, I want Redux DevTools to be disabled in production builds, so that application state is not exposed to end users.

#### Acceptance Criteria

1. WHILE the application is running in production mode, THE Redux_Store SHALL disable the Redux DevTools extension
2. WHILE the application is running in development mode, THE Redux_Store SHALL enable the Redux DevTools extension

### Requirement 4: Mock API Layer for Standalone Demo

**User Story:** As a developer, I want a mock API layer that provides realistic sample data, so that the application is fully functional and demonstrable even when the real backend API is unavailable.

#### Acceptance Criteria

1. THE Mock_API SHALL intercept all HTTP requests made by the API_Client when mock mode is enabled
2. THE Mock_API SHALL return realistic sample data shaped to the AdventureWorks schema for login, employees, products, inventory, purchasing, vendors, orders, sales, customers, and stores endpoints
3. WHEN the Environment_Config variable `VITE_USE_MOCK_API` is set to `true`, THE Mock_API SHALL activate and handle all API requests
4. WHEN the Environment_Config variable `VITE_USE_MOCK_API` is set to `false` or is undefined, THE API_Client SHALL send requests to the real backend API
5. THE Mock_API SHALL provide a valid login response that allows the authentication flow to complete successfully
6. THE Mock_API SHALL be implemented using Mock Service Worker (MSW) as a development dependency

### Requirement 5: SPA Routing Deployment Configuration

**User Story:** As a developer, I want the deployment platform to correctly handle client-side routes, so that users can directly navigate to or refresh any application URL without receiving a 404 error.

#### Acceptance Criteria

1. THE Deployment_Platform SHALL redirect all non-file requests to `index.html` to support client-side routing
2. WHEN a user navigates directly to a deep link (e.g., `/dashboard`, `/employees`), THE Deployment_Platform SHALL serve the `index.html` file and allow the SPA_Router to render the correct view
3. THE Build_System SHALL include SPA rewrite rules in the Amplify configuration

### Requirement 6: AWS Amplify Deployment Configuration

**User Story:** As a developer, I want AWS Amplify configured and ready to use, so that I can deploy the application with minimal manual steps.

#### Acceptance Criteria

1. THE Build_System SHALL include an `amplify.yml` file in the project root specifying the build settings
2. THE Deployment_Platform configuration SHALL specify `npm ci` for dependency installation and `npm run build` as the build command
3. THE Deployment_Platform configuration SHALL specify `dist` as the output directory for build artifacts
4. THE Deployment_Platform configuration SHALL set the Node.js version to 18 or higher for the build environment
5. THE Deployment_Platform configuration SHALL include custom rewrite rules to support SPA client-side routing

### Requirement 6: CI/CD Pipeline Setup

**User Story:** As a developer, I want an automated CI/CD pipeline, so that every push to the main branch is automatically linted, built, and deployed.

#### Acceptance Criteria

1. WHEN code is pushed to the `main` branch, THE CI_CD_Pipeline SHALL execute the lint step using `npm run lint`
2. WHEN the lint step passes, THE CI_CD_Pipeline SHALL execute the build step using `npm run build`
3. IF the lint step fails, THEN THE CI_CD_Pipeline SHALL stop execution and report the failure
4. IF the build step fails, THEN THE CI_CD_Pipeline SHALL stop execution and report the failure
5. WHEN the build step succeeds, THE CI_CD_Pipeline SHALL trigger deployment to the Deployment_Platform
6. WHEN a pull request is opened against the `main` branch, THE CI_CD_Pipeline SHALL run lint and build steps without deploying

### Requirement 7: Production Metadata and Security Headers

**User Story:** As a developer, I want proper metadata and security headers configured, so that the deployed application is professional and follows security best practices.

#### Acceptance Criteria

1. THE Build_System SHALL include appropriate meta tags in `index.html` (description, charset, viewport)
2. THE Deployment_Platform configuration SHALL specify security headers including `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`
3. THE Build_System SHALL include a `robots.txt` file in the `public` directory
4. IF the application encounters an unhandled JavaScript error at runtime, THEN THE application SHALL display a user-friendly error boundary message instead of a blank screen
