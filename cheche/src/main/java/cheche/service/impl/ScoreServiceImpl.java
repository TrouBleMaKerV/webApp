package cheche.service.impl;




import cheche.model.Score;
import cheche.repository.ScoreRepository;
import cheche.repository.impl.ScoreRepositoryImpl;
import cheche.service.ScoreService;
import cheche.vo.ScoreVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;


@Service
public class ScoreServiceImpl implements ScoreService {
    private ScoreRepository scoreRepository;
    @Autowired
    public ScoreServiceImpl(){
        scoreRepository = new ScoreRepositoryImpl();
    }
    @Override
    public List<ScoreVO> getByUserId(int userId) {
        List<ScoreVO> result = new ArrayList<ScoreVO>();
        List<Score> scoreList = scoreRepository.getByUserId(userId);
        for(Score score: scoreList){
            ScoreVO scoreVO = new ScoreVO();
            scoreVO.courseName = score.getCourseName();
            scoreVO.schoolName = score.getSchoolName();
            scoreVO.id = score.getId();
            scoreVO.score = score.getScore();
            scoreVO.schoolId =score.getSchoolId();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            scoreVO.date = simpleDateFormat.format(score.getDate());
            result.add(scoreVO);
        }
        return result;
    }

    @Override
    public boolean addScore(ScoreVO scoreVO)  {
        Score score = new Score();
        score.setCourseName(scoreVO.courseName);
        score.setScore(scoreVO.score);
        score.setUserId(scoreVO.userId);
        score.setSchoolId(scoreVO.schoolId);
        score.setSchoolName(scoreVO.schoolName);
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            score.setDate(simpleDateFormat.parse(scoreVO.date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return scoreRepository.save(score);
    }

    @Override
    public boolean modify(ScoreVO scoreVO) {
        Score score = new Score();
        score.setId(scoreVO.id);
        score.setCourseName(scoreVO.courseName);
        score.setScore(scoreVO.score);
        score.setUserId(scoreVO.userId);
        score.setSchoolId(scoreVO.schoolId);
        score.setSchoolName(scoreVO.schoolName);
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            score.setDate(simpleDateFormat.parse(scoreVO.date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return scoreRepository.save(score);
    }

}
