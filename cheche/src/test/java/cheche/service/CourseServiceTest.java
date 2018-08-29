package cheche.service;

import cheche.service.impl.CourseServiceImpl;
import cheche.vo.CourseVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CourseServiceTest {
    @Autowired
    CourseService courseService = new CourseServiceImpl();
    @Test
    public void testAdd(){
        CourseVO  courseVO = new CourseVO();
        courseVO.courseName = "英语班";
        courseVO.courseStartTime = "14:00:00";
        courseVO.courseEndTime = "16:00:00";
        courseVO.startTime = "2018-03-05";
        courseVO.endTime = "2018-07-09";
        courseVO.price = 16000;
        courseVO.introduction = "高中英语提高班";
        courseVO.type = "英语";
        courseVO.schoolId = 6211799;
        courseVO.schoolName = "九乡河补习学校";
        courseService.addCourse(courseVO);
    }
    @Test
    public void testGet(){
        List<CourseVO> courseVOList = courseService.getCourseBySchoolId(6211799);
        CourseVO courseVO = courseVOList.get(0);
        System.out.println(courseVO.courseId);
        System.out.println(courseVO.courseName);
        System.out.println(courseVO.courseStartTime);
        System.out.println(courseVO.courseEndTime);
        System.out.println(courseVO.startTime);
        System.out.println(courseVO.endTime);
        System.out.println(courseVO.price);
        System.out.println(courseVO.introduction);
        System.out.println(courseVO.type);
        System.out.println(courseVO.schoolId);
        System.out.println(courseVO.schoolName);
    }
}
