package cheche.repository.impl;


import cheche.model.Score;
import cheche.repository.ScoreRepository;
import cheche.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;


import java.util.ArrayList;
import java.util.List;

public class ScoreRepositoryImpl implements ScoreRepository {
    @Override
    public List<Score> getByUserId(int UserId) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        String connection = "from cheche.model.Score as o where o.userId = '" + UserId + "'";
        Query query = session.createQuery(connection);
        List<Score> list = ( ArrayList<Score> )query.list();
        transaction.commit();
        session.close();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }

    @Override
    public boolean save(Score score) {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(score);
        transaction.commit();
        session.close();
        return true;
    }

}
