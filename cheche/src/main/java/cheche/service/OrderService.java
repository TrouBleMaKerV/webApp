package cheche.service;


import cheche.vo.OrderVO;

import java.util.List;

public interface OrderService {
    boolean createOrder(OrderVO orderVO);
    boolean pay(int orderid, int userid);
    boolean cancel(int orderId,int userId);
    boolean SchoolPayment(OrderVO orderVO);
    List<OrderVO> getOrderByUserIdAndOrderState(int userId,int orderState);
    List<OrderVO> getOrderBySchoolIdAndOrderState(int schoolId,int orderState);
    List<OrderVO> getOrderByOrderState(int orderState);

}
