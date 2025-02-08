// {
//     "id": "67a6fc11396b674ce7b0b22d",
//     "longitude": 10.1212,
//     "latitude": 51.1212,
//     "description": "I have worms",
//     "date": "2025-02-08T06:39:13.183Z",
//     "category": "medical",
//     "link": "https://www.disasterrelief.org/",
//     "title": "I have worms",
//     "user_id": "67a6f7956af94a2cecf7106b",
//     "watchlist": null,
//     "comments": null,
//     "likes": null
//   },
interface Comment{
  username: string,
  content: string,
  date: string
}

export interface ReliefRequest{
  id: string,
  longitude: number,
  latitude: number,
  description: string,
  date: String,
  category: string,
  link: string,
  title: string,
  user_id: string,
  watchlist: string[],
  comments: Comment[],
  like: number
}

