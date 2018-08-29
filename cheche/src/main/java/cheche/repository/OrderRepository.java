package cheche.repository;



import cheche.model.Order;

import java.util.List;

public interface OrderRepository {
    List<Order> findByUserIdAndOrderState(int userId,String orderState);
    List<Order> findBySchoolIdAndOrderState(int schoolId,String orderState);
    Order findByOrderId(int orderid);
    boolean save(Order order);
    List<Order> findByOrderState(String orderState);
    List<Order> getAll();
}
