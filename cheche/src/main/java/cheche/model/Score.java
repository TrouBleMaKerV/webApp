package cheche.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "score")
public class Score implements Serializable{

    @Id
    private int id;


    @Column(name = "courseName")
    private String courseName;

    @Column(name = "schoolName")
    private String schoolName;

    @Column(name = "userId")
    private int userId;

    @Column(name = "schoolId")
    private int schoolId;

    @Column(name = "score")
    private float score;

    @Column(name = "date")
    private Date date;

    public Date getDate() {
        return date;
    }

    public float getScore() {
        return score;
    }

    public int getId() {
        return id;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getCourseName() {
        return courseName;
    }

    public int getSchoolId() {
        return schoolId;
    }


    public void setDate(Date date) {
        this.date = date;
    }


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setScore(float score) {
        this.score = score;
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
}
