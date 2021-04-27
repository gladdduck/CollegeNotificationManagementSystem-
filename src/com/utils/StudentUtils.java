package com.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.bean.NoticeContent;
import com.bean.Notices;
import com.bean.Students;

public class StudentUtils {

	private Connection connection;
	private PreparedStatement stmt;
	private ResultSet rs;
	
	public StudentUtils() {
		super();
	}
	public Students findInformation(String id) {
		System.out.println("通多学生ID查询单个学生信息-----学生进入学生通知页面调用");
		if (null==id) {
			return null;
		}
	
		Students res=new Students();
		try {
			connection=DBUtil.getConnertion();
			String sqlString="SELECT  ID,name,major,class,age,sex FROM students where ID=? ";
			stmt=connection.prepareStatement(sqlString);
			stmt.setString(1, id);
			rs=stmt.executeQuery();
			
			if(rs.next()) {
				 res.setId(rs.getInt(1));
				 res.setName(rs.getString(2));
				 res.setMajor(rs.getString(3));
				 res.setClassNum(rs.getString(4));
				 res.setAge(rs.getInt(5));
				 res.setSex(rs.getString(6));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		//System.out.println(res);
		DBUtil.close(rs, stmt, connection);
		return res;
	}
	public ArrayList<Students> findInformation() {
		ArrayList<Students> notices=new ArrayList<Students>();
		System.out.println("查询所有学生的信息-----教师的学生管理页面调用");
		try {
			connection=DBUtil.getConnertion();
			String sqlString="SELECT  ID,name,major,class,age,sex,position FROM students ";
			stmt=connection.prepareStatement(sqlString);
			rs=stmt.executeQuery();
			while(rs.next()) {
				Students res=new Students();
				 res.setId(rs.getInt(1));
				 res.setName(rs.getString(2));
				 res.setMajor(rs.getString(3));
				 res.setClassNum(rs.getString(4));
				 res.setAge(rs.getInt(5));
				 res.setSex(rs.getString(6));
				 res.setPosition(rs.getString(7));
				 notices.add(res);
			}
		} catch (Exception e) {
			
		}
		//System.out.println(notices);
		DBUtil.close(rs, stmt, connection);
		return notices;
	}
	public List<NoticeContent> findStudentContent(String noticeID) {
		System.out.println("查询某条通知的所有的学生的填写的信息------教师点击某条通知的具体详情时调用");
		if (null==noticeID) {
			return null;
		}
		List<NoticeContent> noticeContent=new ArrayList<NoticeContent>();
		try {
			connection=DBUtil.getConnertion();
			String sqlString="SELECT  ID,name,major,class,age,sex,content FROM students,noticecontent " + 
					"where students.id=noticecontent.studentID AND noticeID=? ";
			stmt=connection.prepareStatement(sqlString);
			stmt.setInt(1, Integer.parseInt(noticeID));
			rs=stmt.executeQuery();
			
			while(rs.next()) {
				NoticeContent res=new NoticeContent();
				 res.setId(rs.getInt(1));
				 res.setName(rs.getString(2));
				 res.setMajor(rs.getString(3));
				 res.setClassNum(rs.getString(4));
				 res.setAge(rs.getInt(5));
				 res.setSex(rs.getString(6));
				 res.setContent(rs.getNString(7));
				 noticeContent.add(res);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		//System.out.println(res);
		DBUtil.close(rs, stmt, connection);
		return noticeContent;
	}

//	public static void main(String[] args) {
//		String studnetID="20002";
//		ArrayList<Students> notices=new ArrayList<Students>();
//		StudentUtils studentUtils=new StudentUtils();
//		List<NoticeContent> noticeContent=new ArrayList<NoticeContent>();
//		//notices=(ArrayList<Students>) studentUtils.findInformation();
//		noticeContent=studentUtils.findStudentContent("20002");
//		System.out.println(noticeContent.size());
//		System.out.println(noticeContent);
//	}
	
}
