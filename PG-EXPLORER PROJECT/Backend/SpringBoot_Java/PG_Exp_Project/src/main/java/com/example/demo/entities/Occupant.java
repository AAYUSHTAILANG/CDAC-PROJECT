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
@Table(name="occupant")
public class Occupant {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int occupant_id;
	@Column
	private String occupant_fname;
	@Column
	private String occupant_lname;
	
	@Column
	private String occupant_email;
	@Column(name="occupant_contact")
	private String occupant_contact;
	@Column
	private String occupant_gender;
	@Column
	private String occupant_profession;
	@Column
	private String occupant_aadhar;
	@Column
	private String occupant_address;
	@Column
	private String alternate_contact;
	@OneToOne
	@JoinColumn(name="user_id")
	private Users user_id;
	@OneToOne
	@JoinColumn(name="area_id")
	private Area area_id;
	
	public Occupant() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Occupant(String occupant_fname, String occupant_lname, String occupant_email, String occupant_contact,
			String occupant_gender, String occupant_profession, String occupant_address, String occupant_aadhar,
			String alternate_contact, Users user_id, Area occupant_area_id) {
		super();
		this.occupant_fname = occupant_fname;
		this.occupant_lname = occupant_lname;
		this.occupant_email = occupant_email;
		this.occupant_contact = occupant_contact;
		this.occupant_gender = occupant_gender;
		this.occupant_profession = occupant_profession;
		this.occupant_aadhar = occupant_aadhar;
		this.occupant_address = occupant_address;
		this.alternate_contact = alternate_contact;
		this.user_id = user_id;
		this.area_id = occupant_area_id;
	}



	


	


/*
	public Occupant(String occupant_fname, String occupant_lname, String occupant_email, String occupant_contact,
			String occupant_gender, String occupant_profession,  String occupant_address,String occupant_aadhar,
			String alternate_contact) {
		super();
		this.occupant_fname = occupant_fname;
		this.occupant_lname = occupant_lname;
		this.occupant_email = occupant_email;
		this.occupant_contact = occupant_contact;
		this.occupant_gender = occupant_gender;
		this.occupant_profession = occupant_profession;
		this.occupant_aadhar = occupant_aadhar;
		this.occupant_address = occupant_address;
		this.alternate_contact = alternate_contact;
	}
*/


	public Occupant(String occupant_fname, String occupant_lname, String occupant_email, String occupant_contact,
			String occupant_gender, String occupant_profession, String occupant_address, String occupant_aadhar,
			String alternate_contact, int user_id, int area_id) {
		this.occupant_fname = occupant_fname;
		this.occupant_lname = occupant_lname;
		this.occupant_email = occupant_email;
		this.occupant_contact = occupant_contact;
		this.occupant_gender = occupant_gender;
		this.occupant_profession = occupant_profession;
		this.occupant_aadhar = occupant_aadhar;
		this.occupant_address = occupant_address;
		this.alternate_contact = alternate_contact;
	}



	public int getOccupant_id() {
		return occupant_id;
	}

	public void setOccupant_id(int occupant_id) {
		this.occupant_id = occupant_id;
	}

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

	public String getOccupant_contact() {
		return occupant_contact;
	}

	public void setOccupant_contact(String occupant_contact) {
		this.occupant_contact = occupant_contact;
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


	public String getAlternate_no() {
		return alternate_contact;
	}

	public void setAlternate_no(String alternate_no) {
		alternate_contact = alternate_no;
	}

	public Users getUser_id() {
		return user_id;
	}

	public void setUser_id(Users user_id) {
		this.user_id = user_id;
	}

	public Area getOccupant_area_id() {
		return area_id;
	}

	public void setOccupant_area_id(Area occupant_area_id) {
		this.area_id = occupant_area_id;
	}

	

	
	
}
