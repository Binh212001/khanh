package org.example.shop.entities;


import jakarta.persistence.*;
import lombok.Data;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long quantity;
    @ManyToOne
    @JoinColumn(name = "pid")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "userId")
    private Account account;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private  String size ;
    private  String color;
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
