package org.example.shop.controllers;

import org.example.shop.entities.Account;
import org.example.shop.models.AccountModel;
import org.example.shop.service.AccountService;
import org.example.shop.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<Response<Boolean>> register(@RequestBody Account account){
        try {
            Boolean created = accountService.register(account);
            if(created==true){
            return  ResponseEntity.status(HttpStatus.CREATED).body(new Response<Boolean>(true,"Tạo tài khoản thành công."));
            }
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<Boolean>(false,"Tài khoản đã tồn tại rồi."));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));

        }
    }

    @PostMapping("/login")
    public ResponseEntity<Response<AccountModel>> login(@RequestBody Account account) throws  Exception{
        try {
            AccountModel user = accountService.login(account);
        if(user==null){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<AccountModel>(user,"Tài khoản hoặc mật khẩu không chính xác"));
        }
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<AccountModel>(user,"Đăng nhập thành công"));

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<AccountModel>(null,e.getMessage()));

        }
    }

    @PutMapping("/update")
    public ResponseEntity<Response<Boolean>> update(@RequestBody Account account) throws  Exception{
        try {
            Boolean updated = accountService.update(account, account.getUserId());
            if(updated==null){
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response<Boolean>(null,"Tài khoản không tồn tại."));
            }
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<Boolean>(updated,"cập nhật hành công"));

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<Boolean>(false,e.getMessage()));
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<Response<AccountModel>> getUser(@RequestParam("userId") String  userId) throws  Exception{
        try {
            AccountModel user = accountService.getUserById(userId);
            return  ResponseEntity.status(HttpStatus.OK).body(new Response<AccountModel>(user,"Ok"));

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<AccountModel>(null,e.getMessage()));

        }
    }



}
