package com.projectmanagement.projects.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * SecurityConfig is used to specify security settings used when the frontend makes requests
 * through the rest api.
 * @author Thomas Curran
 *
 */
@Configuration
public class SecurityConfig {
    /**
     * <p>Returns the constructor for BCryptPasswordEncoder used to encrypt passwords being saved to the database.
     * </p>
     * @return TThe constructor for BCryptPasswordEncoder.
     * @since 1.0
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /**
     * <p>Configures and returns a new HttpSecurity object.
     * </p>
     * @param http A HttpSecurity object used to modify security configuration.
     * @return the constructed HttpSecurity object with its modifications.
     * @since 1.0
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        return http.build();
    }
}
