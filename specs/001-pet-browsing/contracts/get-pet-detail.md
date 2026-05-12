# API Contract: GET /api/simeon/pets/{id}

**Purpose**: Retrieve complete details for a single pet product

**Specification**: Fetch full product information including all images, detailed description, characteristics, and inventory status.

---

## Request

**Method**: `GET`  
**Path**: `/api/simeon/pets/{id}`  
**Content-Type**: N/A

### Path Parameters

| Parameter | Type | Required | Constraints | Example |
|-----------|------|----------|-----------|---------|
| `id` | string (UUID) | Yes | Valid UUID format | 550e8400-e29b-41d4-a716-446655440000 |

**Request Examples**:
```
GET /api/simeon/pets/550e8400-e29b-41d4-a716-446655440000
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
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Fluffy",
  "category": "cats",
  "price": 49.99,
  "description": "Orange tabby cat, 2 years old, friendly and playful",
  "detailedDescription": "Fluffy is a sweet and affectionate orange tabby cat looking for a loving home. She loves playing with toys, lounging in sunny spots, and being pet by her humans. Fluffy is 2 years old and has a playful yet calm demeanor. She does well with children and other cats. Fluffy's ideal home would have plenty of vertical spaces for climbing and a cozy place to nap.",
  "characteristics": {
    "breed": "Mixed Tabby",
    "age": "2 years",
    "color": "Orange",
    "size": "Small",
    "temperament": "Friendly, playful"
  },
  "availabilityStatus": "IN_STOCK",
  "stockQuantity": 1,
  "images": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "url": "https://cdn.petstore.com/images/fluffy-001.jpg",
      "alt": "Fluffy sitting on a cushion",
      "sortOrder": 1
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440002",
      "url": "https://cdn.petstore.com/images/fluffy-002.jpg",
      "alt": "Fluffy playing with a toy",
      "sortOrder": 2
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440003",
      "url": "https://cdn.petstore.com/images/fluffy-003.jpg",
      "alt": "Fluffy sleeping",
      "sortOrder": 3
    }
  ]
}
```

### Response Fields

**Root Object**:
- `id` (string): UUID identifier
- `name` (string): Pet name
- `category` (string): Category slug (cats, dogs, fish, birds)
- `price` (number): Price in USD
- `description` (string): Short description (from catalog)
- `detailedDescription` (string): Full marketing/product description
- `characteristics` (object): Pet-specific attributes (varies by category)
- `availabilityStatus` (string): IN_STOCK or OUT_OF_STOCK
- `stockQuantity` (integer): Number in inventory
- `images` (array): Full image gallery, ordered by sortOrder

**Image Object**:
- `id` (string): UUID identifier
- `url` (string): HTTPS URL to image
- `alt` (string): Alt text for accessibility
- `sortOrder` (integer): Display order (1 = primary, 2 = second, etc.)

**Characteristics** (varies by category):

**Cats**:
```json
{
  "breed": "Mixed Tabby",
  "age": "2 years",
  "color": "Orange",
  "size": "Small",
  "temperament": "Friendly, playful"
}
```

**Dogs**:
```json
{
  "breed": "Golden Retriever",
  "age": "6 months",
  "size": "Medium (growing)",
  "temperament": "Energetic, loyal",
  "vaccinations": "Up to date"
}
```

**Fish**:
```json
{
  "species": "Goldfish",
  "size": "3 inches",
  "tankSize": "20 gallon minimum",
  "waterType": "Freshwater",
  "lifespan": "10-15 years"
}
```

**Birds**:
```json
{
  "species": "African Grey Parrot",
  "wingspan": "24 inches",
  "color": "Grey with red accents",
  "lifespan": "40-60 years",
  "caretaking": "Requires daily interaction"
}
```

---

## Error Responses

### 404 Not Found

**Cause**: Pet ID does not exist

```json
{
  "error": "Pet not found",
  "code": "NOT_FOUND",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

### 400 Bad Request

**Cause**: Invalid UUID format

```json
{
  "error": "Invalid pet ID format. Must be a valid UUID.",
  "code": "INVALID_PARAMETER",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

### 500 Internal Server Error

**Cause**: Server-side error

```json
{
  "error": "Internal server error. Please try again later.",
  "code": "INTERNAL_ERROR",
  "timestamp": "2026-05-05T10:30:00Z"
}
```

---

## Behavior & Rules

**Image Gallery**:
- Images are sorted by sortOrder (ascending)
- sortOrder 1 is the primary image (used in catalog)
- If no images exist, the array is empty
- Frontend should display placeholder image if no images

**Availability**:
- IN_STOCK: stockQuantity > 0; purchase button enabled
- OUT_OF_STOCK: stockQuantity = 0; purchase button disabled (not in MVP)
- Status displayed prominently on detail page

**Characteristics**:
- Only populated if relevant for category
- JSON structure varies; frontend handles type/category detection
- Additional fields can be added without schema migration (JSONB advantage)

**Data Freshness**:
- Response reflects current inventory within 5 minutes (per Constitution)
- No caching on client; each request is fresh from backend

---

## Performance Expectations

- **Response Time**: < 500ms (single record + related images)
- **Image Count**: Support up to 10+ images per pet

---

## Examples

### Example 1: Successful Detail Retrieval

```
GET /api/simeon/pets/550e8400-e29b-41d4-a716-446655440000
```

Response: Full pet details with all images

### Example 2: Pet Not Found

```
GET /api/simeon/pets/00000000-0000-0000-0000-000000000000
```

Response: 404 with "Pet not found"

### Example 3: Invalid UUID

```
GET /api/simeon/pets/invalid-id
```

Response: 400 with "Invalid UUID format"

---

## Testing Scenarios

**Acceptance Test Cases**:
1. ✅ GET /api/simeon/pets/{id} returns full pet details
2. ✅ Response includes all images in correct order (sortOrder)
3. ✅ Characteristics are present and valid for pet category
4. ✅ Price, availability, and stock quantity are accurate
5. ✅ GET /api/simeon/pets/{id} with invalid UUID returns 400
3. ✅ GET /api/simeon/pets/{id} with nonexistent ID returns 404
7. ✅ Out-of-stock pets return OUT_OF_STOCK status
8. ✅ Image gallery is sorted correctly by sortOrder
9. ✅ DetailedDescription is fully populated
10. ✅ Response time < 500ms

---

**Version**: 1.0.0  
**Status**: Approved  
**Last Updated**: 2026-05-05
