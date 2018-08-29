package cheche.repository.impl;


import cheche.model.Manager;
import cheche.repository.ManageRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class ManageRepositoryImpl implements ManageRepository {
    @Override
    public Manager login(String id, String password) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Manager as u where u.id = '" + id + "' and u.password = '" + password +"'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(connection);
            return null;
        }else{
            Manager manage = (Manager) list.get(0);
            return manage;
        }
    }

    @Override
    public boolean save(Manager manager) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(manager);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public Manager find(String id) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Manager as u where u.id = '" + id + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            System.out.println(connection);
            return null;
        }else{
            Manager manage = (Manager) list.get(0);
            return manage;
        }
    }
}
