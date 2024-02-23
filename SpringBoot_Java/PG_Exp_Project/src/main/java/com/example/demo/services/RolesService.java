package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Roles;
import com.example.demo.repository.RolesRepository;

@Service
public class RolesService {
	@Autowired
	RolesRepository roles_repo;
	
	public Roles getRole(int id)
	{
		return roles_repo.findById(id).get();
	}
}
