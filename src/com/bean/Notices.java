package com.bean;

import java.util.Date;

public class Notices {
	private int noticeID;
	private String title;
	private String maker;
	private String object;
	private Date deadLine;
	private String claim;
	

	@Override
	public String toString() {
	        return "{" +
	                "\"noticeID\":\"" + noticeID +"\""+
	                ",\"title\":\"" + title + "\""+
	                ",\"maker\":\"" + maker + "\"" +
	                ",\"object\":\"" + object + "\"" +
	                ",\"deadLine\":\"" + deadLine + "\"" +
	                ",\"claim\":\"" + claim + "\"" +
	                '}';
	}
	public Notices() {
		super();
	}

	public Notices(int noticeID, String title, String maker, String object, Date deadLine, String claim) {
		super();
		this.noticeID = noticeID;
		this.title = title;
		this.maker = maker;
		this.object = object;
		this.deadLine = deadLine;
		this.claim = claim;
	}
	public String getClaim() {
		return claim;
	}
	public void setClaim(String claim) {
		this.claim = claim;
	}
	public int getNoticeID() {
		return noticeID;
	}
	public void setNoticeID(int noticeID) {
		this.noticeID = noticeID;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMaker() {
		return maker;
	}
	public void setMaker(String maker) {
		this.maker = maker;
	}
	public String getObject() {
		return object;
	}
	public void setObject(String object) {
		this.object = object;
	}
	public Date getDeadLine() {
		return deadLine;
	}
	public void setDeadLine(Date deadLine) {
		this.deadLine = deadLine;
	}
	
	
	
	
	
}
