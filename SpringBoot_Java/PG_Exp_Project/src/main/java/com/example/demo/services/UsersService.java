package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Occupant_approval;
import com.example.demo.entities.Roles;
import com.example.demo.entities.Users;
import com.example.demo.repository.UsersReopository;

@Service
public class UsersService {
	
	@Autowired
	UsersReopository users_repo;
	
	public Users getLogin(String user_email,String user_password)
	{
		Users l;
		Optional<Users> ol = users_repo.getLogin(user_email, user_password);
		try
		{
			l=ol.get();
		}
		catch(Exception e)
		{
			l=null;
		}
		return l;
	}
	
	public Users save(Users l)
	{
		return users_repo.save(l);
	}
	
	public Users getOne(int uid)
	{
		return users_repo.findById(uid).get();
	}

/*	public List<Users> getRequestFromOwner(Users u) {
		return users_repo.findById(u);
	}
	*/
	
	 public List<Users> getOwnerRequest(Roles role) {
	        return users_repo.getOwnerRequest(role);
	    }
	
	 public Users updateRequest(Users u, int id) {
			
			Users ua = users_repo.findById(id).get();
			ua.setUser_active_status(true);//indicates success
			return users_repo.save(ua);
		}
		public Users rejectRequest(Users u, int user_id) {
			
			Users ua = users_repo.findById(user_id).get();
			ua.setUser_active_status(false);//indicates failure
			return users_repo.save(ua);
		}
	
}
