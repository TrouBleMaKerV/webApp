package cheche.service.impl;


import cheche.model.School;
import cheche.model.SchoolTemp;
import cheche.repository.SchoolRepository;
import cheche.repository.SchoolTempRepository;
import cheche.repository.impl.SchoolRepositoryImpl;
import cheche.repository.impl.SchoolTempRepositoryImpl;
import cheche.service.SchoolService;
import cheche.utils.MD5;
import cheche.vo.SchoolVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class SchoolServiceImpl implements SchoolService {
    private SchoolTempRepository schoolTempRepository;
    private SchoolRepository schoolRepository;
    @Autowired
    public SchoolServiceImpl(){
        schoolTempRepository = new SchoolTempRepositoryImpl();
        schoolRepository = new SchoolRepositoryImpl();
    }
    @Override
    public String signUp(SchoolVO schoolVO) {
        String chars = "0123456789";
        char[] rands = new char[7];
        boolean isexist = true;
        String num = "";
        while (isexist){
            for (int i = 0; i < 7; i++) {
                int rand = (int) (Math.random() * 10);
                rands[i] = chars.charAt(rand);
            }
            num =  String.valueOf(rands);
            School school = schoolRepository.findBySchoolId(Integer.valueOf(num));
            SchoolTemp schoolTemp = schoolTempRepository.findBySchoolId(Integer.valueOf(num));
            if(school == null && schoolTemp == null){
                isexist = false;
            }
        }
        SchoolTemp schoolTemp = new SchoolTemp();
        schoolTemp.setAddress(schoolVO.address);
        int n = Integer.valueOf(num);
        schoolTemp.setSchoolId(n);
        schoolTemp.setSchoolName(schoolVO.schoolName);
        schoolTemp.setState("申请建立");
        schoolTemp.setIntroduction(schoolVO.introduction);
        schoolTemp.setPassword(MD5.encrypt(schoolVO.password));
        schoolTempRepository.save(schoolTemp);
        return num;
    }

    @Override
    public boolean modify(SchoolVO schoolVO) {
        SchoolTemp schoolTemp = new SchoolTemp();
        School school = schoolRepository.findBySchoolId(schoolVO.schoolId);
        schoolTemp.setAddress(schoolVO.address);
        schoolTemp.setSchoolName(schoolVO.schoolName);
        schoolTemp.setState("修改信息");
        schoolTemp.setBalance(school.getBalance());
        schoolTemp.setSchoolId(school.getSchoolId());
        schoolTemp.setPassword(school.getPassword());
        schoolTemp.setIntroduction(schoolVO.introduction);
        return schoolTempRepository.save(schoolTemp);
    }

    @Override
    public List<SchoolVO> getSchoolByName(String schoolName) {
        List<School> list = schoolRepository.findBySchoolName(schoolName);
        List<SchoolVO> result = new ArrayList<>();
        for (School school:list){
            SchoolVO schoolVO = new SchoolVO();
            schoolVO.schoolName = school.getSchoolName();
            schoolVO.address = school.getAddress();
            schoolVO.introduction =school.getIntroduction();
            schoolVO.schoolId = school.getSchoolId();
            schoolVO.balance = school.getBalance();
            result.add(schoolVO);
        }
        return result;
    }

    @Override
    public boolean sure(SchoolVO schoolVO) {
        School school = new School();
        school.setAddress(schoolVO.address);
        school.setIntroduction(schoolVO.introduction);
        school.setSchoolName(schoolVO.schoolName);
        school.setSchoolId(schoolVO.schoolId);
        school.setBalance(schoolVO.balance);
        school.setPassword(schoolVO.password);
        schoolTempRepository.removeById(schoolVO.schoolId);
        return schoolRepository.save(school);
    }

    @Override
    public boolean pass(int schoolId) {
        return schoolTempRepository.removeById(schoolId);
    }


    @Override
    public SchoolVO login(int schoolId, String Password) {
        School school = schoolRepository.findBySchoolIdAndPassword(schoolId,MD5.encrypt( Password ));
        if(school == null){
            return null;
        }else {
            SchoolVO schoolVO = new SchoolVO();
            schoolVO.schoolId = school.getSchoolId();
            return schoolVO;
        }
    }

    @Override
    public List<SchoolVO> getApply() {
        List<SchoolTemp> schoolTempList = schoolTempRepository.findAll();
        List<SchoolVO> result = new ArrayList<>();
        if(schoolTempList==null){
            return result;
        }
        for(SchoolTemp schoolTemp : schoolTempList ){
            SchoolVO schoolVO = new SchoolVO();
            schoolVO.schoolId = schoolTemp.getSchoolId();
            schoolVO.schoolName = schoolTemp.getSchoolName();
            schoolVO.introduction = schoolTemp.getIntroduction();
            schoolVO.address = schoolTemp.getAddress();
            schoolVO.state = schoolTemp.getState();
            schoolVO.password = schoolTemp.getPassword();
            schoolVO.balance = schoolTemp.getBalance();
            result.add(schoolVO);
        }
        return result;
    }

    @Override
    public SchoolVO getSchoolById(int schoolId) {
        School school = schoolRepository.findBySchoolId(schoolId);
        SchoolVO schoolVO = new SchoolVO();
        schoolVO.schoolId = school.getSchoolId();
        schoolVO.schoolName = school.getSchoolName();
        schoolVO.address = school.getAddress();
        schoolVO.introduction = school.getIntroduction();
        schoolVO.balance = school.getBalance();
        return schoolVO;
    }

    @Override
    public boolean changePassword(int schoolId, String password, String newPassword) {
        School school = schoolRepository.findBySchoolIdAndPassword(schoolId,MD5.encrypt(password));
        if(school == null){
            return false;
        }
        school.setPassword(MD5.encrypt(newPassword));
        return schoolRepository.save(school);
    }
}
