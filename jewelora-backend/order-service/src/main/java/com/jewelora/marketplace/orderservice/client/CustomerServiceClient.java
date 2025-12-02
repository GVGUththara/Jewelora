package com.jewelora.marketplace.orderservice.client;

import com.jewelora.marketplace.orderservice.config.FeignClientConfig;
import com.jewelora.marketplace.orderservice.dto.CustomerAddressUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", configuration = FeignClientConfig.class) 
public interface CustomerServiceClient {

    @PutMapping("/jewelora/customer/update-address/{customerId}")
    void updateCustomerAddress(
            @PathVariable("customerId") String customerId,
            @RequestBody CustomerAddressUpdateRequest request
    );
}