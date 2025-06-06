import { Channels, OtherNotifications } from './blocks';

const AccountNotificationsContent = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-3">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Channels />
          <OtherNotifications />
        </div>
      </div>
    </div>
  );
};

export { AccountNotificationsContent };
