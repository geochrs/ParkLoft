import classes from './AboutSection.module.css';

export default function AboutSection({ title, children }) {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <h2 className={classes.h2}>{title}</h2>
        <div className={classes.content}>{children}</div>
      </div>
    </section>
  );
}
