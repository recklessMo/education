package com.recklessmo.dao.img;

import com.recklessmo.model.img.Img;
import com.recklessmo.web.webmodel.page.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hpf on 11/14/16.
 */
public interface ImgDAO {

    List<Img> listImgs(Page page);
    int listImgsCount(Page page);
    void addImg(Img img);
    void deleteImg(@Param("id")long id);
    int getMaxImgId();

}
