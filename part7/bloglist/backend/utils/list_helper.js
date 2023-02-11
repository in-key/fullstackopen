const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {};
    return blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc);
}

const mostBlogs = (blogs) => {
    const authorBlogs = {};

    for (let blog of blogs){
        if (blog.author in authorBlogs){
            authorBlogs[blog.author]++;
        } else {
            authorBlogs[blog.author] = 1;
        }
    }

    const max = Math.max(...Object.values(authorBlogs));
    for (let author in authorBlogs){
        if (authorBlogs[author] === max){
            return { author: author, blogs: max };
        }
    }
    return null;
}

const mostLikes = (blogs) => {
    const authorLikes = {};

    for (let blog of blogs){
        if (blog.author in authorLikes){
            authorLikes[blog.author] += blog.likes;
        } else {
            authorLikes[blog.author] = blog.likes;
        }
    }

    const max = Math.max(...Object.values(authorLikes));
    for (let author in authorLikes){
        if (authorLikes[author] === max){
            return { author: author, likes: max };
        }
    }
    return null;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
