package com.rest.proj.global.security;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class SecurityUser extends User {
    @Getter
    private Long id;

    public SecurityUser(Long id, String username, String password, List<GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = id;
    }

    public Authentication getAuthentication() {
        Authentication auth = new UsernamePasswordAuthenticationToken(
                this,
                this.getPassword(),
                this.getAuthorities()
        );

        return auth;
    }
}
