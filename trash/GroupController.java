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
public class GroupController {

    @Autowired
    private GroupDao groupDao;

    @GetMapping("/groups")
    public List<Group> getAllGroups() {
        return groupDao.getAll();
    }

    @GetMapping("/groups/{groupId}")
    public Group getGroupById(@PathVariable("groupId") int id) {
        return groupDao.getById(id);
    }

    @PostMapping("/groups")
    @ResponseStatus(HttpStatus.CREATED)
    public Group createGroup(@RequestBody Group group) {
        System.out.println(group.getId());
        return groupDao.create(group);
    }
}
