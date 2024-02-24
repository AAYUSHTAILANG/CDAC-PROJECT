package com.example.demo.entities;

public class PropertyReg {
	
	
	private String name,address;
	private int price,capacity,no_of_occupants;
	private int area_id;
	private int owner_id;
	private int facility_id;
	//private int property_id;
	
	/*public int getProperty_id() {
		return property_id;
	}
	public void setProperty_id(int property_id) {
		this.property_id = property_id;
	}*/
	public int getFacility_id() {
		return facility_id;
	}
	public void setFacility_id(int facility_id) {
		this.facility_id = facility_id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	public int getNo_of_occupants() {
		return no_of_occupants;
	}
	public void setNo_of_occupants(int no_of_occupants) {
		this.no_of_occupants = no_of_occupants;
	}
	public int getArea_id() {
		return area_id;
	}
	public void setArea_id(int area_id) {
		this.area_id = area_id;
	}
	public int getOwner_id() {
		return owner_id;
	}
	public void setOwner_id(int owner_id) {
		this.owner_id = owner_id;
	}
	@Override
	public String toString() {
		return "PropertyReg   name=" + name + ", description=" + address + ", price=" + price
				+ ", capacity=" + capacity + ", no_of_occupants=" + no_of_occupants + ", area_id=" + area_id
				+ ", owner_id=" + owner_id +" ";
	}
	
	
	
	
}
