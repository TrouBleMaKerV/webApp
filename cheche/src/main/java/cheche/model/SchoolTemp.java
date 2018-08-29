package cheche.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "schoolTemp")
public class SchoolTemp implements Serializable{
    @Id
    private int schoolId;

    @Column(name = "schoolName",nullable = false)
    private String schoolName;

    @Column(name = "address",nullable = false)
    private String address;

    @Column(name = "introduction",nullable = false)
    private String introduction;

    @Column(name = "state",nullable = false)
    private String state;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "balance",nullable = false)
    private double balance;

    public int getSchoolId() {
        return schoolId;
    }

    public String getAddress() {
        return address;
    }

    public String getIntroduction() {
        return introduction;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getState() {
        return state;
    }

    public String getPassword() {
        return password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSchoolId(int schoolId) {
        this.schoolId = schoolId;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setState(String state) {
        this.state = state;
    }
}
