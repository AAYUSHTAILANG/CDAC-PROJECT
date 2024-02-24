package com.example.demo.controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Area;
import com.example.demo.entities.Facility;
import com.example.demo.entities.Occupant;
import com.example.demo.entities.Occupant_approval;
import com.example.demo.entities.Owner;
import com.example.demo.entities.Property;
import com.example.demo.entities.PropertyReg;
import com.example.demo.entities.Property_facility;
import com.example.demo.entities.occRequestDummy;
import com.example.demo.services.AreaService;
import com.example.demo.services.FacilityService;
import com.example.demo.services.OccupantService;
import com.example.demo.services.Occupant_approvalService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.PropertyService;
import com.example.demo.services.Property_facilityService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class PropertyController {
	@Autowired
	PropertyService prop_service;
	@Autowired
	AreaService a_service;
	@Autowired
	FacilityService f_service;
	@Autowired
	Property_facilityService pf_service;
	@Autowired
	OwnerService o_service;
	@Autowired
	OccupantService occ_service;
	@Autowired
	Occupant_approvalService occa_service;
	
	@GetMapping("/properties")
	public Iterable<Property> getAll()
	{
		return prop_service.getAll();
	}
	
	
	@PostMapping("/saveProperty")
	public Property saveProperty(@RequestBody PropertyReg propReg)
	{
		System.out.println(propReg);
		 Area a = a_service.getArea(propReg.getArea_id());
		 Owner o = o_service.getOwner(propReg.getOwner_id());
		 
	
		 
		Property p = new Property(propReg.getName(), a, propReg.getAddress(), propReg.getPrice(), propReg.getCapacity(), propReg.getNo_of_occupants(),o);
		System.out.println(p);
	/*	Facility f = f_service.getFacility(propReg.getFacility_id());
		Property p1= prop_service.getProperty(propReg.getProperty_id());
		Property_facility pf = new Property_facility(p1,f);
		
		Property_facility psaved = pf_service.save(pf);
		*/
		return prop_service.saveProperty(p);
		
	}
	
	/*@GetMapping("/searchProperty/{area_id}") 
    public List<Property> getPropertyByArea(@PathVariable int area_id) {
        return prop_service.getPropertyByArea(area_id);
    }*/
	
	@GetMapping("/searchProperty/{area_id}/{occupant_id}")
	public List<Property> findByAreaId2(@PathVariable int area_id, @PathVariable("occupant_id") int occupant_id) {
        return prop_service.findByAreaId2(area_id, occupant_id);
    }

	
	@GetMapping("/getProperty/{owner_id}")
	public List<Property> getPropertyByOwnerId(@PathVariable int owner_id)
	{
		return prop_service.getPropertyByOwnerId(owner_id);
	}
	
	@GetMapping("/getDepositAmount/{id}")
	public int getDepositAmount(@PathVariable int id)
	{
		return prop_service.getDepositAmt(id);
	}
	
	
	
	
}
