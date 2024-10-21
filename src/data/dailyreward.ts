
interface RewardDay {
    day: number;
    amount: string;
    isBigDay: boolean;
    isCollected: boolean;
    isRewardEnable: boolean;
  }
  
export const rewardDays: RewardDay[] = [
    { day: 1, amount: "10.0K", isBigDay: false, isCollected: true, isRewardEnable: false },
    { day: 2, amount: "20.0K", isBigDay: false, isCollected: true, isRewardEnable: false },
    { day: 3, amount: "60.0K", isBigDay: true, isCollected: true, isRewardEnable: false },
    { day: 4, amount: "40.0K", isBigDay: false, isCollected: false, isRewardEnable: false },
    { day: 5, amount: "50.0K", isBigDay: false, isCollected: false, isRewardEnable: false },
    { day: 6, amount: "120K", isBigDay: true, isCollected: false, isRewardEnable: false },
    { day: 7, amount: "70.0K", isBigDay: false, isCollected: false, isRewardEnable: false },
    { day: 8, amount: "80.0K", isBigDay: false, isCollected: false, isRewardEnable: false },
    { day: 9, amount: "200K", isBigDay: true, isCollected: false, isRewardEnable: false },
  ];