package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name="occupant_approval")
public class Payment {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		@OneToOne
		@JoinColumn(name="occ_id")
		private Occupant occ_id;
		@OneToOne
		@JoinColumn(name="booking_id")
		private Booking booking_id;
		@Column
		private int amount;
		
		@JsonFormat(pattern="yyyy-MM-dd",shape=Shape.STRING)
		@Column(name="date")
		private String date;
		
		@Column
		private String mode;
		
		@Column
		private String transaction_id;

		public Payment() {
			super();
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public Occupant getOcc_id() {
			return occ_id;
		}

		public void setOcc_id(Occupant occ_id) {
			this.occ_id = occ_id;
		}

		public Booking getBooking_id() {
			return booking_id;
		}

		public void setBooking_id(Booking booking_id) {
			this.booking_id = booking_id;
		}

		public int getAmount() {
			return amount;
		}

		public void setAmount(int amount) {
			this.amount = amount;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public String getMode() {
			return mode;
		}

		public void setMode(String mode) {
			this.mode = mode;
		}

		public String getTransaction_id() {
			return transaction_id;
		}

		public void setTransaction_id(String transaction_id) {
			this.transaction_id = transaction_id;
		}

		public Payment(int id, Occupant occ_id, Booking booking_id, int amount, String date, String mode,
				String transaction_id) {
			super();
			this.id = id;
			this.occ_id = occ_id;
			this.booking_id = booking_id;
			this.amount = amount;
			this.date = date;
			this.mode = mode;
			this.transaction_id = transaction_id;
		}
		
		
		
		
		
}
