<!-- SPECKIT START -->
## Current Implementation Plan

**Feature**: Pet Browsing  
**Branch**: `001-pet-browsing`  
**Plan**: [specs/001-pet-browsing/plan.md](../specs/001-pet-browsing/plan.md)

### Quick Reference

- **Tech Stack**: Java Spring Boot, React 18 + TypeScript, PostgreSQL, Docker, Render
- **Architecture**: Web application (fullstack) with separate backend and frontend
- **API**: RESTful with versioning (/api/simeon/pets, /api/simeon/categories)
- **UI Components**: Material-UI + Tailwind CSS with React Context for state
- **Database**: PostgreSQL with Flyway migrations
- **Testing**: TDD mandatory; JUnit 5 + Mockito (backend), Jest + React Testing Library (frontend)

### Key Design Decisions

1. **API-First**: All backend functionality exposed via REST APIs (Constitution I)
2. **Containerized**: Docker Compose for local dev; Render for production (Constitution III)
3. **Component-Based**: React functional components with MUI + Tailwind (Constitution IV)
4. **Type-Safe**: Java Spring Boot + TypeScript for compile-time type checking (Constitution V)
5. **TDD**: Tests written first; red-green-refactor cycle (Constitution VI)

### Navigation

- **Specification**: [specs/001-pet-browsing/spec.md](../specs/001-pet-browsing/spec.md)
- **Plan**: [specs/001-pet-browsing/plan.md](../specs/001-pet-browsing/plan.md)
- **Research**: [specs/001-pet-browsing/research.md](../specs/001-pet-browsing/research.md)
- **Data Model**: [specs/001-pet-browsing/data-model.md](../specs/001-pet-browsing/data-model.md)
- **API Contracts**: [specs/001-pet-browsing/contracts/](../specs/001-pet-browsing/contracts/)
- **Quickstart**: [specs/001-pet-browsing/quickstart.md](../specs/001-pet-browsing/quickstart.md)
- **Constitution**: [.specify/memory/constitution.md](.specify/memory/constitution.md)

### Development Workflow

1. Read the plan and research for context
2. Follow data model for entity structure
3. Review API contracts for endpoint specs
4. Use quickstart for local setup
5. Follow TDD: write test first, then implement
6. Reference Constitution principles in reviews

**Status**: ✅ Plan complete; ready for `/speckit.tasks` execution
<!-- SPECKIT END -->
