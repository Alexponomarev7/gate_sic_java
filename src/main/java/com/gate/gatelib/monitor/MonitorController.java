package com.gate.gatelib.monitor;

import com.gate.gatelib.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
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
    private final SubmissionDao submissionDao;

    MonitorController(ProblemSetDao problemSetDao, GroupDao groupDao,
                      SubmissionDao submissionDao) {
        this.problemSetDao = problemSetDao;
        this.groupDao = groupDao;
        this.submissionDao = submissionDao;
    }

    private ScoreData calculateScores(List<Submission> submissions, Problem problem) {
        // TODO: this is stub, need to add problem-contest score mapping (issue) and recalc normally
        float score = 0;
        int tries = 0;
        for (Submission submission : submissions) {
            score += 10;
            tries += 1;
        }
        return new ScoreData("+" + String.valueOf(tries), score);
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

        List<User> userList = group.getUsers();
        if (userList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "no users in group found"
            );
        }

        // TODO: this is simply a group by with custom UDF, can we do than on sql maybe?
        // TODO: hesitant about speed
        // Take user, take all submissions for this contest, process by each problem his score on problems
        ArrayList<MonitorElement> monitorElements = new ArrayList<>();
        for (User user : userList) {
            List<Submission> submissions = submissionDao.findByUserIdAndProblemSetId(user.getId(), contestId);
            HashMap<Integer, ArrayList<Submission>> problemSubmissions = new HashMap<>();
            for (Submission submission : submissions) {
                Integer problemId = submission.getProblem().getId();
                if (!problemSubmissions.containsKey(problemId)) {
                    problemSubmissions.put(problemId, new ArrayList<>());
                }
                problemSubmissions.get(submission.getProblem().getId()).add(submission);
            }
            MonitorElement monitorElement = new MonitorElement();
            monitorElement.userData.setUserId(user.getId());
            monitorElement.userData.setUserName(user.getName());
            for (Problem problem : problemsList) {
                ArrayList<ScoreData> scoreDatas = new ArrayList<>();
                if (!problemSubmissions.containsKey(problem.getId())) {
                    scoreDatas.add(ScoreData.getEmptyInstance());
                } else {
                    scoreDatas.add(calculateScores(problemSubmissions.get(problem.getId()), problem));
                }
                monitorElement.tasksScores = scoreDatas;
            }
            monitorElements.add(monitorElement);
        }
        // TODO: should we return whole monitor or just objects here?
        // TODO: if we do not return whole monitor then what if list of tasks changed?
        return monitorElements;
    }
}
