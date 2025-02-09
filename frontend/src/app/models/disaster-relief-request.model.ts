

export interface Comment{
  id: string,
  relief_request: string,
  username: string,
  content: string,
  date: string
}

export interface ReliefRequest{
  id: string,
  longitude: number,
  latitude: number,
  description: string,
  date: string,
  category: string,
  link: string,
  title: string,
  user_id: string,
  watchlist: string[],
  comments: Comment[],
  like: number
}

export interface LoginResponse{
  user_id : string
}
