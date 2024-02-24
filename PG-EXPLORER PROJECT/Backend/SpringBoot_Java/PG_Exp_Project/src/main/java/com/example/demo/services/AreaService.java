package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.entities.Area;
import com.example.demo.entities.City;
import com.example.demo.repository.AreaRepository;

@Service
public class AreaService {
	@Autowired
	AreaRepository area_repo;
	@Autowired
	CityService city_service;
	
	public List<Area> getAreasByCity(int city_id) {
		Optional<City> c= city_service.getCity(city_id); 
        return area_repo.findByCityId(c.get()); 
	}
	
	public Area getArea(int aid)
	{
		return area_repo.findById(aid).get();
	}
	
	public Optional<Area> getOptArea(int a)
	{
		return area_repo.findById(a);
	}
}
