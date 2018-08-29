package cheche.controller;

import cheche.service.CourseService;
import cheche.vo.CourseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/addCourse",method = RequestMethod.POST)
    public boolean addCourse(@RequestBody() CourseVO courseVO){
        return  courseService.addCourse(courseVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/modifyCourse",method = RequestMethod.POST)
    public boolean modifyCourse(@RequestBody() CourseVO courseVO){
        return  courseService.modifyCourse(courseVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getCourseBySchoolId",method = RequestMethod.GET)
    public List<CourseVO> getCourseBySchoolId(@RequestParam("schoolId") int schoolId){
        return courseService.getCourseBySchoolId(schoolId);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getCourseById",method = RequestMethod.GET)
    public CourseVO getCourseById(@RequestParam("courseId") int courseId){
        return courseService.getCourseByCourseID(courseId);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/removeCourse",method = RequestMethod.GET)
    public boolean removeCourse(@RequestParam("courseId") int courseId){
        return courseService.remove(courseId);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/searchCourse",method = RequestMethod.GET)
    public List<CourseVO> searchCourse(@RequestParam("searchType") int searchType,@RequestParam("search") String search){
        return courseService.searchCourse(searchType,search);
    }
}
