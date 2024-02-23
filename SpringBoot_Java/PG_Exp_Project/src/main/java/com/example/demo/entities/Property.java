package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name="property")
public class Property {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String name;
	
	@OneToOne
	@JoinColumn(name="area_id")
	private Area area_id;
	
	@Column
	private String address;
	
	@Column
	private int price;
	
	@Column
	private int capacity;
	
	@Column
	private int no_of_occupants;
	
	@ManyToOne
	@JoinColumn(name="owner_id")
	private Owner owner_id;

	public Property() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public Area getArea_id() {
		return area_id;
	}

	public void setArea_id(Area area_id) {
		this.area_id = area_id;
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

	public Owner getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(Owner owner_id) {
		this.owner_id = owner_id;
	}

	public Property(String name, Area area_id, String description, int price, int capacity, int no_of_occupants,
			Owner owner_id) {
		super();
		this.name = name;
		this.area_id = area_id;
		this.address = description;
		this.price = price;
		this.capacity = capacity;
		this.no_of_occupants = no_of_occupants;
		this.owner_id = owner_id;
	}

	@Override
	public String toString() {
		return "Property [id=" + id + ", name=" + name + ", area_id=" + area_id + ", description=" + address
				+ ", price=" + price + ", capacity=" + capacity + ", no_of_occupants=" + no_of_occupants + ", owner_id="
				+ owner_id + "]";
	}

	

	

	
	
	

}
