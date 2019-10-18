package com.gate.gatelib.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.List;

public interface UserDao extends CrudRepository<User, Integer> {

}
/**
@Repository
@Transactional

public class UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> getAll() {
        return entityManager.createQuery("from User c order by c.id desc", User.class).getResultList();
    }

    public User getById(int id) {
        return entityManager.find(User.class, id);
    }

    public User create(User user) {
        if (user.getGroups() != null) {
            for (Group group : user.getGroups()) {
                group.addUser(user);
            }
        }
        entityManager.persist(user);
        return user;
    }
}
**/