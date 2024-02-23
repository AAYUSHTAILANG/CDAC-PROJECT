package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.entities.Area;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Property;

public interface PropertyRepository extends CrudRepository<Property ,Integer> {

	@Query("select p from Property p where area_id = :aid")
	 List<Property> findByAreaId(Area aid);
	
	@Query("select p from Property p where owner_id = :o")
	List<Property> getByOwnerId(Owner o);
}
