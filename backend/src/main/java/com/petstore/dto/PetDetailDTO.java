package com.petstore.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDetailDTO {
    private String id;
    private String name;
    private String category;
    private BigDecimal price;
    private String description;
    private String detailedDescription;
    private String availabilityStatus;
    private Integer stockQuantity;
    private String characteristics;
    private List<ImageDTO> images;
}
