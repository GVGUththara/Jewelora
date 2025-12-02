package com.jewelora.marketplace.orderservice.impl;

import com.jewelora.marketplace.orderservice.dto.CartItemAddRequest;
import com.jewelora.marketplace.orderservice.dto.CartItemUpdateRequest;
import com.jewelora.marketplace.orderservice.entity.CartItem;
import com.jewelora.marketplace.orderservice.repository.CartItemRepository;
import com.jewelora.marketplace.orderservice.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem addItemToCart(CartItemAddRequest request) {

        // Check if product is already in cart
        var existing = cartItemRepository.findByCartIdAndProductId(
                request.getCartId(), request.getProductId()
        );

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            
            double discount = item.getProductDiscount() != null ? item.getProductDiscount() : 0.0;
            double discountedAmount = item.getUnitPrice() * discount / 100.0;
            double finalPrice = (item.getUnitPrice() - discountedAmount) * item.getQuantity();
            
            item.setFinalPrice(finalPrice);
            item.setUpdatedAt(java.time.LocalDateTime.now());
            
            return cartItemRepository.save(item);
        }
        
        // Calculate final price for new item
        double discount = request.getProductDiscount() != null ? request.getProductDiscount() : 0.0;
        double discountedAmount = request.getUnitPrice() * discount / 100.0;
        double finalPrice = (request.getUnitPrice() - discountedAmount) * request.getQuantity();
        
        // Add new item
        CartItem newItem = CartItem.builder()
                .cartItemId(UUID.randomUUID().toString())
                .cartId(request.getCartId())
                .productId(request.getProductId())
                .productName(request.getProductName())
                .productImage(request.getProductImage())
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .productDiscount(request.getProductDiscount())
                .finalPrice(finalPrice)
                .build();

        return cartItemRepository.save(newItem);
    }

    @Override
    public CartItem updateQuantity(String cartItemId, CartItemUpdateRequest request) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        item.setQuantity(request.getQuantity());
        // Recalculate final price
        double discount = item.getProductDiscount() != null ? item.getProductDiscount() : 0.0;
        double discountedAmount = item.getUnitPrice() * discount / 100.0;
        double finalPrice = (item.getUnitPrice() - discountedAmount) * item.getQuantity();

        item.setFinalPrice(finalPrice);
        item.setUpdatedAt(java.time.LocalDateTime.now());

        return cartItemRepository.save(item);
    }

    @Override
    public List<CartItem> getItemsByCartId(String cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    @Override
    public void removeItem(String cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
