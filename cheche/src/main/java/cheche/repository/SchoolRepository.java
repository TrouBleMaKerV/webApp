package cheche.repository;




import cheche.model.School;

import java.util.List;

public interface SchoolRepository  {
    School findBySchoolId(int schoolId);
    List<School> findBySchoolName(String schoolName);
    boolean save(School school);
    School findBySchoolIdAndPassword(int schoolId, String password);
    List<School> getAll();
}
