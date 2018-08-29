package cheche.repository.impl;


import cheche.model.User;
import cheche.repository.UserRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {
    @Override
    public User findByUserId(int userId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as u where u.userId = '" + userId + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(userId);
            return null;
        }else{
            User user = (User)list.get(0);
            return user;
        }
    }

    @Override
    public User findByEmail(String email) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as u where u.email = '" + email + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(email);
            return null;
        }else{
            User user = (User)list.get(0);
            return user;
        }
    }

    @Override
    public User findByEmailAndPassword(String email, String password) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as u where u.email = '" + email + "' and u.password = '" + password + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(connection);
            return null;
        }else{
            User user = (User)list.get(0);
            return user;
        }
    }

    @Override
    public User findByUserIdAndPassword(int userId, String password) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as u where u.userId = '" + userId + "' and u.password = '" + password + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(connection);
            return null;
        }else{
            User user = (User)list.get(0);
            return user;
        }
    }

    @Override
    public boolean save(User user) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(user);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public List<User> getAll() {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as u";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public List<User> search(String userName) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.User as o where o.userName like '%" + userName + "%'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }
}
