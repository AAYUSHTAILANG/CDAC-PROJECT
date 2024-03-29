package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Area;
import com.example.demo.entities.Occupant;
import com.example.demo.entities.OccupantReg;
import com.example.demo.entities.Owner;
import com.example.demo.entities.OwnerReg;
import com.example.demo.entities.Roles;
import com.example.demo.entities.Users;
import com.example.demo.services.AreaService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.RolesService;
import com.example.demo.services.UsersService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OwnerController {

	@Autowired
	OwnerService owner_service;
	@Autowired
	RolesService roles_service;
	@Autowired
	UsersService users_service;
	
	@Autowired
	AreaService aservice;
	
	//Getting owner (Read -> Get)
	@GetMapping("/getOwner")
	 public Owner getOwner(@RequestParam("uid")int uid)
	 {
		 Users u = users_service.getOne(uid);
		 return owner_service.getOwner(u);
	 }
	
	//Saving owner (Create -> Post)
	 @PostMapping("/saveOwner")
	    public Owner saveOccupant(@RequestBody OwnerReg ownReg) 
	    {
		   System.out.println(ownReg.toString());
	       Roles r = roles_service.getRole(2);
	  
	       Users l= new Users(ownReg.getOwner_email(),ownReg.getOwner_password(),false,r);
	       Users saved = users_service.save(l);
	       
	       Area a = aservice.getArea(ownReg.getArea_id());
	       
	       Owner o = new Owner(ownReg.getOwner_fname(),ownReg.getOwner_lname(),ownReg.getOwner_email(),ownReg.getContact(),ownReg.getOwner_aadhar(),ownReg.getOwner_address(),saved,a);
	       return owner_service.saveOccupant(o);
	    
	    }
	 
	
	 //Updating owner details (Update -> Put)
	 
	 @PutMapping("/updateOwner/{owner_id}")
	 public Owner updateOwner(@RequestBody Owner o, @PathVariable int owner_id)
	 {
		 return owner_service.updateOwner(o,owner_id);
	 }
	 
	 
}
