package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.repository.CityRepository;

@Service
public class CityService {
	@Autowired
	CityRepository city_repo;
	
	public List<City> getAll()
	{
		return city_repo.findAll();
	}
	
	public Optional<City> getCity(int c)
	{
		return city_repo.findById(c);
	}
	
	public City saveCust(City city)
	{
		return city_repo.save(city);
	}
}
