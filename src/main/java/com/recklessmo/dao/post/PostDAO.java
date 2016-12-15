package com.recklessmo.dao.post;

import com.recklessmo.model.img.Img;
import com.recklessmo.model.post.Post;
import com.recklessmo.web.webmodel.page.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hpf on 11/14/16.
 */
public interface PostDAO {

    List<Post> listPosts(Page page);
    int listPostsCount(Page page);
    void addPost(Post post);

}
