<!-- 
SYNC IMPACT REPORT
Version: 1.0.0 (initial creation)
Ratification Date: 2026-05-05
Template Sync Status:
  - plan-template.md: Ensure API-First and Containerized checks
  - spec-template.md: Ensure tech stack alignment
  - tasks-template.md: Categorize by principle (API, UI, Database, Deployment, Testing, Security)
  - commands: All references validated for generic guidance
-->

# PetStore Ecommerce Constitution

## Core Principles

### I. API-First Architecture
All backend functionality MUST be exposed through well-designed RESTful APIs before frontend integration. 
Contract-first development: API specification defined, OpenAPI/Swagger documentation mandatory. 
Backend exposes clear, versioned endpoints for product catalog (cats, dogs, fish, birds), user management, orders, and payments. 
Frontend communicates exclusively via REST API; no direct database access. Enables independent scaling and client flexibility.

### II. Database-Driven State Management
PostgreSQL is the single source of truth for all persistent data.
Database schema MUST support core entities: Products (with categories: cats, dogs, fish, birds), Users, Orders, Inventory, Payments.
No in-memory state for critical data; caching permitted only with explicit invalidation strategy.
Database migrations tracked in version control; every schema change requires versioned migration file.
Ensures data consistency, auditability, and ACID compliance across transactions.

### III. Containerized Development & Deployment
All services MUST run in Docker containers; Docker Compose defines local dev environment.
Backend (Spring Boot), PostgreSQL, and frontend (React dev server) all containerized.
Deployment target: Render platform with containerized services for production consistency.
Enables reproducible environments across dev/test/staging/production; facilitates team onboarding and CI/CD.

### IV. Component-Based UI Design (NON-NEGOTIABLE)
React MUST be used with functional components and hooks; all UI built as reusable, composable components.
Styling: Tailwind CSS for utility-first CSS; Material-UI (MUI) for pre-built, accessible component library.
State management: React Context API for global state; component-level state via hooks.
Every component must have defined props, clear documentation, and accessibility (a11y) attributes.
Ensures maintainability, testability, and consistent user experience across the petstore frontend.

### V. Type Safety & Code Quality (NON-NEGOTIABLE)
Backend: Java Spring Boot with strict compile-time type checking; use interfaces and annotations for API contracts.
Frontend: TypeScript recommended for component props and state; type-safe API client generation from OpenAPI spec.
Lint rules enforced: ESLint (frontend), Checkstyle (backend); no warnings in CI build.
Ensures fewer runtime errors, better IDE support, and clearer developer intent.

### VI. Test-Driven Development (NON-NEGOTIABLE)
Red-Green-Refactor cycle: Tests written first, user approval, tests fail, then implementation.
Backend: Unit tests (JUnit/Mockito) for business logic; Integration tests (TestContainers) for database/API contracts.
Frontend: Unit tests (Jest/React Testing Library) for components; E2E tests (Cypress/Playwright) for user workflows.
Coverage targets: Backend ≥80%, Frontend ≥75%; critical paths ≥90%.
No feature merged without passing test suite; CI/CD gates enforce coverage thresholds.

### VII. Security by Default
Authentication: Implement JWT-based stateless authentication for API endpoints.
Authorization: Role-based access control (RBAC) for product management, order processing, and admin functions.
Input Validation: Strict server-side validation; sanitize all user inputs to prevent SQL injection, XSS, CSRF.
HTTPS enforced in production; environment variables for secrets (API keys, database credentials).
Regular security audits; no credentials hardcoded; use .env files locally, Render secrets in production.

## Technology Stack Specifications

**Backend**:
- Java Spring Boot (latest stable version)
- PostgreSQL 14+ for relational data
- Spring Data JPA for ORM
- Spring Security for authentication/authorization
- Spring Boot Testing (JUnit 5, Mockito, TestContainers) for comprehensive test coverage

**Frontend**:
- React 18+ with functional components and hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Material-UI (MUI) for component library
- Axios or Fetch API for HTTP requests
- Jest + React Testing Library for unit tests
- Cypress/Playwright for E2E tests

**DevOps & Deployment**:
- Docker & Docker Compose for containerization
- Render platform for production deployment
- Environment variable management via .env (dev) and Render secrets (prod)
- GitHub Actions for CI/CD (optional; Render native webhooks acceptable)

**Product Catalog**:
Supported pet categories: Cats, Dogs, Fish, Birds
Each product includes: name, description, price, inventory, images, category

## Development Workflow

**Local Development**:
1. Clone repository
2. Run `docker-compose up` to spin up PostgreSQL, backend, frontend services
3. Backend runs on localhost:8080; frontend on localhost:3000
4. All code changes trigger hot-reload (Spring Boot DevTools, React dev server)

**Feature Development**:
1. Create feature branch from `main`
2. Write tests first (failing); implement feature; tests pass
3. Update OpenAPI spec if adding new endpoints
4. Commit with meaningful message referencing principle(s) affected
5. Push; open PR with test results and coverage

**Code Review & Merge**:
All PRs require: passing CI tests, code coverage gates, peer review approval.
Reviewer checklist: Principle compliance, test adequacy, security validation, performance impact.
Squash commits on merge to keep history clean.

**Deployment to Render**:
Production deployment triggered on merge to `main`.
Render auto-deploys using connected GitHub repository.
Database migrations run automatically on deployment.
Rollback capability maintained; previous versions available via Render dashboard.

## Governance

This Constitution is the source of truth for PetStore development practices. All decisions, code reviews, and feature implementations MUST comply with these principles.

**Amendment Process**:
- Proposed amendments MUST document rationale and impact analysis
- Amendments require team consensus and architectural review
- Version increments: MAJOR for principle removal/redefinition, MINOR for new principles/sections, PATCH for clarifications
- All amendments recorded in LAST_AMENDED_DATE and version history

**Compliance Verification**:
- Pull request reviews verify principle adherence before merge
- Automated checks (linters, test gates, security scanners) enforce code quality
- Quarterly principle effectiveness reviews; adjust if evidence suggests improvement needed
- Development guidance available in: README.md (setup), docs/API.md (endpoint contracts), docs/DEVELOPMENT.md (workflow details)

**Version**: 1.0.0 | **Ratified**: 2026-05-05 | **Last Amended**: 2026-05-05
