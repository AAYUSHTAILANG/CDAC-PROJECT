package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Area;
import com.example.demo.entities.Occupant;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Property;

public interface PropertyRepository extends CrudRepository<Property ,Integer> {

	@Query("select p from Property p where area_id = :aid")
	 List<Property> findByAreaId(Area aid);
	
	 /*@Query("SELECT p FROM Property p " +
	           "WHERE p.area.id = :areaId AND p NOT IN " +
	           "      (SELECT pr FROM Property pr JOIN pr.occupantApprovals oa " +
	           "       WHERE oa.occupant.id = :occupantId)")
	    List<Property> findByAreaId1(@Param("areaId") int areaId, @Param("occupantId") int occupantId);
	*/
	
	 @Query("SELECT p FROM Property p WHERE p.area_id = ?1 AND p.id NOT IN (SELECT pr.id FROM Property pr JOIN Occupant_approval oa on pr.id=oa.property_id.id WHERE oa.occupant_id = ?2)")
	    List<Property> findByAreaId2(Area area_id, Occupant occupant_id);
	
	@Query("select p from Property p where p.owner_id = :owner_id")
	List<Property> getByOwnerId(Owner owner_id);
}
