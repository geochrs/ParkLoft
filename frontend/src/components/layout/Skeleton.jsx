import classes from './Skeleton.module.css';

export default function Skeleton({ width, height, className, margin }) {
  return (
    <div
      className={`${classes.skeleton} ${className}`}
      style={{ width, height, margin }}
    ></div>
  );
}
