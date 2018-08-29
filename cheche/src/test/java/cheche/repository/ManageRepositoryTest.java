package cheche.repository;

import cheche.model.Manager;
import cheche.repository.impl.ManageRepositoryImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ManageRepositoryTest {
    @Autowired
    ManageRepository manageRepository = new ManageRepositoryImpl();
    @Test
    public void testFind(){
        Manager manager = new Manager();
        manager.setId("雪姬");
        manager.setBalance(1600);
        manager.setPassword("202cb962ac59075b964b07152d234b70");
        manageRepository.save(manager);
        Manager manage = manageRepository.find("雪姬");
        System.out.println(manage.getPassword());
    }
}
