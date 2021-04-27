package com.utils;

import java.sql.*;

public class DBUtil {
    private static final String DRIVE_NAME="com.mysql.jdbc.Driver";
	private static final String URL="jdbc:mysql://localhost:3306/webplus?characterEncoding=UTF-8";
	private static final String USERNAME="root";
	private static final String PASSWORD="yy280835";


    static {
        try {
            Class.forName(DRIVE_NAME);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnertion() throws SQLException {
        return DriverManager.getConnection(URL,USERNAME,PASSWORD);
    }

    public static void close(PreparedStatement preparedStatement,Connection connection) {
        if (null != preparedStatement){
            try {
                preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (null != connection){
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void close(ResultSet resultSet, PreparedStatement preparedStatement,Connection connection) {
        if (null != resultSet){
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (preparedStatement != null){
            try {
                preparedStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if (connection != null){
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


}
