package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Booking;
import com.example.demo.entities.BookingDummy;
import com.example.demo.entities.Occupant;
import com.example.demo.entities.Property;
import com.example.demo.services.BookingService;
import com.example.demo.services.OccupantService;
import com.example.demo.services.PropertyService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class BookingController {
	@Autowired
	BookingService book_service;
	@Autowired
	OccupantService occ_service;
	@Autowired
	PropertyService prop_service;
	
	@PostMapping("/saveBooking")
	public Booking saveBooking(@RequestBody BookingDummy bd)
	{
		Occupant occ = occ_service.getOccupant(bd.getOccupant_id());
		Property p = prop_service.getProperty(bd.getProperty_id());
		
		Booking b = new Booking(occ,p,bd.getDate(),bd.getDeposite(),bd.getTrans_id(),bd.getFrom(),bd.getTo());
		
		return book_service.saveBooking(b);
	}
	
}