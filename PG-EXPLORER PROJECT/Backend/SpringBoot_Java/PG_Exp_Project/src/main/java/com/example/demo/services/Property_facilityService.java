package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Facility;
import com.example.demo.entities.Property;
import com.example.demo.entities.Property_facility;
import com.example.demo.entities.Users;
import com.example.demo.repository.Property_facilityRepository;

@Service
public class Property_facilityService {
	
	@Autowired
	Property_facilityRepository prop_fac_repo;
	@Autowired
	PropertyService prop_service;
	
	public Property_facility savePF(Property_facility p)
	{
		return prop_fac_repo.save(p);
	}
	
	public List<Property_facility> getFacilityByPropertyId(int property_id)
	{
		Optional<Property> op = prop_service.getOProperty(property_id);
		return prop_fac_repo.findByPropertyId(op.get());
	}

}
