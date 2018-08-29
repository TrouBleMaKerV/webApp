package cheche.repository;



import cheche.model.Course;

import java.util.List;

public interface CourseRepository  {
    List<Course> findBySchoolId(int schoolid);
    Course findById(int courseId);
    boolean save(Course course);
    List<Course> findBySchoolName(String str);
    List<Course> findByCourseName(String str);
    List<Course> findByCourseType(String str);
    boolean remove(Course course);
}
