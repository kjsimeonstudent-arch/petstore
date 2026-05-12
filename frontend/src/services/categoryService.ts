import axios from 'axios';
import type { Category } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
});

export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>('/simeon/categories');
  return response.data;
}
