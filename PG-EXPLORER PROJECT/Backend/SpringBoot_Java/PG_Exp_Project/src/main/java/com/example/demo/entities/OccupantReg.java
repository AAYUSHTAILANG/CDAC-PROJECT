package com.example.demo.entities;

public class OccupantReg {

	String occupant_fname,occupant_lname,occupant_email,occupant_password,occupant_contact,occupant_gender,occupant_profession,occupant_address,occupant_aadhar,occupant_city,alternate_contact;
	 private int  user_id;
	 private int area_id;
	
	 public int getUser_id() {
			return user_id;
		}

		public void setUser_id(int user_id) {
			this.user_id = user_id;
		}

		public int getArea_id() {
			return area_id;
		}

		public void setArea_id(int area_id) {
			this.area_id = area_id;
		}
	int occupant_area;
	public String getOccupant_fname() {
		return occupant_fname;
	}
	public void setOccupant_fname(String occupant_fname) {
		this.occupant_fname = occupant_fname;
	}
	public String getOccupant_lname() {
		return occupant_lname;
	}
	public void setOccupant_lname(String occupant_lname) {
		this.occupant_lname = occupant_lname;
	}
	public String getOccupant_email() {
		return occupant_email;
	}
	public void setOccupant_email(String occupant_email) {
		this.occupant_email = occupant_email;
	}
	public String getOccupant_password() {
		return occupant_password;
	}
	public void setOccupant_password(String occupant_password) {
		this.occupant_password = occupant_password;
	}
	public String getOccupant_contact() {
		return occupant_contact;
	}
	public void setOccupant_contact(String occupant_phone) {
		this.occupant_contact = occupant_phone;
	}
	public String getOccupant_gender() {
		return occupant_gender;
	}
	public void setOccupant_gender(String occupant_gender) {
		this.occupant_gender = occupant_gender;
	}
	public String getOccupant_profession() {
		return occupant_profession;
	}
	public void setOccupant_profession(String occupant_profession) {
		this.occupant_profession = occupant_profession;
	}
	public String getOccupant_address() {
		return occupant_address;
	}
	public void setOccupant_address(String occupant_address) {
		this.occupant_address = occupant_address;
	}
	public String getOccupant_aadhar() {
		return occupant_aadhar;
	}
	public void setOccupant_aadhar(String occupant_aadhar) {
		this.occupant_aadhar = occupant_aadhar;
	}
	public String getOccupant_city() {
		return occupant_city;
	}
	public void setOccupant_city(String occupant_city) {
		this.occupant_city = occupant_city;
	}
	public String getAlternate_contact() {
		return alternate_contact;
	}
	public void setAlternate_contact(String alternate_contact) {
		this.alternate_contact = alternate_contact;
	}
	public int getOccupant_area() {
		return occupant_area;
	}
	public void setOccupant_area(int occupant_area) {
		this.occupant_area = occupant_area;
	}
	@Override
	public String toString() {
		return "OccupantReg [occupant_fname=" + occupant_fname + ", occupant_lname=" + occupant_lname
				+ ", occupant_email=" + occupant_email + ", occupant_password=" + occupant_password
				+ ", occupant_phone=" + occupant_contact + ", occupant_gender=" + occupant_gender
				+ ", occupant_profession=" + occupant_profession + ", occupant_address=" + occupant_address
				+ ", occupant_aadhar=" + occupant_aadhar + ", occupant_city=" + occupant_city + ", alternate_contact="
				+ alternate_contact + ", occupant_area=" + occupant_area + ", getOccupant_fname()="
				+ getOccupant_fname() + ", getOccupant_lname()=" + getOccupant_lname() + ", getOccupant_email()="
				+ getOccupant_email() + ", getOccupant_password()=" + getOccupant_password() + ", getOccupant_phone()="
				+ getOccupant_contact() + ", getOccupant_gender()=" + getOccupant_gender() + ", getOccupant_profession()="
				+ getOccupant_profession() + ", getOccupant_address()=" + getOccupant_address()
				+ ", getOccupant_aadhar()=" + getOccupant_aadhar() + ", getOccupant_city()=" + getOccupant_city()
				+ ", getAlternate_contact()=" + getAlternate_contact() + ", getOccupant_area()=" + getOccupant_area()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
	
}
