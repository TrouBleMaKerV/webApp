package cheche.service.impl;


import cheche.model.Manager;
import cheche.model.School;
import cheche.model.User;
import cheche.repository.ManageRepository;
import cheche.repository.SchoolRepository;
import cheche.repository.UserRepository;
import cheche.repository.impl.ManageRepositoryImpl;
import cheche.repository.impl.SchoolRepositoryImpl;
import cheche.repository.impl.UserRepositoryImpl;
import cheche.service.UserService;
import cheche.utils.MD5;
import cheche.vo.ManageVO;
import cheche.vo.UserVO;
import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private ManageRepository manageRepository;
    private SchoolRepository schoolRepository;
    @Autowired
    public UserServiceImpl(){
        this.userRepository = new UserRepositoryImpl();
        this.manageRepository = new ManageRepositoryImpl();
        schoolRepository = new SchoolRepositoryImpl();
    }

    @Override
    public boolean signUp(UserVO userVO) {
        User user = new User();
        user.setEmail(userVO.email);
        user.setLevel("普通会员");
        user.setBalance(0);
        user.setExpend(0);
        user.setUserName(userVO.email);
        user.setPassword(MD5.encrypt(userVO.password));
        user.setBirthday("null");
        user.setIntroduction("null");
        user.setSex("男");
        return userRepository.save(user);
    }

    @Override
    public String getCode(String email) {
        User user = userRepository.findByEmail(email);
        if(user != null){
            return "exist";
        }
        String chars = "0123456789";
        char[] rands = new char[6];
        for (int i = 0; i < 6; i++) {
            int rand = (int) (Math.random() * 10);
            rands[i] = chars.charAt(rand);
        }
        String num = String.valueOf(rands);
        // 收件人电子邮箱
        String to = email;

        // 发件人电子邮箱
        String from = "782024062@qq.com";

        // 指定发送邮件的主机为 smtp.qq.com
        String host = "smtp.qq.com";  //QQ 邮件服务器

        // 获取系统属性
        Properties properties = System.getProperties();

        // 设置邮件服务器
        properties.setProperty("mail.smtp.host", host);

        properties.put("mail.smtp.auth", "true");
        MailSSLSocketFactory sf = null;
        try {
            sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.ssl.socketFactory", sf);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }
        // 获取默认session对象
        Session session = Session.getDefaultInstance(properties,new Authenticator(){
            public PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication("782024062@qq.com", "ioolndenegkhbbfh"); //发件人邮件用户名、密码
            }
        });

        try{
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);

            // Set From: 头部头字段
            message.setFrom(new InternetAddress(from));

            // Set To: 头部头字段
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));

            // Set Subject: 头部头字段
            message.setSubject("注册验证码");
            // 设置消息体
            message.setText("您注册的验证码为"+num);

            // 发送消息
            Transport.send(message);
            System.out.println("Sent message successfully....from runoob.com");
            return num;
        }catch (MessagingException mex) {
            mex.printStackTrace();
        }

        return  null;
    }



    @Override
    public UserVO login(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email,MD5.encrypt(password));
        if(user==null){
            return null;
        }else{
            UserVO userVO = new UserVO();
            userVO.userId = user.getUserId();
            return userVO;
        }
    }

    @Override
    public boolean setPassword(int userId, String Password, String newPassword) {
        User user ;
        user = userRepository.findByUserIdAndPassword(userId,MD5.encrypt(Password));
        if(user == null){
            return false;
        }
        user.setPassword(MD5.encrypt(newPassword));
        return   userRepository.save(user);
    }

   /* @Override
    public boolean upgrade(String email) {
        User user = userRepository.findByEmail(email);
        if ( level == 0 ){
            return '普通用户';
        } else if ( level == 1 ) {
            return '白银会员';
        } else if ( level == 2 ) {
            return '黄金会员';
        } else if ( level == 3 ) {
            return '白金会员';
        } else if (level == 4) {
            return '钻石会员';
        } else {
            return '至尊会员';
        }
        if((user.getExpend() - user.getLevel() * 1000) > 1000){
            user.setLevel(user.getLevel() + 1);
            userRepository.save(user);
            return true;
        }
        return false;
    }*/

    @Override
    public boolean store(String email, double money) {
        User user = userRepository.findByEmail(email);
        user.setBalance(user.getBalance()+money);
        return true;
    }

    @Override
    public ManageVO manageLogin(String id, String password) {
        Manager manage = manageRepository.login(id,MD5.encrypt(password));
        if(manage == null){
            return null;
        }else{
            ManageVO manageVO = new ManageVO();
            manageVO.balance = manage.getBalance();
            manageVO.id = manage.getId();
            return manageVO;
        }
    }

    @Override
    public boolean modify(UserVO userVO) {
        User user = userRepository.findByUserId(userVO.userId);
        if(user == null){
            return false;
        }
        user.setUserName(userVO.username);
        user.setIntroduction(userVO.introduction);
        user.setSex(userVO.sex);
        user.setBirthday(userVO.birthday);
        return userRepository.save(user);
    }

    @Override
    public UserVO getById(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user==null){
            return null;
        }else{
            return getVO(user);
        }
    }

    @Override
    public ManageVO getManageById(String id) {
        ManageVO manageVO = new ManageVO();
        Manager manager = manageRepository.find(id);
        manageVO.balance = manager.getBalance();
        List<User>  users = userRepository.getAll();
        List<School> schools =  schoolRepository.getAll();
        manageVO.schools = schools.size();
        manageVO.users = users.size();
        return  manageVO;
    }

    @Override
    public List<UserVO> search(String userName) {
        List<User> users = userRepository.search(userName);
        List<UserVO> userVOS = new ArrayList<>();
        for(User user: users){
            UserVO userVO = getVO(user);
            userVOS.add(userVO);
        }
        return userVOS;
    }

    private UserVO getVO(User user){
        UserVO userVO = new UserVO();
        userVO.email = user.getEmail();
        userVO.password = user.getPassword();
        userVO.balance = user.getBalance();
        userVO.level = user.getLevel();
        userVO.expend = user.getExpend();
        userVO.userId = user.getUserId();
        userVO.username = user.getUserName();
        userVO.birthday = user.getBirthday();
        userVO.sex = user.getSex();
        userVO.introduction = user.getIntroduction();
        return userVO;
    }

}
