package com.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import com.bean.NoticeNum;
import com.bean.NoticeState;
import com.bean.Notices;
import com.mysql.jdbc.ResultSetMetaData;
import com.mysql.jdbc.Statement;

public class NoticeUtils {
	private Connection connection;
	private PreparedStatement stmt;
	private ResultSet rs;

	public NoticeUtils() {
		super();
	}

	// 获取通知完成的人数
	public List<NoticeNum> getNoticeNum() {
		System.out.println("获取通知完成的人数-----教师通知管理页面调用");
		List<NoticeNum> ans = new ArrayList<NoticeNum>();
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "select count(case when state = 1 then 1 end) ,count(noticeID) " + "from noticecontent "
					+ "group by noticeID";
			stmt = connection.prepareStatement(sqlString);

			rs = stmt.executeQuery();
			while (rs.next()) {
				NoticeNum temp = new NoticeNum();
				temp.setUndone(rs.getInt(1));
				temp.setSum(rs.getInt(2));
				ans.add(temp);
			}
		} catch (Exception e) {
			return null;
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	// 学生完成通知 填写通知内容
	public int setInformation(String studentID, String noticeID, String value) {
		System.out.println("学生填写完通知提交的时候调用");
		if (null == studentID) {
			return -1;
		}
		int ans = -1;
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "update noticecontent " + "set state=1,content=? " + "where studentid=? AND noticeID=?;";
			System.out.println(value + " " + studentID + " " + noticeID);
			stmt = connection.prepareStatement(sqlString);
			stmt.setString(1, value);
			stmt.setString(2, studentID);
			stmt.setString(3, noticeID);
			ans = stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
		DBUtil.close(rs, stmt, connection);
		System.out.println(ans);
		return ans;
	}

	// 通过学生ID 和通知ID查询通知信息
	public String findInformation(String studentID, String noticeID) {
		System.out.println("查询某个学生对某条通知的填写内容-----学生进入通知的具体页面调用");
		String value = new String();
		String field = new String();
		int columnCount = 0;
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "select * " + "from notice" + noticeID + " where studentID=?";
			stmt = connection.prepareStatement(sqlString);
			stmt.setString(1, studentID);
			rs = stmt.executeQuery();
			while (rs.next()) {
				ResultSetMetaData rsmd = (ResultSetMetaData) rs.getMetaData();
				columnCount = rsmd.getColumnCount();
				System.out.println("columnCount:" + columnCount);
				for (int i = 1; i <= columnCount; i++) {
					if (i == columnCount) {
						value += rs.getString(i);
					} else {
						value += rs.getString(i) + ",";
					}
				}
			}

			sqlString = "SHOW COLUMNS FROM notice" + noticeID;
			stmt = connection.prepareStatement(sqlString);
			rs = stmt.executeQuery();
			while (rs.next()) {
				field += rs.getString(1) + ",";
			}
			field = field.substring(0, field.length() - 1);

		} catch (Exception e) {
			e.printStackTrace();
		}
		String ans = new String();
		ans += "{ ";
		String[] values = new String[10];
		String[] fields = new String[10];
		values = value.split(",");
		fields = field.split(",");
		// 待优化----------TODO
		if (values.length != fields.length) {
			for (int i = 0; i < fields.length; i++) {
				if (i == fields.length - 1) {
					ans += ("\"" + fields[i] + "\" : " + "\"  \" }");
				} else {

					ans += ("\"" + fields[i] + "\" : " + "\"  \" ,");
				}

			}
		} else {
			for (int i = 0; i < fields.length; i++) {
				if (i == fields.length - 1) {
					ans += ("\"" + fields[i] + "\" : " + "\"" + values[i] + "\" }");
				} else {
					ans += ("\"" + fields[i] + "\" : " + "\"" + values[i] + "\" ,");
				}

			}
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	// 通过通知的ID
	public ArrayList<Notices> findInformation(String noticeID) {
		System.out.println("查询某个通知的内容-----用于学生进入某个通知页面的时候调用");
		ArrayList<Notices> notices = new ArrayList<Notices>();
		if (null == noticeID) {
			return null;
		}
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "select ID,title,maker,object,deadline,claim " + "from noticeList " + "where ID=? ";
			stmt = connection.prepareStatement(sqlString);
			stmt.setInt(1, Integer.parseInt(noticeID));
			rs = stmt.executeQuery();
			while (rs.next()) {
				Notices res = new Notices();
				res.setNoticeID(rs.getInt(1));
				res.setTitle(rs.getString(2));
				res.setMaker(rs.getString(3));
				res.setObject(rs.getString(4));
				res.setDeadLine(rs.getDate(5));
				res.setClaim(rs.getString(6));
				notices.add(res);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		DBUtil.close(rs, stmt, connection);
		return notices;
	}

	// 通过学生ID 和通知完成的状态
	public ArrayList<Notices> findInformation(String studentID, int state) {
		System.out.println("通过学生对某条通知完成的状态------用于展示学生待完成和未完成的通知");
		ArrayList<Notices> notices = new ArrayList<Notices>();
		if (null == studentID) {
			return null;
		}
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "select ID,title,maker,object,deadline,claim " + "from noticeList , noticecontent "
					+ "where studentID=? AND state=? AND noticecontent.noticeID=noticelist.id;";

			stmt = connection.prepareStatement(sqlString);
			stmt.setString(1, studentID);
			stmt.setInt(2, state);
			rs = stmt.executeQuery();
			System.out.println();
			while (rs.next()) {
				Notices res = new Notices();
				res.setNoticeID(rs.getInt(1));
				res.setTitle(rs.getString(2));
				res.setMaker(rs.getString(3));
				res.setObject(rs.getString(4));
				res.setDeadLine(rs.getDate(5));
				res.setClaim(rs.getString(6));
				notices.add(res);
				// System.out.println(res);
			}
		} catch (Exception e) {

		}

		DBUtil.close(rs, stmt, connection);
		return notices;
	}

	// 查询所有通知
	public ArrayList<Notices> findInformation() {
		System.out.println("显示所有的通知-----教师进入查询所有通知的管理页面");
		ArrayList<Notices> notices = new ArrayList<Notices>();

		try {
			connection = DBUtil.getConnertion();
			String sqlString = "SELECT  ID,title,maker,object,deadline,claim FROM noticelist ";
			stmt = connection.prepareStatement(sqlString);
			rs = stmt.executeQuery();
			while (rs.next()) {
				Notices res = new Notices();
				res.setNoticeID(rs.getInt(1));
				res.setTitle(rs.getString(2));
				res.setMaker(rs.getString(3));
				res.setObject(rs.getString(4));
				res.setDeadLine(rs.getDate(5));
				res.setClaim(rs.getString(6));
				notices.add(res);
			}
		} catch (Exception e) {

		}
		DBUtil.close(rs, stmt, connection);
		return notices;
	}

	public int insertInformation(String noticeName, String maker, String message, String dataChoose, String chk_value) {
		System.out.println("学生提交填写信息时调用-------将通知状态设置为完成");
		int ans = -1;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			java.sql.Date sqlDate = new java.sql.Date(sdf.parse(dataChoose).getTime());
			System.out.println("sqlDate : " + sqlDate);
			connection = DBUtil.getConnertion();
			String sqlString = "insert into noticeList(title,maker,object,deadline,claim)  " + "values (?,?,?,?,?); ";
			stmt = connection.prepareStatement(sqlString);
			stmt.setString(1, noticeName);
			stmt.setString(2, maker);
			stmt.setString(3, chk_value);
			stmt.setDate(4, sqlDate);
			stmt.setString(5, message);
			ans = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}

		DBUtil.close(rs, stmt, connection);
		if (chk_value.indexOf("所有人") != -1) {

			return forALL(noticeName, maker, message, dataChoose, chk_value);
		} else {
			return forSomeone(noticeName, maker, message, dataChoose, chk_value);
		}
	}

	private int forALL(String noticeName, String maker, String message, String dataChoose, String chk_value) {
		System.out.println("通知发布的对象为全部人的时候调用");
		int ans = -1;
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "insert into noticecontent(noticeID,studentID,state)  "
					+ "select  noticelist.ID ,students.id,0  " + "from noticelist,students " + "where noticelist.id=( "
					+ "	select MAX(ID) " + "from noticelist " + ");";
			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}

		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	private int forSomeone(String noticeName, String maker, String message, String dataChoose, String chk_value) {
		System.out.println("通知发布的对象为某个职位的人的时候调用");
		int ans = -1;
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "insert into noticecontent(noticeID,studentID,state) "
					+ "select noticelist.ID,students.id,0 " + "from students,noticeList "
					+ "where FIND_IN_SET(students.position,noticeList.object) ANd noticelist.id=( " + "	select MAX(ID) "
					+ "from noticelist " + ");";
			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	public int deleteInformation(String noticeID) {
		System.out.println("删除某条通知-------教师的通知管理页面调用");
		int ans = -1;
		try {
			connection = DBUtil.getConnertion();
			String sqlString = "delete from noticelist " + "where ID=?";
			stmt = connection.prepareStatement(sqlString);
			stmt.setString(1, noticeID);
			ans = stmt.executeUpdate();
			sqlString = "DROP TABLE notice" + noticeID + ";";
			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	public int createTable(String[] chk_value, int fieldLength) {
		System.out.println("根据通知ID 创建新的表 字段为教师选择的字段------教师发布通知的时候调用");
		int ans = -1;

		try {
			connection = DBUtil.getConnertion();
			String sqlString = "set @newNoticeID=1;";
			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();

			sqlString = "select @newNoticeID:=MAX(ID) from noticelist;";

			stmt = connection.prepareStatement(sqlString);
			stmt.executeQuery();
			stmt = connection.prepareStatement(sqlString);
			stmt.executeQuery();
			String temp = "(";
			for (int i = 0; i < fieldLength; i++) {
				temp += (chk_value[i] + " varchar(255) ,");
			}
			temp += ("studentID" + " int primary key);");
			sqlString = "SET @data_sql = CONCAT(\"create table \",CONCAT('notice',@newNoticeID),\"" + temp + "\"); ";

			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();

			sqlString = " PREPARE stmt FROM @data_sql; ";

			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();

			sqlString = " EXECUTE stmt; ";

			stmt = connection.prepareStatement(sqlString);
			ans = stmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}

	// 查询一个通知的所有信息
	public String findAllInformation(String noticeID) {
		System.out.println("查询某条通知的所有学生的填写内容-----通知页面点击某个通知的具体情况");
		String value[] = new String[10];
		String[] ans=new String[10];
		String field = new String();
		int cnt=0;
		int columnCount = 0;
		for(int j=0;j<10;j++) {
			value[j]="";
		}
		try {
			connection = DBUtil.getConnertion();
			String sqlString = " select *from notice" + noticeID + " ;";
			stmt = connection.prepareStatement(sqlString);
			rs = stmt.executeQuery();
			while (rs.next()) {
				ans[cnt]="";
				cnt++;
				ResultSetMetaData rsmd = (ResultSetMetaData) rs.getMetaData();
				columnCount = rsmd.getColumnCount();
				for (int i = 1; i <= columnCount; i++) {
					if (rs.isLast()) {
						value[i-1] += rs.getString(i);
					} else {
						value[i-1] += rs.getString(i) + ",";
					}
				}
			}
			sqlString = "SHOW COLUMNS FROM notice" + noticeID;
			stmt = connection.prepareStatement(sqlString);
			rs = stmt.executeQuery();
			while (rs.next()) {
				
				field += rs.getString(1) + ",";
			}
			field = field.substring(0, field.length() - 1);

		} catch (Exception e) {
			e.printStackTrace();
		}
		String[] fields = new String[10];
		fields = field.split(",");
		String ret=new String();
		
		String[][] values=new String[20][10];
		for(int j=0;j<fields.length;j++) {
			ans[j]="";
			values[j]=value[j].split(",");
		}
		ret="[ ";
		for(int j=0;j<cnt;j++) {
			ans[j] += "{ ";
			for (int i = 0; i <fields.length; i++) {
				if (i == fields.length - 1) {
					ans[j] += ("\"" + fields[i] + "\" : " + "\""+values[i][j]+"\" }");
				} else {
					ans[j] += ("\"" + fields[i] + "\" : " + "\""+values[i][j]+"\" ,");
				}
			}
			if(j==cnt-1) {
				ret+=ans[j]+"]";
			}else {
				ret+=ans[j]+",";
			}
			
		}
		if(cnt==0) {
			ans[0]="{";
			for (int i = 0; i <fields.length; i++) {
				if (i == fields.length - 1) {
					ans[0] += ("\"" + fields[i] + "\" : " + "\"暂无数据\" }");
				} else {
					ans[0] += ("\"" + fields[i] + "\" : " + "\"暂无数据\" ,");
				}
				
			}
			ret+=ans[0]+"]";
		}
		System.err.println(ret);
		DBUtil.close(rs, stmt, connection);
		return ret;
	}

	public static void main(String[] args) {

		System.out.println(new NoticeUtils().findAllInformation("20021"));
	}

	public int insertValues(String noticeID, String[] temp, int length) {
		System.out.println("将学生填写的表单写入数据库------学生提交通知的时候调用");
		int ans = -1;
		try {
			connection = DBUtil.getConnertion();
			String sqlString="select count(studentID) from notice"+noticeID +" where studentID="+temp[length-1];
			stmt = connection.prepareStatement(sqlString);
			rs = stmt.executeQuery();
			if (rs.next()) {
				sqlString="delete from notice"+noticeID +" where studentID="+temp[length-1];
				stmt = connection.prepareStatement(sqlString);
				stmt.executeUpdate();
			}
			sqlString = "insert into notice" + noticeID + " values( ?";
			for (int i = 1; i < length; i++) {
				sqlString += (",?");
			}
			sqlString += ");";
			stmt = connection.prepareStatement(sqlString);
			for (int i = 0; i < length; i++) {
				
				stmt.setString(i + 1, temp[i]);
			}
			ans = stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		DBUtil.close(rs, stmt, connection);
		return ans;
	}
}
