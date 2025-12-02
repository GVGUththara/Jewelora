package com.jewelora.marketplace.userservice.controller;

import com.jewelora.marketplace.userservice.dto.CustomerAddressUpdateRequest;
import com.jewelora.marketplace.userservice.dto.CustomerRegisterRequest;
import com.jewelora.marketplace.userservice.dto.CustomerUpdateRequest;
import com.jewelora.marketplace.userservice.entity.Customer;
import com.jewelora.marketplace.userservice.service.CustomerService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/jewelora/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/register-customer")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody CustomerRegisterRequest request) {
        Customer customer = customerService.registerCustomer(request);
        return ResponseEntity.status(201).body(customer);
    }
    
    @GetMapping("/get-all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INVENTORY_MANAGER')")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/get/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN') or hasRole('INVENTORY_MANAGER')")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("customerId") String customerId) {
        return ResponseEntity.ok(customerService.getCustomerById(customerId));
    }

    @PutMapping("/update/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable("customerId") String customerId,
            @Valid @RequestBody CustomerUpdateRequest request) {
        return ResponseEntity.ok(customerService.updateCustomer(customerId, request));
    }

    @PutMapping("/update-address/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Customer> updateCustomerAddress(
            @PathVariable("customerId") String customerId,
            @RequestBody CustomerAddressUpdateRequest request) {

        Customer customer = customerService.updateCustomerAddress(customerId, request);
        return ResponseEntity.ok(customer);
    }

    @DeleteMapping("/delete/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteCustomer(@PathVariable("customerId") String customerId) {
        customerService.deleteCustomer(customerId);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}
