package com.example.demo.services;

import com.example.demo.entities.Occupant;
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
    
    public Occupant saveOccupant(Occupant o)
    {
    	return occupant_repo.save(o);
    }


}
