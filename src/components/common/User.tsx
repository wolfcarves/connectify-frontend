import Image from 'next/image';
import Typography from '../ui/typography';
import { convertUtil } from '@/utils/convertUtil';

interface UserProps {
  name?: string;
  timestamp?: string;
}

const User = ({ name, timestamp }: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`min-w-10 w-10 min-h-10 h-10  relative bg-foreground/10 rounded-full`}
      >
        <Image
          alt="avatar"
          fill
          className="rounded-full"
          sizes="100%"
          src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/426478588_1067297597823198_6531849147015316511_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFWJ4PUrQ3qshOwomMpWbM6NobuTV87syQ2hu5NXzuzJB7j1Ws2Q59yYpeITMcH2mSlnqUu2uBlR73RE9fHwQnA&_nc_ohc=BmAAn4mK3GwQ7kNvgEtzAam&_nc_ht=scontent.fmnl4-7.fna&oh=00_AYBtXtqYY9wmSyf_ZwSNxZywyH1AyvUnPB6Fo-BF3NYa2w&oe=66C13BA6"
        />
      </div>

      <div className="flex flex-col">
        <Typography.Span title={name} weight="semibold" />
        <Typography.Span
          title={convertUtil(timestamp)}
          size="sm"
          color="muted"
        />
      </div>
    </div>
  );
};

export default User;
