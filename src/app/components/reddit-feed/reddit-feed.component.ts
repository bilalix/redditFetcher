import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RedditFeedService } from '../../services/reddit-feed.service';
import { map } from 'rxjs/operators';
import { Post } from '../../services/post';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {

  public title = 'Reddit Fetcher';
  public posts: Post[] = [];
  @ViewChild('scrollTop') scrollTop: ElementRef;

  public showText = true;
  public showImage = true;
  public showVideo = false;
  public printable = false;

  public subreddits = [
    {id: 'aww', name: 'r/aww'},
    {id: 'BettermentBookClub', name: 'r/BettermentBookClub'},
    {id: 'DecidingToBeBetter', name: 'r/DecidingToBeBetter'},
    {id: 'emotionalintelligence', name: 'r/emotionalintelligence'},
    {id: 'gainit', name: 'r/gainit'},
    {id: 'getdisciplined', name: 'r/getdisciplined'},
    {id: 'LifeProTips', name: 'r/LifeProTips'},
    {id: 'NatureIsFuckingLit', name: 'r/NatureIsFuckingLit'},
    {id: 'NoFap', name: 'r/NoFap'},
    {id: 'nosleep', name: 'r/nosleep'},
    {id: 'nosurf', name: 'r/nosurf'},
    {id: 'productivity', name: 'r/productivity'},
    {id: 'relationships', name: 'r/relationships'},
    {id: 'relationship_advice', name: 'r/relationship_advice'},
    {id: 'Showerthoughts', name: 'r/Showerthoughts'},
    {id: 'selfimprovement', name: 'r/selfimprovement'},
    {id: 'talesfromtechsupport', name: 'r/talesfromtechsupport'},
    {id: 'UnethicalLifeProTips', name: 'r/UnethicalLifeProTips'}
  ];
  selectedSubreddit = 'productivity';

  public sorts = [
    {id: 'hot', name: 'Hot'},
    {id: 'new', name: 'New'},
    {id: 'controversial', name: 'Controversial'},
    {id: 'top', name: 'Top'},
    {id: 'rising', name: 'Rising'},
    {id: 'gilded', name: 'Gilded'}
  ];
  selectedSort = 'new';

  public sortTimes = [
    {id: 'hour', name: 'Last hour'},
    {id: 'day', name: 'Last day'},
    {id: 'week', name: 'Last week'},
    {id: 'month', name: 'Last month'},
    {id: 'year', name: 'Last year'},
    {id: 'all', name: 'All Time'},
  ];
  selectedSortTime = 'all';

  public limits = [
    {id: 10, name: 10},
    {id: 20, name: 20},
    {id: 50, name: 50},
    {id: 100, name: 100}, // 100 is max, think about pagination or lazy loading..
    {id: 100, name: 500},
    {id: 100, name: 1000}
  ];
  selectedLimit = 20;
  public countPostsFound: number;

  constructor(private redditFeedService: RedditFeedService) { }

  ngOnInit() {
    this.getPosts();
  }

  onChangeSub(event): void {  // event will give you full breif of action
    const newSelectedSub = event.target.value;
    // console.log(newSelectedSub);
    this.selectedSubreddit = newSelectedSub;
    this.getPosts();
  }

  onChangeSort(event): void {  // event will give you full breif of action
    const newSelectedSort = event.target.value;
    // console.log(newSelectedSort);
    this.selectedSort = newSelectedSort;
    this.getPosts();
  }

  onChangeLimit(event): void {  // event will give you full breif of action
    const newSelectedLimit = event.currentTarget.value;
    // console.log(newSelectedLimit);
    this.selectedLimit = newSelectedLimit;
    this.getPosts();
  }

  changeImgVisibility(event) {
    this.showImage = event.target.checked;
    this.getPosts();
  }

  changeTxtVisibility(event) {
    this.showText = event.target.checked;
    this.getPosts();
  }

  changePrintable(event) {
    this.printable = event.target.checked;
  }

  getPosts() {
    this.redditFeedService.fetchPosts(this.selectedSubreddit, this.selectedSort, this.selectedSortTime, this.selectedLimit)
    .subscribe(
      response => { this.posts = response; },
      err => console.error(err),
      () => console.log(this.posts)
    );
  }

  public gotoTop() {
    // this will provide smooth animation for the scroll
    this.scrollTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
