package cheche.service.impl;


import cheche.model.Course;
import cheche.model.School;
import cheche.repository.CourseRepository;
import cheche.repository.SchoolRepository;
import cheche.repository.impl.CourseRepositoryImpl;
import cheche.repository.impl.SchoolRepositoryImpl;
import cheche.service.CourseService;
import cheche.vo.CourseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private CourseRepository courseRepository;
    private SchoolRepository schoolRepository;
    @Autowired
    public CourseServiceImpl(){
        this.courseRepository = new CourseRepositoryImpl();
        this.schoolRepository = new SchoolRepositoryImpl();
    }
    @Override
    public boolean addCourse(CourseVO courseVO) {
        Course course = new Course();
        School school = schoolRepository.findBySchoolId(courseVO.schoolId);
        course.setCourseName(courseVO.courseName);
        course.setSchoolId(courseVO.schoolId);
        course.setSchoolName(school.getSchoolName());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(false);
        try {
            course.setStartTime(sdf.parse(courseVO.startTime));
            course.setEndTime(sdf.parse(courseVO.endTime));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        course.setPrice(courseVO.price);
        course.setIntroduction(courseVO.introduction);
        course.setType(courseVO.type);
        int s = Integer.valueOf(courseVO.courseStartTime.substring(11,13));
        s= s+8;
        if(s<10){
            course.setCourseStartTime("0" + s + courseVO.courseStartTime.substring(13,19));
        }else{
            course.setCourseStartTime(s + courseVO.courseStartTime.substring(13,19));
        }
        int e = Integer.valueOf(courseVO.courseEndTime.substring(11,13));
        e= e+8;
        if(e<10){
            course.setCourseEndTime("0" + e + courseVO.courseStartTime.substring(13,19));
        }else{
            course.setCourseEndTime(e + courseVO.courseStartTime.substring(13,19));
        }
        course.setAddress(courseVO.address);
        return courseRepository.save(course);
    }

    @Override
    public boolean modifyCourse(CourseVO courseVO) {
        Course course = courseRepository.findById(courseVO.courseId);
        course.setCourseName(courseVO.courseName);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(false);
        try {
            course.setStartTime(sdf.parse(courseVO.startTime));
            course.setEndTime(sdf.parse(courseVO.endTime));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        course.setPrice(courseVO.price);
        course.setIntroduction(courseVO.introduction);
        course.setType(courseVO.type);
        int s = Integer.valueOf(courseVO.courseStartTime.substring(11,13));
        s= s+8;
        if(s<10){
            course.setCourseStartTime("0" + s + courseVO.courseStartTime.substring(13,19));
        }else{
            course.setCourseStartTime(s + courseVO.courseStartTime.substring(13,19));
        }
        int e = Integer.valueOf(courseVO.courseEndTime.substring(11,13));
        e= e+8;
        if(e<10){
            course.setCourseEndTime("0" + e + courseVO.courseStartTime.substring(13,19));
        }else{
            course.setCourseEndTime(e + courseVO.courseStartTime.substring(13,19));
        }
        course.setAddress(courseVO.address);
        return courseRepository.save(course);
    }

    @Override
    public boolean remove(int courseId) {
        Course course = courseRepository.findById(courseId);
        return courseRepository.remove(course);
    }

    @Override
    public List<CourseVO> getCourseBySchoolId(int schoolId) {
        List<Course> courseList = courseRepository.findBySchoolId(schoolId);
        List<CourseVO> result = transform(courseList);
        return result;
    }

    @Override
    public CourseVO getCourseByCourseID(int courseId) {
        Course course = courseRepository.findById(courseId);
        CourseVO result = objectToVO(course);
        return result;
    }

    @Override
    public List<CourseVO> getCourseByCourseType(String courseType) {
        List<Course> courseList = courseRepository.findByCourseType(courseType);
        List<CourseVO> result = transform(courseList);
        return result;
    }

    @Override
    public List<CourseVO> getCourseBySchoolName(String schoolName) {
        List<Course> courseList = courseRepository.findBySchoolName(schoolName);
        List<CourseVO> result = transform(courseList);
        return result;
    }

    @Override
    public List<CourseVO> getCourseByCourseName(String courseName) {
        List<Course> courseList = courseRepository.findByCourseName(courseName);
        List<CourseVO> result = transform(courseList);
        return result;
    }

    @Override
    public List<CourseVO> searchCourse(int searchType, String str) {
        if(searchType == 1){
            return this.getCourseBySchoolName(str);
        }else if(searchType == 2){
            return this.getCourseByCourseName(str);
        }else {
            return this.getCourseByCourseType(str);
        }
    }

    private List<CourseVO> transform(List<Course> courseList){
        List<CourseVO> result = new ArrayList<>();
        for(Course course:courseList){
            CourseVO courseVO =objectToVO(course);
            result.add(courseVO);
        }
        return result;
    }
    private CourseVO objectToVO(Course course){
        CourseVO courseVO = new CourseVO();
        courseVO.courseName = course.getCourseName();
        courseVO.courseStartTime = course.getCourseStartTime();
        courseVO.courseEndTime = course.getCourseEndTime();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        courseVO.endTime = df.format(course.getEndTime());
        courseVO.startTime = df.format(course.getStartTime());
        courseVO.introduction = course.getIntroduction();
        courseVO.price = course.getPrice();
        courseVO.type = course.getType();
        courseVO.courseId = course.getCourseId();
        courseVO.schoolName = course.getSchoolName();
        courseVO.schoolId = course.getSchoolId();
        courseVO.address = course.getAddress();
        return courseVO;
    }

}
