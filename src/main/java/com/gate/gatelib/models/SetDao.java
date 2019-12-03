package com.gate.gatelib.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.*;
import java.util.List;

public interface SetDao extends CrudRepository<Set, Integer> {

}