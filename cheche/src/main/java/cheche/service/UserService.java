package cheche.service;


import cheche.vo.ManageVO;
import cheche.vo.UserVO;

import java.util.List;

public interface UserService {
     boolean signUp(UserVO userVO);
     String getCode(String email);
     UserVO login(String email, String password);
     boolean setPassword(int userId, String Password, String newPassword);
    // boolean upgrade(String email);
     boolean store(String email, double money);
     ManageVO manageLogin(String id, String password);
     boolean modify(UserVO userVO);
     UserVO getById(int userId);
     ManageVO getManageById(String id);
     List<UserVO> search(String userName);
}
