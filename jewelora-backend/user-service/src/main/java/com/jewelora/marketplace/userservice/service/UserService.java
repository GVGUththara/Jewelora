package com.jewelora.marketplace.userservice.service;

import com.jewelora.marketplace.userservice.dto.UserDTO;
import com.jewelora.marketplace.userservice.entity.Admin;
import com.jewelora.marketplace.userservice.entity.Customer;
import com.jewelora.marketplace.userservice.entity.DeliveryPerson;
import com.jewelora.marketplace.userservice.entity.InventoryManager;
import com.jewelora.marketplace.userservice.repository.AdminRepository;
import com.jewelora.marketplace.userservice.repository.CustomerRepository;
import com.jewelora.marketplace.userservice.repository.DeliveryPersonRepository;
import com.jewelora.marketplace.userservice.repository.InventoryManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;
    private final InventoryManagerRepository inventoryManagerRepository;
    private final DeliveryPersonRepository deliveryPersonRepository;

    public UserDTO findUser(String identifier) {

        // ADMIN 
        Admin admin = adminRepository.findByAdminUsername(identifier).orElse(null);

        if (admin != null) {
            return new UserDTO(
                    admin.getAdminId(),
                    admin.getAdminUsername(),
                    null,
                    admin.getAdminPassword(),
                    "ADMIN",
                    admin.getIsActive()
            );
        }

        // CUSTOMER 
        Customer customer = customerRepository.findByEmail(identifier).orElse(null);
        if (customer != null) {
            return new UserDTO(
                    customer.getCustomerId(),
                    null, // customers use email, not username
                    customer.getEmail(),
                    customer.getCusPassword(),
                    "CUSTOMER",
                    customer.getIsActive()
            );
        }

        // DELIVERY PERSON 
        DeliveryPerson delivery = deliveryPersonRepository.findByEmail(identifier).orElse(null);
        if (delivery != null) {
            return new UserDTO(
                    delivery.getDeliveryPersonId(),
                    null,
                    delivery.getEmail(),
                    delivery.getPassword(),
                    "DELIVERY_PERSON",
                    delivery.getIsActive()
            );
        }
        
        // INVENTORY MANAGER 
        InventoryManager manager = inventoryManagerRepository.findByInventoryManagerUsername(identifier).orElse(null);

        if (manager != null) {
            return new UserDTO(
                    manager.getInventoryManagerId(),
                    manager.getInventoryManagerUsername(),
                    null,
                    manager.getInventoryManagerPassword(),
                    "INVENTORY_MANAGER",
                    manager.getIsActive()
            );
        }

        return null;
    }
}
