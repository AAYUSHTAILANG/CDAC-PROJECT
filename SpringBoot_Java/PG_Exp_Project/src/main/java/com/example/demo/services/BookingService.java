package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Booking;
import com.example.demo.repository.BookingRepository;

@Service
public class BookingService {
	@Autowired
	BookingRepository book_service;

	public Booking saveBooking(Booking b)
	{
		return book_service.save(b);
	}
	
}
