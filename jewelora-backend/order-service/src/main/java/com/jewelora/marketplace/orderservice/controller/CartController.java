package com.jewelora.marketplace.orderservice.controller;


import com.jewelora.marketplace.orderservice.entity.Cart;
import com.jewelora.marketplace.orderservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jewelora/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<Cart> getCartByCustomer(@PathVariable("customerId") String customerId) {
        Cart cart = cartService.getOrCreateCart(customerId);
        return ResponseEntity.ok(cart);
    }

    // Delete all cart items
    @DeleteMapping("/{cartId}/clear")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> clearCart(@PathVariable("cartId") String cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.ok("Cart cleared successfully.");
    }
}