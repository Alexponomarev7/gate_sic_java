package com.gate.gatelib.service;

import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.User;
import com.gate.gatelib.repository.UserDao;
import com.gate.gatelib.models.Role;
import com.gate.gatelib.repository.RoleDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserDao userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long userId) {
        Optional<User> userFromDb = userRepository.findById(userId);

        if (!userFromDb.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        return UserPrincipal.create(userFromDb.get());
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }
}
