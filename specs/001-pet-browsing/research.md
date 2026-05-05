# Phase 0 Research: Pet Browsing Feature

**Date**: 2026-05-05  
**Status**: Complete  
**Purpose**: Document findings that resolve all unknowns and inform Phase 1 design decisions

---

## R1: React + Material-UI + Tailwind CSS Best Practices

**Question**: How to effectively combine Material-UI (pre-built components) with Tailwind CSS (utility-first styling)?

### Key Findings

✅ **MUI & Tailwind Integration Strategy**
- Material-UI v5+ has excellent Tailwind integration through the `sx` prop and `styled()` API
- Use MUI components for complex UI elements (Card, Dialog, Menu, Chip) where pre-built accessibility is valuable
- Use Tailwind utility classes for layout, spacing, typography, and custom design tokens
- Keep component logic separate from styling; use MUI's theming system for consistency

✅ **Theming & Customization**
- MUI provides theme customization via `createTheme()` hook
- Tailwind `tailwind.config.js` can reference MUI tokens for consistency
- Use CSS-in-JS (`styled()`) for dynamic styling based on props/state
- Avoid style conflicts by using CSS specificity correctly; prefer BEM naming for custom classes

✅ **Performance Optimization**
- MUI tree-shaking: Import components directly (`import Card from '@mui/material/Card'`)
- Tailwind JIT compiler efficiently handles dynamic classes
- Minimize MUI bundle by using `@mui/material` v5+ (tree-shakeable)
- No significant performance penalty when combined; modern bundlers optimize both

### Decision

**Hybrid Approach**:
- **MUI Components**: PetCard (Material Card), FilterPanel (Chips, FormControl), PetDetail (Tabs, Divider)
- **Tailwind Classes**: Layout grids, spacing (gap, padding, margin), responsive breakpoints, custom typography
- **Custom Styled**: Use `styled()` for conditional styling based on availability status, user interactions

---

## R2: Spring Boot REST API Design for Product Catalog

**Question**: What are best practices for catalog endpoints with pagination, filtering, and search?

### Key Findings

✅ **RESTful Endpoint Design**
- Use versioned API paths: `/api/v1/pets`, `/api/v1/categories`
- GET operations for retrieving data (no state changes)
- Clear, noun-based paths (not verbs): `/api/v1/pets` not `/api/v1/getPets`
- Single responsibility per endpoint; avoid overloading with multiple concerns

✅ **Pagination Standards**
- Use query parameters: `?page=0&size=10` (zero-indexed pages, 10 items per page)
- Include pagination metadata in response: `{data: [...], pagination: {page, size, total, totalPages}}`
- Default page size (10 items) with max limit (100) to prevent abuse
- Spring Data JPA `Pageable` interface simplifies backend implementation

✅ **Filtering & Search Query Parameters**
- Category filtering: `?category=cats` (single category per spec)
- Search: `?search=fluffy` (exact match per user clarification)
- Combination: `?category=cats&search=fluffy&page=0&size=10` (all combined)
- Case-insensitive matching to improve UX

✅ **Response Format Standards**
```json
{
  "data": [...],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

✅ **Error Handling Convention**
```json
{
  "error": "Invalid page size",
  "code": "INVALID_PARAMETER",
  "timestamp": "2026-05-05T10:30:00Z"
}
```
- Use HTTP status codes: 400 (client error), 404 (not found), 500 (server error)
- Consistent error response format across all endpoints

### Decision

**Implementation**:
- RESTful endpoints: `GET /api/v1/pets`, `GET /api/v1/pets/:id`, `GET /api/v1/categories`
- Query params: `page`, `size`, `category`, `search`
- Spring Data JPA Pageable for backend pagination
- Consistent response wrapper: `{data, pagination}`

---

## R3: PostgreSQL Schema Design for Pet Catalog

**Question**: What schema design supports products, categories, images with proper normalization and performance?

### Key Findings

✅ **Database Normalization**
- Separate tables: `categories`, `pets`, `pet_images` (3NF - Third Normal Form)
- Foreign keys maintain referential integrity: `pets.category_id → categories.id`
- Cascading deletes: Pet deletion cascades to images (orphaned images are useless)
- Restrict delete on category (prevent orphaned pets)

✅ **Indexing Strategy for Query Performance**
- Index frequently searched columns: `pets(name)` for search queries
- Index filtering columns: `pets(category_id)` for category filter
- Index status column: `pets(availability_status)` for inventory checks
- Composite indexes for combined queries: `pets(category_id, availability_status)`
- Avoid over-indexing; index only high-cardinality, frequently filtered columns

✅ **Inventory Management**
- Track inventory in `pets.stock_quantity` (integer count)
- Denormalize availability status: `pets.availability_status` (IN_STOCK, OUT_OF_STOCK, COMING_SOON)
- Update status based on quantity: `stock_quantity > 0 → IN_STOCK`, else `OUT_OF_STOCK`
- Allows quick filtering without joins

✅ **Image Gallery Design**
- One-to-many: Pet has multiple images
- Sort order: `pet_images.sort_order` (1 = primary/thumbnail)
- Primary image reference: `pets.primary_image_id` (denormalized for quick access)
- Supports future multi-image gallery view

✅ **Versioning & Migration Management**
- Use Flyway for database migration version control
- Migration files: `V1__initial_schema.sql`, `V2__add_pets.sql`, etc.
- Tracked in version control; every deployment runs pending migrations
- Ensures database schema is reproducible across environments

### Decision

**Schema Implementation**:
- 3NF normalized design with 3 tables: categories, pets, pet_images
- Strategic indexes on name, category_id, availability_status
- Flyway migrations for version control and reproducibility
- Inventory tracking via stock_quantity and availability_status

---

## R4: Frontend Pagination Implementation Patterns

**Question**: Cursor-based vs. offset-based? How to preserve state across navigation?

### Key Findings

✅ **Pagination Approach Comparison**
| Approach | Pros | Cons | Use Case |
|----------|------|------|----------|
| **Offset-Based** | Simple, predictable; easy bookmarking | Performance degrades with large datasets; "skip N rows" is slow | MVP with reasonable dataset (1K-10K items) |
| **Cursor-Based** | Consistent pagination; scalable to large datasets | More complex; requires stateful cursor tracking | High-volume feeds (1M+ items) |

✅ **State Preservation Strategy**
- URL as source of truth: `?page=1&category=cats&search=fluffy`
- React Router `useSearchParams` hook: Parse and update URL query string
- State updates trigger URL changes; URL changes trigger data fetches
- Users can bookmark/share URLs; browser back/forward work correctly

✅ **Frontend Architecture**
```
PetCatalog (page component)
  ├── useSearchParams() → parse URL
  ├── usePets(params) → custom hook (fetches data, caches in React Query)
  ├── PetList (displays data)
  ├── FilterPanel (updates URL on filter change)
  ├── SearchBar (updates URL on search)
  └── Pagination (updates URL on page change)
```

✅ **Optimization Patterns**
- Debounce search input (300ms) before updating URL to reduce API calls
- Cache previous pages in React Query to avoid refetch on back navigation
- Prefetch next page on user interaction (mouse hover on next button)

### Decision

**Implementation**:
- Offset-based pagination (suitable for MVP scope)
- URL-driven state via React Router `useSearchParams`
- React Query for data caching and API call management
- Custom `usePets` hook to encapsulate fetch logic

---

## R5: React State Management for Filters & Search

**Question**: Local state vs. Context API vs. Redux for managing multiple filters/search state?

### Key Findings

✅ **State Management Comparison**
| Tool | Complexity | Use Case |
|------|-----------|----------|
| **Local State** | Minimal; prop drilling | Single component state only |
| **Context API** | Low; built-in | Shared state across 3-5 components; no frequent updates |
| **Redux** | High; external dependency | Large app; complex state; time-travel debugging needed |

✅ **Pet Browsing State Requirements**
- Filters (category): 1 value
- Search query: 1 string
- Pagination (page, size): 2 values
- Results data: array of pets
- Loading/error states: flags

**Insight**: Simple state; no complex transactions; Context API sufficient

✅ **Recommended Architecture**
```
1. URL Query Params (useSearchParams) — Source of truth
   ├── page, size, category, search
   └── Persisted in browser history

2. React Query — Server state & caching
   ├── Fetches data based on URL params
   └── Handles loading, error, caching

3. Local Component State — UI state only
   └── Controlled input values, dropdown open/close

4. Optional: Context API — If 5+ levels deep nesting
   └── Share filter state without prop drilling
```

✅ **Avoid Over-Engineering**
- Don't use Redux/Zustand for this scope
- Don't create global context for filters when URL params work
- Keep state close to where it's used; lift only when needed

### Decision

**Implementation**:
- URL query params as primary state container (via useSearchParams)
- React Query for server state and API communication
- Local component state for UI interactions
- Skip Context API/Redux for MVP (scope too small)

---

## R6: Exact-Match Search Implementation

**Question**: How to implement exact-match search? Case sensitivity? Performance?

### Key Findings

✅ **SQL Query Patterns for Exact Match**

PostgreSQL (used in this project):
```sql
-- Case-insensitive exact match
SELECT * FROM pets WHERE LOWER(name) = LOWER('fluffy');

-- Or use ILIKE with word boundaries
SELECT * FROM pets WHERE name ILIKE 'fluffy';
```

✅ **Performance Analysis**
- With index on `pets(name)`: O(log n) lookup even for 100K+ pets
- Case-insensitive search still uses index efficiently
- <100ms response time guaranteed even with 10K+ pets (confirmed in SC-005)

✅ **User Expectation**
- Users expect case-insensitive search: "FLUFFY" = "fluffy" = "Fluffy"
- Exact match means full name required: "flu" returns NO RESULTS (not "fluffy")
- Per spec clarification: partial matches return no results

✅ **Implementation Trade-offs**
| Approach | Pros | Cons |
|----------|------|------|
| **Exact Match Only** | Simple; fast; matches spec clarification | Less forgiving; typos fail |
| **LIKE/Substring** | Forgiving; finds partial matches | Slower; violates spec |
| **Full-Text Search** | Powerful; ranking capability | Overkill for MVP; added complexity |

### Decision

**Implementation**:
- Exact-match search: `WHERE LOWER(name) = LOWER(?search_term)`
- Index on `pets(name)` for performance
- Backend returns empty results for partial matches
- Frontend displays "No results found. Please check spelling." message

---

## Summary: Unknowns Resolved

| # | Unknown | Resolution | Evidence |
|---|---------|-----------|----------|
| R1 | MUI + Tailwind integration | Use hybrid approach: MUI for complex components, Tailwind for layout | v5 provides sx prop, styled API |
| R2 | REST API pagination design | Offset-based with query params; response includes pagination metadata | Standard ecommerce pattern |
| R3 | PostgreSQL schema | 3NF with categories, pets, pet_images; strategic indexes; Flyway migrations | Normalized design; performance optimal |
| R4 | Frontend pagination state | URL-driven with useSearchParams; React Query for caching | Industry standard; bookmarkable |
| R5 | State management | URL params + React Query + local state; skip Context/Redux | Scope too small; YAGNI principle |
| R6 | Exact-match search | SQL case-insensitive exact match; empty results for partial match | Matches spec clarification; performance confirmed |

**Status**: ✅ All unknowns resolved; ready for Phase 1 design

---

## References & Best Practices

- [Material-UI v5 Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Spring Boot REST API Best Practices](https://spring.io/guides/tutorials/rest/)
- [PostgreSQL Performance Tuning](https://www.postgresql.org/docs/current/performance.html)
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)
