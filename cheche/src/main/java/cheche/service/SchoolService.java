package cheche.service;


import cheche.vo.SchoolVO;

import java.util.List;

public interface SchoolService {
     String signUp(SchoolVO schoolVO);
     boolean modify(SchoolVO schoolVO);
     List<SchoolVO> getSchoolByName(String schoolName);
     boolean sure(SchoolVO schoolVO);
     boolean pass(int schoolId);
     SchoolVO login(int schoolId, String Password);
     List<SchoolVO> getApply();
     SchoolVO getSchoolById(int schoolId);
     boolean changePassword(int schoolId,String password,String newPassword);
}
