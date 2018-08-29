package cheche.service;

import cheche.service.impl.UserServiceImpl;
import cheche.vo.ManageVO;
import cheche.vo.UserVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {
    @Autowired
    UserService userService = new UserServiceImpl();


    @Test
    public void testSignUp(){
        UserVO userVO = new UserVO();
        userVO.email = "null";
        userVO.password = "123";
        userVO.balance = 5000;
        userVO.expend = 0;
        userVO.level = "" ;
        userVO.username = "雪姬";
        userService.signUp(userVO);
    }
    @Test
    public void testModify(){
        UserVO userVO = new UserVO();
        userVO.userId = 5;
        userVO.email = "11";
        userVO.password = "123";
        userVO.balance = 5000;
        userVO.expend = 0;
        userVO.level = "" ;
        userVO.username = "雪姬";
        userService.modify(userVO);
    }
    @Test
    public void testManageLogin(){
        ManageVO manageVO = userService.manageLogin("雪姬","123");
        System.out.println(manageVO.balance);
    }

    @Test
    public void testUserLogin(){
        UserVO userVO = userService.login("151250089@smail.nju.edu.cn","123");
        System.out.println(userVO.email);
    }

    @Test
    public void testMail(){
        String s = userService.getCode("151250089@smail.nju.edu.cn");
        System.out.println(s);
    }
}
