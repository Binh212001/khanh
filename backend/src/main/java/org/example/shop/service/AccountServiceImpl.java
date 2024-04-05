package org.example.shop.service;

import org.example.shop.entities.Account;
import org.example.shop.models.AccountModel;
import org.example.shop.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements  AccountService {

    @Autowired
    AccountRepo accountRepo;
    @Override
    public Boolean register(Account account) throws Exception {
        try {
            Optional<Account>  user =  accountRepo.findByUsername(account.getUsername());
            if(user.isEmpty()){
                accountRepo.save(account);
                return  true;
            }
            return false;
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public Boolean update(Account account, String userId) throws Exception {
        try {
            Optional<Account>  user = accountRepo.findById(userId);
            if(user.isPresent()){
                user.get().setPhone(account.getPhone());
                user.get().setAddressDetail(account.getAddressDetail());
                user.get().setDistrict(account.getDistrict());
                user.get().setProvince(account.getProvince());
                user.get().setFirstName(account.getFirstName());
                user.get().setLastName(account.getLastName());
                user.get().setSellers(account.isSellers());
                accountRepo.save(user.get());
                return  true;
            }
            return  false;
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public AccountModel login(Account account) throws Exception {
        try {
            Optional<Account>  user = accountRepo.findByUsernameAndPassword(account.getUsername(), account.getPassword());
            if(user.isEmpty()){
                return  null;
            }
            return mapToModel(user.get());
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public AccountModel getUserById(String userId) {
        Optional<Account> u = accountRepo.findById(userId);
        AccountModel ac = mapToModel(u.get());
        return ac;
    }

    public  AccountModel mapToModel (Account account){
        return  AccountModel.builder()
                .userId(account.getUserId())
                .username(account.getUsername())
                .phone(account.getPhone())
                .addressDetail(account.getAddressDetail())
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .isSellers(account.isSellers())
                .province(account.getProvince())
                .district(account.getDistrict())
                .avatar(account.getAvatar())
                .build();
    }
}
