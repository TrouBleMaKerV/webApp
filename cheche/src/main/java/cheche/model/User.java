package cheche.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
public class User implements Serializable{
    @Id
    private int userId;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "userName",nullable = false)
    private String userName;

    @Column(name = "level",nullable = false)
    private String level;

    @Column(name = "balance",nullable = false)
    private double balance;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "expend",nullable = false)
    private double expend;

    @Column(name = "birthday",nullable = false)
    private String birthday;

    @Column(name = "introduction",nullable = false)
    private String introduction;

    @Column(name = "sex",nullable = false)
    private String sex;

    public String getBirthday() {
        return birthday;
    }

    public String getSex() {
        return sex;
    }

    public String getIntroduction() {
        return introduction;
    }

    public int getUserId() {
        return userId;
    }


    public double getBalance() {
        return balance;
    }


    public double getExpend() {
        return expend;
    }

    public String getLevel() {
        return level;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setExpend(double expend) {
        this.expend = expend;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
