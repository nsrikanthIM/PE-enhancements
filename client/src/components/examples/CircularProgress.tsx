import CircularProgress from "../CircularProgress";

export default function CircularProgressExample() {
  return (
    <div className="flex gap-8 items-center justify-center p-8">
      <CircularProgress percentage={95} />
      <CircularProgress percentage={82} />
      <CircularProgress percentage={68} />
    </div>
  );
}
