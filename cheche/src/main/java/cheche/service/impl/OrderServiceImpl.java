package cheche.service.impl;


import cheche.model.*;
import cheche.repository.*;
import cheche.repository.impl.*;
import cheche.service.OrderService;
import cheche.vo.OrderVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private  SchoolRepository schoolRepository;
    private CourseRepository courseRepository;
    private ManageRepository manageRepository;
    @Autowired
    public  OrderServiceImpl(){
        this.orderRepository = new OrderRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
        this.schoolRepository = new SchoolRepositoryImpl();
        this.courseRepository = new CourseRepositoryImpl();
        this.manageRepository = new ManageRepositoryImpl();
    }
    @Override
    public boolean createOrder(OrderVO orderVO) {
        Order order = new Order();
        order.setCourseId(orderVO.courseId);
        order.setPrice(orderVO.price);
        order.setSchoolId(orderVO.schoolId);
        order.setUserId(orderVO.userId);
        order.setSchoolName(orderVO.schoolName);
        User user = userRepository.findByUserId(orderVO.userId);
        order.setUserName(user.getUserName());
        order.setCourseName(orderVO.courseName);
        order.setTime(new Timestamp(System.currentTimeMillis()));
        if(orderVO.classes == 0){
            order.setClasses((int)(Math.random()*9));
        }else{
            order.setClasses(orderVO.classes);
        }
        order.setOrderState("未支付");
        orderRepository.save(order);
        return true;
    }

    @Override
    public boolean pay(int orderid,int userid) {
        User user = userRepository.findByUserId(userid);
        Order order = orderRepository.findByOrderId(orderid);
        School school = schoolRepository.findBySchoolId(order.getSchoolId());
        Manager manager = manageRepository.find("雪姬");
        if(user.getBalance()>= order.getPrice()){
            if  ( user.getExpend()  < 5000 ) {
                user.setLevel("普通会员");
                double price = order.getPrice() * 1.0;
                user.setBalance(user.getBalance() - price);
                user.setExpend(user.getExpend() + order.getPrice());
                manager.setBalance(manager.getBalance() + order.getPrice() * 0.2);
            } else if ( user.getExpend() < 10000 ) {
                user.setLevel("白银会员");
                double price = order.getPrice() * 0.95;
                user.setBalance(user.getBalance() - price);
                user.setExpend(user.getExpend() + order.getPrice());
                manager.setBalance(manager.getBalance() + order.getPrice() * 0.15);
            } else if ( user.getExpend() < 15000 ) {
                user.setLevel("黄金会员");
                double price = order.getPrice() * 0.90;
                user.setBalance(user.getBalance() - price);
                user.setExpend(user.getExpend() + order.getPrice());
                manager.setBalance(manager.getBalance() + order.getPrice() * 0.10);
            } else if (user.getExpend() <20000) {
                user.setLevel("白金会员");
                double price = order.getPrice() * 0.85;
                user.setBalance(user.getBalance() - price);
                user.setExpend(user.getExpend() + order.getPrice());
                manager.setBalance(manager.getBalance() + order.getPrice() * 0.05);
            } else {
                user.setLevel("至尊会员");
                double price = order.getPrice() * 0.8;
                user.setBalance(user.getBalance() - price);
                user.setExpend(user.getExpend() + order.getPrice());
            }
            school.setBalance(school.getBalance() + order.getPrice() * 0.8 );
            order.setOrderState("已支付");
            orderRepository.save(order);
            userRepository.save(user);
            schoolRepository.save(school);
            manageRepository.save(manager);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public boolean cancel(int orderId,int userId) {
        Order order = orderRepository.findByOrderId(orderId);
        Course course = courseRepository.findById(order.getCourseId());
        order.setOrderState("已撤销");
        orderRepository.save(order);
        if(course.getStartTime().getTime()>System.currentTimeMillis()){
            User user = userRepository.findByUserId(userId);
            user.setExpend(user.getExpend() - order.getPrice());
            School school = schoolRepository.findBySchoolId(order.getSchoolId());
            school.setBalance(school.getBalance() - order.getPrice() * 0.8);
            Manager manager = manageRepository.find("雪姬");
            if  ( user.getExpend()  < 5000 ) {
                user.setBalance(user.getBalance() + order.getPrice() * 1.0);
                manager.setBalance(manager.getBalance() - order.getPrice() * 0.2);
            } else if ( user.getExpend() < 10000 ) {
                user.setBalance(user.getBalance() + order.getPrice() * 0.95);
                manager.setBalance(manager.getBalance() - order.getPrice() * 0.15);
            } else if ( user.getExpend() < 15000 ) {
                user.setBalance(user.getBalance() + order.getPrice() * 0.9);
                manager.setBalance(manager.getBalance() - order.getPrice() * 0.10);
            } else if (user.getExpend() <20000) {
                user.setBalance(user.getBalance() + order.getPrice() * 0.85);
                manager.setBalance(manager.getBalance() - order.getPrice() * 0.05);
            } else {
                user.setBalance(user.getBalance() + order.getPrice() * 0.8);
            }
            userRepository.save(user);
            schoolRepository.save(school);
            manageRepository.save(manager);
        }
        return true;
    }

    @Override
    public boolean SchoolPayment(OrderVO orderVO) {
        User user = userRepository.findByUserId(orderVO.userId);
        School school = schoolRepository.findBySchoolId(orderVO.schoolId);
        Course course = courseRepository.findById(orderVO.courseId);
        Order order = new Order();
        order.setCourseId(course.getCourseId());
        order.setPrice(course.getPrice());
        order.setSchoolId(school.getSchoolId());
        order.setUserId(user.getUserId());
        order.setSchoolName(school.getSchoolName());
        order.setUserName(user.getUserName());
        order.setCourseName(course.getCourseName());
        order.setTime(new Timestamp(System.currentTimeMillis()));
        if(orderVO.classes == 0){
            order.setClasses((int)(Math.random()*9));
        }else{
            order.setClasses(orderVO.classes);
        }
        order.setOrderState("已支付");
        return orderRepository.save(order);
    }

    @Override
    public List<OrderVO> getOrderByUserIdAndOrderState(int userId,int orderState) {
        String state ;
        if(orderState == 1){
            state = "已支付";
        }else if(orderState == 2){
            state = "未支付";
        }else {
            state = "已撤销";
        }
        List<Order> orders = orderRepository.findByUserIdAndOrderState(userId,state);
        List<OrderVO> result = new ArrayList<>();
        for( Order order : orders){
            OrderVO orderVO = new OrderVO();
            orderVO.orderId = order.getOrderId();
            orderVO.userId = order.getUserId();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderVO.time = df.format(order.getTime());
            orderVO.orderState = order.getOrderState();
            orderVO.schoolName = order.getSchoolName();
            orderVO.schoolId = order.getSchoolId();
            orderVO.classes = order.getClasses();
            orderVO.price = order.getPrice();
            orderVO.courseName = order.getCourseName();
            orderVO.courseId = order.getCourseId();
            result.add(orderVO);
        }
        return result;
    }

    @Override
    public List<OrderVO> getOrderBySchoolIdAndOrderState(int schoolId ,int orderState) {
        String state ;
        if(orderState == 1){
            state = "已支付";
        }else if(orderState == 2){
            state = "未支付";
        }else {
            state = "已撤销";
        }
        List<Order> orders = orderRepository.findBySchoolIdAndOrderState(schoolId,state);
        List<OrderVO> result = new ArrayList<>();
        for( Order order : orders){
            OrderVO orderVO = new OrderVO();
            orderVO.orderId = order.getOrderId();
            orderVO.userId = order.getUserId();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderVO.time = df.format(order.getTime());
            orderVO.orderState = order.getOrderState();
            orderVO.classes = order.getClasses();
            orderVO.price = order.getPrice();
            orderVO.courseName = order.getCourseName();
            orderVO.courseId = order.getCourseId();
            orderVO.userName = order.getUserName();
            result.add(orderVO);
        }
        return result;
    }

    @Override
    public List<OrderVO> getOrderByOrderState(int orderState) {
        String state ;
        if(orderState == 1){
            state = "已支付";
        }else if(orderState == 2){
            state = "未支付";
        }else {
            state = "已撤销";
        }
        List<Order> orders = orderRepository.findByOrderState(state);
        List<OrderVO> result = new ArrayList<>();
        for( Order order : orders){
            OrderVO orderVO = new OrderVO();
            orderVO.orderId = order.getOrderId();
            orderVO.userId = order.getUserId();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderVO.time = df.format(order.getTime());
            orderVO.orderState = order.getOrderState();
            orderVO.classes = order.getClasses();
            orderVO.price = order.getPrice();
            orderVO.courseName = order.getCourseName();
            orderVO.courseId = order.getCourseId();
            orderVO.userName = order.getUserName();
            orderVO.schoolId = order.getSchoolId();
            orderVO.schoolName = order.getSchoolName();
            result.add(orderVO);
        }
        return result;
    }

}
