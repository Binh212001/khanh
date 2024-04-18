package org.example.shop.entities;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "sum")
    private float sum;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;


    @Column(name = "created_at")
    private Date createdAt;
}

