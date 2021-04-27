
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

public class insertNoticeInformation extends HttpServlet {
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
		String noticeName = req.getParameter("noticeName");
		String maker = req.getParameter("maker");
		String message = req.getParameter("message");
		String dataChoose = req.getParameter("dataChoose");
		String chk_value = req.getParameter("chk_value");
		String field_value = req.getParameter("field_value");
		
		if(field_value!=null) {
			field_value=URLDecoder.decode(field_value,"utf-8");
			System.out.println("将老师发布的字段写入数据库");
			String[] temp;
			String delimeter = ",";  
			temp = field_value.split(delimeter); 
			int ans=noticeUtils.createTable(temp,temp.length);
			resp.getWriter().print(ans);
		}else {
			System.out.println("发布通知后 把通知的基本信息写入数据库");
			noticeName=URLDecoder.decode(noticeName,"utf-8");
			maker=URLDecoder.decode(maker,"utf-8");
			message=URLDecoder.decode(message,"utf-8");
			dataChoose=URLDecoder.decode(dataChoose,"utf-8");
			chk_value=URLDecoder.decode(chk_value,"utf-8");
			
			int ans=noticeUtils.insertInformation(noticeName,maker, message, dataChoose,chk_value);
			resp.getWriter().print(ans);
		}
		
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
}
