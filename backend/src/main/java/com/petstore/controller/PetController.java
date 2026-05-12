package com.petstore.controller;

import com.petstore.dto.PageResponse;
import com.petstore.dto.PetDTO;
import com.petstore.dto.PetDetailDTO;
import com.petstore.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/simeon/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<PetDTO>> getPets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(petService.getPets(page, size, category, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDetailDTO> getPet(@PathVariable UUID id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }
}
