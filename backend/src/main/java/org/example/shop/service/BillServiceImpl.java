package org.example.shop.service;


import org.example.shop.entities.Bill;
import org.example.shop.entities.Product;
import org.example.shop.repo.BillRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl  implements  BillService{
    @Autowired
    BillRepo billRepo;
    @Override
    public boolean create(Bill bill) {
      try {
        billRepo.save(bill);
        return  true;
      }catch (Exception e){
          return  false;
      }
    }

    @Override
    public List<Bill> getAll(int page, int limit) throws Exception {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            return  billRepo.getBills(pageable);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public List<Bill> getBillByUser(String userId) throws Exception {
        try {
            return  billRepo.getBillByUser(userId);
        }catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }

    @Override
    public List<Bill> getBillsByIds(List<Long> billIds) {
        return  billRepo.findAllById(billIds);
    }

    @Override
    public void deleteBillsByIds(List<Long> billIds) {
        billRepo.deleteAllByIdInBatch(billIds);
    }

    @Override
    public List<Bill> findBillByCustomer(String keyword) {
        return billRepo.findByAccountFullNameContaining(keyword);
    }
}
