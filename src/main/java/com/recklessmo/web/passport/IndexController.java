package com.recklessmo.web.passport;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hpf on 4/26/16.
 *
 * 登录和加载
 */
@Controller
public class IndexController {

    /**
     * 主页面, 需要验证
     * @return
     */
    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/")
    public String index(){
        return "index";
    }

    /**
     *
     * 登录页面不进行验证
     *
     * @return
     */
    @RequestMapping(value = "/login")
    public String index_login(){
        return "index";
    }


}
