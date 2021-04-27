package com.aaaa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.bean.NoticeNum;
import com.bean.NoticeState;
import com.bean.Notices;
import com.utils.NoticeUtils;

public class getNoticeInformation extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		req.setCharacterEncoding ("UTF-8");
		resp.setCharacterEncoding ("UTF-8");
		//有学生ID和状态的 查询学生完成的和未完成的通知
		//没有ID 的查询 所有的通知
		//有学生ID和text的 查询一个通知
		String studentID=req.getParameter("studentID");
		String state=req.getParameter("state");
		String noticeID=req.getParameter("noticeID");
		String num=req.getParameter("noticeNum");//也是通知的ID
		
		NoticeUtils noticeUtils=new NoticeUtils();
		Notices notice=new Notices();
		List<Notices> notices=new ArrayList<Notices>();
		
		if(num!=null) {
			System.out.println("查询通知的完成数量和未完成数量");
			List<NoticeNum> ans=noticeUtils.getNoticeNum();
			resp.getWriter().print(ans);
			return ;
		}
		if(studentID==null) {
			if(noticeID==null) {//查询所有通知
				System.out.println("查询所有的通知");
				notices=noticeUtils.findInformation();
				resp.getWriter().print(notices);
				
			}else {//通过通知的ID
				System.out.println("通过通知的ID查询通知内容");
				notices=noticeUtils.findInformation(noticeID);
				resp.getWriter().print(notices);
			}
		}else {
			if(noticeID==null) {//通过学生ID 和通知完成的状态
				System.out.println("查询学生完成的通知和未完成的通知");
				int stateInt=Integer.parseInt(state);
				notices=noticeUtils.findInformation(studentID,stateInt);
				resp.getWriter().print(notices);
			}else {//通过学生ID 和通知ID查询通知信息
				String ret;
				ret=noticeUtils.findInformation(studentID,noticeID);
				System.out.println("学生进入通知页面填写内容显示要填写的字段");
				resp.getWriter().print(ret);
			}
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
}
