package com.example.demo.entities;

import java.util.List;

public class ProFacility {

	 private List<Integer> facility_id;
	 private int property_id;
	public List<Integer> getFacility_id() {
		return facility_id;
	}
	public void setFacility_id(List<Integer> facility_id) {
		this.facility_id = facility_id;
	}
	public int getProperty_id() {
		return property_id;
	}
	public void setProperty_id(int property_id) {
		this.property_id = property_id;
	}
	public ProFacility() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "ProFacility [facility_id=" + facility_id + ", property_id=" + property_id + "]";
	}
	
	
	
	
	
}
