package cheche.controller;

import cheche.service.ScoreService;
import cheche.vo.ScoreVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScoreController {
    @Autowired
    ScoreService scoreService;

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/addScore",method = RequestMethod.POST)
    public boolean addScore(@RequestBody ScoreVO scoreVO){
        return scoreService.addScore(scoreVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/modifyScore",method = RequestMethod.POST)
    public boolean modify(@RequestBody ScoreVO scoreVO){
        return scoreService.modify(scoreVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getScoreByUserId",method = RequestMethod.GET)
    public List<ScoreVO> getScoreByUserId(@RequestParam("userId") int userId){
        return scoreService.getByUserId(userId);
    }
}
