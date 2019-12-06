package com.gate.gatelib.monitor;

import com.gate.gatelib.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

/**
 * Основной класс-контроллер монитора.
 * Монитор выводит информацию по контесту для выбранной группы.
 * Считает все метрики по сабмишшнам, отдает табличку по юзерам как джсонину.
 */
@RestController
@RequestMapping(value = "/monitor", produces = MediaType.APPLICATION_JSON_VALUE)
public class MonitorController {

    private final ProblemSetDao problemSetDao;
    private final GroupDao groupDao;

    MonitorController(ProblemSetDao problemSetDao, GroupDao groupDao) {
        this.problemSetDao = problemSetDao;
        this.groupDao = groupDao;
    }

    @GetMapping("/contest/{contestId}/group/{groupId}")
    public List<MonitorElement> showMonitor(@PathVariable Integer contestId,
                                            @PathVariable Integer groupId) {
        Optional<ProblemSet> maybeProblemSet = problemSetDao.findById(contestId);
        if (!maybeProblemSet.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "contest not found"
            );
        }
        Optional<Group> maybeGroup = groupDao.findById(groupId);
        if (!maybeGroup.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "group not found"
            );
        }
        ProblemSet problemSet = maybeProblemSet.get();
        Group group = maybeGroup.get();
        if (!group.getSets().contains(problemSet)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "group in contest not found"
            );
        }

        List<Problem> problemsList = problemSet.getProblems();
        if (problemsList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "no tasks in contest found"
            );
        }

        return new ArrayList<>();
    }
}
