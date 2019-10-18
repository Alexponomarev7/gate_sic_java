package com.gate.gatelib.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Здесь важно заметить, что в реальных проектах между контроллером и репозиторием должен быть ещё сервисный слой
 * с аннотацией @Service, который инкапсулирует в себе всю бизнес-логику. Но, поскольку в нашем случае это будет лишь
 * проксирование запросов из контроллера к репозиторию, то для краткости я пропущу его.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    private UserDao userDao;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userDao.getAll();
    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable("userId") int id) {
        return userDao.getById(id);
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        System.out.println(user.getId());
        return userDao.create(user);
    }
}
