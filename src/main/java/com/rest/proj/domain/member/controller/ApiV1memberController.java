package com.rest.proj.domain.member.controller;

import com.rest.proj.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1memberController {
    private MemberService memberService;
    
    @GetMapping("/test")
    public String memberTest() {
        return "멤버 테스트";
    }
}
