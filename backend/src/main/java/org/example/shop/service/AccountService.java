package org.example.shop.service;

import org.example.shop.entities.Account;
import org.example.shop.models.AccountModel;

public interface AccountService {
    Boolean  register(Account account) throws Exception;
    Boolean  update(Account account , String userId) throws Exception;

    AccountModel login (Account account) throws  Exception;


    AccountModel getUserById(String userId);
}
