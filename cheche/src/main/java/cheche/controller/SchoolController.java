package cheche.controller;

import cheche.service.SchoolService;
import cheche.vo.SchoolVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class SchoolController {
    @Autowired
    private SchoolService schoolService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/signUpSchool",method = RequestMethod.POST)
    public String signUp(@RequestBody SchoolVO schoolVO){
        return schoolService.signUp(schoolVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/modifySchool",method = RequestMethod.POST)
    public  boolean modify(@RequestBody SchoolVO schoolVO){
        return schoolService.modify(schoolVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getSchoolByName",method = RequestMethod.GET)
    public List<SchoolVO> getSchoolByName(@RequestParam("schoolName") String schoolName){
        return schoolService.getSchoolByName(schoolName);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/sure",method = RequestMethod.POST)
    public boolean sure(@RequestBody SchoolVO schoolVO){
        return schoolService.sure(schoolVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/schoolLogin",method = RequestMethod.GET)
    public SchoolVO schoolLogin(@RequestParam("schoolId") int schoolId,@RequestParam("password") String password){
        return schoolService.login(schoolId,password);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/schoolChangePassword",method = RequestMethod.GET)
    public boolean schoolChangePassword(@RequestParam("schoolId") int schoolId,@RequestParam("password") String password,@RequestParam("newPassword") String newPassword){
        return schoolService.changePassword(schoolId,password,newPassword);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getApply",method = RequestMethod.GET)
    public List<SchoolVO> getApply(){
        return schoolService.getApply();
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getSchoolById",method = RequestMethod.GET)
    public SchoolVO getSchoolById(@RequestParam("schoolId") int schoolId){
        return schoolService.getSchoolById(schoolId);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/searchSchool",method = RequestMethod.GET)
    public List<SchoolVO> searchSchool(@RequestParam("schoolName") String schoolName){
        return schoolService.getSchoolByName(schoolName);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/pass",method = RequestMethod.GET)
    public boolean pass(@RequestParam("schoolId") int schoolId){
        return schoolService.pass(schoolId);
    }
}
