import { ImageProps } from "react-native";

export default interface Post {
    id: number,
    img: ImageProps,
    likedUsers: string[],
    dislikedUsers: string[],
}
