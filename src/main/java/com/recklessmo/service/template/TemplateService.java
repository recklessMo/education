package com.recklessmo.service.template;

import com.recklessmo.service.ftp.FtpUploadService;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.StringWriter;

/**
 * Created by hpf on 11/10/16.
 */
@Service
public class TemplateService {

    private  VelocityEngine ve = new VelocityEngine();

    @PostConstruct
    public void init() throws Exception{
        ve.setProperty("resource.loader", "class");
        ve.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        ve.init();
    }

    public String getTemplate(VelocityContext velocityContext, String fileName) throws Exception{
        StringWriter sw = new StringWriter();
        Template template = ve.getTemplate(fileName, "UTF-8");
        template.merge(velocityContext, sw);
        return sw.toString();
    }

    public static void main(String[] args){
        try{
            TemplateService templateService = new TemplateService();
            templateService.getTemplate(new VelocityContext(), "/templates/index.vm");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
