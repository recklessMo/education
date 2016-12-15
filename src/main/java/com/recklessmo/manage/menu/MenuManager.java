package com.recklessmo.manage.menu;

import com.recklessmo.model.menu.MenuModel;
import com.recklessmo.model.security.DefaultUserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.*;

/**
 *
 * 根据用户的权限返回menu菜单
 *
 * Created by hpf on 4/13/16.
 */
public class MenuManager {

    private static MenuManager instance = new MenuManager();

    public static MenuManager getInstance(){
        return instance;
    }

    public MenuManager(){

    }

    /**
     *
     * 根据权限获取对应的菜单列表
     *
     * @param defaultUserDetails
     * @return
     */
    public List<MenuModel> getMenus(DefaultUserDetails defaultUserDetails){
        List<MenuModel> menuModels = new LinkedList<>();
        Menu[] menus = Menu.menuList;
        for(Menu menu : menus){
            MenuModel menuModel = new MenuModel();
            menuModel.setId(menu.getId());
            menuModel.setText(menu.getChild());
            menuModel.setIcon(menu.getIcon());
            menuModel.setSref(menu.getHref());
            menuModel.setSubmenu(null);
            menuModels.add(menuModel);
        }
        return menuModels;
    }


}
