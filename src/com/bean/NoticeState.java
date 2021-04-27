package com.bean;

public class NoticeState {
	private int noticeID ;
	private int studentID;
	private int state;
	private String content;
	public int getNoticeID() {
		return noticeID;
	}
	
	@Override
	public String toString() {
		return "{" +
                "\"noticeID\":\"" + noticeID +"\""+
                ",\"studentID\":\"" + studentID + "\""+
                ",\"state\":\"" + state + "\"" +
                ",\"content\":\"" + content + "\"" +
                '}';
	}

	public NoticeState() {
		super();
	}

	public NoticeState(int noticeID, int studentID, int state, String content) {
		super();
		this.noticeID = noticeID;
		this.studentID = studentID;
		this.state = state;
		this.content = content;
	}

	public void setNoticeID(int noticeID) {
		this.noticeID = noticeID;
	}
	public int getStudentID() {
		return studentID;
	}
	public void setStudentID(int studentID) {
		this.studentID = studentID;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
}
