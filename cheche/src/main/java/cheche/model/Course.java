package cheche.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "course")
public class Course implements Serializable{
    @Id
    private int courseId;

    @Column(name = "schoolName",nullable = false)
    private String schoolName;

    @Column(name = "schoolId",nullable = false)
    private int schoolId;
    @Column(name = "courseName",nullable = false)
    private String courseName;

    @Column(name = "startTime",nullable = false)
    private Date startTime;

    @Column(name = "endTime",nullable = false)
    private Date endTime;

    @Column(name = "courseStartTime",nullable = false)
    private String courseStartTime;

    @Column(name = "courseEndTime",nullable = false)
    private String courseEndTime;

    @Column(name = "price",nullable = false)
    private double price;

    @Column(name = "type",nullable = false)
    private String type;

    @Column(name ="introduction",nullable = false)
    private String introduction;

    @Column(name ="address",nullable = false)
    private String address;

    public String getAddress() {
        return address;
    }

    public int getCourseId() {
        return courseId;
    }

    public int getSchoolId() {
        return schoolId;
    }

    public String getIntroduction() {
        return introduction;
    }

    public double getPrice() {
        return price;
    }

    public String getType() {
        return type;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getCourseName() {
        return courseName;
    }

    public Date getEndTime() {
        return endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public String getCourseEndTime() {
        return courseEndTime;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCourseStartTime() {
        return courseStartTime;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setCourseEndTime(String courseEndTime) {
        this.courseEndTime = courseEndTime;
    }

    public void setCourseStartTime(String courseStartTime) {
        this.courseStartTime = courseStartTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}
