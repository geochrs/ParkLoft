import classes from './ProfileSection.module.css';

export function ProfileSection({ children }) {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.cards}>{children}</div>
      </div>
    </section>
  );
}
