package cheche.service;



import cheche.vo.ScoreVO;

import java.util.List;

public interface ScoreService {
    List<ScoreVO> getByUserId(int userId);
    boolean addScore(ScoreVO scoreVO);
    boolean modify(ScoreVO scoreVO);
}
