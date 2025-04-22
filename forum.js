document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    // Load existing posts from localStorage
    loadPosts();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        if (title && content) {
            createPost(title, content);
            postForm.reset();
        }
    });
});

function createPost(title, content) {
    const post = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: []
    };

    // Save to localStorage
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    posts.unshift(post);
    localStorage.setItem('forumPosts', JSON.stringify(posts));

    // Add to DOM
    addPostToDOM(post);
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    posts.forEach(post => addPostToDOM(post));
}

function addPostToDOM(post) {
    const postsContainer = document.getElementById('posts');
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-content">${post.content}</p>
        <div class="post-meta">
            <span>Posted on ${post.timestamp}</span>
            <div class="post-actions">
                <button onclick="likePost(${post.id})">Like (${post.likes})</button>
                <button onclick="showComments(${post.id})">Comments (${post.comments.length})</button>
            </div>
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            <div class="new-comment">
                <input type="text" id="comment-${post.id}" placeholder="Add a comment...">
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
            <div class="comments-list" id="comments-list-${post.id}"></div>
        </div>
    `;
    postsContainer.prepend(postElement);
}

function likePost(postId) {
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
        posts[postIndex].likes++;
        localStorage.setItem('forumPosts', JSON.stringify(posts));
        
        // Update the like count in the DOM
        const likeButton = document.querySelector(`button[onclick="likePost(${postId})"]`);
        likeButton.textContent = `Like (${posts[postIndex].likes})`;
    }
}

function showComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const isVisible = commentsSection.style.display === 'block';
    commentsSection.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        loadComments(postId);
    }
}

function loadComments(postId) {
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    const post = posts.find(p => p.id === postId);
    const commentsList = document.getElementById(`comments-list-${postId}`);
    
    commentsList.innerHTML = '';
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p>${comment.text}</p>
            <small>${comment.timestamp}</small>
        `;
        commentsList.appendChild(commentElement);
    });
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-${postId}`);
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
        const postIndex = posts.findIndex(p => p.id === postId);
        
        if (postIndex !== -1) {
            const comment = {
                text: commentText,
                timestamp: new Date().toLocaleString()
            };
            
            posts[postIndex].comments.push(comment);
            localStorage.setItem('forumPosts', JSON.stringify(posts));
            
            // Add comment to DOM
            const commentsList = document.getElementById(`comments-list-${postId}`);
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <p>${comment.text}</p>
                <small>${comment.timestamp}</small>
            `;
            commentsList.appendChild(commentElement);
            
            // Clear input
            commentInput.value = '';
        }
    }
} 