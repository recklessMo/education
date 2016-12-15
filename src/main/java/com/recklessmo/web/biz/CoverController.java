package com.recklessmo.web.biz;

import com.alibaba.fastjson.JSONObject;
import com.recklessmo.model.Page.Frame;
import com.recklessmo.response.JsonResponse;
import com.recklessmo.service.biz.FrameService;
import com.recklessmo.service.ftp.FtpUploadService;
import com.recklessmo.service.template.TemplateService;
import com.recklessmo.web.webmodel.page.*;
import org.apache.velocity.VelocityContext;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * 在这里管理首页的东西, 包括选择图片(图片列表), 设定跳转(页面列表)
 *
 * Created by hpf on 11/11/16.
 */
@Controller
@RequestMapping("/v1/cover/publish")
public class CoverController {

    @Resource
    private TemplateService templateService;
    @Resource
    private FtpUploadService ftpUploadService;
    @Resource
    private FrameService frameService;

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/index", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishIndex(@RequestBody CoverPage page){
        VelocityContext context = new VelocityContext();
        try {
            context.put("data", page);
            frameService.updateContent(1, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/index.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "index.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/about", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishAbout(@RequestBody AboutPage page){
        VelocityContext context = new VelocityContext();
        try {
            context.put("data", page);
            frameService.updateContent(2, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/about.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "about.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/movieList", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishMovieList(@RequestBody MovieListPage page){
        VelocityContext context = new VelocityContext();
        try {
            context.put("data", page);
            frameService.updateContent(3, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/movie-list.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "movie-list.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/seriesList", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishSeriesList(@RequestBody SeriesListPage page){
        VelocityContext context = new VelocityContext();
        try {
            context.put("data", page);
            frameService.updateContent(4, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/series-list.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "series-list.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/issueList", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishIssueList(@RequestBody SeriesListPage page){
        VelocityContext context = new VelocityContext();
        try {
            context.put("data", page);
            frameService.updateContent(5, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/issue-list.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "issue-list.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/starList", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishStarList(@RequestBody StarListPage page){
        VelocityContext context = new VelocityContext();
        try {
            for(ImgObject imgObject : page.getStarList()){
                List<String> introList = new LinkedList<>();
                if(imgObject.getText() != null) {
                    String[] data = imgObject.getText().split("&&");
                    for(String temp : data){
                        introList.add(temp.trim());
                    }
                    imgObject.setIntroList(introList);
                }
            }
            context.put("data", page);
            frameService.updateContent(6, JSONObject.toJSONString(page));
            String content = templateService.getTemplate(context, "/templates/star-list.vm");
            ftpUploadService.uploadFileByFtp("/www", content, "star-list.html");
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/filmDetail", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishFilmDetail(@RequestBody FilmDetailPage page){
        VelocityContext context = new VelocityContext();
        long pageId = page.getId();
        Frame frame;
        try {
            context.put("data", page);
            if(pageId == 0 ){
                pageId = frameService.getNextId();
                page.setId(pageId);
                frame = new Frame();
                frame.setId(pageId);
                frame.setName("电影:" + page.getHeadTitle());
                frame.setType("电影详情");
                frame.setContent(JSONObject.toJSONString(page));
                frame.setStatus(1);
                frame.setTime(new Date());
                frame.setUrl("/film-detail" + pageId + ".html");
                frameService.insert(frame);
            }else {
                frame = frameService.getById(pageId);
                frameService.updateContent(pageId, JSONObject.toJSONString(page));
            }
            String content = templateService.getTemplate(context, "/templates/film-detail.vm");
            ftpUploadService.uploadFileByFtp("/www", content, frame.getUrl().substring(1));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/seriesDetail", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishSeriesDetail(@RequestBody FilmDetailPage page){
        VelocityContext context = new VelocityContext();
        long pageId = page.getId();
        Frame frame;
        try {
            context.put("data", page);
            if(pageId == 0 ){
                pageId = frameService.getNextId();
                page.setId(pageId);
                frame = new Frame();
                frame.setId(pageId);
                frame.setName("电视剧:" + page.getHeadTitle());
                frame.setType("电视剧详情");
                frame.setContent(JSONObject.toJSONString(page));
                frame.setStatus(1);
                frame.setTime(new Date());
                frame.setUrl("/series-detail" + pageId + ".html");
                frameService.insert(frame);
            }else {
                frame = frameService.getById(pageId);
                frameService.updateContent(pageId, JSONObject.toJSONString(page));
            }
            String content = templateService.getTemplate(context, "/templates/series-detail.vm");
            ftpUploadService.uploadFileByFtp("/www", content, frame.getUrl().substring(1));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/issueDetail", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishIssueDetail(@RequestBody FilmDetailPage page){
        VelocityContext context = new VelocityContext();
        long pageId = page.getId();
        Frame frame;
        try {
            context.put("data", page);
            if(pageId == 0 ){
                pageId = frameService.getNextId();
                page.setId(pageId);
                frame = new Frame();
                frame.setId(pageId);
                frame.setName("发行:" + page.getHeadTitle());
                frame.setType("发行详情");
                frame.setContent(JSONObject.toJSONString(page));
                frame.setStatus(1);
                frame.setTime(new Date());
                frame.setUrl("/issue-detail" + pageId + ".html");
                frameService.insert(frame);
            }else {
                frame = frameService.getById(pageId);
                frameService.updateContent(pageId, JSONObject.toJSONString(page));
            }
            String content = templateService.getTemplate(context, "/templates/issue-detail.vm");
            ftpUploadService.uploadFileByFtp("/www", content, frame.getUrl().substring(1));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/starDetail", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishStarDetail(@RequestBody StarDetailPage page){
        VelocityContext context = new VelocityContext();
        long pageId = page.getId();
        Frame frame;
        try {
            context.put("data", page);
            if(pageId == 0 ){
                pageId = frameService.getNextId();
                page.setId(pageId);
                frame = new Frame();
                frame.setId(pageId);
                frame.setName("艺人:" + page.getName());
                frame.setType("艺人详情");
                frame.setContent(JSONObject.toJSONString(page));
                frame.setStatus(1);
                frame.setTime(new Date());
                frame.setUrl("/star-detail" + pageId + ".html");
                frameService.insert(frame);
            }else {
                frame = frameService.getById(pageId);
                frameService.updateContent(pageId, JSONObject.toJSONString(page));
            }
            String content = templateService.getTemplate(context, "/templates/star-detail.vm");
            ftpUploadService.uploadFileByFtp("/www", content, frame.getUrl().substring(1));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/newsDetail", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public JsonResponse publishNewsDetail(@RequestBody NewsDetailPage page){
        VelocityContext context = new VelocityContext();
        long pageId = page.getId();
        Frame frame;
        try {
            context.put("data", page);
            if(pageId == 0 ){
                pageId = frameService.getNextId();
                page.setId(pageId);
                frame = new Frame();
                frame.setId(pageId);
                frame.setName("资讯:" + page.getTitle());
                frame.setType("资讯详情");
                frame.setContent(JSONObject.toJSONString(page));
                frame.setStatus(1);
                frame.setTime(new Date());
                frame.setUrl("/news-detail" + pageId + ".html");
                frameService.insert(frame);
            }else {
                frame = frameService.getById(pageId);
                frameService.updateContent(pageId, JSONObject.toJSONString(page));
            }
            String content = templateService.getTemplate(context, "/templates/news-detail.vm");
            ftpUploadService.uploadFileByFtp("/www", content, frame.getUrl().substring(1));
        }catch (Exception e){
            e.printStackTrace();
        }
        return new JsonResponse(200, null, null);
    }


}
