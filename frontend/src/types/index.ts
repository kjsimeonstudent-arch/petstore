export interface Image {
  id: string;
  url: string;
  altText?: string;
  sortOrder?: number;
}

export interface Pet {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  primaryImage?: Image;
}

export interface PetDetail extends Pet {
  detailedDescription?: string;
  availabilityStatus?: string;
  stockQuantity?: number;
  characteristics?: string;
  images: Image[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface PageResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
