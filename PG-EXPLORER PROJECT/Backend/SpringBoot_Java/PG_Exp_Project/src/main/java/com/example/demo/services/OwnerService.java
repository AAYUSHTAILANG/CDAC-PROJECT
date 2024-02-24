package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Area;
import com.example.demo.entities.Occupant;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Users;
import com.example.demo.repository.OwnerRepository;

@Service
public class OwnerService {
	@Autowired
	OwnerRepository owner_repo;
	
	 public Owner saveOccupant(Owner o)
	    {
	    	return owner_repo.save(o);
	    }
	 
	 public Owner getOwner(Users uid)
	 {
		 return owner_repo.getOwner(uid);
	 }

	public Owner getOwner(int oid) {
		return owner_repo.findById(oid).get();

	}
	
	public Optional<Owner> getOptOwner(int owner_id)
	{
		return owner_repo.findById(owner_id);
	}

	public Owner updateOwner(Owner o, int owner_id) {
		Owner owner = owner_repo.findById(owner_id).get();
		owner.setOwner_fname(o.getOwner_fname());
		owner.setOwner_lname(o.getOwner_lname());
		owner.setContact(o.getContact());
		
		return owner_repo.save(owner);
		
	}
	
}

