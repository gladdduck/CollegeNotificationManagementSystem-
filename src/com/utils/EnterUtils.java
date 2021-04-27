package com.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class EnterUtils {

	private Connection connection;
	private PreparedStatement stmt;
	private ResultSet rs;
	
	public EnterUtils() {
		super();
	}
	public  String enterCheck(String username, String password) throws Exception {
		System.out.println("检查用户登录密码操作");
		String res="0";
		if (null==username||null==password) {
			return res;
		}
		connection=DBUtil.getConnertion();
		String sqlString="SELECT identity  FROM enterCheck where username=? AND password=?";
		stmt=connection.prepareStatement(sqlString);
		stmt.setString(1, username);
		stmt.setString(2, password);
		rs=stmt.executeQuery();
		if(rs.next()) {
			 res=rs.getString(1);
		}else {
			res="0";
		}
		DBUtil.close(rs, stmt, connection);
		return res;
	}
//	public static void main(String[] args) {
//		String name="11";
//		String password="11";
//		EnterUtils enterUtils=new EnterUtils();
//		String type="0";
//		try {
//			type = enterUtils.enterCheck(name, password);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		System.out.println(type);
//	}



}
