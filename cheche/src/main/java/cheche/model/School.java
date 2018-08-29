package cheche.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "school")
public class School implements Serializable{
    @Id
    private int schoolId;
    @Column(name = "schoolName",nullable = false)
    private String schoolName;
    @Column(name = "address",nullable = false)
    private String address;
    @Column(name = "introduction",nullable = false)
    private String introduction;
    @Column(name = "balance")
    private double balance;
    @Column(name = "password")
    private String password;

    public int getSchoolId() {
        return schoolId;
    }

    public String getPassword() {
        return password;
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

    public double getBalance() {
        return balance;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBalance(double balance) {
        this.balance = balance;
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
}
