package com.example.demo.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Facility;
import com.example.demo.entities.Property;

@Repository
public interface FacilityRepository extends CrudRepository<Facility, Integer> {
	
	

	
	
}
