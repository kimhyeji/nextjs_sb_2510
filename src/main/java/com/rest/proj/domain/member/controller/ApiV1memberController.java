package com.rest.proj.domain.member.controller;

import com.rest.proj.domain.member.dto.MemberDto;
import com.rest.proj.domain.member.service.MemberService;
import com.rest.proj.global.rq.Rq;
import com.rest.proj.global.rsdata.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1memberController {
    private final MemberService memberService;
    private final Rq rq;

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        public String username;
        @NotBlank
        public String password;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private MemberDto memberDto;
    }

    @PostMapping("/login")
    public RsData<LoginResponseBody> login(@Valid @RequestBody LoginRequestBody loginRequestBody) {
        // username, password => accessToken
        RsData<MemberService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = memberService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie(("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(authAndMakeTokensRs.getResultCode(), authAndMakeTokensRs.getMsg(), new LoginResponseBody(new MemberDto(authAndMakeTokensRs.getData().getMember())));
    }

    @GetMapping("/me")
    public String me() {
        return "내 정보";
    }
}