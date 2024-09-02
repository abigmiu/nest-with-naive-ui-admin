const fs = require('fs');


const permissions = [
    {
        id: 1,
        type: 1,
        parentId: null,
        name: '内容管理',
        value: 'content',
        children: [
            {
                id: 2,
                type: 1,
                parentId: 1,
                name: '文章管理',
                value: 'content.article',
                children: [
                    {
                        id: 4,
                        type: 2,
                        parentId: 2,
                        name: '新增文章',
                        value: 'content.article.create',
                        children: null
                    },
                    {
                        id: 5,
                        type: 2,
                        parentId: 2,
                        name: '编辑文章',
                        value: 'content.article.update',
                        children: null
                    },
                    {
                        id: 6,
                        type: 2,
                        parentId: 2,
                        name: '删除文章',
                        value: 'content.article.delete',
                        children: null
                    }
                ]
            },
            {
                id: 3,
                type: 1,
                parentId: 1,
                name: '图片管理',
                value: 'content.image',
                children: [
                    {
                        id: 7,
                        type: 2,
                        parentId: 3,
                        name: '新增图片',
                        value: 'content.article.create',
                        children: null
                    },
                    {
                        id: 8,
                        type: 2,
                        parentId: 3,
                        name: '编辑图片',
                        value: 'content.article.update',
                        children: null
                    },
                    {
                        id: 9,
                        type: 2,
                        parentId: 3,
                        name: '删除图片',
                        value: 'content.article.delete',
                        children: null
                    }
                ]
            }
        ]
    },
    {
        id: 10,
        type: 1,
        parentId: null,
        name: '公司管理',
        value: 'company',
        children: [
            {
                id: 11,
                type: 1,
                parentId: 10,
                name: '角色管理',
                value: 'company.role',
                children: [
                    {
                        id: 12,
                        type: 2,
                        parentId: 11,
                        name: '新增角色',
                        value: 'company.role.create',
                        children: null
                    },
                    {
                        id: 13,
                        type: 2,
                        parentId: 11,
                        name: '编辑角色',
                        value: 'company.role.update',
                        children: null
                    },
                    {
                        id: 14,
                        type: 2,
                        parentId: 11,
                        name: '删除角色',
                        value: 'company.role.delete',
                        children: null
                    }
                ]
            },
            {
                id: 15,
                type: 1,
                parentId: 10,
                name: '用户管理',
                value: 'company.crew',
                children: [
                    {
                        id: 16,
                        type: 2,
                        parentId: 15,
                        name: '新增用户',
                        value: 'company.crew.create',
                        children: null
                    },
                    {
                        id: 17,
                        type: 2,
                        parentId: 15,
                        name: '编辑用户',
                        value: 'company.crew.update',
                        children: null
                    },
                    {
                        id: 18,
                        type: 2,
                        parentId: 15,
                        name: '删除用户',
                        value: 'company.crew.delete',
                        children: null
                    }
                ]
            }
        ]
    },
];


function flatten(permissions) {
    return permissions.reduce((prev, next) => {
        return prev.concat(next, next.children ? flatten(next.children) : []);
    }, []);
}

const permissionList = flatten(permissions);

let sql = `
INSERT INTO \`permission\`
(\`id\`, \`type\`, \`parent_id\`, \`name\`, \`value\`, \`updated_at\`)
VALUES 
`;

for (const permission of permissionList) {
    sql += `(${permission.id}, ${permission.type}, ${permission.parentId}, '${permission.name}', '${permission.value}', NOW()),\n`;
}

fs.writeFileSync('./gen.sql', sql);