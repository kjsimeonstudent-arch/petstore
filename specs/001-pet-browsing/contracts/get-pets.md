# API Contract: GET /api/v1/pets

**Purpose**: Retrieve paginated list of pets with optional category filtering and exact-name search

**Specification**: List all pets available for purchase, supporting pagination, category filtering, and text search by exact pet name match.

---

## Request

**Method**: `GET`  
**Path**: `/api/simeon/pets`  
**Content-Type**: N/A (query parameters only)

### Query Parameters

| Parameter | Type | Required | Default | Constraints | Example |
|-----------|------|----------|---------|-----------|---------|
| `page` | integer | No | 0 | ≥ 0 | 0 |
| `size` | integer | No | 10 | 1-100 | 10 |
| `category` | string | No | null | One of: cats, dogs, fish, birds | cats |
| `search` | string | No | null | Max 255 chars; exact match | fluffy |

**Query String Examples**:
```
GET /api/simeon/pets
GET /api/simeon/pets?page=1&size=20
GET /api/simeon/pets?category=cats
GET /api/simeon/pets?search=fluffy
GET /api/simeon/pets?category=dogs&page=0&size=10&search=max
```

### Request Headers

```
Accept: application/json
```

---

## Response

**HTTP Status**: `200 OK`  
**Content-Type**: `application/json`

### Success Response (200)

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
        "alt": "Fluffy the orange cat sitting on a cushion"
      },
      "availabilityStatus": "IN_STOCK"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Buddy",
      "category": "dogs",
      "price": 149.99,
      "description": "Golden Retriever puppy, 6 months old, energetic and loyal",
      "primaryImage": {
        "id": "660e8400-e29b-41d4-a716-446655440002",
        "url": "https://cdn.petstore.com/images/buddy-001.jpg",
        "alt": "Buddy the golden retriever puppy"
      },
      "availabilityStatus": "IN_STOCK"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### Response Fields

**Root Object**:
- `data` (array): Array of pet objects
- `pagination` (object): Pagination metadata

**Pet Object**:
- `id` (string): UUID identifier
- `name` (string): Pet name
- `category` (string): Category slug (cats, dogs, fish, birds)
- `price` (number): Price in USD (2 decimal places)
- `description` (string): Short product description
- `primaryImage` (object): Thumbnail image
- `availabilityStatus` (string): IN_STOCK or OUT_OF_STOCK

**Primary Image Object**:
- `id` (string): UUID identifier
- `url` (string): HTTPS URL to image
- `alt` (string): Alt text for accessibility

**Pagination Object**:
- `page` (integer): Current page number (0-indexed)
- `size` (integer): Items per page
- `total` (integer): Total number of matching pets
- `totalPages` (integer): Total number of pages
- `hasNext` (boolean): Whether a next page exists
- `hasPrevious` (boolean): Whether a previous page exists

---

## Error Responses

### 400 Bad Request

**Cause**: Invalid query parameters (e.g., negative page, size > 100)

```json
{
  "error": "Invalid page size. Must be between 1 and 100.",
  "code": "INVALID_PARAMETER",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

### 404 Not Found

**Cause**: No pets match the filters/search criteria

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

### 500 Internal Server Error

**Cause**: Server-side error (database unavailable, etc.)

```json
{
  "error": "Internal server error. Please try again later.",
  "code": "INTERNAL_ERROR",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

---

## Behavior & Rules

**Pagination**:
- Page numbering is 0-indexed (page 0 = first page)
- Minimum size: 1, maximum size: 100 (prevent abuse)
- Default size: 10 items per page
- If `page` exceeds available pages, return empty data array

**Filtering**:
- Only one category can be filtered at a time (not multi-select per spec)
- Valid categories: cats, dogs, fish, birds (case-insensitive)
- Invalid category returns 400 error

**Search** (Exact-Match Only):
- Search parameter requires exact pet name match (case-insensitive)
- Partial matches return no results (empty data array)
- Example: search="fluffy" matches only pets named exactly "Fluffy" (not "Fluffy's Friend")
- Search is trimmed; leading/trailing spaces removed

**Combination**:
- Category + search: Returns pets matching category AND name
- Example: `?category=cats&search=fluffy` → only cats named "Fluffy"

**Sorting**:
- Default order: By creation date (newest first)
- Sorting parameter not supported in MVP (see scope)

---

## Performance Expectations

- **Response Time**: < 1 second for typical queries (≤1000 matching results)
- **Concurrent Users**: Support 10,000 simultaneous requests
- **Database**: Indexed queries (name, category_id, availability_status)

---

## Examples

### Example 1: Get First Page of All Pets

```
GET /api/simeon/pets?page=0&size=10
```

Response: 10 pets across all categories

### Example 2: Filter by Category

```
GET /api/simeon/pets?category=dogs&page=0&size=10
```

Response: First 10 dogs

### Example 3: Search by Exact Name

```
GET /api/simeon/pets?search=fluffy
```

Response: All pets with name exactly "fluffy" (case-insensitive)

### Example 4: Combination

```
GET /api/simeon/pets?category=cats&search=fluffy&page=0&size=10
```

Response: Cats named "fluffy" (typically 0-1 result)

### Example 5: Empty Search

```
GET /api/simeon/pets?search=nonexistent
```

Response:
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

---

## Testing Scenarios

**Acceptance Test Cases**:
1. ✅ GET /api/simeon/pets returns 10 pets by default
2. ✅ GET /api/simeon/pets?page=1&size=20 returns page 2 with 20 items
3. ✅ GET /api/simeon/pets?category=cats returns only cats
4. ✅ GET /api/simeon/pets?search=fluffy returns pets named exactly "Fluffy"
5. ✅ GET /api/simeon/pets?category=invalid returns 400 error
6. ✅ GET /api/simeon/pets?search=nonexistent returns empty data array
7. ✅ GET /api/simeon/pets?page=999 returns empty data (no error)
8. ✅ GET /api/simeon/pets?size=101 returns 400 error (exceeds max)
9. ✅ Pagination totals are accurate across filters
10. ✅ Response time < 1000ms for typical queries

---

**Version**: 1.0.0  
**Status**: Approved  
**Last Updated**: 2026-05-05
