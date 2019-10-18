import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from './post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RedditFeedService {

  constructor(private http: HttpClient) { }

  // TODO: get the list of subbreddits names
  // and put the in dropdown? there are A LOT !!
  fetchSubreddits() {
    // using: http://www.reddit.com/reddits.json
  }

  getYoutubeUrl(url: string) { 
    // if it IS a youtube url
    // otherwaise return back the old url
    // console.log('url ---= ', url); // https://youtu.be/INNC8111kgI
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        const videoId = match[2];
        // console.log('videoId ---= ', videoId); // INNC8111kgI
        // create the embeded link
        const youtubeUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=0';
        return youtubeUrl;
      } else {
        return url;
      }
    }
  }

  fetchPosts(subreddit: string, sort: string, sortTime: string, limit: number):Observable<Post[]> {
    // console.log(subreddit);
    const link = 'https://www.reddit.com/r/' + subreddit + '/' + sort + '.json?t=' + sortTime + '&limit=' + limit;
    console.log('link : ' + link);
    return this.http.get(link)
            .pipe(map( response => {
              // TODO: Fix the shitty part below (if else ...)
              let posts: Post[] = [];
              let data = response['data']['children'];
              // console.log(data.length);
              for (let i = 0; i<data.length; i++) {
                // if it's a POST not a comment
                if (data[i]['data']['title']) {
                  const post: Post = new Post();
                  post.isText = data[i]['data']['is_self'];
                  post.isVideo = data[i]['data']['is_video'];
                  post.title = data[i]['data']['title'];
                  post.link = 'https://www.reddit.com' + data[i]['data']['permalink'];
                  post.score = data[i]['data']['score'];
                  post.user = data[i]['data']['author'];
                  if (data[i]['data']['gilded'] > 0 ) {
                    const g = data[i]['data']['gilded'];
                    console.log("IS GILDED!! : " + g + " times");
                    post.isGilded = true;
                  } else { 
                    post.isGilded = false; 
                    console.log('IS NOT GILDED!!'); 
                  }
                  if (post.isText) {
                    // console.log('this is a text');
                    const content = data[i]['data']['selftext'];
                    // TODO: remove the zero-width space characters
                    // figure out why this line don't do the job
                    post.content = content.replace('&#x200B;', ''); // &nbsp; too pfff
                  } else {
                    // console.log('this is an image');
                    const content = data[i]['data']['url'];
                    const extension = content.split('.').pop();
                    // console.log('content -----= ' + content);
                    // console.log('extension -----= ' + extension);
                    if (extension === 'jpg' || extension === 'png') {
                      post.isImage = true;
                      post.content = data[i]['data']['url'];
                      // console.log('this is an image');
                    }
                  }
                  if (!post.isText && !post.isImage) {
                    // console.log('this is a video');
                    post.isVideo = true;
                    if (data[i]['data']['is_video']) {
                      post.content = data[i]['data']['secure_media']['reddit_video']['fallback_url'];
                    } else {
                      // it's a link to external video
                      post.content = this.getYoutubeUrl(data[i]['data']['url']);
                    }
                  }
                  posts.push(post);
                }
              }
              return posts;
            }));
  }
}
