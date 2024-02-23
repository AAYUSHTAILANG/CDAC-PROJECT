package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Occupant;
import com.example.demo.entities.Occupant_approval;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Property;
@Repository
public interface Occupant_approvalRepository extends CrudRepository<Occupant_approval, Integer> {
	
	@Query("select o from Occupant_approval o where approval_status = 0")
	public List<Occupant_approval> getRequest();
	
	@Query("SELECT oa FROM Occupant_approval oa JOIN oa.property_id p WHERE p.owner_id = :owner AND oa.approval_status = 0")
	List<Occupant_approval> getByOwnerId(@Param("owner") Owner owner);

	@Query("select o from Occupant_approval o where occupant_id = :occ_id")
	List<Occupant_approval> getByOccId(Occupant occ_id);
}
