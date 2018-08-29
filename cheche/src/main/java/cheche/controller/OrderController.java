package cheche.controller;

import cheche.service.OrderService;
import cheche.vo.OrderVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/createOrder",method = RequestMethod.POST)
    public boolean createOrder(@RequestBody OrderVO orderVO){
        return orderService.createOrder(orderVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/SchoolCreateOrder",method = RequestMethod.POST)
    public boolean SchoolCreateOrder(@RequestBody OrderVO orderVO){
        return orderService.SchoolPayment(orderVO);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/pay",method = RequestMethod.GET)
    public boolean pay(@RequestParam("orderId") int order, @RequestParam("userId") int userId){
        return orderService.pay(order,userId);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/cancel",method = RequestMethod.GET)
    public boolean cancel(@RequestParam("orderId") int orderId,@RequestParam("userId") int userId){
        return orderService.cancel(orderId,userId);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getOrderByUserIdAndOrderState",method = RequestMethod.GET)
    public List<OrderVO> getOrderByUserIdAndOrderState(@RequestParam("userId") int userId,@RequestParam("orderState") int orderState){
        return orderService.getOrderByUserIdAndOrderState(userId,orderState);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getOrderBySchoolIdAndOrderState",method = RequestMethod.GET)
    public List<OrderVO> getOrderBySchoolIdAndOrderState(@RequestParam("schoolId") int schoolId ,@RequestParam("orderState") int orderState){
        return orderService.getOrderBySchoolIdAndOrderState(schoolId,orderState);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getOrderByOrderState",method = RequestMethod.GET)
    public List<OrderVO> getOrderByOrderState(@RequestParam("orderState") int orderState){
        return orderService.getOrderByOrderState(orderState);
    }
}
