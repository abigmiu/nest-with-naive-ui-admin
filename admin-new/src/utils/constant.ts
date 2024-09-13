export const STORE_NAMES = {
    USER: 'user-store',
    ALIVE: 'alive-store',
    MENU: 'menu-store',
    SETTING: 'setting-store'
};

export const PERMISSIONS = {
    /** 公司管理 */
    COMPANY: 'company',
    /** 角色管理页面 */
    ROLE: 'company.role',
    /** 角色创建 */
    ROLE_CREATE: 'company.role.create',
    /** 角色编辑 */
    ROLE_EDIT: 'company.role.update',
    /** 角色删除 */
    ROLE_DELETE: 'company.role.delete',
    /** 用户管理 */
    CREW: 'company.crew',
    /** 用户创建 */
    CREW_CREATE: 'company.crew.create',
    /** 用户编辑 */
    CREW_EDIT: 'company.crew.update',
    /** 用户删除 */
    CREW_DELETE: 'company.crew.delete',
    /** 内容管理 */
    CONTENT: 'content',
    /** 文章管理 */
    ARTICLE: 'content.article',
    /** 文章新增 */
    ARTICLE_CREATE: 'content.article.create',
    /** 文章编辑 */
    ARTICLE_EDIT: 'content.article.update',
    /** 文章删除 */
    ARTICLE_DELETE: 'content.article.delete',
    /** 图片管理 */
    IMAGE: 'content.image',
    /** 图片新增 */
    IMAGE_CREATE: 'content.image.create',
    /** 图片编辑 */
    IMAGE_EDIT: 'content.image.update',
    /** 图片删除 */
    IMAGE_DELETE: 'content.image.delete',
};

export const THEME_LIST: Array<{
    name: string;
    hex: string;
}> = [
        {
            name: '默认',
            hex: '#006be6'
        },
        {
            name: '紫罗兰',
            hex: '#7166f0'
        },
        {
            name: '樱花粉',
            hex: '#e84a6c',
        },
        {
            name: '柠檬黄',
            hex: '#efbd48'
        },
        {
            name: '天蓝色',
            hex: '#4e69fd'
        },
        {
            name: '浅绿色',
            hex: '#0bd092'
        },
        {
            name: '锌色灰',
            hex: '#3f3f46'
        },
        {
            name: '深绿色',
            hex: '#0d9496'
        },
        {
            name: '深蓝色',
            hex: '#0960be'
        },
        {
            name: '橙黄色',
            hex: '#c1420b'
        },
        {
            name: '玫瑰红',
            hex: '#bb1b1b'
        }
    ];

export const ANIMATIONS = [
    { value: 'zoom-fade', label: '渐变' },
    { value: 'zoom-out', label: '闪现' },
    { value: 'fade-slide', label: '滑动' },
    { value: 'fade', label: '消退' },
    { value: 'fade-bottom', label: '底部消退' },
    { value: 'fade-scale', label: '缩放消退' },
];




export const QUILL_TOOLBAR_ACTIONS = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
];