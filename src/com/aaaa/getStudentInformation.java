package com.aaaa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bean.NoticeContent;
import com.bean.Notices;
import com.bean.Students;
import com.utils.EnterUtils;
import com.utils.NoticeUtils;
import com.utils.StudentUtils;

public class getStudentInformation extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding ("UTF-8");
		resp.setCharacterEncoding ("UTF-8");
		String studentID=req.getParameter("studentID");
		String noticeID=req.getParameter("noticeID");
		
		StudentUtils studentUtils=new StudentUtils();
		Students student=new Students();
		List<Students> students=new ArrayList<Students>();
		if(studentID==null&&noticeID==null) {
			System.out.println("查询所有学生的信息");
			students=studentUtils.findInformation();
			resp.getWriter().print(students);
		}else if(studentID!=null&&noticeID==null){
			System.out.println("通多学生ID查询单个学生信息");
			student=studentUtils.findInformation(studentID);
			resp.getWriter().write(student.toString());
		}else{
			System.out.println("查询某条通知的所有的学生的填写的信息");
			String noticeContent=new String();
			noticeContent=new NoticeUtils().findAllInformation(noticeID);
			resp.getWriter().print(noticeContent);
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
}
