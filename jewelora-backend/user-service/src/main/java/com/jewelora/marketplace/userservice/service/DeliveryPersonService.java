package com.jewelora.marketplace.userservice.service;

import com.jewelora.marketplace.userservice.dto.DeliveryPersonRegisterRequest;
import com.jewelora.marketplace.userservice.dto.DeliveryPersonUpdateRequest;
import com.jewelora.marketplace.userservice.entity.DeliveryPerson;
import com.jewelora.marketplace.userservice.entity.UserRole;
import com.jewelora.marketplace.userservice.repository.DeliveryPersonRepository;
import com.jewelora.marketplace.userservice.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryPersonService {

    private final DeliveryPersonRepository deliveryPersonRepository;
    private final UserRoleRepository userRoleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DeliveryPerson registerDeliveryPerson(DeliveryPersonRegisterRequest request) {

        if (deliveryPersonRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserRole deliveryRole = userRoleRepository.findByRoleName("DELIVERY_PERSON")
                .orElseThrow(() -> new RuntimeException("Delivery person role not found"));

        DeliveryPerson dp = DeliveryPerson.builder()
                .roleId(deliveryRole.getRoleId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .contactNo(request.getContactNo())
                .password(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();

        return deliveryPersonRepository.save(dp);
    }

    public DeliveryPerson updateDeliveryPerson(String id, DeliveryPersonUpdateRequest request) {

        DeliveryPerson dp = deliveryPersonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery person not found"));

        dp.setFirstName(request.getFirstName());
        dp.setLastName(request.getLastName());
        dp.setEmail(request.getEmail());

        if (request.getContactNo() != null) dp.setContactNo(request.getContactNo());

        return deliveryPersonRepository.save(dp);
    }

    public List<DeliveryPerson> getAllDeliveryPeople() {
        return deliveryPersonRepository.findAll();
    }

    public DeliveryPerson getDeliveryPersonById(String deliveryPersonId) {
        return deliveryPersonRepository.findById(deliveryPersonId)
                .orElseThrow(() -> new RuntimeException("Delivery person not found"));
    }

    public void deleteDeliveryPerson(String id) {
        DeliveryPerson dp = getDeliveryPersonById(id);
        deliveryPersonRepository.delete(dp);
    }
}