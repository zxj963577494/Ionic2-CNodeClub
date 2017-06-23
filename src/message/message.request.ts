export class GetMessageCountRequest {
  accesstoken: string;
}

export class GetMessagesRequest {
  accesstoken: string;
  mdrender: boolean;
}

export class PutMessageMarkAllRequest {
  accesstoken: string;
}

export class PutMessageMarkOneRequest {
  accesstoken: string;
}