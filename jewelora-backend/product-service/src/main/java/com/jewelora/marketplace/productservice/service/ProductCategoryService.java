package com.jewelora.marketplace.productservice.service;

import com.jewelora.marketplace.productservice.dto.ProductCategoryCreateRequest;
import com.jewelora.marketplace.productservice.entity.ProductCategory;
import com.jewelora.marketplace.productservice.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository categoryRepository;

    public ProductCategory createCategory(ProductCategoryCreateRequest request) {

        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Category already exists");
        }

        ProductCategory category = ProductCategory.builder()
                .categoryName(request.getCategoryName())
                .isActive(true)
                .build();

        return categoryRepository.save(category);
    }
    
    public ProductCategory updateCategory(String categoryId, ProductCategoryCreateRequest request) {
        ProductCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.getCategoryName().equals(request.getCategoryName()) &&
            categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Category name already exists");
        }

        category.setCategoryName(request.getCategoryName());

        return categoryRepository.save(category);
    }

    public ProductCategory getCategoryById(String categoryId) {
    	System.out.println("Looking for ID: " + categoryId);
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public List<ProductCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void deleteCategoryById(String categoryId) {
        ProductCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }
}