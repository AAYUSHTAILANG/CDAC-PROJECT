package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Booking;
@Repository
public interface BookingRepository extends CrudRepository<Booking, Integer> {
		
	
}

