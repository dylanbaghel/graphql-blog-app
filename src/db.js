//Demo User Data
const users = [{
    id: '001',
    name: 'Abhishek Baghel',
    age: 20,
    email: 'baghel@gmail.com'
}, {
    id: '002',
    name: 'Dylan Baghel',
    age: 21,
    email: 'dylan Baghel'
}, {
    id: '003',
    name: 'Power Ranger',
    age: 33,
    email: 'power@gmail.com'
}];

//Demo Post Data
const posts = [{
    id: '01',
    title: 'First Post',
    body: 'First Post Body',
    published: true,
    author: '001',
}, {
    id: '02',
    title: 'Second Post',
    body: 'Second Post Body',
    published: false,
    author: '001'
}, {
    id: '03',
    title: 'Third Post',
    body: 'Third Post Body',
    published: true,
    author: '003'
}];

//Demo Comment Data
const comments = [{
    id: '1',
    text: 'Nice Post',
    author: '003',
    post: '01'
}, {
    id: '2',
    text: 'Worst Post I\'ve Ever Read',
    author: '002',
    post: '02'
}, {
    id: '3',
    text: 'Bahut Badiya',
    author: '002',
    post: '03'
}, {
    id: '4',
    text: 'Do not agree with you',
    author: '001',
    post: '03'
}];

const db = {
    users,
    posts,
    comments
};

export { db as default }; 