package cheche.repository.impl;


import cheche.model.Course;
import cheche.repository.CourseRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class CourseRepositoryImpl implements CourseRepository {
    @Override
    public List<Course> findBySchoolId(int schoolid) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Course as o where o.schoolId = '" + schoolid + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public Course findById(int courseId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Course as o where o.courseId = '" + courseId + "'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return (Course) list.get(0);
    }

    @Override
    public boolean save(Course course) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(course);
        transaction.commit();
        session.close();
        return true;
    }

    @Override
    public List<Course> findBySchoolName(String str) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Course as o where o.schoolName like '%" + str + "%'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public List<Course> findByCourseName(String str) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Course as o where o.courseName like '%" + str + "%'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public List<Course> findByCourseType(String str) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Course as o where o.type like '%" + str + "%'";
        Query query = session.createQuery(connection);
        List list = query.list();
        transaction.commit();
        session.close();
        return list;
    }

    @Override
    public boolean remove(Course course) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.remove(course);
        transaction.commit();
        session.close();
        return true;
    }


}
