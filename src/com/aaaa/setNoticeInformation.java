
package com.aaaa;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bean.NoticeState;
import com.bean.Notices;
import com.bean.Students;
import com.utils.EnterUtils;
import com.utils.NoticeUtils;
import com.utils.StudentUtils;

public class setNoticeInformation extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		
		NoticeUtils noticeUtils = new NoticeUtils();
		
		String studentID = req.getParameter("studentID");
		String values = req.getParameter("values");
		String noticeID = req.getParameter("noticeID");
		
		if(values!=null) { //学生提交表单信息
			System.out.println("学生填写完了提交表单信息");
			values=URLDecoder.decode(values,"utf-8");
			System.out.println(values);
			String[] temp;
			String delimeter = ","; 
			temp = values.split(delimeter); 
			int ans=noticeUtils.insertValues(noticeID,temp,temp.length);
			resp.getWriter().print(ans);
			return ;
		}
		
		String value = req.getParameter("value");
		if(value!=null) {
			value=URLDecoder.decode(value,"utf-8");
		}
		String deletedNoticeID= req.getParameter("deletedNoticeID");
		if(deletedNoticeID!=null) {
			deletedNoticeID=URLDecoder.decode(deletedNoticeID,"utf-8");
		}
		
		
		int ans=-1;
		if(deletedNoticeID!=null) {//删除通知信息
			System.out.println("删除通知的信息");
			System.out.println(deletedNoticeID);
			ans=noticeUtils.deleteInformation(deletedNoticeID);
			resp.getWriter().print(ans);
			return ;
		}else {
			//设置学生已完成
			System.out.println("设置学生对某个通知的状态为已完成");
			ans=noticeUtils.setInformation(studentID, noticeID, value);
			resp.getWriter().print(ans);
		}
		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
}
