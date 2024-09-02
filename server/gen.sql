
INSERT INTO `permission`
(`id`, `type`, `parent_id`, `name`, `value`, `updated_at`)
VALUES 
(1, 1, null, '内容管理', 'content', NOW()),
(2, 1, 1, '文章管理', 'content.article', NOW()),
(4, 2, 2, '新增文章', 'content.article.create', NOW()),
(5, 2, 2, '编辑文章', 'content.article.update', NOW()),
(6, 2, 2, '删除文章', 'content.article.delete', NOW()),
(3, 1, 1, '图片管理', 'content.image', NOW()),
(7, 2, 3, '新增图片', 'content.article.create', NOW()),
(8, 2, 3, '编辑图片', 'content.article.update', NOW()),
(9, 2, 3, '删除图片', 'content.article.delete', NOW()),
(10, 1, null, '公司管理', 'company', NOW()),
(11, 1, 10, '角色管理', 'company.role', NOW()),
(12, 2, 11, '新增角色', 'company.role.create', NOW()),
(13, 2, 11, '编辑角色', 'company.role.update', NOW()),
(14, 2, 11, '删除角色', 'company.role.delete', NOW()),
(15, 1, 10, '用户管理', 'company.crew', NOW()),
(16, 2, 15, '新增用户', 'company.crew.create', NOW()),
(17, 2, 15, '编辑用户', 'company.crew.update', NOW()),
(18, 2, 15, '删除用户', 'company.crew.delete', NOW()),
