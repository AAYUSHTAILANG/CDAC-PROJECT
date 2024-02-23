package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Payment;
@Repository
public interface PaymentRepository extends CrudRepository<Payment, Integer> {

}
