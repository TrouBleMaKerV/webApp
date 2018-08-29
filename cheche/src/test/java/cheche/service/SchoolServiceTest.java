package cheche.service;

import cheche.service.impl.SchoolServiceImpl;
import cheche.vo.SchoolVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SchoolServiceTest {
    @Autowired
    private SchoolService schoolService = new SchoolServiceImpl();
    @Test
    public void testSignUp(){
        SchoolVO schoolVO = new SchoolVO();
        schoolVO.address = "江苏省南京市汉口路22号";
        schoolVO.introduction = "用心教学";
        schoolVO.schoolName = "九乡河补习学校";
        schoolVO.password = "123";
        System.out.println(schoolService.signUp(schoolVO));
    }
    @Test
    public void sure(){
        SchoolVO schoolVO = new SchoolVO();
        schoolVO.address = "江苏省南京市汉口路22号";
        schoolVO.introduction = "用心教学";
        schoolVO.schoolName = "九乡河补习学校";
        schoolVO.password = "123";
        schoolVO.schoolId = 6211799;
        schoolVO.balance = 0;
        schoolService.sure(schoolVO);
    }
}
