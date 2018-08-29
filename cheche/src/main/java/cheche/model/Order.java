package cheche.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "Orders")
public class Order implements Serializable{
    @Id
    private int orderId;

    @Column(name = "userId",nullable = false)
    private int userId;

    @Column(name = "schoolId")
    private int schoolId;

    @Column(name = "price")
    private double price;

    @Column(name = "courseId")
    private int courseId;

    @Column(name = "time")
    private Timestamp time;

    @Column(name = "classes")
    private int classes;

    @Column(name = "orderState")
    private String orderState;

    @Column(name = "userName")
    private String userName;

    @Column(name = "schoolName")
    private String schoolName;

    @Column(name = "courseName")
    private String courseName;

    public int getOrderId() {
        return orderId;
    }

    public int getUserId() {
        return userId;
    }

    public double getPrice() {
        return price;
    }

    public int getSchoolId(){
        return schoolId;
    }

    public int getCourseId() {
        return courseId;
    }

    public int getClasses() {
        return classes;
    }

    public String getUserName() {
        return userName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public Timestamp getTime() {
        return time;
    }

    public String getOrderState() {
        return orderState;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setClasses(int classes) {
        this.classes = classes;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }
}
