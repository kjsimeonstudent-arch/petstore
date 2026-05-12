package com.petstore.repository;

import com.petstore.model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PetRepository extends JpaRepository<Pet, UUID> {
    @Query("SELECT p FROM Pet p JOIN p.category c " +
            "WHERE (:category IS NULL OR c.slug = :category) " +
            "AND (:search IS NULL OR LOWER(p.name) = LOWER(:search))")
    Page<Pet> searchByCategoryAndName(@Param("category") String category,
                                      @Param("search") String search,
                                      Pageable pageable);

    Optional<Pet> findById(UUID id);
}
