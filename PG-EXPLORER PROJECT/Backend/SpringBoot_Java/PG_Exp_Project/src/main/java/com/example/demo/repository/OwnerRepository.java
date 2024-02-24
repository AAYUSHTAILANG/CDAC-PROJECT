package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Users;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Integer> {
	
	@Query("select o from Owner o where user_id = ?1")
	public Owner getOwner(Users user) ;

}

