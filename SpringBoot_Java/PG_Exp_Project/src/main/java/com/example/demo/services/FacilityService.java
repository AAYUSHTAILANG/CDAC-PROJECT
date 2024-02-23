package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Area;
import com.example.demo.entities.City;
import com.example.demo.entities.Facility;
import com.example.demo.entities.Property;
import com.example.demo.entities.Roles;
import com.example.demo.repository.FacilityRepository;

@Service
public class FacilityService {
	@Autowired
	FacilityRepository facility_repo;
	@Autowired
	PropertyService prop_service;

	public Iterable<Facility> getAll()
	{
		return facility_repo.findAll();
	}
	
	
	
	
	
	
	
	
	public Facility getFacility(int f)
	{
		return facility_repo.findById(f).get();
	}
	
}
