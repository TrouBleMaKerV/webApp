package cheche.service;

import cheche.service.impl.ScoreServiceImpl;
import cheche.vo.ScoreVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScoreServiceImplTest {
    @Autowired
    ScoreService scoreService = new ScoreServiceImpl();

    @Test
    public void testAdd(){
        ScoreVO scoreVO = new ScoreVO();
        scoreVO.courseId = 621179902;
        scoreVO.courseName = "数学班";
        scoreVO.schoolId = 6211799;
        scoreVO.schoolName = "九乡河补习学校";
        scoreVO.score = 90;
        scoreVO.userId = 2;
        scoreService.addScore(scoreVO);
    }
    @Test
    public void testGet(){
       List<ScoreVO> scoreList = scoreService.getByUserId(2);
       System.out.println(scoreList.get(0).courseName);
    }
}
