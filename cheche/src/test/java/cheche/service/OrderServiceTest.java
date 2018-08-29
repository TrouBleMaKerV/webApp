package cheche.service;

import cheche.service.impl.OrderServiceImpl;
import cheche.vo.OrderVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.Entity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderServiceTest {
    @Autowired
    OrderService orderService = new OrderServiceImpl();
    @Test
    public void testAdd(){
        OrderVO orderVO = new OrderVO();
        orderVO.userName = "雪";
        orderVO.courseId = 621179902;
        orderVO.courseName = "数学班";
        orderVO.price = 16000;
        orderVO.classes = 1;
        orderVO.schoolId = 6211799;
        orderVO.schoolName = "九乡河补习学校";
        orderVO.orderState = "未支付";
        orderVO.time = "2018-3-10";
        orderVO.userId = 2;
        orderService.createOrder(orderVO);
    }

}
