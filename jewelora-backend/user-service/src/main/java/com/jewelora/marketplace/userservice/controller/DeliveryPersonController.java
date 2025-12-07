package com.jewelora.marketplace.userservice.controller;

import com.jewelora.marketplace.userservice.dto.DeliveryPersonRegisterRequest;
import com.jewelora.marketplace.userservice.dto.DeliveryPersonUpdateRequest;
import com.jewelora.marketplace.userservice.entity.DeliveryPerson;
import com.jewelora.marketplace.userservice.service.DeliveryPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/jewelora/delivery")
@RequiredArgsConstructor
public class DeliveryPersonController {

    private final DeliveryPersonService deliveryPersonService;

    @PostMapping("/register-delivery-person")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DeliveryPerson> registerDeliveryPerson(
            @Valid @RequestBody DeliveryPersonRegisterRequest request) {
        return ResponseEntity.status(201).body(deliveryPersonService.registerDeliveryPerson(request));
    }

    @GetMapping("/get-all-delivery-people")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INVENTORY_MANAGER')")
    public ResponseEntity<List<DeliveryPerson>> getAllDeliveryPeople() {
        return ResponseEntity.ok(deliveryPersonService.getAllDeliveryPeople());
    }

    @GetMapping("/get-delivery-person/{deliveryPersonId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INVENTORY_MANAGER') or hasRole('DELIVERY_PERSON') or hasRole('CUSTOMER')")
    public ResponseEntity<DeliveryPerson> getDeliveryPersonById(
    		@PathVariable("deliveryPersonId") String deliveryPersonId) {
    	return ResponseEntity.ok(deliveryPersonService.getDeliveryPersonById(deliveryPersonId)); 
    }

    @PutMapping("/update-delivery-person/{deliveryPersonId}")
    @PreAuthorize("hasRole('DELIVERY_PERSON')")
    public ResponseEntity<DeliveryPerson> updateDeliveryPerson(
            @PathVariable("deliveryPersonId") String deliveryPersonId,
            @Valid @RequestBody DeliveryPersonUpdateRequest request) {
        return ResponseEntity.ok(deliveryPersonService.updateDeliveryPerson(deliveryPersonId, request));
    }

    @DeleteMapping("/delete-delivery-person/{deliveryPersonId}")
    @PreAuthorize("hasRole('DELIVERY_PERSON') or hasRole('ADMIN')")
    public ResponseEntity<String> deleteDeliveryPerson(@PathVariable("deliveryPersonId") String deliveryPersonId) {
        deliveryPersonService.deleteDeliveryPerson(deliveryPersonId);
        return ResponseEntity.ok("Delivery person deleted successfully");
    }
}