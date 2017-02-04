##用 JDBC 查询学生成绩单
```
package com.allen.common.db.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.junit.Test;

public class TestJdbcDemo {
    /**
     * 用JDBC查询学生成绩单
     */
    @Test
    public void test1() {
        Connection cn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            String driveClassName = null;
            Class.forName(driveClassName);
            String url = null;
            String username = null;
            String password = null;
            String studentName = null;
            cn = DriverManager.getConnection(url, username, password);
            pstmt = cn.prepareStatement(
                    "select score.* from score sco left join student stu on sco.sid= stu.id where stu.name = ?");
            pstmt.setString(1, studentName);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getInt("subject") + " " + rs.getFloat("score"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs != null)
                try {
                    rs.close();
                } catch (Exception e) {
                }
            if (pstmt != null)
                try {
                    pstmt.close();
                } catch (Exception e) {
                }
            if (cn != null)
                try {
                    cn.close();
                } catch (Exception e) {
                }
        }

    }
}
```