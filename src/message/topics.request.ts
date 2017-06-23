export class GetTopicsRequest {
  page: number;
  tab: string;
  limit: number;
  mdrender: boolean;
}

export class GetTopicDetailRequest {
  mdrender: boolean;
  accesstoken: string;
}

export class PostTopicsRequest {
  accesstoken: string;
  title: string;
  tab: string;
  content: string;
}

export class PutTopicsRequest {
  accesstoken: string;
  topic_id: string;
  title: string;
  tab: string;
  content: string;
}