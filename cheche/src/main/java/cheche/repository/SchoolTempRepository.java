package cheche.repository;


import cheche.model.SchoolTemp;

import java.util.List;

public interface SchoolTempRepository {
    SchoolTemp findBySchoolId(int schoolId);
    boolean save(SchoolTemp schoolTemp);
    boolean removeById(int schoolId);
    List<SchoolTemp> findAll();
}
