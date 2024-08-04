INSERT INTO `permission`
(`id`, `type`, `parent_id`, `name`, `value`, `updated_at`)
VALUES 
(1, 1, null, '基础列表', 'good.list', NOW()),
(2, 2, 1, '搜索', 'good.query', NOW()),
(3, 2, 1, '创建', 'good.create', NOW());