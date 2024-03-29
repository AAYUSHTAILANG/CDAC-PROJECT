package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Facility;
import com.example.demo.entities.Property;
import com.example.demo.entities.Property_facility;
@Repository
public interface Property_facilityRepository extends CrudRepository<Property_facility, Integer> {

	@Query("select f from Property_facility f where property_id = :pid")
	public List<Property_facility> findByPropertyId(Property pid);
	
	
}
