import bcrypt from 'bcryptjs';

import getUserId from './../utils/getUserId';
import generateAuthToken from './../utils/generateAuthToken';
import hashPassword from './../utils/hashPassword';

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password Must Be Atleast 8 Characters');
        }

        const hashedPassword = await hashPassword(args.data.password);

       const newUser = await prisma.mutation.createUser({
           data: {
               ...args.data,
               password: hashedPassword
           }
       });

       return {
           user: newUser,
           token: generateAuthToken(newUser.id)
       };
    },

    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if (!user) {
            throw new Error('No User With This Email is Exist');
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect Password');
        }

        return {
            user: user,
            token: generateAuthToken(user.id)
        };
    },

    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password);
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info);
    },

    createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.createPost({ 
            data: {
                ...args.data,
                author: {
                    connect: {
                        id: userId
                    }
                },
            }
         }, info);
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!postExist) {
            throw new Error('Unable To Delete Post');
        }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!postExist) {
            throw new Error('Unable To Update Post');
        }

        const isPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        });

        if (isPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            });
        }

        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info);
    },

    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        const postExist = await prisma.exists.Post({
            id: args.data.post,
            published: true
        });

        if (!postExist) {
            throw new Error('Post Is Not Published. Cannot Comment');
        }

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info);
    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExist = await prisma.exists.Comment({
            author: {
                id: userId
            }
        }); 

        if (!commentExist) {
            throw new Error('Unable To Delete Comment');
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info);
    },

    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExist = await prisma.exists.Comment({
            author: {
                id: userId
            }
        });
        
        if (!commentExist) {
            throw new Error('Unable To Update Comment')
        }

        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    }
};

export { Mutation as default };