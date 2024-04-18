package org.example.shop.repo;

import org.example.shop.entities.Buy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BuyRepo extends JpaRepository<Buy, Long> {

    List<Buy> findByBillId(Long id);
    void  deleteByBillId(Long id);
}
