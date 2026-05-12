# Tasks: Pet Browsing

**Input**: Design documents from `/specs/001-pet-browsing/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: TDD mandatory per Constitution VI - tests written first, red-green-refactor cycle

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/main/java/com/petstore/`
- **Frontend**: `frontend/src/`
- **Tests**: `backend/src/test/`, `frontend/src/tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Spring Boot backend project with Maven dependencies
- [ ] T002 Initialize React + TypeScript frontend project with npm dependencies
- [ ] T003 [P] Configure Docker Compose for local development environment
- [ ] T004 [P] Setup PostgreSQL database with Docker
- [ ] T005 Configure linting and formatting (ESLint, Prettier for frontend; Spotless for backend)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Setup Flyway migrations for PostgreSQL schema
- [ ] T007 [P] Create Category JPA entity in backend/src/main/java/com/petstore/models/Category.java
- [ ] T008 [P] Create Pet JPA entity in backend/src/main/java/com/petstore/models/Pet.java
- [ ] T009 [P] Create Image JPA entity in backend/src/main/java/com/petstore/models/Image.java
- [ ] T010 [P] Create CategoryRepository interface in backend/src/main/java/com/petstore/repositories/CategoryRepository.java
- [ ] T011 [P] Create PetRepository interface in backend/src/main/java/com/petstore/repositories/PetRepository.java
- [ ] T012 [P] Create ImageRepository interface in backend/src/main/java/com/petstore/repositories/ImageRepository.java
- [ ] T013 Configure Spring Data JPA with PostgreSQL
- [ ] T014 Setup global error handling and validation in backend
- [ ] T015 Configure CORS for frontend-backend communication

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Pet Catalog (Priority: P1) 🎯 MVP

**Goal**: Display paginated list of pets with name, image, price, category

**Independent Test**: Load homepage, verify pets display with images/pricing, pagination works

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T016 [P] [US1] Contract test for GET /api/simeon/pets in backend/src/test/java/com/petstore/contracts/GetPetsContractTest.java
- [ ] T017 [P] [US1] Unit tests for PetService in backend/src/test/java/com/petstore/services/PetServiceTest.java
- [ ] T018 [P] [US1] Unit tests for PetController in backend/src/test/java/com/petstore/controllers/PetControllerTest.java
- [ ] T019 [P] [US1] Frontend unit tests for PetCatalog component in frontend/src/tests/components/PetCatalog.test.tsx
- [ ] T020 [P] [US1] Frontend unit tests for PetCard component in frontend/src/tests/components/PetCard.test.tsx

### Implementation for User Story 1

- [ ] T021 [US1] Implement PetService in backend/src/main/java/com/petstore/services/PetService.java
- [ ] T022 [US1] Implement PetController with GET /api/simeon/pets in backend/src/main/java/com/petstore/controllers/PetController.java
- [ ] T023 [US1] Create PetDTO and CategoryDTO in backend/src/main/java/com/petstore/dto/
- [ ] T024 [US1] Implement PetCatalog page component in frontend/src/pages/PetCatalog.tsx
- [ ] T025 [US1] Implement PetCard component in frontend/src/components/PetCard.tsx
- [ ] T026 [US1] Implement Pagination component in frontend/src/components/Pagination.tsx
- [ ] T027 [US1] Create petService API client in frontend/src/services/petService.ts
- [ ] T028 [US1] Configure React Router for catalog route in frontend/src/App.tsx
- [ ] T029 [US1] Add responsive styling with Tailwind CSS

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Filter Pets by Category (Priority: P1)

**Goal**: Support category filtering (cats, dogs, fish, birds) in pet catalog

**Independent Test**: Select category filters, verify only matching pets display

### Tests for User Story 2 ⚠️

- [ ] T030 [P] [US2] Contract test for GET /api/simeon/categories in backend/src/test/java/com/petstore/contracts/GetCategoriesContractTest.java
- [ ] T031 [P] [US2] Unit tests for CategoryService in backend/src/test/java/com/petstore/services/CategoryServiceTest.java
- [ ] T032 [P] [US2] Unit tests for CategoryController in backend/src/test/java/com/petstore/controllers/CategoryControllerTest.java
- [ ] T033 [P] [US2] Frontend unit tests for FilterPanel component in frontend/src/tests/components/FilterPanel.test.tsx

### Implementation for User Story 2

- [ ] T034 [US2] Implement CategoryService in backend/src/main/java/com/petstore/services/CategoryService.java
- [ ] T035 [US2] Implement CategoryController with GET /api/simeon/categories in backend/src/main/java/com/petstore/controllers/CategoryController.java
- [ ] T036 [US2] Update PetService to support category filtering
- [ ] T037 [US2] Update PetController GET /api/simeon/pets to handle category parameter
- [ ] T038 [US2] Implement FilterPanel component in frontend/src/components/FilterPanel.tsx
- [ ] T039 [US2] Create categoryService API client in frontend/src/services/categoryService.ts
- [ ] T040 [US2] Update PetCatalog to integrate FilterPanel and handle category state
- [ ] T041 [US2] Add URL state management for category filter with React Router

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Pet Details (Priority: P1)

**Goal**: Display complete pet information with full description, images, characteristics

**Independent Test**: Click pet, verify detail page shows all information, navigation works

### Tests for User Story 3 ⚠️

- [ ] T042 [P] [US3] Contract test for GET /api/simeon/pets/{id} in backend/src/test/java/com/petstore/contracts/GetPetDetailContractTest.java
- [ ] T043 [P] [US3] Frontend unit tests for PetDetail component in frontend/src/tests/components/PetDetail.test.tsx

### Implementation for User Story 3

- [ ] T044 [US3] Update PetService to fetch pet with images
- [ ] T045 [US3] Update PetController GET /api/simeon/pets/{id} to return full pet details
- [ ] T046 [US3] Implement PetDetail page component in frontend/src/pages/PetDetail.tsx
- [ ] T047 [US3] Add image gallery component in frontend/src/components/ImageGallery.tsx
- [ ] T048 [US3] Update petService to fetch individual pet details
- [ ] T049 [US3] Configure React Router for detail route /pets/:id
- [ ] T050 [US3] Add navigation links from PetCard to PetDetail

**Checkpoint**: All P1 user stories should now be independently functional

---

## Phase 6: User Story 4 - Search Pets by Name (Priority: P2)

**Goal**: Enable exact-name search functionality in pet catalog

**Independent Test**: Search for exact pet names, verify accurate results or no-results message

### Tests for User Story 4 ⚠️

- [ ] T051 [P] [US4] Contract test for GET /api/simeon/pets search in backend/src/test/java/com/petstore/contracts/SearchPetsContractTest.java
- [ ] T052 [P] [US4] Frontend unit tests for SearchBar component in frontend/src/tests/components/SearchBar.test.tsx

### Implementation for User Story 4

- [ ] T053 [US4] Update PetService to support exact name search
- [ ] T054 [US4] Update PetController GET /api/simeon/pets to handle search parameter
- [ ] T055 [US4] Implement SearchBar component in frontend/src/components/SearchBar.tsx
- [ ] T056 [US4] Update PetCatalog to integrate SearchBar and handle search state
- [ ] T057 [US4] Add URL state management for search query
- [ ] T058 [US4] Implement no-results message and clear search functionality

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T059 [P] Configure OpenAPI/Swagger documentation in backend
- [ ] T060 [P] Add Cypress E2E tests for complete user flows
- [ ] T061 Performance optimization and database query tuning
- [ ] T062 Security review and input validation hardening
- [ ] T063 Accessibility improvements (WCAG compliance)
- [ ] T064 [P] Docker containerization for production deployment
- [ ] T065 [P] Render deployment configuration
- [ ] T066 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational - Integrates with US1 but independently testable
- **User Story 3 (P1)**: Can start after Foundational - Integrates with US1 but independently testable
- **User Story 4 (P2)**: Can start after Foundational - Builds on US1 catalog functionality

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Backend services before controllers
- Frontend services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational completes, all user stories can start in parallel
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for GET /api/simeon/pets in backend/src/test/java/com/petstore/contracts/GetPetsContractTest.java"
Task: "Unit tests for PetService in backend/src/test/java/com/petstore/services/PetServiceTest.java"
Task: "Unit tests for PetController in backend/src/test/java/com/petstore/controllers/PetControllerTest.java"
Task: "Frontend unit tests for PetCatalog component in frontend/src/tests/components/PetCatalog.test.tsx"
Task: "Frontend unit tests for PetCard component in frontend/src/tests/components/PetCard.test.tsx"

# Launch all models for User Story 1 together:
Task: "Create Category JPA entity in backend/src/main/java/com/petstore/models/Category.java"
Task: "Create Pet JPA entity in backend/src/main/java/com/petstore/models/Pet.java"
Task: "Create Image JPA entity in backend/src/main/java/com/petstore/models/Image.java"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Browse)
   - Developer B: User Story 2 (Filter)
   - Developer C: User Story 3 (Details)
   - Developer D: User Story 4 (Search)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD mandatory)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence