import { Prisma } from 'prisma-binding';

import { fragmentReplacements } from './resolvers/resolvers';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'mysecret',
    fragmentReplacements
});

export { prisma as default }

// const createPostForUser = async (authorId, data) => {
//     const userExist = await prisma.exists.User({ id: authorId });

//     if (!userExist) {
//         throw new Error('No User Found');
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }');

//     return post;
// };

// const updatePostForUser = async (postId, data) => {
//     const postExist = await prisma.exists.Post({ id: postId });

//     if (!postExist) {
//         throw new Error('Post Not Found');
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data: {
//             ...data
//         }
//     }, '{ author { id name email posts { id title published } } }');

//     return post;
// };

// // createPostForUser("cjqqpises00080791wv8m69yy", {
// //     title: 'Mast Ekdum Post',
// //     body: 'Ekdum Mast Post Body',
// //     published: true
// // }).then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// // }).catch(err => {
// //     console.log(err.message);
// // });

// // updatePostForUser("4555", {
// //     title: 'Ekdum Mast Updated 2.0',
// //     published: false
// // }).then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// // }).catch(err => {
// //     console.log(err.message);
// // });
