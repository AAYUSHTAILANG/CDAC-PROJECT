	
	package com.example.demo.entities;

	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.Table;

	@Entity
	@Table(name="facility")
	public class Facility {
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		public int id;
		@Column
		public String name;
		@Column
		public String desciption;
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
		public String getDesciption() {
			return desciption;
		}
		public void setDesciption(String desciption) {
			this.desciption = desciption;
		}
		public Facility() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Facility(int id, String name, String desciption) {
			super();
			this.id = id;
			this.name = name;
			this.desciption = desciption;
		}
		
		
		
	}
