# API Contract: GET /api/simeon/categories

**Purpose**: Retrieve list of all available pet categories

**Specification**: Return the four pet categories (Cats, Dogs, Fish, Birds) for populating filter UI.

---

## Request

**Method**: `GET`  
**Path**: `/api/simeon/categories`  
**Content-Type**: N/A

### Request Parameters

None (no query parameters or body)

**Request Example**:
```
GET /api/simeon/categories
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
      "id": "110e8400-e29b-41d4-a716-446655440000",
      "name": "Cats",
      "slug": "cats",
      "description": "Feline companions"
    },
    {
      "id": "220e8400-e29b-41d4-a716-446655440000",
      "name": "Dogs",
      "slug": "dogs",
      "description": "Canine companions"
    },
    {
      "id": "330e8400-e29b-41d4-a716-446655440000",
      "name": "Fish",
      "slug": "fish",
      "description": "Aquatic pets"
    },
    {
      "id": "440e8400-e29b-41d4-a716-446655440000",
      "name": "Birds",
      "slug": "birds",
      "description": "Avian companions"
    }
  ]
}
```

### Response Fields

**Root Object**:
- `data` (array): Array of category objects

**Category Object**:
- `id` (string): UUID identifier
- `name` (string): Display name (Cats, Dogs, Fish, Birds)
- `slug` (string): URL-friendly identifier (cats, dogs, fish, birds)
- `description` (string): Category description (optional but present)

---

## Error Responses

### 500 Internal Server Error

**Cause**: Server-side error (database unavailable)

```json
{
  "error": "Internal server error. Please try again later.",
  "code": "INTERNAL_ERROR",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

---

## Behavior & Rules

**Fixed Categories** (MVP):
- Always returns exactly 4 categories: Cats, Dogs, Fish, Birds
- Order is consistent (alphabetical by name)
- Slugs are lowercase, unique, and stable (used in API queries)

**Caching**:
- Categories are static in MVP (no add/remove)
- Frontend may cache this response (24 hours recommended)
- Invalidate cache if category management is added in future

**Use Cases**:
- Populate filter dropdown/buttons on catalog page
- Validate category parameter in search requests
- Display category labels in breadcrumbs or filters

---

## Performance Expectations

- **Response Time**: < 100ms (cached or simple query)
- **Payload Size**: < 1KB (tiny response)

---

## Examples

### Example 1: Get All Categories

```
GET /api/simeon/categories
```

Response: List of all 4 categories

---

## Testing Scenarios

**Acceptance Test Cases**:
1. ✅ GET /api/simeon/categories returns all 4 categories
2. ✅ Each category has id, name, slug, description
3. ✅ Category names are: Cats, Dogs, Fish, Birds
4. ✅ Slugs are lowercase: cats, dogs, fish, birds
5. ✅ Order is consistent across requests
6. ✅ No duplicate categories
7. ✅ Response time < 100ms
8. ✅ Response is cacheable (Etag/Cache-Control headers)

---

**Version**: 1.0.0  
**Status**: Approved  
**Last Updated**: 2026-05-05
