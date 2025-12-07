package com.jewelora.marketplace.orderservice.entity;

import com.jewelora.marketplace.orderservice.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "order_id", updatable = false)
    private String id;

    @Column(name = "customer_id", nullable = false, length = 36)
    private String customerId;
    
    @Column(name = "customer_contact", nullable = false, length = 20)
    private String customerContact;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus = OrderStatus.PENDING;

    @Column(name = "street_number", nullable = false, length = 150)
    private String streetNumber;

    @Column(name = "street_name_1", nullable = false, length = 150)
    private String streetName1;

    @Column(name = "street_name_2", length = 150)
    private String streetName2;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;
    
    @Column(name = "delivery_person_id", length = 36)
    private String deliveryPersonId;
    
    @Column(name = "delivered_date")
    private LocalDateTime deliveredDate;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private List<OrderItem> orderItems;

}