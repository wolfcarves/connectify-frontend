import Image from 'next/image';

const UserProfileImage = () => {
  return (
    <div>
      <Image
        alt="avatar"
        width={100}
        height={100}
        unoptimized
        className="rounded-full"
        src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/426478588_1067297597823198_6531849147015316511_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFWJ4PUrQ3qshOwomMpWbM6NobuTV87syQ2hu5NXzuzJB7j1Ws2Q59yYpeITMcH2mSlnqUu2uBlR73RE9fHwQnA&_nc_ohc=BmAAn4mK3GwQ7kNvgEtzAam&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYBtXtqYY9wmSyf_ZwSNxZywyH1AyvUnPB6Fo-BF3NYa2w&oe=66C13BA6"
      />

      <div className="my-5">
        <h1 className="text-2xl font-semibold">Rodel Crisosto</h1>
        <span>@cazcade</span>
      </div>
    </div>
  );
};

export default UserProfileImage;
