package cheche.service;




import cheche.vo.CourseVO;

import java.util.List;

public interface CourseService {
    boolean addCourse(CourseVO courseVO);
    boolean modifyCourse(CourseVO courseVO);
    boolean remove(int courseId);
    List<CourseVO> getCourseBySchoolId(int schoolId);
    CourseVO getCourseByCourseID(int courseId);
    List<CourseVO> getCourseByCourseType(String courseType);
    List<CourseVO> getCourseBySchoolName(String schoolName);
    List<CourseVO> getCourseByCourseName(String courseName);
    List<CourseVO> searchCourse(int searchType,String str);
}
