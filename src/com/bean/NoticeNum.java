package com.bean;

public class NoticeNum {
	private int undone;
	private int sum;

	public NoticeNum(int undone, int sum) {
		super();
		this.undone = undone;
		this.sum = sum;
	}

	public NoticeNum() {
		super();
	}

	public int getUndone() {
		return undone;
	}

	public void setUndone(int undone) {
		this.undone = undone;
	}

	public int getSum() {
		return sum;
	}

	public void setSum(int sum) {
		this.sum = sum;
	}

	@Override
	public String toString() {
		return "{" + "\"undone\":\"" + undone + "\"" + ",\"sum\":\"" + sum + "\"" + '}';
	}

}
