package com.recklessmo.web.file;

import com.recklessmo.model.img.Img;
import com.recklessmo.response.JsonResponse;
import com.recklessmo.service.file.ImgService;
import com.recklessmo.service.ftp.FtpUploadService;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.dao.SystemWideSaltSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.InputStream;
import java.util.Date;
import java.util.List;


/**
 *
 * 用于文件上传
 * Created by hpf on 9/9/16.
 */
@Controller
@RequestMapping("/v1/img")
public class ImgController {

    @Resource
    private ImgService imgService;

    @Resource
    private FtpUploadService ftpUploadService;

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/list", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse list(@RequestBody Page page) throws Exception{
        int count = imgService.listImgsCount(page);
        List<Img> imgList = imgService.getImgList(page);
        return new JsonResponse(200, imgList, count);
    }

    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/add", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse add(@RequestParam("file")MultipartFile multipartFile, @RequestParam(value = "temp", required = false)String temp) throws Exception{
        String fileName = multipartFile.getOriginalFilename();
        if(temp == null || temp.length() == 0){
            temp = fileName;
        }
        int id = imgService.getMaxImgId() + 1;
        String url = System.currentTimeMillis() +  "img" + id + ".jpg";
        InputStream inputStream = multipartFile.getInputStream();
        ftpUploadService.uploadInputStreamByFtp("/www/upload", inputStream, url);
        Img img = new Img();
        img.setId(id);
        img.setName(temp);
        img.setFileName(fileName);
        img.setTime(new Date());
        img.setUrl("/upload/" + url);
        imgService.addImg(img);
        return new JsonResponse(200, null, null);
    }


    @PreAuthorize("hasAnyAuthority('login')")
    @RequestMapping(value = "/delete", method = {RequestMethod.POST})
    @ResponseBody
    public JsonResponse delete(@RequestBody long id) throws Exception{
        imgService.deleteImg(id);
        return new JsonResponse(200, null, null);
    }



}
