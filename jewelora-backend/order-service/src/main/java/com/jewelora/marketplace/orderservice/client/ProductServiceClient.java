package com.jewelora.marketplace.orderservice.client;

import com.jewelora.marketplace.orderservice.config.FeignClientConfig;
import com.jewelora.marketplace.orderservice.dto.ProductStockUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "product-service", configuration = FeignClientConfig.class) 
public interface ProductServiceClient {

    @PutMapping("/jewelora/product/update-stock/{productId}")
    void updateStock(
            @PathVariable("productId") String productId,
            @RequestBody ProductStockUpdateRequest request
    );
}