package com.jewelora.marketplace.orderservice.controller;

import com.jewelora.marketplace.orderservice.dto.CartItemAddRequest;
import com.jewelora.marketplace.orderservice.dto.CartItemUpdateRequest;
import com.jewelora.marketplace.orderservice.entity.CartItem;
import com.jewelora.marketplace.orderservice.service.CartItemService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/jewelora/cart-item")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

    // Add item OR increase quantity
    @PostMapping("/add-cart-item")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<CartItem> addItem(@Valid @RequestBody CartItemAddRequest request) {
        return ResponseEntity.ok(cartItemService.addItemToCart(request));
    }

    // Update quantity
    @PutMapping("/update-cart-item/{cartItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<CartItem> updateQuantity(
            @PathVariable("cartItemId") String cartItemId,
            @Valid @RequestBody CartItemUpdateRequest request) {

        return ResponseEntity.ok(cartItemService.updateQuantity(cartItemId, request));
    }

    // Get all items for a cart
    @GetMapping("/get-cart-item/{cartId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<CartItem>> getItems(@PathVariable("cartId") String cartId) {
        return ResponseEntity.ok(cartItemService.getItemsByCartId(cartId));
    }

    // Remove a cart item
    @DeleteMapping("/delete-cart-item/{cartItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> deleteItem(@PathVariable("cartItemId") String cartItemId) {
        cartItemService.removeItem(cartItemId);
        return ResponseEntity.ok("Cart item removed successfully");
    }
}