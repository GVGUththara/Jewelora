package com.jewelora.marketplace.productservice.repository;

import com.jewelora.marketplace.productservice.entity.ProductCategory;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, String> {
    boolean existsByCategoryName(String categoryName);
}