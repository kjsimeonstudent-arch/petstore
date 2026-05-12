# Developer Quickstart: Pet Browsing Feature

**Date**: 2026-05-05  
**Status**: Complete  
**Purpose**: Get developers up to speed on local setup, running, and testing the pet browsing feature

---

## Prerequisites

- **Git**: Version 2.0+
- **Docker & Docker Compose**: Latest stable version
- **Java**: JDK 17+ (if running backend outside container)
- **Node.js**: 18+ (if running frontend outside container)
- **Text Editor/IDE**: VS Code, IntelliJ, or similar

---

## Quick Start (5 minutes)

### 1. Clone & Navigate to Project

```bash
git clone <repository-url> petstore
cd petstore
```

### 2. Start All Services

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on `localhost:5432` (credentials in `.env`)
- **Backend** on `http://localhost:8080`
- **Frontend** on `http://localhost:3000`

### 3. Access the Application

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) (uses /api/simeon/ namespace)
- **Database**: Connect with any PostgreSQL client (localhost:5432)

### 4. Verify Services

```bash
# Check if services are running
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs frontend
```

---

## Detailed Setup

### Backend Setup

**Option A: Run in Docker (Recommended)**

```bash
# Services start automatically with docker-compose up
docker-compose up -d backend

# View logs
docker-compose logs -f backend

# Stop
docker-compose stop backend
```

**Option B: Run Locally**

```bash
cd backend

# Install dependencies
mvn clean install

# Run migrations
mvn flyway:migrate

# Start Spring Boot (port 8080)
mvn spring-boot:run

# Or use your IDE's run configuration
```

### Frontend Setup

**Option A: Run in Docker (Recommended)**

```bash
# Services start automatically with docker-compose up
docker-compose up -d frontend

# View logs
docker-compose logs -f frontend

# Stop
docker-compose stop frontend
```

**Option B: Run Locally**

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (port 3000)
npm start

# Browser opens automatically
```

### Database Setup

**Option A: Docker (Automatic)**

```bash
# PostgreSQL starts with docker-compose up
# Flyway migrations run on backend startup
```

**Option B: Manual Migration**

```bash
# If migrations don't run automatically
docker-compose exec backend mvn flyway:migrate

# Or connect directly to PostgreSQL
psql -h localhost -U petstore -d petstore_db

# Run migrations manually (see backend/src/main/resources/db/migration/)
```

---

## Environment Configuration

### Backend (.env)

```bash
# Database
POSTGRES_USER=petstore
POSTGRES_PASSWORD=petstore_password
POSTGRES_DB=petstore_db
DATABASE_URL=jdbc:postgresql://postgres:5432/petstore_db

# Spring Boot
SPRING_ENVIRONMENT=development
SERVER_PORT=8080
LOGGING_LEVEL=DEBUG
```

### Frontend (.env)

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_API_VERSION=v1
```

---

## Project Structure

```
backend/
├── src/main/java/com/petstore/
│   ├── models/              # JPA entities
│   ├── repositories/        # Spring Data repositories
│   ├── services/            # Business logic
│   ├── api/                 # REST controllers
│   └── config/              # Configuration
├── src/test/java/           # Tests
├── src/main/resources/db/migration/  # Flyway migrations
└── pom.xml

frontend/
├── src/
│   ├── components/          # React components
│   ├── pages/               # Page-level components
│   ├── services/            # API client
│   ├── types/               # TypeScript types
│   └── App.tsx
├── cypress/                 # E2E tests
├── package.json
└── tailwind.config.js
```

---

## Common API Endpoints

### Pet Catalog

```bash
# List all pets (paginated)
curl -X GET "http://localhost:8080/api/simeon/pets?page=0&size=10"

# Filter by category
curl -X GET "http://localhost:8080/api/simeon/pets?category=cats"

# Search by exact name
curl -X GET "http://localhost:8080/api/simeon/pets?search=fluffy"

# Get pet details
curl -X GET "http://localhost:8080/api/simeon/pets/{petId}"

# List categories
curl -X GET "http://localhost:8080/api/simeon/categories"
```

### Swagger UI

Interactive API documentation available at `http://localhost:8080/swagger-ui.html`

---

## Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | PetCatalog | Main pet listing/browsing |
| `/pets/:id` | PetDetail | Individual pet details |

### Navigation Examples

```
Home → All Pets
Home → Filter: Cats → Cats only
Home → Search: "fluffy" → Search results
Home → Pet Card → Pet Detail View → Back to Catalog
```

---

## Running Tests

### Backend Tests

```bash
# Unit tests
cd backend
mvn test

# Integration tests (requires Docker)
mvn verify

# Run specific test class
mvn test -Dtest=PetControllerTest

# View coverage
mvn jacoco:report
open target/site/jacoco/index.html
```

### Frontend Tests

```bash
# Run all tests
cd frontend
npm test

# Run specific test file
npm test -- PetCatalog.test.tsx

# Watch mode (re-run on file change)
npm test -- --watch

# Coverage report
npm test -- --coverage
```

### E2E Tests (Cypress)

```bash
cd frontend

# Open Cypress interactive mode
npm run cypress:open

# Run all E2E tests headless
npm run cypress:run

# Run specific test
npm run cypress:run -- --spec "cypress/e2e/browsing.cy.ts"
```

---

## Development Workflow

### Making Backend Changes

1. **Edit** Java files in `backend/src/main/java/`
2. **Spring Boot DevTools** watches for changes → auto-recompiles
3. **Refresh browser** to see changes
4. **Write tests first** per TDD principle (Constitution VI)

```bash
# View hot-reload in action
docker-compose logs -f backend | grep "restarted"
```

### Making Frontend Changes

1. **Edit** React/TypeScript files in `frontend/src/`
2. **React dev server** watches → auto-recompiles → hot-reload
3. **Browser refreshes automatically** (or live reload with React Fast Refresh)

```bash
# View hot-reload in action
docker-compose logs -f frontend | grep "compiled"
```

### Database Changes

1. **Create new migration** in `backend/src/main/resources/db/migration/`
2. **Naming**: `V{number}__{description}.sql` (e.g., `V3__add_pet_tags.sql`)
3. **Flyway** automatically runs pending migrations on next startup

```bash
# Example migration
cat > backend/src/main/resources/db/migration/V2__add_pets.sql << 'EOF'
INSERT INTO categories (name, slug) VALUES ('Cats', 'cats');
INSERT INTO pets (name, category_id, price, description) VALUES (...);
EOF

docker-compose restart backend
```

---

## Troubleshooting

### Backend won't start

```bash
# Check logs
docker-compose logs backend

# Verify database connection
docker-compose exec backend ./mvnw spring-boot:run

# Rebuild
docker-compose build backend
docker-compose up -d backend
```

### Frontend blank/errors

```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start

# Check API connectivity (open browser console)
# Try fetching: http://localhost:8080/api/simeon/categories
```

### Database connection refused

```bash
# Ensure PostgreSQL is running
docker-compose ps postgres

# Check credentials
docker-compose exec postgres psql -U petstore -d petstore_db -c "SELECT 1"

# Restart database
docker-compose restart postgres
```

### Port already in use

```bash
# Find process on port (e.g., 3000)
lsof -i :3000

# Kill and restart
kill -9 <PID>
docker-compose up -d frontend
```

---

## Useful Commands

### Docker Compose

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs (all services)
docker-compose logs -f

# Logs for specific service
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend mvn test

# Rebuild images
docker-compose build

# Remove volumes (resets database)
docker-compose down -v
```

### Maven (Backend)

```bash
# Clean and build
mvn clean install

# Run tests
mvn test

# Run single test
mvn test -Dtest=PetControllerTest

# Check code quality
mvn checkstyle:check

# Generate documentation
mvn javadoc:javadoc
```

### npm (Frontend)

```bash
# Install dependencies
npm install

# Development server
npm start

# Build for production
npm run build

# Tests
npm test

# Linting
npm run lint

# Format code
npm run format
```

---

## Verifying Everything Works

### Checklist

- [ ] All Docker containers are running (`docker-compose ps`)
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:8080/api/simeon/pets
- [ ] Database is accessible (via database client or CLI)
- [ ] Swagger UI shows API documentation
- [ ] At least one pet is displayed in the catalog
- [ ] Category filter dropdown shows all 4 categories
- [ ] Clicking a pet shows detail page
- [ ] Backend tests pass (`mvn test`)
- [ ] Frontend tests pass (`npm test`)

### Health Checks

```bash
# Backend health
curl http://localhost:8080/actuator/health

# Database status
docker-compose exec postgres pg_isready

# Frontend running
curl http://localhost:3000

# API endpoint
curl http://localhost:8080/api/simeon/categories | jq
```

---

## Documentation References

- **Backend**: [Spring Boot Guide](https://spring.io/guides/gs/rest-service/)
- **Frontend**: [React Documentation](https://react.dev/)
- **Database**: [PostgreSQL Docs](https://www.postgresql.org/docs/)
- **API Contracts**: See `specs/001-pet-browsing/contracts/`
- **Data Model**: See `specs/001-pet-browsing/data-model.md`

---

## Next Steps

1. **Explore the Code**: Navigate through backend and frontend source
2. **Run Tests**: `mvn test` and `npm test` to see the test suite
3. **Make Changes**: Try editing a component or endpoint
4. **Review Architecture**: Check `plan.md` for design decisions
5. **Start Development**: Follow the task list in `tasks.md` (generated by `/speckit.tasks`)

---

## Support & Questions

- **Logs**: Check `docker-compose logs` for detailed error messages
- **API Docs**: Interactive Swagger UI at http://localhost:8080/swagger-ui.html
- **Constitution**: Review `.specify/memory/constitution.md` for development principles
- **Design**: Refer to `specs/001-pet-browsing/plan.md` for architecture

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-05  
**Status**: Ready for Development
