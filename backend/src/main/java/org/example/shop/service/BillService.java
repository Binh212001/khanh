package org.example.shop.service;

import org.example.shop.entities.Bill;
import org.example.shop.entities.Product;

import java.util.List;

public interface BillService {
    public boolean create(Bill bill);

    List<Bill> getAll(int page, int limit)  throws  Exception ;

    List<Bill> getBillByUser(String userId) throws  Exception;

    List<Bill> getBillsByIds(List<Long> billIds);

    void deleteBillsByIds(List<Long> billIds);

    List<Bill> findBillByCustomer(String keyword);
}
