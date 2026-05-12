package com.petstore.service;

import com.petstore.dto.ImageDTO;
import com.petstore.dto.PageResponse;
import com.petstore.dto.PetDTO;
import com.petstore.dto.PetDetailDTO;
import com.petstore.model.Image;
import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public PageResponse<PetDTO> getPets(int page, int size, String category, String search) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Pet> petPage = petRepository.searchByCategoryAndName(category, search, pageable);
        List<PetDTO> pets = petPage.getContent().stream().map(this::toPetDto).collect(Collectors.toList());

        return PageResponse.<PetDTO>builder()
                .data(pets)
                .page(petPage.getNumber())
                .size(petPage.getSize())
                .totalElements(petPage.getTotalElements())
                .totalPages(petPage.getTotalPages())
                .build();
    }

    public PetDetailDTO getPetById(UUID id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Pet not found"));
        return toPetDetailDto(pet);
    }

    private PetDTO toPetDto(Pet pet) {
        ImageDTO primaryImage = pet.getImages().stream()
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .findFirst()
                .map(this::toImageDto)
                .orElse(null);

        return PetDTO.builder()
                .id(pet.getId().toString())
                .name(pet.getName())
                .category(pet.getCategory().getSlug())
                .price(pet.getPrice())
                .description(pet.getDescription())
                .primaryImage(primaryImage)
                .build();
    }

    private PetDetailDTO toPetDetailDto(Pet pet) {
        List<ImageDTO> images = pet.getImages().stream()
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .map(this::toImageDto)
                .collect(Collectors.toList());

        return PetDetailDTO.builder()
                .id(pet.getId().toString())
                .name(pet.getName())
                .category(pet.getCategory().getSlug())
                .price(pet.getPrice())
                .description(pet.getDescription())
                .detailedDescription(pet.getDetailedDescription())
                .availabilityStatus(pet.getAvailabilityStatus())
                .stockQuantity(pet.getStockQuantity())
                .characteristics(pet.getCharacteristics())
                .images(images)
                .build();
    }

    private ImageDTO toImageDto(Image image) {
        return ImageDTO.builder()
                .id(image.getId().toString())
                .url(image.getUrl())
                .altText(image.getAltText())
                .sortOrder(image.getSortOrder())
                .build();
    }
}
