package com.recklessmo.web.webmodel.page;

import java.util.List;

/**
 * Created by hpf on 11/29/16.
 */
public class MovieListPage {

    private ImgObject firstHead;
    private ImgObject secondHead;
    private ImgObject thirdHead;

    private List<ImgObject> filmList;
    private List<ArticleObject> articleList;


    public ImgObject getFirstHead() {
        return firstHead;
    }

    public void setFirstHead(ImgObject firstHead) {
        this.firstHead = firstHead;
    }

    public ImgObject getSecondHead() {
        return secondHead;
    }

    public void setSecondHead(ImgObject secondHead) {
        this.secondHead = secondHead;
    }

    public ImgObject getThirdHead() {
        return thirdHead;
    }

    public void setThirdHead(ImgObject thirdHead) {
        this.thirdHead = thirdHead;
    }

    public List<ImgObject> getFilmList() {
        return filmList;
    }

    public void setFilmList(List<ImgObject> filmList) {
        this.filmList = filmList;
    }

    public List<ArticleObject> getArticleList() {
        return articleList;
    }

    public void setArticleList(List<ArticleObject> articleList) {
        this.articleList = articleList;
    }
}
