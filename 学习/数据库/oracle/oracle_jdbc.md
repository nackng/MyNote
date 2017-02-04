[TOC]
##jdbc 连接并访问 oracle 数据库
```
public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "username", "password");
            pstmt = conn.prepareStatement(
                    "select score.* from score sco left join student stu on sco.sid= stu.id where stu.name = ?");
            String studentName = "frank";
            pstmt.setString(1, studentName);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getInt("subject") + "" + rs.getFloat("score"));
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
            if (conn != null)
                try {
                    conn.close();
                } catch (Exception e) {
                }
        }
    }
```