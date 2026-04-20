package com.saloon.back_end.repository;

import com.saloon.back_end.model.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String>{
    Optional<User> findByEmail(String email);
}
