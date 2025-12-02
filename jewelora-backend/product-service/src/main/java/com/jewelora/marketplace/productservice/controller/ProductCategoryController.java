package com.jewelora.marketplace.productservice.controller;


import com.jewelora.marketplace.productservice.dto.ProductCategoryCreateRequest;
import com.jewelora.marketplace.productservice.entity.ProductCategory;
import com.jewelora.marketplace.productservice.service.ProductCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/jewelora/product-category")
@RequiredArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService categoryService;

    @PostMapping("/create-category")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody ProductCategoryCreateRequest request) {
        ProductCategory category = categoryService.createCategory(request);
        return ResponseEntity.status(201).body(category);
    }
    
    @PutMapping("/update-category/{categoryId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ProductCategory> updateCategory(
    		@PathVariable("categoryId") String categoryId,
            @Valid @RequestBody ProductCategoryCreateRequest request) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, request));
    }

    @GetMapping("/get-category/{categoryId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<ProductCategory> getCategoryById(@PathVariable("categoryId") String categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }

    @GetMapping("/get-all-category")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<List<ProductCategory>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @DeleteMapping("/delete-category/{categoryId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") String categoryId) {
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.ok("Category deleted successfully");
    }
}