package com.jewelora.marketplace.productservice.controller;

import com.jewelora.marketplace.productservice.dto.ProductCreateRequest;
import com.jewelora.marketplace.productservice.dto.ProductStockUpdateRequest;
import com.jewelora.marketplace.productservice.dto.ProductUpdateRequest;
import com.jewelora.marketplace.productservice.entity.Product;
import com.jewelora.marketplace.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/jewelora/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create-product")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductCreateRequest request) {
        Product product = productService.createProduct(request);
        return ResponseEntity.status(201).body(product);
    }

    @PutMapping("/update-product/{productId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("productId") String productId,
            @Valid @RequestBody ProductUpdateRequest request) {
        return ResponseEntity.ok(productService.updateProduct(productId, request));
    }
    
    @PutMapping("/update-stock/{productId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<String> updateStock(
            @PathVariable("productId") String productId,
            @RequestBody ProductStockUpdateRequest request) {

        productService.updateStock(productId, request.getQuantity());
        return ResponseEntity.ok("Stock updated successfully");
    }

    @GetMapping("/get-product/{productId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") String productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping("/get-all-product")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/delete-product/{productId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable("productId") String productId) {
        productService.deleteProductById(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }
}