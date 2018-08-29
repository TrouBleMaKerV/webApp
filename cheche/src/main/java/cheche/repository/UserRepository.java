package cheche.repository;


import cheche.model.User;

import java.util.List;

public interface UserRepository  {
    User findByUserId(int userId);
    User findByEmail(String email);
    User findByEmailAndPassword(String email, String password);
    User findByUserIdAndPassword(int userId, String password);
    boolean save(User user);
    List<User> getAll();
    List<User> search(String userName);
}
