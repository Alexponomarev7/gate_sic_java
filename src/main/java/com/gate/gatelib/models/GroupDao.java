package com.gate.gatelib.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.List;

public interface GroupDao extends CrudRepository<Group, Integer> {

}
/**
public class GroupDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Group> getAll() {
        return entityManager.createQuery("from Group c order by c.id desc", Group.class).getResultList();
    }

    public Group getById(int id) {
        return entityManager.find(Group.class, id);
    }

    public Group create(Group group) {
        if (group.getUsers() != null) {
            for (User user : group.getUsers()) {
                group.addUser(user);
            }
        }
        entityManager.persist(group);
        return group;
    }
}
**/