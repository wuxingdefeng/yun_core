package com.yun.core.controller;

import com.yun.entity.TUserBasic;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Administrator on 2017/10/10.
 */
@Controller
public class TestPlayController {

    @RequestMapping("/ceshi/paly")
    @ResponseBody
    public Object testPlay(){
        TUserBasic user = new TUserBasic();
        user.setUser_age(32);
        user.setUser_name("nnnnn");
        user.setUser_name_first("ll");
        return user;
    }
}
