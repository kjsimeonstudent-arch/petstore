package com.petstore.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDTO {
    private String id;
    private String url;
    private String altText;
    private Integer sortOrder;
}
