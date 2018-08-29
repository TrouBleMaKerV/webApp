package cheche;

import cheche.model.Order;
import cheche.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class ScheduleTask {
    @Autowired
    OrderRepository orderRepository;
    @Scheduled(fixedRate = 60000)
    public void checkOrder() {
        List<Order> orderList = orderRepository.getAll();
        for(Order order: orderList){
            Timestamp now = new Timestamp(System.currentTimeMillis());
            if((now.getTime() - order.getTime().getTime()) / ( 1000 * 60 ) >14){
                if(order.getOrderState().equals("未支付")){
                    order.setOrderState("已撤销");
                    orderRepository.save(order);
                }
            }
        }
    }
}
