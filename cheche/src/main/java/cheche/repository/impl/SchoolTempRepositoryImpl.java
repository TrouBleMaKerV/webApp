package cheche.repository.impl;


import cheche.model.SchoolTemp;
import cheche.repository.SchoolTempRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class SchoolTempRepositoryImpl implements SchoolTempRepository {


    @Override
    public SchoolTemp findBySchoolId(int schoolId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.SchoolTemp as o where o.schoolId = '" + schoolId + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return (SchoolTemp) list.get(0);
    }

    @Override
    public boolean save(SchoolTemp schoolTemp) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.save(schoolTemp);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public boolean removeById(int schoolId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        SchoolTemp schoolTemp = this.findBySchoolId(schoolId);
        session.remove(schoolTemp);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public List<SchoolTemp> findAll() {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.SchoolTemp as o ";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }

}
