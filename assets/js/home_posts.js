{   
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form')
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log('heeel');
                    let newPost = newPostDom(data.data.post);
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    new PostComments(data.data.post._id);
                    new ToggleLike($(' .toggle-like-button', newPost));

                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
        }

        //method to create post in DOM
        let newPostDom = function(post){
            //backticks are feature to interpolate strings
            return $(`<li id="post-${post._id}">
                        <div class ="details">
                        <div id="usernames">
                        <a href="/users/profile/${post.user._id}">
                        
                           ${ post.user.name}
                        </a>
                    </div>
                            <p>
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
                                </small>
                                ${ post.content}
                            </p>
                            <br>
                            <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=<%= post._id %>&type=Post">
                                0 Likes
                            </a>
                            </small>
                            <div class="post-comments">
                                
                                    <form id="post-${ post._id }-comments-form" action="/comment/create" method="POST">
                                        <input type="text" name="content" placeholder="your comment...">
                                        <input type="hidden" name="post" value="${ post._id }">
                                        <input type="submit" value="comment">
                                    </form>
                                
                            
                                <div class="post-comment-list">
                                    <ul id="post-comments--${ post._id }">
                                    </ul>
                                </div>
                        </div>
                    </li>`)
        }

        //method to delete post from dom
        let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();
                $.ajax({
                    type: 'get',
                    url: $(deleteLink).prop('href'),
                    success: function(data){
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Post Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },error: function(error){
                        console.log(error.responseText);
                    }
                });
            });
        }
        let convertPostsToAjax = function(){
            console.log('i m here');
            $('#post-container>ul>li').each(function(){
                let self = $(this);
                let deleteButton = $(' .delete-post-button', self);
                deletePost(deleteButton);
                
                // get the post's id by splitting the id attribute
                let postId = self.prop('id').split("-")[1]
                new PostComments(postId);
            });
        }
    
    
    
        createPost();
        convertPostsToAjax();
}