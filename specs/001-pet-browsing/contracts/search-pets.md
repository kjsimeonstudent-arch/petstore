# API Contract: GET /api/v1/pets (Search Endpoint)

**Purpose**: Search for pets by exact name match

**Specification**: This is an alias/specialization of the main GET /api/v1/pets endpoint, documented separately for clarity on search-specific behavior.

---

## Request

**Method**: `GET`  
**Path**: `/api/simeon/pets`  
**Query Parameter Focus**: `search`  
**Content-Type**: N/A

### Query Parameters

| Parameter | Type | Required | Default | Constraints | Example |
|-----------|------|----------|---------|-----------|---------|
| `search` | string | Yes | N/A | Max 255 chars; exact match | fluffy |
| `page` | integer | No | 0 | ≥ 0 | 0 |
| `size` | integer | No | 10 | 1-100 | 10 |
| `category` | string | No | null | Optional filter | cats |

**Request Examples**:
```
GET /api/simeon/pets?search=fluffy
GET /api/simeon/pets?search=buddy&category=dogs
GET /api/simeon/pets?search=max&page=0&size=20
```

### Request Headers

```
Accept: application/json
```

---

## Response

**HTTP Status**: `200 OK` (even if no results)  
**Content-Type**: `application/json`

### Success Response: Results Found

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Fluffy",
      "category": "cats",
      "price": 49.99,
      "description": "Orange tabby cat, 2 years old, friendly and playful",
      "primaryImage": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "url": "https://cdn.petstore.com/images/fluffy-001.jpg",
        "alt": "Fluffy the orange cat"
      },
      "availabilityStatus": "IN_STOCK"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

### Success Response: No Results Found

```json
{
  "data": [],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 0,
    "totalPages": 0,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

### Response Fields

Same as [GET /api/v1/pets](get-pets.md#success-response-200) contract.

---

## Search Behavior & Rules

### Exact-Match Semantics

**Definition**: Pet name must match the search string exactly (case-insensitive).

**Examples**:

| Search Query | Pet Name | Match? |
|--------------|----------|--------|
| "fluffy" | "Fluffy" | ✅ YES (case-insensitive) |
| "fluffy" | "fluffy" | ✅ YES |
| "Fluffy" | "fluffy" | ✅ YES |
| "flu" | "Fluffy" | ❌ NO (partial match) |
| "Fluffy's Friend" | "Fluffy's Friend" | ✅ YES (full match) |
| "fluffy " (trailing space) | "Fluffy" | ✅ YES (spaces trimmed) |
| "fluffycat" | "Fluffy Cat" | ❌ NO (not exact due to space) |

### Implementation Details

**Backend Processing**:
1. Trim leading/trailing whitespace from search parameter
2. Convert both search term and pet name to lowercase for comparison
3. Use SQL: `WHERE LOWER(name) = LOWER(?search_term)`
4. Return matching records ordered by creation date (newest first)

**Database Index**:
- Index on `LOWER(name)` column for performance
- Ensures <100ms response time even with 1M+ pets

### Combining with Other Filters

**Category + Search**:
```
GET /api/v1/pets?search=fluffy&category=cats
```
- Returns cats named exactly "Fluffy" (typically 0-1 result)
- Both filters must match

**Pagination + Search**:
```
GET /api/v1/pets?search=fluffy&page=0&size=10
```
- If multiple pets named "Fluffy" exist, pagination works normally
- Total count reflects exact-match results only

---

## Error Responses

### 400 Bad Request

**Cause**: Invalid search parameter (e.g., exceeds 255 chars)

```json
{
  "error": "Search term exceeds maximum length of 255 characters.",
  "code": "INVALID_PARAMETER",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

### 400 Bad Request

**Cause**: Invalid category with search

```json
{
  "error": "Invalid category. Must be one of: cats, dogs, fish, birds.",
  "code": "INVALID_PARAMETER",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error. Please try again later.",
  "code": "INTERNAL_ERROR",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

---

## Frontend Integration

### UI Behavior

**Search Bar Interaction**:
1. User types pet name in search input
2. User presses Enter or clicks Search button
3. Frontend updates URL: `?search=query&page=0` (reset to page 0)
4. Frontend fetches: `GET /api/v1/pets?search=query`
5. Display results or "No pets found" message

**Result Display**:
```
Search Results for "fluffy"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Found 1 pet

[Pet Card: Fluffy - $49.99]

(Or if no results)

No pets found matching "fluffy".
Please check the spelling or try a different search.
```

**Clear Search**:
- Clear input button resets to `GET /api/v1/pets` (no search)
- Full catalog is restored

---

## Performance Expectations

- **Response Time**: < 1 second for typical searches
- **Index Performance**: O(log n) with indexed name column
- **Example**: 100K pets, search response < 50ms (network overhead included)

---

## Examples

### Example 1: Simple Search

```
GET /api/simeon/pets?search=fluffy
```

Response: All pets named exactly "Fluffy"

### Example 2: Case-Insensitive Search

```
GET /api/simeon/pets?search=FLUFFY
```

Response: Same as "fluffy" (case-insensitive)

### Example 3: Search in Category

```
GET /api/simeon/pets?search=buddy&category=dogs
```

Response: Dogs named "Buddy"

### Example 4: Partial Match (No Results)

```
GET /api/simeon/pets?search=flu
```

Response:
```json
{
  "data": [],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

### Example 5: Search with Pagination

```
GET /api/simeon/pets?search=max&page=1&size=5
```

Response: Page 2 of results for pets named "Max" (5 per page)

---

## Testing Scenarios

**Acceptance Test Cases**:
1. ✅ GET /api/simeon/pets?search=exact_name returns matching pet
2. ✅ Search is case-insensitive (FLUFFY = fluffy)
3. ✅ Partial match returns no results (flu ≠ fluffy)
4. ✅ Trailing/leading spaces are trimmed
5. ✅ GET /api/simeon/pets?search=nonexistent returns empty data
6. ✅ Search + category filter returns intersection
7. ✅ Search + pagination works correctly
8. ✅ Search term exceeding 255 chars returns 400
9. ✅ Response time < 1000ms
10. ✅ No results message is user-friendly

---

## Migration Notes

**Future Enhancement**: Fuzzy or partial-match search could be added in v2:
- Requires different implementation (full-text search, trigrams, or Elasticsearch)
- Would return results ranked by relevance
- Backward compatible if done via optional parameter: `?search=flu&fuzzy=true`

---

**Version**: 1.0.0  
**Status**: Approved  
**Last Updated**: 2026-05-05
