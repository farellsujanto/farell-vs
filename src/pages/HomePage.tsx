import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import DangerButton from '../components/buttons/DangerButton';
import ImageCard from '../components/cards/ImageCard';
import { DUMMY_POST } from '../constants/dummy-post';

// Note: For future improvement to track user based like / dislike
const USERNAME = 'farell';

const HomePage = () => {
    // Note: Username based like / dislike, not based on count
    const [posts, setPosts] = useState(DUMMY_POST);

    const handleResetAll = useCallback(() => {
        const newPosts = posts.map((post) => {
            const likeIndex = post.likedUsers.indexOf(USERNAME);
            const dislikeIndex = post.dislikedUsers.indexOf(USERNAME);

            const newPost = { ...post };
            if (likeIndex !== -1) {
                newPost.likedUsers.splice(likeIndex, 1);
            }
            if (dislikeIndex !== -1) {
                newPost.dislikedUsers.splice(dislikeIndex, 1);
            }

            return newPost;
        });
        setPosts([...newPosts]);
    }, [posts]);

    const handleLikeAll = useCallback(() => {
        handleResetAll();
        const newPosts = posts.map((post) => {
            const newPost = { ...post };
            newPost.likedUsers.push(USERNAME);
            return newPost;
        });
        setPosts([...newPosts]);
    }, [posts]);

    const handleDislikeAll = useCallback(() => {
        handleResetAll();
        const newPosts = posts.map((post) => {
            const newPost = { ...post };
            newPost.dislikedUsers.push(USERNAME);
            return newPost;
        });
        setPosts([...newPosts]);
    }, [posts]);

    const handleSingleLike = useCallback((id: number) => {
        const index = posts.findIndex((post) => post.id === id);
        const newPosts = [...posts];
        if (index !== -1) {
            const isUserAlreadyLiked = newPosts[index].likedUsers.includes(USERNAME);
            const dislikeIndex = newPosts[index].dislikedUsers.indexOf(USERNAME);
            if (!isUserAlreadyLiked) {
                newPosts[index].likedUsers.push(USERNAME);
            }
            if (dislikeIndex !== -1) {
                newPosts[index].dislikedUsers.splice(dislikeIndex, 1);
            }
            setPosts([...newPosts]);
        }
    }, [posts]);

    const handleSingleDislike = useCallback((id: number) => {
        const index = posts.findIndex((post) => post.id === id);
        const newPosts = [...posts];
        if (index !== -1) {
            const isUserAlreadyDisliked = newPosts[index].dislikedUsers.includes(USERNAME);
            const likeIndex = newPosts[index].likedUsers.indexOf(USERNAME);
            if (!isUserAlreadyDisliked) {
                newPosts[index].dislikedUsers.push(USERNAME);
            }
            if (likeIndex !== -1) {
                newPosts[index].likedUsers.splice(likeIndex, 1);
            }
            setPosts([...newPosts]);
        }
    }, [posts]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <PrimaryButton
                    text='Like All'
                    onPress={handleLikeAll} />
                <SecondaryButton
                    text='Reset All'
                    onPress={handleResetAll} />
                <DangerButton
                    text='Dislike All'
                    onPress={handleDislikeAll} />
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listContainer}>
                            <ImageCard
                                imageSrc={item.img}
                                likeCount={item.likedUsers.length - item.dislikedUsers.length}
                                onLikeButtonPress={() => {
                                    handleSingleLike(item.id);
                                }}
                                onDislikeButtonPress={() => {
                                    handleSingleDislike(item.id);
                                }} />
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => <View style={{ height: 16.0 }} />}
                keyExtractor={(item) => `${item.id}`} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16.0,
    },
    listContainer: {
        paddingHorizontal: 16.0,
    },
});

export default React.memo(HomePage);
