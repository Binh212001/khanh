package org.example.shop.repo;

import org.example.shop.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo  extends JpaRepository<Account , String> {
    Optional<Account> findByUsername(String username);
    Optional<Account> findByUsernameAndPassword(String username , String password);
}
