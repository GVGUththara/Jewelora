package com.jewelora.marketplace.userservice.service;

import com.jewelora.marketplace.userservice.dto.CustomerAddressUpdateRequest;
import com.jewelora.marketplace.userservice.dto.CustomerRegisterRequest;
import com.jewelora.marketplace.userservice.dto.CustomerUpdateRequest;
import com.jewelora.marketplace.userservice.entity.Customer;
import com.jewelora.marketplace.userservice.entity.UserRole;
import com.jewelora.marketplace.userservice.repository.CustomerRepository;
import com.jewelora.marketplace.userservice.repository.UserRoleRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRoleRepository userRoleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Customer registerCustomer(CustomerRegisterRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Customer email already exists");
        }

        UserRole customerRole = userRoleRepository.findByRoleName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Customer role not found"));
        
        Customer customer = Customer.builder()
        		.roleId(customerRole.getRoleId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .cusPassword(passwordEncoder.encode(request.getCusPassword()))
                .isActive(true)
                .build();

        return customerRepository.save(customer);
    }

    // Update customer, only mandatory fields required, optional fields updated if present
    public Customer updateCustomer(String customerId, CustomerUpdateRequest request) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());

        if (request.getStreetNumber() != null) customer.setStreetNumber(request.getStreetNumber());
        if (request.getStreetName1() != null) customer.setStreetName1(request.getStreetName1());
        if (request.getStreetName2() != null) customer.setStreetName2(request.getStreetName2());
        if (request.getCity() != null) customer.setCity(request.getCity());
        if (request.getPostalCode() != null) customer.setPostalCode(request.getPostalCode());
        if (request.getContactNumber() != null) customer.setContactNumber(request.getContactNumber());

        return customerRepository.save(customer);
    }
    
    public Customer updateCustomerAddress(String customerId, CustomerAddressUpdateRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (request.getStreetNumber() != null) customer.setStreetNumber(request.getStreetNumber());
        if (request.getStreetName1() != null) customer.setStreetName1(request.getStreetName1());
        if (request.getStreetName2() != null) customer.setStreetName2(request.getStreetName2());
        if (request.getCity() != null) customer.setCity(request.getCity());
        if (request.getPostalCode() != null) customer.setPostalCode(request.getPostalCode());
        if (request.getContactNumber() != null) customer.setContactNumber(request.getContactNumber());

        return customerRepository.save(customer);
    }

    
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(String id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void deleteCustomer(String id) {
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }
}