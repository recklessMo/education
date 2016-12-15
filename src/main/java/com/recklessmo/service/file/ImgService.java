package com.recklessmo.service.file;

import com.recklessmo.dao.img.ImgDAO;
import com.recklessmo.model.img.Img;
import com.recklessmo.web.webmodel.page.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by hpf on 11/14/16.
 */
@Service
public class ImgService {

    @Resource
    private ImgDAO imgDAO;

    public List<Img> getImgList(Page page){
        return imgDAO.listImgs(page);
    }

    public void addImg(Img img){
        imgDAO.addImg(img);
    }

    public int listImgsCount(Page page){
        return imgDAO.listImgsCount(page);
    }

    public void deleteImg(long id){
        imgDAO.deleteImg(id);
    }

    public int getMaxImgId(){
        return imgDAO.getMaxImgId();
    }

}
