const convertEngagementCount = (count: number): string => {
  const triggerCount = 1000;

  if (count >= triggerCount)
    return `${(count / triggerCount).toFixed(1).replace(/\.0$/, '')}K`;

  return `${count}`;
};

export default convertEngagementCount;
