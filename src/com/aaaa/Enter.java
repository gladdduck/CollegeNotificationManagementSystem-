package com.aaaa;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.plaf.synth.SynthScrollPaneUI;

import com.utils.EnterUtils;

public class Enter extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//获取前端页面传来的用户名和密码
		String name=req.getParameter("name");
		String password=req.getParameter("password");
		EnterUtils enterUtils=new EnterUtils();
		String type="0";
		// type=1 为学生
		//type=2 为老师
		//type=0 登录失败
		
		try {
			type = enterUtils.enterCheck(name, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(type);
		resp.getWriter().write(type);
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

}
