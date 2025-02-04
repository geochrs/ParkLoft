import classes from './Skeleton.module.css';

export default function Skeleton({ width, height, className }) {
  return (
    <div
      className={`${classes.skeleton} ${className}`}
      style={{ width, height }}
    ></div>
  );
}
