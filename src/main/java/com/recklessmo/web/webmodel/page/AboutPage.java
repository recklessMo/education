package com.recklessmo.web.webmodel.page;

import java.util.List;

/**
 * Created by hpf on 11/29/16.
 */
public class AboutPage {

    private String firstImg;
    private String secondImg;
    private String companyIntro;
    private String officeImg;
    private List<IntroObject> workList;
    private List<PeopleObject> leaderPicList;
    private List<PeopleObject> teamPicList;
    private String companyCulture;
    private String corpText;
    private String resumePost;
    private List<IntroObject> resumeList;

    public List<IntroObject> getResumeList() {
        return resumeList;
    }

    public void setResumeList(List<IntroObject> resumeList) {
        this.resumeList = resumeList;
    }

    public List<IntroObject> getWorkList() {
        return workList;
    }

    public void setWorkList(List<IntroObject> workList) {
        this.workList = workList;
    }

    public String getOfficeImg() {
        return officeImg;
    }

    public void setOfficeImg(String officeImg) {
        this.officeImg = officeImg;
    }

    public String getSecondImg() {
        return secondImg;
    }

    public void setSecondImg(String secondImg) {
        this.secondImg = secondImg;
    }

    public List<PeopleObject> getTeamPicList() {
        return teamPicList;
    }

    public void setTeamPicList(List<PeopleObject> teamPicList) {
        this.teamPicList = teamPicList;
    }

    public String getFirstImg() {
        return firstImg;
    }

    public void setFirstImg(String firstImg) {
        this.firstImg = firstImg;
    }

    public String getCompanyIntro() {
        return companyIntro;
    }

    public void setCompanyIntro(String companyIntro) {
        this.companyIntro = companyIntro;
    }

    public List<PeopleObject> getLeaderPicList() {
        return leaderPicList;
    }

    public void setLeaderPicList(List<PeopleObject> leaderPicList) {
        this.leaderPicList = leaderPicList;
    }

    public String getCompanyCulture() {
        return companyCulture;
    }

    public void setCompanyCulture(String companyCulture) {
        this.companyCulture = companyCulture;
    }

    public String getCorpText() {
        return corpText;
    }

    public void setCorpText(String corpText) {
        this.corpText = corpText;
    }

    public String getResumePost() {
        return resumePost;
    }

    public void setResumePost(String resumePost) {
        this.resumePost = resumePost;
    }
}
