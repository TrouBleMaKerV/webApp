package cheche.repository;


import cheche.model.Manager;

public interface ManageRepository {
    Manager login(String id, String Password);
    boolean save(Manager manager);
    Manager find(String id);
}
