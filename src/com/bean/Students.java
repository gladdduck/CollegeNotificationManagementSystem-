package com.bean;

import java.text.ParsePosition;

public class Students {
	private String name;
	private int id;
	private String major;
	private String classNum;
	private String sex;
	private int age;
	private String position;
	
	
	@Override
	public String toString() {
		return "{" +
                "\"name\":\"" + name +"\""+
                ",\"id\":\"" + id + "\""+
                ",\"major\":\"" + major + "\"" +
                ",\"classNum\":\"" + classNum + "\"" +
                ",\"sex\":\"" + sex + "\"" +
                ",\"age\":\"" + age + "\"" +
                ",\"position\":\"" + position + "\"" +
                '}';
	}
	public Students() {
		super();
	}
	public Students(String name, int id, String major, String classNum, String sex, int age,String position) {
		super();
		this.name = name;
		this.id = id;
		this.major = major;
		this.classNum = classNum;
		this.sex = sex;
		this.age = age;
		this.position=position;
	}
	
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getClassNum() {
		return classNum;
	}
	public void setClassNum(String classNum) {
		this.classNum = classNum;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
}
