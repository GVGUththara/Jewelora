package com.jewelora.marketplace.productservice.service;

import com.jewelora.marketplace.productservice.dto.ProductCreateRequest;
import com.jewelora.marketplace.productservice.dto.ProductUpdateRequest;
import com.jewelora.marketplace.productservice.entity.Product;
import com.jewelora.marketplace.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(ProductCreateRequest request) {
        Product product = Product.builder()
                .productName(request.getProductName())
                .productCategory(request.getProductCategory())
                .unitPrice(request.getUnitPrice())
                .productDiscount(request.getProductDiscount())
                .stockQuantity(request.getStockQuantity())
                .material(request.getMaterial())
                .color(request.getColor())
                .imageUrl(request.getImageUrl())
                .rating(0.0)
                .soldCount(0)
                .isActive(true)
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductUpdateRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setProductName(request.getProductName());
        product.setProductCategory(request.getProductCategory());
        product.setUnitPrice(request.getUnitPrice());
        product.setProductDiscount(request.getProductDiscount());
        product.setStockQuantity(request.getStockQuantity());
        product.setMaterial(request.getMaterial());
        product.setColor(request.getColor());
        product.setImageUrl(request.getImageUrl());

        return productRepository.save(product);
    }
    
    public void updateStock(String productId, Integer purchasedQty) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStockQuantity() < purchasedQty) {
            throw new RuntimeException("Insufficient stock for product: " + product.getProductName());
        }

        product.setStockQuantity(product.getStockQuantity() - purchasedQty);
        product.setSoldCount(product.getSoldCount() + purchasedQty);

        productRepository.save(product);
    }


    public Product getProductById(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProductById(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
}