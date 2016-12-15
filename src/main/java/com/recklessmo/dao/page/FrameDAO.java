package com.recklessmo.dao.page;

import com.recklessmo.model.Page.Frame;
import com.recklessmo.web.webmodel.page.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hpf on 11/22/16.
 */
public interface FrameDAO {

    void addFrame(Frame frame);
    List<Frame> listFrames(Page page);
    int listFramesCount(Page page);
    void updateContent(@Param("id")long id, @Param("content") String content);
    void deleteFrame(@Param("id") long id);
    Frame getById(@Param("id")long id);
    int getMaxId();

}
