package cheche.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "manager")
public class Manager implements Serializable {
    @Id
    private String id;
    @Column(name = "password")
    private String password;
    @Column(name = "balance")
    private double balance;

    public double getBalance() {
        return balance;
    }

    public String getPassword() {
        return password;
    }

    public String getId() {
        return id;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(String id) {
        this.id = id;
    }
}
