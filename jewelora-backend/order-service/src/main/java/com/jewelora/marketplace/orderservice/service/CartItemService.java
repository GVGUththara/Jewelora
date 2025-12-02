package com.jewelora.marketplace.orderservice.service;


import com.jewelora.marketplace.orderservice.dto.CartItemAddRequest;
import com.jewelora.marketplace.orderservice.dto.CartItemUpdateRequest;
import com.jewelora.marketplace.orderservice.entity.CartItem;

import java.util.List;

public interface CartItemService {

    CartItem addItemToCart(CartItemAddRequest request);

    CartItem updateQuantity(String cartItemId, CartItemUpdateRequest request);

    List<CartItem> getItemsByCartId(String cartId);

    void removeItem(String cartItemId);
}
