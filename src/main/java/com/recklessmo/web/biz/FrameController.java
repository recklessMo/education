package com.recklessmo.web.biz;

import com.recklessmo.model.Page.Frame;
import com.recklessmo.model.img.Img;
import com.recklessmo.response.JsonResponse;
import com.recklessmo.service.biz.FrameService;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

/**
 * Created by hpf on 11/22/16.
 */
@Controller
@RequestMapping("/v1/page")
public class FrameController {

    @Resource
    private FrameService frameService;

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
        int count = frameService.listFramesCount(page);
        List<Frame> data = frameService.listFrames(page);
        return new JsonResponse(200, data, count);
    }


    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/delete", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse delete(@RequestBody long id) throws Exception{
        frameService.deleteFrame(id);
        return new JsonResponse(200, null, null);
    }


}
