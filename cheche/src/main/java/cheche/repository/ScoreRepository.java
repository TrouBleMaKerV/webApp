package cheche.repository;



import cheche.model.Score;

import java.util.List;

public interface ScoreRepository {
    List<Score> getByUserId(int UserId);
    boolean save(Score score);
}
