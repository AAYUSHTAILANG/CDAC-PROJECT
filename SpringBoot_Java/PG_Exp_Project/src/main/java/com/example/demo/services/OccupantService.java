package com.example.demo.services;

import com.example.demo.entities.Occupant;
import com.example.demo.entities.Users;
import com.example.demo.repository.OccupantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OccupantService {

	@Autowired
    OccupantRepository occupant_repo;
    
	
	
    public List<Occupant> getAllOccupants() {
        return occupant_repo.findAll();
    }
    
    public Occupant getOccupant(Users u) {
		return occupant_repo.getOccupant(u);

	}
    
    public Occupant getOccupant(int occ_id)
    {
    	return occupant_repo.findById(occ_id).get();
    }
    
    public Occupant saveOccupant(Occupant o)
    {
    	return occupant_repo.save(o);
    }

	public Occupant updateOccupant(Occupant occ, int occupant_id) {
		
		Occupant occupant = occupant_repo.findById(occupant_id).get();
		occupant.setOccupant_fname(occ.getOccupant_fname());
		occupant.setOccupant_lname(occ.getOccupant_lname());
		occupant.setOccupant_contact(occ.getOccupant_contact());
	
		
		return occupant_repo.save(occupant);
		
		
	}


}