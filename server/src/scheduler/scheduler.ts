import cron from 'node-cron';
import * as postService from '../posts/posts.service';
import { Post, SocialAccount } from '../generated/prisma';
// Assume a twitter-api-v2 or similar library is installed
// import { TwitterApi } from 'twitter-api-v2';

const publishPost = async (post: Post & { socialAccount: SocialAccount }) => {
    console.log(`Publishing post ${post.id} to ${post.socialAccount.provider}...`);

    try {
        if (post.socialAccount.provider === 'twitter') {
            // const twitterClient = new TwitterApi(post.socialAccount.accessToken);
            // await twitterClient.v2.tweet(post.content);
            console.log(`Mock Tweet: ${post.content}`);
        }

        await postService.updatePostStatus(post.id, 'published');
        console.log(`Post ${post.id} published successfully.`);
    } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error);
        await postService.updatePostStatus(post.id, 'failed');
    }
};

// Schedule a job to run every minute
cron.schedule('* * * * *', async () => {
    console.log('Running scheduled job to find and publish posts...');
    const postsToPublish = await postService.findScheduledPosts();

    for (const post of postsToPublish) {
        await publishPost(post);
    }
});

console.log('Scheduler started.');
