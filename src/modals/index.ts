export type Story = {
  userId?: string;
  uid?: number;
  permission?: number;
  source?: number;
  seen?: 0 | 1;
  seenList?: string[];
  reactions?: string[];
  hashtags?: string[];
  mention?: string[];
  messagesList?: string[];
};

export type UserInfo = {
  email?: string;
  birthday?: {
    date: number;
    month: number;
    year: number;
  };
  followings?: string[];
  fullname?: string;
  phone?: string;
  username?: string;
  avatarURL?: string;
  bio?: string;
  website?: string;
  gender?: 0 | 1 | 2;
  storyNotificationList?: string[];
  postNotificationList?: string[];
  requestedList?: string[];
  unSuggestList?: string[];
};

export type PostImage = {
  uri: string,
  width: number,
  height: number,
  extension: string,
  fullSize: boolean,
  hashtags?: string[],
  moods?:string[]
  tags: {
    x: number,
    y: number,
    width: number,
    height: number,
    username: string
  }[]
}

export type Post = {
  userId?: string,
  content?: string,
  uid?: number,
  isVideo?: boolean,
  likes?: string[],
  commentList?: string[],
  permission?: number,
  source?: PostImage[],
  tags?: string[],
  labels?: string[],
  tagUsername?: string[],
  notificationUsers?: string[],
  altText?: string,
  address?: string,

}

export type ExtraStory = {
  storyList: Story[];
  ownUser: UserInfo;
};
export type ExtraPost = Post & {
  ownUser?: UserInfo
}

export type PostList = ExtraPost[]

export type User = {
  userId?:string,
  email:string,
  password:string,
  name?:string,
  profileImage?: string,
  deviceId?:string
}

export type LoggingUser = {
  email:string,
  password:string,
}

export type PostDoc = {
  userId: string,
  user:User,
  image?:string,
  location:string,
  isPollPost:boolean,
  isFeedPost: boolean,
  description:string,
  moods:tags[],
  tags:tags[],
  pollStartDate: Date | null;
  friends?:string[],
  DMList?:string[],
  postId?:string,
  createdAt?:any,
  pollEndDate?:any
  onGoingPoll?:boolean,
  likes?:string[]
  dislikes?:User[]
  pollCompleted?:boolean,
  postLikes?:string[],
  isDmPoll?:boolean
}

export type Notification  = {
  deviceToken : string,
  message: string,
  meta?: any
}

export type AlertPoll = PostDoc & {
  likes:User[]
  dislikes:User[],
  userReacted?:boolean,
}

export type StoryItem = {
  userName:string,
  userId:string,
  polls:AlertPoll[]
}

export type tags = {
  id:number,
  name:string
}

export type WardRobe = {
  tagName: string,
  posts:PostDoc[]
}
