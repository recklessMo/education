package com.recklessmo.web.webmodel.page;

import java.util.List;

/**
 * Created by hpf on 11/30/16.
 */
public class ImgObject {

    private String url;
    private String title;
    private String text;
    private String href;

    private List<String> introList;

    public List<String> getIntroList() {
        return introList;
    }

    public void setIntroList(List<String> introList) {
        this.introList = introList;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }
}
