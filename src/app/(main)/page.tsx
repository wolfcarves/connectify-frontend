import UsersSlider from '@/components/modules/User/UsersSlider';
import FeedPosts from '@/features/feed/FeedPosts';

const HomePage = () => {
  // Get user ip
  // fetch('https://api.ipify.org?format=json')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching IP address:', error);
  //   });

  return (
    <>
      <UsersSlider />
      <FeedPosts />
    </>
  );
};

export default HomePage;
