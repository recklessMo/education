package com.recklessmo.service.ftp;

import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 *
 * 用于进行FTP上传,这样可以发布之后直接上传静态页面到网站服务器.
 * 也可以用于上传图片等文件
 *
 * Created by hpf on 11/10/16.
 */
@Service
public class FtpUploadService {

    private FTPClient getFtpClient(String directory) throws Exception{
        FTPClient ftpClient = new FTPClient();
        //WFWZ005300
        //x8b5e4X9
        ftpClient.connect("119.10.40.62");
        ftpClient.login("WFWZ005300", "x8b5e4X9");
        //设置上传目录
        ftpClient.changeWorkingDirectory(directory);
        ftpClient.setBufferSize(1024);
        ftpClient.setControlEncoding("UTF-8");
        //设置文件类型
        ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
        return ftpClient;
    }

    public void uploadFileByFtp(String directory, String content, String fileName)throws Exception{
        InputStream fis = null;
        FTPClient ftpClient = null;
        try{
            fis = new ByteArrayInputStream(content.getBytes("UTF-8"));
            ftpClient = getFtpClient(directory);
            ftpClient.storeFile(fileName, fis);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            IOUtils.closeQuietly(fis);
            try{
                ftpClient.disconnect();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    public void uploadInputStreamByFtp(String directory, InputStream is, String fileName)throws Exception{
        InputStream fis = is;
        FTPClient ftpClient = null;
        try{
            ftpClient = getFtpClient(directory);
            ftpClient.storeFile(fileName, fis);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            IOUtils.closeQuietly(fis);
            try{
                ftpClient.disconnect();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
    }

}
