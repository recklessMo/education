package com.recklessmo.web.biz;

import com.recklessmo.dao.post.PostDAO;
import com.recklessmo.model.Page.Frame;
import com.recklessmo.model.post.Post;
import com.recklessmo.response.JsonResponse;
import com.recklessmo.service.biz.FrameService;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by hpf on 11/22/16.
 */
@Controller
@RequestMapping("/v1/post")
public class PostController {

    @Resource
    private PostDAO postDAO;

    /**
     *
     * 存储
     * 详情页面
     *
     * @param page
     * @return
     */
    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public JsonResponse listAll(@RequestBody Page page){
        int count = postDAO.listPostsCount(page);
        List<Post> data = postDAO.listPosts(page);
        return new JsonResponse(200, data, count);
    }


    @RequestMapping(value = "/add", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse add(HttpServletResponse response, @RequestParam(value="name")String name, @RequestParam(value="phone")String phone, @RequestParam(value = "email")String email, @RequestParam(value = "file")String file) throws Exception{
        Post post = new Post();
        post.setName(name);
        post.setPhone(phone);
        post.setEmail(email);
        post.setFile(file);
        postDAO.addPost(post);
        response.setHeader("Access-Control-Allow-Origin", "*");
        return new JsonResponse(200, null, null);
    }


}
