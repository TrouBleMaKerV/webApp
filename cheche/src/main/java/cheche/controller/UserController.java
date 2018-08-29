package cheche.controller;


import cheche.service.UserService;
import cheche.vo.ManageVO;
import cheche.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class UserController {
    private static final long serialVersionUID = 1L;

    @Autowired
    private UserService userService;
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public UserVO login(@RequestParam("email") String email, @RequestParam("password") String password){
        return userService.login(email,password);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/signUp",method = RequestMethod.POST)
    public boolean signUp(@RequestBody UserVO userVO){
        return userService.signUp(userVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/modify",method = RequestMethod.POST)
    public boolean modify(@RequestBody UserVO userVO){
        return userService.modify(userVO);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/manageLogin",method = RequestMethod.GET)
    public ManageVO manageLogin(@RequestParam("id") String id, @RequestParam("password") String password){
        return userService.manageLogin(id,password);
    }
    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/setPassword",method = RequestMethod.GET)
    public boolean setPassword(@RequestParam("userId") int userId , @RequestParam("password") String password, @RequestParam("newPassword") String newPassword){
        return userService.setPassword(userId,password,newPassword);
    }
    /*@CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/upgrade",method = RequestMethod.GET)
    public boolean upgrade(@RequestParam("email") String email){
        return userService.upgrade(email);
    }*/

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/store",method = RequestMethod.GET)
    public boolean store(@RequestParam("email") String email, @RequestParam("money") double money){
        return userService.store(email,money);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getCode",method = RequestMethod.GET)
    public String getCode(@RequestParam("email") String email){
        return userService.getCode(email);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getUserById",method = RequestMethod.GET)
    public UserVO getById(@RequestParam("userId") int userId){
        return userService.getById(userId);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/getManageById",method = RequestMethod.GET)
    public ManageVO getManageById(@RequestParam("id") String id){
        return userService.getManageById(id);
    }

    @CrossOrigin("http://localhost:3000")
    @RequestMapping(value = "/searchUser",method = RequestMethod.GET)
    public List<UserVO> searchUser(@RequestParam("userName") String userName){
        return userService.search(userName);
    }
}
