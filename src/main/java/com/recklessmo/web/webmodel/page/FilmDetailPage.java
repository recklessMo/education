package com.recklessmo.web.webmodel.page;

import java.util.List;

/**
 * Created by hpf on 11/29/16.
 */
public class FilmDetailPage {

    private long id;

    private String headImg;
    private String headTitle;
    private String headSmallTitle;
    private String story;
    private List<IntroObject> introList;
    private List<ImgObject> postList;
    private String video;
    private List<CommentObject> commentList;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHeadImg() {
        return headImg;
    }

    public void setHeadImg(String headImg) {
        this.headImg = headImg;
    }

    public String getHeadTitle() {
        return headTitle;
    }

    public void setHeadTitle(String headTitle) {
        this.headTitle = headTitle;
    }

    public String getHeadSmallTitle() {
        return headSmallTitle;
    }

    public void setHeadSmallTitle(String headSmallTitle) {
        this.headSmallTitle = headSmallTitle;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public List<IntroObject> getIntroList() {
        return introList;
    }

    public void setIntroList(List<IntroObject> introList) {
        this.introList = introList;
    }

    public List<ImgObject> getPostList() {
        return postList;
    }

    public void setPostList(List<ImgObject> postList) {
        this.postList = postList;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public List<CommentObject> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<CommentObject> commentList) {
        this.commentList = commentList;
    }
}
