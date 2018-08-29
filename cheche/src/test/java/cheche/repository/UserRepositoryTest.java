package cheche.repository;


import cheche.model.User;
import cheche.repository.impl.UserRepositoryImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {
    @Autowired
    UserRepository userRepository = new UserRepositoryImpl();
    @Test
    public void test(){
        User user = userRepository.findByEmail("151250089@smail.nju.edu.cn");
        if(user == null){
            System.out.println("null");
        }else {
            System.out.println(user.getUserName());
        }
    }
    @Test
    public void testFindById(){
        User user = userRepository.findByUserId(2);
        if(user == null){
            System.out.println("null");
        }else {
            System.out.println(user.getUserName());
        }
    }
}
