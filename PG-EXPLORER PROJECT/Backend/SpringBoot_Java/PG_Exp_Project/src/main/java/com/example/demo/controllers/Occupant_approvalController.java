package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Occupant;
import com.example.demo.entities.Occupant_approval;
import com.example.demo.entities.Property;
import com.example.demo.entities.occRequestDummy;
import com.example.demo.services.OccupantService;
import com.example.demo.services.Occupant_approvalService;
import com.example.demo.services.PropertyService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class Occupant_approvalController {
	@Autowired
	Occupant_approvalService occ_app_service;
	@Autowired
	OccupantService occ_service;
	@Autowired
	PropertyService prop_service;
	
	//to show all requests
	@GetMapping("/showRequest/{owner_id}")
	public List<Occupant_approval> showRequest()
	{
		return occ_app_service.getRequest();
	}
	
	
	//to show request to owner
	@GetMapping("/getRequest/{owner_id}")
	public List<Occupant_approval> getRequestByOwnerId(@PathVariable int owner_id)
	{
		return occ_app_service.getRequestByOwnerId(owner_id);
	}
	
	//to show request to occupant
	@GetMapping("/getOccupantRequest/{occupant_id}")
	public List<Occupant_approval> getRequestByOccId(@PathVariable int occupant_id)
	{
		return occ_app_service.getRequestByOccId(occupant_id);
	}
	
	
	
	@PostMapping("/sendRequest")
	public Occupant_approval sendRequest(@RequestBody occRequestDummy ord)
	{
		Occupant occ = occ_service.getOccupant(ord.getOccupant_id());
		Property p = prop_service.getProperty(ord.getProperty_id());
		
		Occupant_approval oa = new Occupant_approval(occ,p,0,LocalDate.now());
		return occ_app_service.saveRequest(oa);
	}
	
	
	//if owner approves it 
	@PutMapping("/updateRequest/{id}")
	public Occupant_approval updateRequest(@RequestBody Occupant_approval occa,@PathVariable int id)
	{
		return occ_app_service.updateRequest(occa,id);
	}
	
	
	//if owner rejects it
	@PutMapping("/rejectRequest/{id}")
	public Occupant_approval rejectRequest(@RequestBody Occupant_approval occa,@PathVariable int id)
	{
		return occ_app_service.rejectRequest(occa,id);
	}
	
}
