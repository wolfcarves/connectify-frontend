import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserPostCard from '@/features/feed/cards/UserPostCard';

const UserProfileTabs = () => {
  return (
    <div>
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent className="my-10" value="posts">
          <UserPostCard />
          <UserPostCard />
          <UserPostCard />
          <UserPostCard />
          <UserPostCard />
        </TabsContent>

        <TabsContent className="my-10" value="friends">
          Change your friends here.
        </TabsContent>

        <TabsContent className="my-10" value="media">
          Change your media here.
        </TabsContent>

        <TabsContent className="my-10" value="about">
          Change your about here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileTabs;
