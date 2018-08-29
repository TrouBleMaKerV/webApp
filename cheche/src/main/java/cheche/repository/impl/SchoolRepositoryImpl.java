package cheche.repository.impl;


import cheche.model.School;
import cheche.repository.SchoolRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class SchoolRepositoryImpl implements SchoolRepository {
    @Override
    public School findBySchoolId(int schoolId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.School as o where o.schoolId = '" + schoolId + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return (School) list.get(0);
    }

    @Override
    public List<School> findBySchoolName(String schoolName) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.School as o where o.schoolName like '%" + schoolName + "%'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public boolean save(School school) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(school);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public School findBySchoolIdAndPassword(int schoolId, String password) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.School as s where s.schoolId = '" + schoolId + "' and s.password = '" + password + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return (School) list.get(0);
    }

    @Override
    public List<School> getAll() {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.School as u";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }
}
