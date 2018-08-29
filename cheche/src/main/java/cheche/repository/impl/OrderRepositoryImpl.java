package cheche.repository.impl;


import cheche.model.Order;
import cheche.repository.OrderRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class OrderRepositoryImpl implements OrderRepository {
    @Override
    public List<Order> findByUserIdAndOrderState(int userId,String orderState) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Order as o where o.userId = '" + userId +  "' and o.orderState = '" + orderState + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public List<Order> findBySchoolIdAndOrderState(int schoolId,String orderState) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Order as o where o.schoolId = '" + schoolId +  "' and o.orderState = '" + orderState + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public Order findByOrderId(int orderid) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Order as o where o.orderId = '" + orderid + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return (Order) list.get(0);
    }

    @Override
    public boolean save(Order order) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(order);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public List<Order> findByOrderState(String orderState) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Order as o where o.orderState = '" + orderState + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public List<Order> getAll() {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Order as o ";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }
}
