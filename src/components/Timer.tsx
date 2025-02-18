type Props = {
  text: string;
  time: number;
};

const Timer = ({ text, time }: Props) => {
  return (
    <div>
      {text} {time}s
    </div>
  );
};

export default Timer;
