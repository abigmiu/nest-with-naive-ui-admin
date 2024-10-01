import { renderIcon } from "@/router/util";
import type { ILayoutMenuOptions, IMenuMeta } from "./menus";
import { VideoCallOutlined } from "@vicons/material";
import { userContentRouteConstant } from "@/router/userConstant";

const userContentMenus: ILayoutMenuOptions = [
    {
        label: '内容管理',
        icon: renderIcon(VideoCallOutlined),
        key: userContentRouteConstant.index.name,
        children: [
            {
                label: '上传视频',
                key: userContentRouteConstant.createVideo.name,
                meta: {
                    routeName: userContentRouteConstant.createVideo.name,
                } as IMenuMeta
            },
            {
                label: '内容管理',
                key: userContentRouteConstant.content.name,
                meta: {
                    routeName: userContentRouteConstant.content.name,
                } as IMenuMeta
            }
        ]

        
        
    }
];

export const userMenus: ILayoutMenuOptions = [
    ...userContentMenus,
];