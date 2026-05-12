import axios from 'axios';
import type { PageResponse, Pet, PetDetail } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
});

export async function fetchPets(params: {
  page?: number;
  size?: number;
  category?: string;
  search?: string;
}): Promise<PageResponse<Pet>> {
  const response = await api.get<PageResponse<Pet>>('/simeon/pets', { params });
  return response.data;
}

export async function fetchPetDetail(id: string): Promise<PetDetail> {
  const response = await api.get<PetDetail>(`/simeon/pets/${id}`);
  return response.data;
}
