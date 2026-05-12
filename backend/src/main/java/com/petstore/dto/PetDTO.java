package com.petstore.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {
    private String id;
    private String name;
    private String category;
    private BigDecimal price;
    private String description;
    private ImageDTO primaryImage;
}
